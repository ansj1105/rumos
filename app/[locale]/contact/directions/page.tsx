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
  const eyebrowKo =
    heroConfig?.eyebrowKo === "찾아오시는길"
      ? "찾아오시는 길"
      : heroConfig?.eyebrowKo || "찾아오시는 길";
  const titleKo =
    heroConfig?.titleKo === "찾아오시는길"
      ? "찾아오시는 길"
      : heroConfig?.titleKo || dict.directions.title;

  return (
    <div className="subpageShell">
      <SubpageHero
        eyebrow={locale === "ko" ? eyebrowKo : heroConfig?.eyebrowEn || "Directions"}
        title={locale === "ko" ? titleKo : heroConfig?.titleEn || dict.directions.title}
        description={locale === "ko" ? heroConfig?.descriptionKo || dict.directions.body : heroConfig?.descriptionEn || dict.directions.body}
        tone="directions"
        backgroundImageUrl={heroConfig?.backgroundImageUrl || "/subpage-contact-bg.png"}
        backgroundOpacity={heroConfig?.backgroundOpacity ?? 0.9}
        lightText
      />
      {/* <ContactSubnav locale={locale} activeHref="/contact/directions" /> */}
      <div className="container subpageContent">
        <DirectionsContent locale={locale} />
      </div>
    </div>
  );
}
