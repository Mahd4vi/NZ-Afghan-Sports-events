import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

const pillars = [
  {
    title: "Belonging",
    body: "Sport is how we stay connected — to each other, to home, and to our new home in Aotearoa.",
  },
  {
    title: "Health",
    body: "Getting our tamariki, youth and elders moving, week in and week out, across the motu.",
  },
  {
    title: "Culture",
    body: "Every event carries our food, music and hospitality — a celebration as much as a competition.",
  },
];

export function About() {
  return (
    <section id="about" className="bg-sand py-20 md:py-28" aria-labelledby="about-heading">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid items-start gap-12 md:grid-cols-2">
          <Reveal>
            <p className="eyebrow gold-rule text-crimson">Who we are</p>
            <h2
              id="about-heading"
              className="mt-5 text-4xl font-700 uppercase text-ink sm:text-5xl"
            >
              More than a game — a community on the move.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-stone">
              {site.name} grew out of weekend futsal games between friends in{" "}
              {site.established}. Today we run tournaments and leagues across six
              cities, bringing thousands of Afghan-Kiwis together to play, cheer
              and celebrate.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-stone">
              We&apos;re a volunteer-led non-profit. Every dollar and every hour
              goes straight back into match days, gear for new players, and youth
              programmes.
            </p>
          </Reveal>

          <div className="grid gap-4">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 100}>
                <article className="group relative overflow-hidden rounded-xl2 border border-ink/8 bg-cloud p-6 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                  <span
                    className="absolute left-0 top-0 h-full w-1.5 bg-crimson transition-all group-hover:bg-gold"
                    aria-hidden="true"
                  />
                  <h3 className="display text-2xl font-600 uppercase text-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-stone">{pillar.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
