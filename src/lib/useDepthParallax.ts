"use client";

import { RefObject, useEffect, useState } from "react";

// Layered depth parallax. Two plates: an inpainted background (the subject
// painted out, so there is real scenery behind him) and the cut-out subject on
// top. The background is displaced per-pixel by a depth map — near wheat slides
// far, the horizon barely moves — while the subject rides at a single depth.
// Sliding them independently is what removes the smear a single-plate parallax
// leaves at his silhouette: the shader now has actual pixels to reveal there.

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

// uCover reproduces `object-fit: cover`; OVERSCAN insets the sample window so a
// shifted read never reaches past the plate edge and smears the clamped row.
const FRAG = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uBg;
uniform sampler2D uPerson;
uniform sampler2D uDepth;
uniform vec2 uCover;
uniform vec2 uShift;
uniform float uOverscan;
uniform float uPersonDepth;
void main() {
  vec2 uv = (vUv - 0.5) * uCover + 0.5;
  uv = (uv - 0.5) * uOverscan + 0.5;
  float depth = texture2D(uDepth, uv).r;
  vec3 bg = texture2D(uBg, uv + uShift * depth).rgb;
  vec4 person = texture2D(uPerson, uv + uShift * uPersonDepth);
  gl_FragColor = vec4(mix(bg, person.rgb, person.a), 1.0);
}`;

const STRENGTH = 0.04; // max UV shift of the nearest plane
// Measured from the depth map over the subject's mask: he sits well in front of
// the field behind him (~0.20) and well behind the closest wheat (~0.9).
const PERSON_DEPTH = 0.45;
// Must cover the largest possible shift (STRENGTH on each side) or edges tear.
const OVERSCAN = 1 - STRENGTH * 2.5;
const EASE = 0.07; // cursor chase; matches the background grid's feel

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
}

function upload(gl: WebGLRenderingContext, image: HTMLImageElement) {
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  // Non-power-of-two sources: clamp + linear, no mipmaps.
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  return tex;
}

function load(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export type ParallaxLayers = {
  /** Scene with the subject inpainted out. */
  bg: string;
  /** Cut-out subject, alpha masked. */
  person: string;
  /** Grayscale depth of `bg`; white is nearest. */
  depth: string;
};

/**
 * Renders `layers` as a cursor-driven parallax into the given canvas. Returns
 * whether the effect is live — false while textures load, and permanently false
 * for reduced motion, coarse pointers, or missing WebGL, so callers can keep
 * the plain <img> visible instead.
 */
export function useDepthParallax(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  layers: ParallaxLayers,
) {
  const { bg, person, depth } = layers;

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Same gating as the background grid: no motion for users who asked for
    // none, and nothing to follow on touch — skip the GPU work entirely.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
    });
    if (!gl) return;

    let raf = 0;
    let disposed = false;
    let cleanup = () => {};

    const init = async () => {
      const [bgImg, personImg, depthImg] = await Promise.all([
        load(bg),
        load(person),
        load(depth),
      ]);
      if (disposed) return;

      const vs = compile(gl, gl.VERTEX_SHADER, VERT);
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
      const program = gl.createProgram();
      if (!vs || !fs || !program) return;

      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
      gl.useProgram(program);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]), // one oversized triangle
        gl.STATIC_DRAW,
      );
      const aPos = gl.getAttribLocation(program, "aPos");
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.activeTexture(gl.TEXTURE0);
      const bgTex = upload(gl, bgImg);
      gl.activeTexture(gl.TEXTURE1);
      const personTex = upload(gl, personImg);
      gl.activeTexture(gl.TEXTURE2);
      const depthTex = upload(gl, depthImg);
      gl.uniform1i(gl.getUniformLocation(program, "uBg"), 0);
      gl.uniform1i(gl.getUniformLocation(program, "uPerson"), 1);
      gl.uniform1i(gl.getUniformLocation(program, "uDepth"), 2);
      gl.uniform1f(gl.getUniformLocation(program, "uOverscan"), OVERSCAN);
      gl.uniform1f(gl.getUniformLocation(program, "uPersonDepth"), PERSON_DEPTH);

      const uCover = gl.getUniformLocation(program, "uCover");
      const uShift = gl.getUniformLocation(program, "uShift");

      // Eased shift (x/y) chasing the cursor target (tx/ty), both in UV units.
      let x = 0;
      let y = 0;
      let tx = 0;
      let ty = 0;

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        gl.viewport(0, 0, canvas.width, canvas.height);

        const imageAspect = bgImg.width / bgImg.height;
        const boxAspect = w / h;
        gl.uniform2f(
          uCover,
          boxAspect > imageAspect ? 1 : boxAspect / imageAspect,
          boxAspect > imageAspect ? imageAspect / boxAspect : 1,
        );
      };

      const tick = () => {
        x += (tx - x) * EASE;
        y += (ty - y) * EASE;
        gl.uniform2f(uShift, x, y);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        // Park the loop once it has settled; a pointer move wakes it again.
        if (Math.abs(tx - x) < 1e-5 && Math.abs(ty - y) < 1e-5) {
          x = tx;
          y = ty;
          raf = 0;
          return;
        }
        raf = requestAnimationFrame(tick);
      };
      const start = () => {
        if (!raf) raf = requestAnimationFrame(tick);
      };

      const onMove = (e: MouseEvent) => {
        // Foreground drifts against the cursor — the way a real scene shifts
        // when you lean to look past what is in front of you.
        tx = (0.5 - e.clientX / window.innerWidth) * STRENGTH;
        ty = (e.clientY / window.innerHeight - 0.5) * STRENGTH;
        start();
      };
      const onLeave = () => {
        tx = 0;
        ty = 0;
        start();
      };
      const onResize = () => {
        resize();
        start();
      };

      resize();
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      setReady(true);

      window.addEventListener("mousemove", onMove);
      window.addEventListener("resize", onResize);
      document.addEventListener("mouseleave", onLeave);

      cleanup = () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("resize", onResize);
        document.removeEventListener("mouseleave", onLeave);
        gl.deleteTexture(bgTex);
        gl.deleteTexture(personTex);
        gl.deleteTexture(depthTex);
        gl.deleteBuffer(buffer);
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
      };
    };

    init();

    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      cleanup();
    };
  }, [canvasRef, bg, person, depth]);

  return ready;
}
