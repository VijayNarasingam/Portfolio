import { useLenis } from "lenis/react";
import { content } from "../content";

export default function Footer() {
  const lenis = useLenis();

  const backToTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-line px-6 py-10 sm:px-10">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <p className="text-sm text-mute">
          © {new Date().getFullYear()} {content.name}. All rights reserved.
        </p>

        <p className="font-display text-sm tracking-wide text-mute">
          Designed &amp; built with <span className="text-acid">Lenis</span> + GSAP
        </p>

        <button
          type="button"
          onClick={backToTop}
          data-hover
          className="group flex items-center gap-3 text-sm font-medium text-paper/80 transition-colors hover:text-paper"
        >
          Back to top
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-acid group-hover:bg-acid group-hover:text-ink">
            ↑
          </span>
        </button>
      </div>
    </footer>
  );
}
