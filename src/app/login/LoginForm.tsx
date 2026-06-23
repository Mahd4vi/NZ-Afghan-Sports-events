"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="grid gap-5">
      {state.error && (
        <p
          role="alert"
          className="rounded-lg border border-crimson/30 bg-crimson/5 px-4 py-3 text-sm font-medium text-crimson-deep"
        >
          {state.error}
        </p>
      )}

      <div className="grid gap-1.5">
        <label htmlFor="email" className="text-sm font-semibold text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="rounded-lg border border-ink/15 bg-sand px-4 py-3 text-ink outline-none transition-colors focus:border-crimson focus:ring-2 focus:ring-crimson/20"
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="password" className="text-sm font-semibold text-ink">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className="rounded-lg border border-ink/15 bg-sand px-4 py-3 text-ink outline-none transition-colors focus:border-crimson focus:ring-2 focus:ring-crimson/20"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-full bg-crimson px-7 py-3.5 font-semibold text-cloud transition-all hover:bg-crimson-bright hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
