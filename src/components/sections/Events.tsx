import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { site, type SportEvent } from "@/lib/site";
import { hasTournament } from "@/lib/tournament";

const statusLabel: Record<SportEvent["status"], string> = {
  open: "Registrations open",
  filling: "Filling fast",
  closed: "Closed",
};

const statusPill: Record<SportEvent["status"], string> = {
  open: "pill-open",
  filling: "pill-filling",
  closed: "pill-closed",
};

function EventCard({ event }: { event: SportEvent }) {
  const isClosed = event.status === "closed";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl2 border border-ink/8 bg-cloud transition-all hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]">
      {/* Sport banner with tile motif */}
      <div className="relative h-32 overflow-hidden bg-coal">
        <div className="tile-band absolute inset-0 opacity-20" aria-hidden="true" />
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background:
              "linear-gradient(135deg, rgba(151,9,31,0.85), rgba(11,107,58,0.55))",
          }}
          aria-hidden="true"
        />
        <span className="relative z-10 flex h-full items-end p-5">
          <span className="display text-3xl font-700 uppercase text-cloud">
            {event.sport}
          </span>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
          <span
            className={`inline-flex items-center gap-1.5 ${statusPill[event.status]}`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
            {statusLabel[event.status]}
          </span>
        </div>

        <h3 className="mt-3 text-2xl font-600 uppercase text-ink">{event.title}</h3>

        <dl className="mt-3 space-y-1 text-sm text-stone">
          <div className="flex gap-2">
            <dt className="font-semibold text-ink/70">When</dt>
            <dd>
              <time dateTime={event.isoDate}>{event.date}</time>
            </dd>
          </div>
          <div className="flex gap-2">
            <dt className="font-semibold text-ink/70">Where</dt>
            <dd>
              {event.venue}, {event.city}
            </dd>
          </div>
        </dl>

        <p className="mt-4 flex-1 leading-relaxed text-stone">{event.blurb}</p>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
          <a
            href="#register"
            aria-disabled={isClosed}
            className={`inline-flex w-fit items-center gap-1.5 text-sm font-semibold transition-colors ${
              isClosed
                ? "pointer-events-none text-stone/60"
                : "text-crimson hover:text-crimson-bright"
            }`}
          >
            {isClosed ? "Registrations closed" : "Register for this event"}
            {!isClosed && <span aria-hidden="true">→</span>}
          </a>

          {hasTournament(event.id) && (
            <Link
              href={`/events/${event.id}`}
              className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-pine transition-colors hover:text-pine-bright"
            >
              View tournament <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export function Events() {
  return (
    <section id="events" className="bg-mist py-20 md:py-28" aria-labelledby="events-heading">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow gold-rule text-crimson">What&apos;s on</p>
              <h2
                id="events-heading"
                className="mt-5 text-4xl font-700 uppercase text-ink sm:text-5xl"
              >
                Upcoming events
              </h2>
            </div>
            <p className="max-w-sm text-stone">
              From flagship cups to weekly leagues — find your next match below
              and register in minutes.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {site.events.map((event, i) => (
            <Reveal key={event.id} delay={(i % 3) * 90}>
              <EventCard event={event} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
