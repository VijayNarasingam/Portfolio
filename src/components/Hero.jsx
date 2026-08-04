import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { content } from "../content";

gsap.registerPlugin(useGSAP);

export default function Hero({ loaded }) {
  const rootRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const lenis = useLenis();

  useGSAP(
    () => {
      if (reduced) {
        gsap.set("[data-hero-line]", { y: 0 });
        gsap.set("[data-hero-fade]", { opacity: 1, y: 0 });
        gsap.set(".hero-scroll-hint", { opacity: 1 });
        return;
      }

      if (!loaded) return;

      const tl = gsap.timeline({ delay: 0.1 });

      tl.to("[data-hero-line]", {
        y: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "power4.out",
      })
        .fromTo(
          "[data-hero-fade]",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" },
          "-=0.7"
        )
        .fromTo(
          ".hero-scroll-hint",
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          "-=0.5"
        );
    },
    { dependencies: [loaded, reduced] }
  );

  const scrollDown = () => {
    if (lenis) lenis.scrollTo("#work", { offset: -16 });
    else document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
  };

  const firstLine = content.name.split(" ")[0] ?? content.name;
  const restName = content.name.split(" ").slice(1).join(" ");

  return (
    <section
      ref={rootRef}
      id="top"
      className="hero-glow relative flex min-h-svh flex-col justify-between overflow-hidden px-6 pt-28 pb-10 sm:px-10"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div data-hero-fade className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-acid" />
          </span>
          <span className="text-sm font-medium tracking-wide text-paper/80">
            {content.availability}
          </span>
        </div>

        <p data-hero-fade className="text-sm text-mute sm:text-right">
          {content.location}
          <br />
          <span className="font-display text-paper/60">{content.email}</span>
        </p>
      </div>

      <div className="my-auto py-10">
        <h1 className="font-display font-bold tracking-tight">
          <span className="block overflow-hidden">
            <span
              data-hero-line
              className="block translate-y-[110%] text-[clamp(2.6rem,11vw,12rem)] leading-[0.92] text-paper"
            >
              {firstLine}
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              data-hero-line
              className="block translate-y-[110%] text-[clamp(2.6rem,11vw,12rem)] leading-[0.92] text-paper"
            >
              {restName}
              <span className="text-acid">.</span>
            </span>
          </span>
          <span className="mt-4 block overflow-hidden">
            <span
              data-hero-line
              className="block translate-y-[110%] font-serif text-[clamp(1.4rem,4.5vw,3rem)] font-light text-mute italic"
            >
              {content.role}
            </span>
          </span>
        </h1>
      </div>

      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <p
          data-hero-fade
          className="max-w-md text-base leading-relaxed text-paper/70 sm:max-w-sm"
        >
          {content.tagline}
        </p>

        <button
          type="button"
          onClick={scrollDown}
          data-hover
          className="hero-scroll-hint group flex items-center gap-3 text-sm tracking-[0.2em] text-mute uppercase transition-colors hover:text-paper"
        >
          Scroll to explore
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/20 transition-all duration-300 group-hover:border-acid group-hover:bg-acid group-hover:text-ink">
            ↓
          </span>
        </button>
      </div>
    </section>
  );
}
