"use client";

import { useState } from "react";
import {
  computeStandings,
  formatMatchTime,
  matchesInRound,
  playedMatches,
  rounds,
  teamName,
  upcomingMatches,
  type GroupId,
  type Match,
  type Tournament,
} from "@/lib/tournament";

const TABS = ["Overview", "Teams", "Fixtures", "Results", "Standings"] as const;
type Tab = (typeof TABS)[number];

export function TournamentTabs({ tournament }: { tournament: Tournament }) {
  const [tab, setTab] = useState<Tab>("Overview");

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24">
      {/* Tab bar */}
      <div
        role="tablist"
        aria-label="Tournament views"
        className="sticky top-[57px] z-30 -mx-5 flex gap-1 overflow-x-auto border-b border-ink/10 bg-sand/90 px-5 py-2 backdrop-blur-md"
      >
        {TABS.map((t) => {
          const active = t === tab;
          return (
            <button
              key={t}
              role="tab"
              aria-selected={active}
              type="button"
              onClick={() => setTab(t)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                active
                  ? "bg-crimson text-cloud"
                  : "text-ink/70 hover:bg-ink/5 hover:text-ink"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      <div className="pt-8">
        {tab === "Overview" && <OverviewPanel t={tournament} />}
        {tab === "Teams" && <TeamsPanel t={tournament} />}
        {tab === "Fixtures" && <FixturesPanel t={tournament} />}
        {tab === "Results" && <ResultsPanel t={tournament} />}
        {tab === "Standings" && <StandingsPanel t={tournament} />}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- Overview --- */

function OverviewPanel({ t }: { t: Tournament }) {
  const played = playedMatches(t).length;
  const upcoming = upcomingMatches(t).length;
  const stats = [
    { value: String(t.teams.length), label: "Teams" },
    { value: String(t.groups.length), label: "Groups" },
    { value: String(played), label: "Matches played" },
    { value: String(upcoming), label: "Still to come" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl2 border border-ink/8 bg-cloud p-6 text-center"
        >
          <p className="display text-4xl font-700 text-crimson">{s.value}</p>
          <p className="mt-1 text-sm text-stone">{s.label}</p>
        </div>
      ))}
      <p className="sm:col-span-2 lg:col-span-4 rounded-xl2 border border-ink/8 bg-mist p-6 text-stone">
        <span className="font-semibold text-ink">Format — </span>
        {t.format}. Win = {t.pointsWin} points. Standings update automatically as
        results come in.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------- Teams --- */

function TeamsPanel({ t }: { t: Tournament }) {
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      {t.groups.map((g) => (
        <div key={g}>
          <h3 className="display text-xl font-600 uppercase text-ink">
            Group {g}
          </h3>
          <ul className="mt-4 space-y-3">
            {t.teams
              .filter((tm) => tm.group === g)
              .map((tm, i) => (
                <li
                  key={tm.id}
                  className="flex items-center gap-4 rounded-xl border border-ink/8 bg-cloud p-4"
                >
                  <span className="display text-2xl font-700 text-crimson/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{tm.name}</p>
                    <p className="text-sm text-stone">Manager · {tm.manager}</p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ----------------------------------------------------------- Fixtures --- */

function FixturesPanel({ t }: { t: Tournament }) {
  const allRounds = rounds(t);
  const [round, setRound] = useState<number>(allRounds[0] ?? 1);
  const fixtures = matchesInRound(t, round);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {allRounds.map((r) => {
          const active = r === round;
          return (
            <button
              key={r}
              type="button"
              onClick={() => setRound(r)}
              className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                active
                  ? "bg-pine text-cloud"
                  : "border border-ink/10 bg-cloud text-ink/70 hover:border-pine hover:text-pine"
              }`}
            >
              R{r}
            </button>
          );
        })}
      </div>

      <ul className="mt-6 space-y-3">
        {fixtures.map((m) => (
          <FixtureRow key={m.id} t={t} match={m} />
        ))}
      </ul>
    </div>
  );
}

function FixtureRow({ t, match }: { t: Tournament; match: Match }) {
  const done = match.result !== null;
  return (
    <li className="flex flex-col gap-2 rounded-xl border border-ink/8 bg-cloud p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className="rounded bg-mist px-2 py-1 text-xs font-semibold uppercase text-stone">
          Grp {match.group}
        </span>
        <span className="font-semibold text-ink">
          {teamName(t, match.homeId)}{" "}
          <span className="text-stone">vs</span> {teamName(t, match.awayId)}
        </span>
      </div>
      <div className="flex items-center gap-4 text-sm">
        {done ? (
          <span className="display text-lg font-700 text-ink">
            {match.result!.homeSets}–{match.result!.awaySets}
          </span>
        ) : (
          <span className="rounded-full bg-pine/10 px-2.5 py-1 text-xs font-semibold text-pine">
            Scheduled
          </span>
        )}
        <time dateTime={match.datetime} className="text-stone">
          {formatMatchTime(match.datetime)}
        </time>
      </div>
    </li>
  );
}

/* ------------------------------------------------------------ Results --- */

function ResultsPanel({ t }: { t: Tournament }) {
  const results = playedMatches(t);

  if (results.length === 0) {
    return <p className="text-stone">No results yet — check back after the first matches.</p>;
  }

  return (
    <ul className="space-y-3">
      {results.map((m) => {
        const r = m.result!;
        const homeWon = r.homeSets > r.awaySets;
        return (
          <li
            key={m.id}
            className="rounded-xl border border-ink/8 bg-cloud p-4"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-semibold uppercase text-stone">
                Group {m.group} · R{m.round} · {formatMatchTime(m.datetime)}
              </span>
              <span className="text-xs text-stone">{r.sets}</span>
            </div>
            <div className="mt-2 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <span className={`text-right font-semibold ${homeWon ? "text-ink" : "text-stone"}`}>
                {teamName(t, m.homeId)}
              </span>
              <span className="display rounded-lg bg-night px-3 py-1 text-lg font-700 text-cloud">
                {r.homeSets}–{r.awaySets}
              </span>
              <span className={`font-semibold ${!homeWon ? "text-ink" : "text-stone"}`}>
                {teamName(t, m.awayId)}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/* ---------------------------------------------------------- Standings --- */

function StandingsPanel({ t }: { t: Tournament }) {
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      {t.groups.map((g) => (
        <StandingsTable key={g} t={t} group={g} />
      ))}
    </div>
  );
}

function StandingsTable({ t, group }: { t: Tournament; group: GroupId }) {
  const rows = computeStandings(t, group);

  return (
    <div>
      <h3 className="display text-xl font-600 uppercase text-ink">Group {group}</h3>
      <div className="mt-4 overflow-hidden rounded-xl2 border border-ink/8 bg-cloud">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-night text-cloud">
              <th className="px-3 py-3 text-left font-semibold">#</th>
              <th className="px-3 py-3 text-left font-semibold">Team</th>
              <th className="px-2 py-3 text-center font-semibold" title="Played">P</th>
              <th className="px-2 py-3 text-center font-semibold" title="Won">W</th>
              <th className="px-2 py-3 text-center font-semibold" title="Lost">L</th>
              <th className="px-2 py-3 text-center font-semibold" title="Set difference">+/–</th>
              <th className="px-3 py-3 text-center font-semibold" title="Points">Pts</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const diff = row.setsFor - row.setsAgainst;
              return (
                <tr
                  key={row.team.id}
                  className={`border-t border-ink/5 ${i < 2 ? "bg-pine/5" : ""}`}
                >
                  <td className="px-3 py-3 font-semibold text-stone">{i + 1}</td>
                  <td className="px-3 py-3 font-semibold text-ink">{row.team.name}</td>
                  <td className="px-2 py-3 text-center text-stone">{row.played}</td>
                  <td className="px-2 py-3 text-center text-stone">{row.won}</td>
                  <td className="px-2 py-3 text-center text-stone">{row.lost}</td>
                  <td className="px-2 py-3 text-center text-stone">
                    {diff > 0 ? `+${diff}` : diff}
                  </td>
                  <td className="px-3 py-3 text-center display text-base font-700 text-crimson">
                    {row.points}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-stone">Top 2 (shaded) advance to the finals.</p>
    </div>
  );
}
