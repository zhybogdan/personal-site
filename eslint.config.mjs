import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      ".velite/**",
      "_legacy/**",
      "node_modules/**",
      "next-env.d.ts",
    ],
  },
  // Next.js recommended rules + TS, then disable formatting rules that
  // would conflict with Prettier (must come last).
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
];

export default eslintConfig;
