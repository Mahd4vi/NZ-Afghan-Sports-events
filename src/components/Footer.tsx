import { site } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-night text-cloud">
      <div className="tile-band absolute inset-0 opacity-[0.07]" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cloud/70">
              {site.description}
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-gold">
              Est. {site.established} · {site.region}
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="display text-sm uppercase tracking-widest text-cloud/50">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5">
              {site.nav.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-cloud/80 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="display text-sm uppercase tracking-widest text-cloud/50">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-cloud/80">
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-gold">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-gold">
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-4 pt-2">
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold"
                >
                  Facebook
                </a>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-cloud/10 pt-6 text-xs text-cloud/50 sm:flex-row sm:items-center">
          <p>
            © {site.established}–2026 {site.name}. A community-run non-profit.
          </p>
          <p>Made with aroha in Aotearoa.</p>
        </div>
      </div>
    </footer>
  );
}
