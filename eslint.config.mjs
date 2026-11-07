import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

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
  ...nextVitals,
  ...nextTypeScript,
  prettier,
];

export default eslintConfig;
