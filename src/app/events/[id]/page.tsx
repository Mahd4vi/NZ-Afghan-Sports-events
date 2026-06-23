import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getTournament, tournamentEventIds } from "@/lib/tournament";
import { TournamentTabs } from "@/components/tournament/TournamentTabs";

type Params = { id: string };

export function generateStaticParams(): Params[] {
  return tournamentEventIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  const tournament = getTournament(id);
  if (!tournament) return { title: "Tournament not found" };
  return {
    title: `${tournament.name} — Live results & standings`,
    description: `Fixtures, results and live standings for the ${tournament.name} (${tournament.sport}) at ${tournament.venue}, ${tournament.city}.`,
  };
}

export default async function TournamentPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const tournament = getTournament(id);
  if (!tournament) notFound();

  return (
    <>
      {/* Header band */}
      <section className="relative overflow-hidden bg-night text-cloud">
        <div className="tile-band absolute inset-0 opacity-[0.1]" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5 pb-12 pt-12">
          <Link
            href="/#events"
            className="text-sm font-medium text-cloud/70 transition-colors hover:text-gold"
          >
            ← All events
          </Link>
          <p className="eyebrow gold-rule mt-5 text-gold">
            {tournament.sport} · {tournament.venue}, {tournament.city}
          </p>
          <h1 className="mt-4 text-4xl font-700 uppercase sm:text-6xl">
            {tournament.name}
          </h1>
          <p className="mt-4 max-w-xl text-cloud/75">{tournament.format}</p>
        </div>
      </section>

      <section className="bg-sand pt-2">
        <TournamentTabs tournament={tournament} />
      </section>
    </>
  );
}
