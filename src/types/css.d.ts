// Next only ships ambient types for CSS Modules (`*.module.css` / `*.module.scss`).
// Plain stylesheet imports are side-effect only and carry no bindings, so they
// need declarations of their own — without them `noUncheckedSideEffectImports`
// reports TS2307 for every global stylesheet (normalize.css, lenis.css,
// globals.scss). The narrower `*.module.*` patterns still win, so CSS Modules
// keep their typed class maps.
declare module "*.css";
declare module "*.scss";
