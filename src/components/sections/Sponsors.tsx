import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export function Sponsors() {
  const gold = site.sponsors.filter((s) => s.tier === "Gold");
  const community = site.sponsors.filter((s) => s.tier === "Community");

  return (
    <section
      id="sponsors"
      className="relative overflow-hidden bg-coal py-20 text-cloud md:py-28"
      aria-labelledby="sponsors-heading"
    >
      <div className="tile-band absolute inset-0 opacity-[0.06]" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          {/* Donate / support CTA */}
          <Reveal>
            <p className="eyebrow gold-rule text-gold">Support the kaupapa</p>
            <h2
              id="sponsors-heading"
              className="mt-5 text-4xl font-700 uppercase sm:text-5xl"
            >
              Help keep our community playing.
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-cloud/75">
              We&apos;re powered by local sponsors and donations. Your support
              covers venue hire, gear for new players, and youth programmes right
              across Aotearoa.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#register"
                className="rounded-full bg-gold px-7 py-3.5 font-semibold text-night transition-all hover:bg-gold-soft hover:-translate-y-0.5"
              >
                Donate
              </a>
              <a
                href="#register"
                className="rounded-full border border-cloud/25 px-7 py-3.5 font-semibold transition-colors hover:border-gold hover:text-gold"
              >
                Become a sponsor
              </a>
            </div>
          </Reveal>

          {/* Sponsor wall */}
          <Reveal delay={120}>
            <div className="rounded-xl2 border border-cloud/10 bg-night/60 p-7 backdrop-blur-sm">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Gold partners
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {gold.map((s) => (
                  <div
                    key={s.name}
                    className="flex items-center justify-center rounded-lg border border-gold/30 bg-gold/10 px-4 py-5 text-center text-sm font-semibold"
                  >
                    {s.name}
                  </div>
                ))}
              </div>

              <h3 className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-cloud/50">
                Community supporters
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-2">
                {community.map((s) => (
                  <div
                    key={s.name}
                    className="flex items-center justify-center rounded-lg border border-cloud/10 bg-cloud/5 px-4 py-4 text-center text-sm text-cloud/80"
                  >
                    {s.name}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
