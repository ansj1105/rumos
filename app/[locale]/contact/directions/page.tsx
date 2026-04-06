import { ContactSubnav } from "@/components/contact-subnav";
import { DirectionsContent } from "@/components/directions-content";
import { getPageHeroConfig } from "@/lib/content";
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
  const heroConfig = await getPageHeroConfig("contact-directions");

  return (
    <div className="subpageShell">
      <SubpageHero
        eyebrow={locale === "ko" ? heroConfig?.eyebrowKo || "찾아오시는길" : heroConfig?.eyebrowEn || "Directions"}
        title={locale === "ko" ? heroConfig?.titleKo || dict.directions.title : heroConfig?.titleEn || dict.directions.title}
        description={locale === "ko" ? heroConfig?.descriptionKo || dict.directions.body : heroConfig?.descriptionEn || dict.directions.body}
        tone="directions"
        backgroundImageUrl={heroConfig?.backgroundImageUrl || "/subpage-contact-bg.png"}
        backgroundOpacity={heroConfig?.backgroundOpacity ?? 0.9}
        lightText
      />
      <ContactSubnav locale={locale} activeHref="/contact/directions" />
      <div className="container subpageContent">
        <DirectionsContent locale={locale} />
      </div>
    </div>
  );
}
