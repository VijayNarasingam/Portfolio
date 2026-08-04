import { content } from "../content";

export default function Marquee() {
  const items = [...content.marquee, ...content.marquee];

  return (
    <div className="overflow-hidden border-y border-line py-6 sm:py-8" aria-hidden="true">
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap will-change-transform">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center gap-10">
            {items.map((skill, i) => (
              <span
                key={`${half}-${i}`}
                className="flex items-center gap-10 font-display text-[clamp(1.8rem,4.5vw,3.4rem)] font-semibold tracking-tight uppercase"
              >
                <span className={i % 2 === 0 ? "text-paper" : "text-stroke"}>{skill}</span>
                <span className="text-lg text-acid">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
