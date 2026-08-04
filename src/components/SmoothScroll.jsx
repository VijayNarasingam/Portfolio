import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from "lenis/react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

function LenisSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return undefined;

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(tick);
      window.removeEventListener("load", refresh);
    };
  }, [lenis]);

  return null;
}

export default function SmoothScroll({ children }) {
  const reduced = usePrefersReducedMotion();

  if (reduced) return children;

  return (
    <ReactLenis
      root
      autoRaf={false}
      options={{
        lerp: 0.12,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        syncTouch: false,
      }}
    >
      <LenisSync />
      {children}
    </ReactLenis>
  );
}
