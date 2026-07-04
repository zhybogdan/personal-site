import path from "node:path";

// Build the velite content layer before Next compiles.
const isDev = process.argv.includes("dev");
const isBuild = process.argv.includes("build");
if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = "1";
  const { build } = await import("velite");
  await build({ watch: isDev, clean: !isDev });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    // Allow `@use "mixins" as *;` from any module without long relative paths.
    includePaths: [path.join(process.cwd(), "src/styles")],
  },
};

export default nextConfig;
