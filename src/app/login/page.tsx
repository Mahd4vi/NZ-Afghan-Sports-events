import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your NZ Afghan Sports Events account.",
};

export default async function LoginPage() {
  // Already signed in → straight to the account area.
  const user = await getCurrentUser();
  if (user) redirect("/account");

  return (
    <section className="relative flex min-h-[calc(100vh-57px)] items-center overflow-hidden bg-night py-16 text-cloud">
      <div className="tile-band absolute inset-0 opacity-[0.1]" aria-hidden="true" />
      <div
        className="absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(200,16,46,0.4), transparent 65%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-md px-5">
        <div className="text-center">
          <p className="eyebrow text-gold">Members area</p>
          <h1 className="mt-3 text-4xl font-700 uppercase sm:text-5xl">Welcome back</h1>
          <p className="mt-3 text-cloud/70">Sign in to manage your registrations.</p>
        </div>

        <div className="mt-8 rounded-xl2 bg-cloud p-7 text-ink shadow-[var(--shadow-lift)] sm:p-9">
          <LoginForm />

          <p className="mt-6 text-center text-sm text-stone">
            Don&apos;t have an account?{" "}
            <Link href="/#register" className="font-semibold text-crimson hover:text-crimson-bright">
              Register to play
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-cloud/50">
          ← <Link href="/" className="hover:text-gold">Back to home</Link>
        </p>
      </div>
    </section>
  );
}
