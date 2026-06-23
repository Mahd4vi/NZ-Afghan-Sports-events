/**
 * Tournament data + standings logic.
 *
 * Mirrors the competition features of a live tournament tracker (teams in
 * groups, round-robin fixtures, set-based results) but adds AUTO-COMPUTED
 * standings — tables are derived from results, never hand-maintained.
 *
 * A tournament attaches to an event in site.ts via `eventId`. Add more
 * tournaments to the `tournaments` array to light up /events/<id>.
 */

export type GroupId = "A" | "B";

export type TournamentTeam = {
  id: string;
  name: string;
  group: GroupId;
  manager: string;
};

export type MatchResult = {
  homeSets: number;
  awaySets: number;
  /** Set-by-set detail, e.g. "25–18 25–21" or "25–22 23–25 15–11". */
  sets: string;
};

export type Match = {
  id: string;
  round: number;
  group: GroupId;
  /** Local datetime, e.g. "2026-03-08T09:30". */
  datetime: string;
  homeId: string;
  awayId: string;
  /** null until the match has been played. */
  result: MatchResult | null;
};

export type Tournament = {
  eventId: string;
  name: string;
  sport: string;
  format: string;
  venue: string;
  city: string;
  pointsWin: number;
  groups: GroupId[];
  teams: TournamentTeam[];
  matches: Match[];
};

export type StandingRow = {
  team: TournamentTeam;
  played: number;
  won: number;
  lost: number;
  setsFor: number;
  setsAgainst: number;
  points: number;
};

/* ---------------------------------------------------------------- data --- */

const volleyballOpen: Tournament = {
  eventId: "volleyball-open",
  name: "Community Volleyball Open",
  sport: "Volleyball",
  format: "8 teams · 2 groups of 4 · single round-robin → finals",
  venue: "Trusts Arena",
  city: "Auckland",
  pointsWin: 2,
  groups: ["A", "B"],
  teams: [
    { id: "a1", name: "Mazar Smashers", group: "A", manager: "Najib Rahimi" },
    { id: "a2", name: "Kabul Spikers", group: "A", manager: "Sahar Noori" },
    { id: "a3", name: "Herat Blockers", group: "A", manager: "Omid Karimi" },
    { id: "a4", name: "Bamiyan Diggers", group: "A", manager: "Farid Ahmadi" },
    { id: "b1", name: "Auckland Aces", group: "B", manager: "Lina Hossaini" },
    { id: "b2", name: "Wellington Walls", group: "B", manager: "Tariq Wali" },
    { id: "b3", name: "Canterbury Kings", group: "B", manager: "Zahra Sadat" },
    { id: "b4", name: "Otago Setters", group: "B", manager: "Bilal Stanikzai" },
  ],
  matches: [
    // Group A — Round 1 (played)
    { id: "a-r1-1", round: 1, group: "A", datetime: "2026-03-08T09:30", homeId: "a1", awayId: "a4", result: { homeSets: 2, awaySets: 0, sets: "25–18 25–21" } },
    { id: "a-r1-2", round: 1, group: "A", datetime: "2026-03-08T11:00", homeId: "a2", awayId: "a3", result: { homeSets: 2, awaySets: 1, sets: "25–22 23–25 15–11" } },
    // Group B — Round 1 (played)
    { id: "b-r1-1", round: 1, group: "B", datetime: "2026-03-08T09:30", homeId: "b1", awayId: "b4", result: { homeSets: 2, awaySets: 1, sets: "25–23 22–25 15–12" } },
    { id: "b-r1-2", round: 1, group: "B", datetime: "2026-03-08T11:00", homeId: "b2", awayId: "b3", result: { homeSets: 1, awaySets: 2, sets: "25–21 19–25 12–15" } },
    // Group A — Round 2 (played)
    { id: "a-r2-1", round: 2, group: "A", datetime: "2026-03-08T13:30", homeId: "a1", awayId: "a3", result: { homeSets: 2, awaySets: 0, sets: "25–19 25–17" } },
    { id: "a-r2-2", round: 2, group: "A", datetime: "2026-03-08T15:00", homeId: "a4", awayId: "a2", result: { homeSets: 0, awaySets: 2, sets: "18–25 16–25" } },
    // Group B — Round 2 (played)
    { id: "b-r2-1", round: 2, group: "B", datetime: "2026-03-08T13:30", homeId: "b1", awayId: "b3", result: { homeSets: 1, awaySets: 2, sets: "25–22 20–25 13–15" } },
    { id: "b-r2-2", round: 2, group: "B", datetime: "2026-03-08T15:00", homeId: "b4", awayId: "b2", result: { homeSets: 2, awaySets: 1, sets: "25–20 23–25 15–13" } },
    // Group A — Round 3 (upcoming)
    { id: "a-r3-1", round: 3, group: "A", datetime: "2026-03-15T10:00", homeId: "a1", awayId: "a2", result: null },
    { id: "a-r3-2", round: 3, group: "A", datetime: "2026-03-15T11:30", homeId: "a3", awayId: "a4", result: null },
    // Group B — Round 3 (upcoming)
    { id: "b-r3-1", round: 3, group: "B", datetime: "2026-03-15T10:00", homeId: "b1", awayId: "b2", result: null },
    { id: "b-r3-2", round: 3, group: "B", datetime: "2026-03-15T11:30", homeId: "b3", awayId: "b4", result: null },
  ],
};

const tournaments: Tournament[] = [volleyballOpen];

/* ------------------------------------------------------------- helpers --- */

export function getTournament(eventId: string): Tournament | undefined {
  return tournaments.find((t) => t.eventId === eventId);
}

export function tournamentEventIds(): string[] {
  return tournaments.map((t) => t.eventId);
}

export function hasTournament(eventId: string): boolean {
  return tournaments.some((t) => t.eventId === eventId);
}

export function teamName(t: Tournament, id: string): string {
  return t.teams.find((tm) => tm.id === id)?.name ?? "TBC";
}

export function rounds(t: Tournament): number[] {
  return [...new Set(t.matches.map((m) => m.round))].sort((a, b) => a - b);
}

export function matchesInRound(t: Tournament, round: number): Match[] {
  return t.matches
    .filter((m) => m.round === round)
    .sort((a, b) => a.datetime.localeCompare(b.datetime));
}

export function playedMatches(t: Tournament): Match[] {
  return t.matches
    .filter((m) => m.result !== null)
    .sort((a, b) => b.datetime.localeCompare(a.datetime));
}

export function upcomingMatches(t: Tournament): Match[] {
  return t.matches
    .filter((m) => m.result === null)
    .sort((a, b) => a.datetime.localeCompare(b.datetime));
}

/**
 * Auto-compute a group standings table from played results.
 * Sort: points → set difference → sets won → team name.
 */
export function computeStandings(t: Tournament, group: GroupId): StandingRow[] {
  const rows = new Map<string, StandingRow>();
  for (const team of t.teams.filter((tm) => tm.group === group)) {
    rows.set(team.id, {
      team,
      played: 0,
      won: 0,
      lost: 0,
      setsFor: 0,
      setsAgainst: 0,
      points: 0,
    });
  }

  for (const m of t.matches) {
    if (m.group !== group || !m.result) continue;
    const home = rows.get(m.homeId);
    const away = rows.get(m.awayId);
    if (!home || !away) continue;

    const { homeSets, awaySets } = m.result;
    // Accumulate into fresh-per-run local rows (input data is never mutated).
    home.played += 1;
    away.played += 1;
    home.setsFor += homeSets;
    home.setsAgainst += awaySets;
    away.setsFor += awaySets;
    away.setsAgainst += homeSets;

    if (homeSets > awaySets) {
      home.won += 1;
      home.points += t.pointsWin;
      away.lost += 1;
    } else {
      away.won += 1;
      away.points += t.pointsWin;
      home.lost += 1;
    }
  }

  return [...rows.values()].sort(
    (a, b) =>
      b.points - a.points ||
      b.setsFor - b.setsAgainst - (a.setsFor - a.setsAgainst) ||
      b.setsFor - a.setsFor ||
      a.team.name.localeCompare(b.team.name),
  );
}

/** Short "Sat 8 Mar · 9:30am" style formatter for a match datetime. */
export function formatMatchTime(datetime: string): string {
  const date = new Date(datetime);
  return new Intl.DateTimeFormat("en-NZ", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}
