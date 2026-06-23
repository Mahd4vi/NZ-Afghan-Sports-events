import { site } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-night text-cloud"
      aria-labelledby="hero-heading"
    >
      {/* Layered atmosphere: tile motif + diagonal colour wash */}
      <div className="tile-band absolute inset-0 opacity-[0.12]" aria-hidden="true" />
      <div
        className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(200,16,46,0.45), transparent 65%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-48 -left-32 h-[30rem] w-[30rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(11,107,58,0.4), transparent 65%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-20 md:pb-28 md:pt-28">
        <p className="eyebrow gold-rule text-gold">
          {site.region} · Est. {site.established}
        </p>

        <h1
          id="hero-heading"
          className="mt-6 max-w-4xl text-5xl font-700 uppercase sm:text-7xl md:text-8xl"
        >
          Where the Afghan-Kiwi
          <span className="text-crimson-bright"> community </span>
          plays as one.
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-cloud/75">
          {site.tagline} Futsal, football, volleyball and netball events across
          Aotearoa — open to every age, every level, every whānau.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href="#register"
            className="rounded-full bg-crimson px-7 py-3.5 text-base font-semibold text-cloud shadow-lg transition-all hover:bg-crimson-bright hover:-translate-y-0.5"
          >
            Register to play
          </a>
          <a
            href="#events"
            className="rounded-full border border-cloud/25 px-7 py-3.5 text-base font-semibold text-cloud transition-colors hover:border-gold hover:text-gold"
          >
            See upcoming events
          </a>
        </div>

        {/* Stat strip */}
        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-cloud/15 pt-10 sm:grid-cols-4">
          {site.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="display text-4xl font-700 text-gold sm:text-5xl">
                {stat.value}
              </dt>
              <dd className="mt-1 text-sm text-cloud/65">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
