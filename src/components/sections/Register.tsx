"use client";

import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

type FormState = "idle" | "submitting" | "success";

export function Register() {
  const [state, setState] = useState<FormState>("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");

    // Client-side only for now. Swap for a POST to an API route / Formspree /
    // Resend when a backend is ready. (See README → "Wiring up the form".)
    const data = Object.fromEntries(new FormData(event.currentTarget));
    console.log("Registration submitted:", data);

    window.setTimeout(() => setState("success"), 700);
  }

  return (
    <section id="register" className="bg-mist py-20 md:py-28" aria-labelledby="register-heading">
      <div className="mx-auto max-w-3xl px-5">
        <Reveal>
          <div className="text-center">
            <p className="eyebrow text-crimson">Register</p>
            <h2
              id="register-heading"
              className="mt-3 text-4xl font-700 uppercase text-ink sm:text-5xl"
            >
              Get in the game
            </h2>
            <p className="mt-4 text-stone">
              Tell us how you&apos;d like to be involved and we&apos;ll be in
              touch with the next steps.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 rounded-xl2 border border-ink/8 bg-cloud p-7 shadow-sm sm:p-9">
            {state === "success" ? (
              <div className="py-10 text-center" role="status" aria-live="polite">
                <span
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-pine text-cloud"
                  aria-hidden="true"
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <h3 className="mt-4 display text-2xl font-600 uppercase text-ink">
                  You&apos;re in! 🎉
                </h3>
                <p className="mt-2 text-stone">
                  Thanks for registering. We&apos;ll email you at the address you
                  gave with the details. Tashakor!
                </p>
                <button
                  type="button"
                  onClick={() => setState("idle")}
                  className="mt-6 text-sm font-semibold text-crimson hover:text-crimson-bright"
                >
                  Register someone else
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name" name="name" autoComplete="name" required />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                  />
                  <Select label="I want to…" name="role" options={site.registerRoles} />
                </div>
                <Select label="Sport" name="sport" options={site.registerSports} />
                <div className="grid gap-1.5">
                  <label htmlFor="message" className="text-sm font-semibold text-ink">
                    Anything else? <span className="text-stone font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    className="rounded-lg border border-ink/15 bg-sand px-4 py-3 text-ink outline-none transition-colors focus:border-crimson focus:ring-2 focus:ring-crimson/20"
                    placeholder="Team name, experience level, questions…"
                  />
                </div>

                <button
                  type="submit"
                  disabled={state === "submitting"}
                  className="mt-2 rounded-full bg-crimson px-7 py-3.5 font-semibold text-cloud transition-all hover:bg-crimson-bright hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {state === "submitting" ? "Sending…" : "Submit registration"}
                </button>
                <p className="text-center text-xs text-stone">
                  By registering you agree to be contacted about {site.name}{" "}
                  activities. We never share your details.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
};

function Field({ label, name, type = "text", required, autoComplete }: FieldProps) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={name} className="text-sm font-semibold text-ink">
        {label}
        {required && <span className="text-crimson"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="rounded-lg border border-ink/15 bg-sand px-4 py-3 text-ink outline-none transition-colors focus:border-crimson focus:ring-2 focus:ring-crimson/20"
      />
    </div>
  );
}

function Select({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: readonly string[];
}) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={name} className="text-sm font-semibold text-ink">
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={options[0]}
        className="rounded-lg border border-ink/15 bg-sand px-4 py-3 text-ink outline-none transition-colors focus:border-crimson focus:ring-2 focus:ring-crimson/20"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
