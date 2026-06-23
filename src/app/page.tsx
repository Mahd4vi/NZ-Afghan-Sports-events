import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Events } from "@/components/sections/Events";
import { GetInvolved } from "@/components/sections/GetInvolved";
import { Sponsors } from "@/components/sections/Sponsors";
import { Register } from "@/components/sections/Register";
import { site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  name: site.name,
  description: site.description,
  foundingDate: String(site.established),
  email: site.email,
  telephone: site.phone,
  areaServed: site.region,
  url: "https://nzafghansports.nz",
  sameAs: [site.social.facebook, site.social.instagram],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Events />
      <About />
      <GetInvolved />
      <Sponsors />
      <Register />
    </>
  );
}
