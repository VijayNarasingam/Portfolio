import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { content } from "../content";

gsap.registerPlugin(useGSAP);

export default function Preloader({ onDone }) {
  const rootRef = useRef(null);
  const [count, setCount] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) onDone();
  }, [reduced, onDone]);

  useGSAP(
    () => {
      if (reduced) return;

      const counter = { v: 0 };

      const tl = gsap.timeline({
        onComplete: () => onDone(),
      });

      tl.to(counter, {
        v: 100,
        duration: 1.7,
        ease: "power2.inOut",
        onUpdate: () => setCount(Math.round(counter.v)),
      })
        .to(
          ".prel-bar",
          {
            scaleX: 1,
            duration: 1.7,
            ease: "power2.inOut",
          },
          0
        )
        .to(".prel-name", { yPercent: -120, duration: 0.7, ease: "power3.in" }, "+=0.15")
        .to(".prel-inner", { yPercent: -100, duration: 0.8, ease: "power4.inOut" }, "<0.1")
        .to(rootRef.current, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "<0.12")
        .set(rootRef.current, { display: "none" });
    },
    { dependencies: [reduced] }
  );

  if (reduced) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-6 py-6 sm:px-10 sm:py-8"
    >
      <div className="prel-inner flex h-full flex-col justify-between">
        <div className="flex items-center justify-between text-xs tracking-[0.25em] text-mute uppercase">
          <span>{content.initials} — Portfolio</span>
          <span>Loading experience</span>
        </div>

        <div className="flex items-end justify-between gap-8">
          <div className="overflow-hidden">
            <p className="prel-name font-display text-4xl font-bold tracking-tight text-paper sm:text-6xl">
              {content.firstName}
            </p>
          </div>
          <p className="font-display text-6xl font-semibold tabular-nums text-acid sm:text-8xl">
            {count}
            <span className="text-mute">%</span>
          </p>
        </div>

        <div className="h-px w-full bg-line">
          <div className="prel-bar h-px w-full scale-x-0 bg-acid" />
        </div>
      </div>
    </div>
  );
}
