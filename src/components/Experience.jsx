import { content } from "../content";

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-28 sm:px-10 sm:py-40">
      <p
        data-reveal
        className="mb-16 flex items-center gap-3 text-sm tracking-[0.25em] text-mute uppercase sm:mb-24"
      >
        <span className="text-acid">03</span> / Experience
      </p>

      <ol className="relative border-l border-line pl-8 sm:pl-14">
        {content.experience.map((job, i) => (
          <li key={job.period} className="relative pb-20 last:pb-0">
            <span
              data-reveal
              className="absolute top-1.5 -left-[9px] h-4 w-4 rounded-full border-2 border-acid bg-ink"
            />
            <div className="grid gap-4 lg:grid-cols-12 lg:gap-8">
              <p
                data-reveal
                className="font-display text-sm text-acid lg:col-span-3"
              >
                {job.period}
              </p>
              <div className="lg:col-span-9">
                <h3 data-reveal className="font-display text-2xl font-semibold text-paper sm:text-3xl">
                  {job.role}
                  <span className="text-mute"> — {job.company}</span>
                </h3>
                <p data-reveal className="mt-4 max-w-2xl leading-relaxed text-paper/70">
                  {job.description}
                </p>
                <div data-reveal className="mt-5 flex flex-wrap gap-2">
                  {job.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-line px-3 py-1 text-xs text-mute"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
