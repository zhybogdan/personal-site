import type { MouseEvent } from "react";

export function animateIt(e: MouseEvent<HTMLElement>) {
  const { offsetX: x, offsetY: y } = e.nativeEvent;
  const target = e.target as HTMLElement;
  const { offsetWidth: width, offsetHeight: height } = target;
  const move = 10;
  const xMove = (x / width) * (move * 2) - move;
  const yMove = (y / height) * (move * 2) - move;

  target.style.transform = `translate(${xMove}px, ${yMove}px)`;
  target.style.willChange = "transform";

  if (e.type === "mouseleave") {
    target.style.transform = "";
    target.style.willChange = "auto";
  }
}
