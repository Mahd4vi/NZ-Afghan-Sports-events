import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export function GetInvolved() {
  return (
    <section
      id="get-involved"
      className="bg-sand py-20 md:py-28"
      aria-labelledby="involved-heading"
    >
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="eyebrow gold-rule text-crimson">Get involved</p>
          <h2
            id="involved-heading"
            className="mt-5 max-w-2xl text-4xl font-700 uppercase text-ink sm:text-5xl"
          >
            There&apos;s a place for everyone on the field.
          </h2>
        </Reveal>

        {/* Ways to get involved */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {site.involvement.map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <article className="flex h-full flex-col rounded-xl2 border border-ink/8 bg-cloud p-7 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                <span className="display text-5xl font-700 text-crimson/15">
                  0{i + 1}
                </span>
                <h3 className="mt-2 text-2xl font-600 uppercase text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 leading-relaxed text-stone">{item.body}</p>
                <a
                  href={item.href}
                  className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-crimson transition-colors hover:text-crimson-bright"
                >
                  {item.cta} <span aria-hidden="true">→</span>
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Featured teams */}
        <Reveal>
          <h3 className="mt-16 display text-2xl font-600 uppercase text-ink">
            Some of our teams
          </h3>
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {site.teams.map((team, i) => (
            <Reveal key={team.name} delay={i * 80}>
              <div className="flex items-center gap-4 rounded-xl border border-ink/8 bg-mist p-5">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pine text-cloud display text-lg font-700"
                  aria-hidden="true"
                >
                  {team.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
                <div>
                  <p className="font-semibold text-ink">{team.name}</p>
                  <p className="text-sm text-stone">
                    {team.sport} · {team.blurb}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
