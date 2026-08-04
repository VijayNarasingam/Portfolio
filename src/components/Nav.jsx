import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLenis } from "lenis/react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { content } from "../content";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Nav({ loaded }) {
  const navRef = useRef(null);
  const lenis = useLenis();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      gsap.set(navRef.current, { y: 0, opacity: 1 });
      return undefined;
    }

    if (!loaded) return undefined;
    gsap.fromTo(
      navRef.current,
      { y: -32, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.35 }
    );
  }, [loaded]);

  const scrollTo = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { offset: -16 });
    else target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      ref={navRef}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 opacity-0 sm:px-10"
      style={{ opacity: loaded ? undefined : 0 }}
    >
      <a
        href="#top"
        onClick={(e) => scrollTo(e, "#top")}
        data-hover
        className="font-display text-lg font-bold tracking-tight text-paper"
      >
        {content.initials}
        <span className="text-acid">.</span>
      </a>

      <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => scrollTo(e, link.href)}
            className="group relative text-sm font-medium tracking-wide text-paper/70 transition-colors duration-300 hover:text-paper"
          >
            {link.label}
            <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-acid transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
          </a>
        ))}
      </nav>

      <a
        href={`mailto:${content.email}`}
        data-hover
        className="group inline-flex items-center gap-2 rounded-full border border-paper/20 px-5 py-2 text-sm font-medium text-paper transition-all duration-300 hover:border-acid hover:bg-acid hover:text-ink"
      >
        Let&apos;s talk
        <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          ↗
        </span>
      </a>
    </header>
  );
}
