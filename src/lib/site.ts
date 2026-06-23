/**
 * Single source of truth for all NZ Afghan Sports Events content.
 * Edit business details, events, teams and sponsors here.
 */

export type NavLink = { label: string; href: string };

export type SportEvent = {
  id: string;
  title: string;
  sport: string;
  date: string; // human readable
  isoDate: string; // for sorting / datetime attr
  venue: string;
  city: string;
  status: "open" | "filling" | "closed";
  blurb: string;
};

export type Team = {
  name: string;
  sport: string;
  blurb: string;
};

export type Stat = { value: string; label: string };

export type Sponsor = { name: string; tier: "Gold" | "Community" };

export const site = {
  name: "NZ Afghan Sports Events",
  shortName: "NZASE",
  tagline: "Bringing the Afghan-Kiwi community together through sport.",
  description:
    "NZ Afghan Sports Events organises futsal, football, volleyball and netball events across Aotearoa — celebrating Afghan culture, building belonging, and getting our community moving.",
  established: 2019,
  region: "Aotearoa New Zealand",
  email: "hello@nzafghansports.nz",
  phone: "+64 21 000 0000",
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
  },

  nav: [
    { label: "Events", href: "#events" },
    { label: "About", href: "#about" },
    { label: "Get involved", href: "#get-involved" },
    { label: "Sponsors", href: "#sponsors" },
    { label: "Register", href: "#register" },
  ] satisfies NavLink[],

  stats: [
    { value: "2,400+", label: "Players & whānau" },
    { value: "40+", label: "Events run" },
    { value: "6", label: "Cities across NZ" },
    { value: "12", label: "Community teams" },
  ] satisfies Stat[],

  events: [
    {
      id: "futsal-night-league",
      title: "Futsal Night League",
      sport: "Futsal",
      date: "Every Friday · February 2026",
      isoDate: "2026-02-06",
      venue: "ASB Sports Centre",
      city: "Wellington",
      status: "filling",
      blurb:
        "Fast indoor 5-a-side under lights. Mixed-grade league with semis and finals across the month.",
    },
    {
      id: "volleyball-open",
      title: "Community Volleyball Open",
      sport: "Volleyball",
      date: "Sun 8 March 2026",
      isoDate: "2026-03-08",
      venue: "Trusts Arena",
      city: "Auckland",
      status: "open",
      blurb:
        "All ages, all levels. Round-robin pools in the morning, knockout brackets in the afternoon.",
    },
    {
      id: "nowruz-football-cup",
      title: "Nowruz Football Cup",
      sport: "Football",
      date: "Sat 21 March 2026",
      isoDate: "2026-03-21",
      venue: "English Park",
      city: "Christchurch",
      status: "open",
      blurb:
        "Our flagship 11-a-side tournament — community clubs battle for the cup with food, music and family.",
    },
    {
      id: "spring-netball-series",
      title: "Spring Netball Series",
      sport: "Netball",
      date: "Sundays · October 2026",
      isoDate: "2026-10-04",
      venue: "Pulman Arena",
      city: "Auckland",
      status: "open",
      blurb:
        "A friendly weekend series welcoming new and returning players of all levels to the court.",
    },
    {
      id: "eid-festival-gala",
      title: "Eid Festival Sports Gala",
      sport: "Multi-sport",
      date: "Sat 18 April 2026",
      isoDate: "2026-04-18",
      venue: "Memorial Park",
      city: "Hamilton",
      status: "closed",
      blurb:
        "A celebration day of futsal, volleyball and kids' races to mark Eid — registrations now closed.",
    },
  ] satisfies SportEvent[],

  teams: [
    {
      name: "Herat United",
      sport: "Football",
      blurb: "Christchurch's founding side — three-time cup finalists.",
    },
    {
      name: "Kabul Futsal Club",
      sport: "Futsal",
      blurb: "Wellington night-league regulars with a fierce youth academy.",
    },
    {
      name: "Mazar Smashers",
      sport: "Volleyball",
      blurb: "Auckland's powerhouse on the volleyball court.",
    },
    {
      name: "Pamir Netball",
      sport: "Netball",
      blurb: "Auckland's fast-rising netball crew, growing every season.",
    },
  ] satisfies Team[],

  involvement: [
    {
      title: "Join a team",
      body: "Find a side near you or start your own. Beginners and seasoned players all welcome.",
      cta: "Register to play",
      href: "#register",
    },
    {
      title: "Volunteer",
      body: "Help run match days — scoring, set-up, photography, food stalls. Every hand counts.",
      cta: "Sign up to help",
      href: "#register",
    },
    {
      title: "Coach & mentor",
      body: "Pass on your game to the next generation of Afghan-Kiwi athletes.",
      cta: "Get in touch",
      href: "#register",
    },
  ],

  sponsors: [
    { name: "Aoraki Halal Foods", tier: "Gold" },
    { name: "Canterbury Carpets", tier: "Gold" },
    { name: "Silk Road Travel", tier: "Community" },
    { name: "Kiwi Auto Care", tier: "Community" },
    { name: "Pamir Restaurant", tier: "Community" },
    { name: "Southern Sports Trust", tier: "Community" },
  ] satisfies Sponsor[],

  registerSports: ["Futsal", "Football", "Volleyball", "Netball", "Just volunteering"],
  registerRoles: ["Play", "Volunteer", "Coach / mentor", "Sponsor"],
};

export type Site = typeof site;
