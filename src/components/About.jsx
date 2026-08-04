import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Code2,
  Database,
  Gauge,
  MonitorCheck,
  Palette,
  PenTool,
  Rocket,
  Search,
  Smartphone,
  Sparkles,
  Wrench,
} from "lucide-react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { content } from "../content";

gsap.registerPlugin(useGSAP);

const icons = {
  Code2,
  Database,
  Gauge,
  MonitorCheck,
  Palette,
  PenTool,
  Rocket,
  Search,
  Smartphone,
  Sparkles,
  Wrench,
};

function Stat({ stat }) {
  const numRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const Icon = icons[stat.icon] || null;

  useGSAP(
    () => {
      if (reduced) {
        numRef.current.textContent = String(stat.value);
        return;
      }

      const el = numRef.current;
      const counter = { v: 0 };
      gsap.to(counter, {
        v: stat.value,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
        onUpdate: () => {
          el.textContent =
            stat.decimals > 0
              ? counter.v.toFixed(stat.decimals)
              : String(Math.round(counter.v));
        },
      });
    },
    { dependencies: [stat, reduced] }
  );

  return (
    <div data-reveal className="border-t border-line pt-6">
      {Icon && <Icon className="mb-4 h-5 w-5 text-acid" strokeWidth={1.75} />}
      <p className="font-display text-5xl font-bold tracking-tight text-paper sm:text-6xl">
        <span ref={numRef}>0</span>
        <span className="text-acid">{stat.suffix}</span>
      </p>
      <p className="mt-3 text-sm text-mute">{stat.label}</p>
    </div>
  );
}

export default function About() {
  const { initials, availability, features } = content;

  return (
    <section id="about" className="px-6 py-28 sm:px-10 sm:py-40">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p
            data-reveal
            className="flex items-center gap-3 text-sm tracking-[0.25em] text-mute uppercase"
          >
            <span className="text-acid">01</span> / About
          </p>
          <h2
            data-reveal
            className="mt-6 font-display text-4xl font-bold tracking-tight text-paper sm:text-5xl"
          >
            Where design
            <span className="block font-serif font-light text-acid italic">
              meets code
            </span>
          </h2>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          {content.about.map((para, i) => (
            <p
              key={i}
              data-reveal
              className={
                i > 0
                  ? "mt-6 text-xl leading-relaxed text-paper/70 sm:text-2xl"
                  : "text-xl leading-relaxed text-paper/80 sm:text-2xl"
              }
            >
              {para}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-20 grid gap-10 lg:mt-28 lg:grid-cols-12">
        <div
          data-reveal
          className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line lg:col-span-5"
        >
          <div className="art-noise absolute inset-0 z-10" />
          <div
            data-parallax
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_25%,rgba(200,255,0,0.18),transparent_55%),radial-gradient(ellipse_at_75%_85%,rgba(200,255,0,0.08),transparent_50%),linear-gradient(160deg,#14140f_0%,#0a0a0a_60%)]"
          >
            <div className="flex h-full items-center justify-center">
              <span className="font-display text-[9rem] font-bold tracking-tight text-paper/10 select-none sm:text-[11rem]">
                {initials}
              </span>
            </div>
            <span className="absolute top-8 left-8 h-16 w-16 rounded-full border border-line" />
            <span className="absolute right-10 bottom-16 h-3 w-3 rounded-full bg-acid" />
          </div>
          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2.5 rounded-full border border-line bg-ink/80 px-4 py-2 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-acid" />
            </span>
            <span className="text-xs text-paper/85">{availability}</span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
          {features.map((feature) => {
            const Icon = icons[feature.icon] || null;
            return (
              <div
                key={feature.title}
                data-reveal
                className="group rounded-2xl border border-line p-6 transition-colors duration-300 hover:border-acid/40"
              >
                {Icon && (
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-ink transition-colors duration-300 group-hover:border-acid/40">
                    <Icon
                      className="h-5 w-5 text-paper/70 transition-colors duration-300 group-hover:text-acid"
                      strokeWidth={1.75}
                    />
                  </div>
                )}
                <h3 className="mt-5 font-display text-lg font-semibold text-paper">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">
                  {feature.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-20 grid grid-cols-2 gap-x-8 gap-y-12 sm:mt-28 lg:grid-cols-3">
        {content.stats.map((stat) => (
          <Stat key={stat.label} stat={stat} />
        ))}
      </div>

      <div className="mt-20 grid grid-cols-1 gap-10 border-t border-line pt-12 sm:grid-cols-2 lg:mt-28 lg:grid-cols-4">
        {content.skills.map((group) => {
          const Icon = icons[group.icon] || null;
          return (
            <div key={group.group}>
              <p
                data-reveal
                className="flex items-center gap-2.5 text-xs tracking-[0.25em] text-mute uppercase"
              >
                {Icon && <Icon className="h-4 w-4 text-acid" strokeWidth={1.75} />}
                {group.group}
              </p>
              <ul data-reveal className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="font-display text-lg font-medium text-paper/85"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
