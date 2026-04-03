import { ContactSubnav } from "@/components/contact-subnav";
import { DirectionsContent } from "@/components/directions-content";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/site";
import { SubpageHero } from "@/components/subpage-hero";

export default async function ContactDirectionsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <div className="subpageShell">
      <SubpageHero
        eyebrow={locale === "ko" ? "찾아오시는길" : "Directions"}
        title={dict.directions.title}
        description={dict.directions.body}
        tone="directions"
        backgroundImageUrl="/subpage-contact-bg.png"
        backgroundOpacity={0.9}
      />
      <ContactSubnav locale={locale} activeHref="/contact/directions" />
      <div className="container subpageContent">
        <DirectionsContent locale={locale} />
      </div>
    </div>
  );
}
