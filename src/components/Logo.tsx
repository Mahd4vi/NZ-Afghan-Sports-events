import { site } from "@/lib/site";

type Props = {
  /** Tint for the wordmark text. Defaults to current colour. */
  tone?: "light" | "dark";
};

/**
 * Wordmark + an Afghan-inspired 8-point star mark in a crimson roundel.
 */
export function Logo({ tone = "dark" }: Props) {
  const text = tone === "light" ? "text-cloud" : "text-ink";

  return (
    <span className="inline-flex items-center gap-2.5">
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="17" cy="17" r="17" fill="var(--color-crimson)" />
        <path
          d="M17 5 L20 14 L29 17 L20 20 L17 29 L14 20 L5 17 L14 14 Z"
          fill="var(--color-gold)"
        />
        <circle cx="17" cy="17" r="3.1" fill="var(--color-pine)" />
      </svg>
      <span className={`flex flex-col leading-none ${text}`}>
        <span className="display text-lg font-700 uppercase tracking-tight">
          {site.shortName}
        </span>
        <span className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-stone">
          Sports Events
        </span>
      </span>
    </span>
  );
}
