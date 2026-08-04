import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { content } from "../content";

gsap.registerPlugin(useGSAP);

export default function Contact() {
  const btnRef = useRef(null);

  useGSAP(
    () => {
      const btn = btnRef.current;
      if (!btn) return;

      const xTo = gsap.quickTo(btn, "x", { duration: 0.3, ease: "power3.out" });
      const yTo = gsap.quickTo(btn, "y", { duration: 0.3, ease: "power3.out" });

      const move = (e) => {
        const rect = btn.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        xTo(relX * 0.35);
        yTo(relY * 0.35);
      };

      const leave = () => {
        xTo(0);
        yTo(0);
      };

      btn.addEventListener("mousemove", move);
      btn.addEventListener("mouseleave", leave);

      return () => {
        btn.removeEventListener("mousemove", move);
        btn.removeEventListener("mouseleave", leave);
      };
    },
    { scope: btnRef }
  );

  return (
    <section
      id="contact"
      className="flex min-h-svh flex-col items-center justify-center px-6 py-32 text-center sm:px-10"
    >
      <p
        data-reveal
        className="flex items-center gap-3 text-sm tracking-[0.25em] text-mute uppercase"
      >
        <span className="text-acid">04</span> / Contact
      </p>

      <h2
        data-reveal
        className="mt-8 max-w-4xl font-display text-[clamp(2.6rem,8vw,6.5rem)] leading-[0.95] font-bold tracking-tight text-paper"
      >
        Have an idea?
        <span className="block">
          Let&apos;s build it{" "}
          <span className="font-serif font-light text-acid italic">together</span>
        </span>
      </h2>

      <a
        ref={btnRef}
        href={`mailto:${content.email}`}
        data-hover
        className="mt-14 inline-block rounded-full border border-paper/20 px-10 py-5 font-display text-lg font-semibold text-paper transition-colors duration-300 hover:border-acid hover:bg-acid hover:text-ink sm:text-xl"
      >
        {content.email} ↗
      </a>

      <p data-reveal className="mt-6 text-sm text-mute">
        or call{" "}
        <a
          href={`tel:${content.phone.replace(/\s/g, "")}`}
          data-hover
          className="font-medium text-paper/80 underline decoration-acid/60 underline-offset-4 transition-colors hover:text-acid"
        >
          {content.phone}
        </a>
      </p>

      <div data-reveal className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {content.socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            data-hover
            className="group relative text-sm font-medium text-mute transition-colors duration-300 hover:text-paper"
          >
            {social.label}
            <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-acid transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
          </a>
        ))}
      </div>
    </section>
  );
}
