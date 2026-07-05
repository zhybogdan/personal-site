// Central GSAP entry point — import gsap/useGSAP from here so plugin
// registration happens exactly once across the app.
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export { gsap, useGSAP };
