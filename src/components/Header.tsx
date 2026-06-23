"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-sand/90 backdrop-blur-md border-b border-ink/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <a href="#top" aria-label={site.name}>
          <Logo />
        </a>

        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-7">
          {site.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/80 transition-colors hover:text-crimson"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#register"
            className="rounded-full bg-crimson px-5 py-2 text-sm font-semibold text-cloud shadow-sm transition-all hover:bg-crimson-bright hover:shadow-md"
          >
            Register
          </a>
        </nav>

        <button
          type="button"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-current transition-transform duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-6 bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-current transition-transform duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden border-t border-ink/10 bg-sand"
        >
          <div className="mx-auto flex max-w-6xl flex-col px-5 py-3">
            {site.nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-ink/5 py-3 text-base font-medium text-ink"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#register"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-full bg-crimson px-5 py-3 text-center text-base font-semibold text-cloud"
            >
              Register to play
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
