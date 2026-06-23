import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { logoutAction } from "../login/actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "My account",
};

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <section className="bg-sand py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-5">
        <p className="eyebrow gold-rule text-crimson">Members area</p>
        <h1 className="mt-5 text-4xl font-700 uppercase text-ink sm:text-5xl">
          Kia ora{user.name ? `, ${user.name}` : ""} 👋
        </h1>

        <div className="mt-8 rounded-xl2 border border-ink/8 bg-cloud p-7">
          <h2 className="display text-xl font-600 uppercase text-ink">
            Your details
          </h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex gap-2">
              <dt className="w-24 font-semibold text-ink/70">Name</dt>
              <dd className="text-stone">{user.name ?? "—"}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-24 font-semibold text-ink/70">Email</dt>
              <dd className="text-stone">{user.email}</dd>
            </div>
          </dl>

          <p className="mt-6 text-sm text-stone">
            This is your members area. Registration management, your teams and
            event check-ins can live here next.
          </p>

          <form action={logoutAction} className="mt-6">
            <button
              type="submit"
              className="rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-crimson hover:text-crimson"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
