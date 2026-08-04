import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { content } from "../content";

gsap.registerPlugin(useGSAP);

function Slide({ project, index, stack }) {
  return (
    <article
      className={`relative flex w-full flex-col justify-end px-6 pt-28 pb-14 last:border-b-0 ${
        stack
          ? "min-h-svh border-b border-line"
          : "h-svh shrink-0 overflow-hidden border-b-0 md:w-screen md:justify-center md:px-20 md:pb-24 md:pt-16"
      }`}
    >
      <div className="group/art relative mb-8 h-52 w-full overflow-hidden rounded-2xl md:absolute md:top-1/2 md:right-16 md:mb-0 md:h-[64%] md:w-[36vw] md:-translate-y-1/2 md:rounded-3xl">
        <div className="absolute -inset-[7%] will-change-transform" data-art-parallax>
          <div
            className="h-full w-full transition-transform duration-700 ease-out group-hover/art:scale-[1.06]"
            style={{
              background: `radial-gradient(130% 130% at 22% 12%, ${project.accent}30, transparent 58%), linear-gradient(155deg, ${project.accent}14, #0d0d0c 92%)`,
            }}
          >
            <div className="art-noise absolute inset-0" />
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-3xl">
        <p className="mb-4 flex items-center gap-3 text-xs tracking-[0.25em] text-mute uppercase">
          <span className="font-display text-sm" style={{ color: project.accent }}>
            {project.index}
          </span>
          / {project.category}
        </p>

        <h3 className="font-display text-[clamp(2.1rem,8vw,5.8rem)] leading-[1.02] font-bold tracking-tight text-paper transition-all duration-500 hover:translate-x-2 hover:text-[color:var(--accent)] md:leading-[0.95]">
          {project.title}
        </h3>

        <p className="mt-5 max-w-md leading-relaxed text-paper/65">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line px-3 py-1 text-xs text-mute transition-colors duration-300 hover:border-paper/40 hover:text-paper"
            >
              {tag}
            </span>
          ))}
          <span className="text-sm text-mute">{project.year}</span>
        </div>

        <a
          href="#contact"
          data-hover
          className="mt-10 inline-flex items-center gap-3 font-display text-sm tracking-[0.2em] text-paper uppercase transition-colors duration-300 hover:text-acid"
        >
          View case study
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/25 transition-all duration-300 hover:rotate-45 hover:border-acid hover:bg-acid hover:text-ink">
            ↗
          </span>
        </a>
      </div>
    </article>
  );
}

export default function Work() {
  const pinRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const counterRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const stack = reduced;

  useGSAP(
    () => {
      if (reduced) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current;
        const pin = pinRef.current;
        if (!track || !pin) return;

        const getDistance = () => track.scrollWidth - window.innerWidth;

        const parallax = gsap.utils.toArray("[data-art-parallax]", pin);
        parallax.forEach((el) => {
          gsap.fromTo(
            el,
            { xPercent: -7 },
            {
              xPercent: 7,
              ease: "none",
              scrollTrigger: {
                trigger: pin,
                start: "top top",
                end: () => `+=${getDistance()}`,
                scrub: true,
              },
            }
          );
        });

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${p})`;
              }
              if (counterRef.current) {
                const n = content.projects.length;
                const idx = Math.min(n, Math.max(1, Math.round(p * (n - 1)) + 1));
                counterRef.current.textContent = `${String(idx).padStart(2, "0")} / ${String(
                  n
                ).padStart(2, "0")}`;
              }
            },
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: pinRef, dependencies: [reduced] }
  );

  return (
    <section id="work" className="relative">
      <div className="flex items-end justify-between px-6 pt-28 pb-8 sm:px-10 md:pt-40 md:pb-12">
        <p
          data-reveal
          className="flex items-center gap-3 text-sm tracking-[0.25em] text-mute uppercase"
        >
          <span className="text-acid">02</span> / Selected Work
        </p>
        <p data-reveal className="hidden text-sm tracking-[0.2em] text-mute uppercase md:block">
          Scroll →
        </p>
      </div>

      <div ref={pinRef} className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-28 bg-gradient-to-r from-ink via-ink/60 to-transparent md:block" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-28 bg-gradient-to-l from-ink via-ink/60 to-transparent md:block" />

        <div
          ref={trackRef}
          data-track
          className={`flex flex-col will-change-transform ${stack ? "" : "md:flex-row"}`}
        >
          {content.projects.map((project, i) => (
            <Slide key={project.index} project={project} index={i} stack={stack} />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-center gap-4 px-6 pb-8 sm:px-10">
          <div className="h-px flex-1 bg-line">
            <div
              ref={progressRef}
              data-progress
              className="h-px w-full origin-left scale-x-0 bg-acid"
            />
          </div>
          <span
            ref={counterRef}
            data-counter
            className="font-display text-sm tabular-nums text-mute"
          >
            01 / {String(content.projects.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
