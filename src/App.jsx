import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroll from "./components/SmoothScroll";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Work from "./components/Work";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

function RevealSystem({ loaded }) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;

    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });

      gsap.utils.toArray("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [reduced]);

  useEffect(() => {
    if (loaded) ScrollTrigger.refresh();
  }, [loaded]);

  return null;
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const handleDone = () => setLoaded(true);

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Preloader onDone={handleDone} />
      <RevealSystem loaded={loaded} />
      <SmoothScroll>
        <Nav loaded={loaded} />
        <main>
          <Hero loaded={loaded} />
          <Marquee />
          <Work />
          <About />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
