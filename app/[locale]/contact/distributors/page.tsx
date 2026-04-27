import { SubpageHero } from "@/components/subpage-hero";
import { getPageHeroConfig } from "@/lib/content";
import type { Locale } from "@/lib/site";

const distributorMarkers = [
  { id: "korea", label: "Korea", x: 80.2, y: 43.2 },
  { id: "asia", label: "Asia", x: 73.5, y: 56.5 },
  { id: "europe", label: "Europe", x: 50.6, y: 38.8 },
  { id: "north-america", label: "North America", x: 22.4, y: 43.4 },
] as const;

export default async function DistributorsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const isKo = locale === "ko";
  const heroConfig = await getPageHeroConfig("contact-distributors");

  return (
    <div className="contactPage distributorsPage">
      <SubpageHero
        eyebrow={isKo ? heroConfig?.eyebrowKo || "Distributors" : heroConfig?.eyebrowEn || "Distributors"}
        title={isKo ? heroConfig?.titleKo || "Distributors" : heroConfig?.titleEn || "Distributor Information"}
        description={isKo ? heroConfig?.descriptionKo || "" : heroConfig?.descriptionEn || ""}
        tone="contact"
        backgroundImageUrl={heroConfig?.backgroundImageUrl || "/subpage-contact-bg.png"}
        backgroundOpacity={heroConfig?.backgroundOpacity ?? 0.9}
        lightText
      />
      <div className="container subpageContent">
        <div className="pageBody distributorMapOnly">
          <section className="distributorMapSection" aria-label={isKo ? "대리점 위치 지도" : "Distributor location map"}>
            <div className="distributorWorldMap" aria-hidden="true">
              <svg viewBox="0 0 1200 620" role="img" focusable="false">
                <path d="M128 206l62-46 92-15 58 30 30 58-42 46-92 12-84-28-24-57Zm152 170 48-38 54 4 34 36-8 54-46 34-62-10-34-36 14-44Zm262-232 70-42 106 2 74 38 16 62-38 56-84 18-104-22-54-50 14-62Zm-48 190 80-36 122 12 76 48 10 72-54 58-104 14-106-34-54-58 30-76Zm344-104 80-52 110-2 58 42-8 58-74 38-106 0-70-34 10-50Zm112 130 90-22 72 28 30 60-40 56-90 16-86-28-36-54 60-56Zm-212 122 78-22 80 18 40 48-20 50-76 24-86-14-48-44 32-60Zm-428 28 68-20 62 24 22 52-32 42-70 4-58-32-18-42 24-28Z" />
                <path d="M84 286l48 8 26 34-20 36-56 4-34-30 4-36 32-16Zm888-182 54-24 72 10 40 36-16 36-66 8-62-18-22-48Zm-144 26 46-32 64 6 32 34-20 40-58 10-54-20-10-38Zm-56 392 40 18 10 42-32 28-46-8-22-34 10-34 40-12Z" />
              </svg>
              {distributorMarkers.map((marker) => (
                <span
                  key={marker.id}
                  className="distributorMapMarker"
                  style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                  title={marker.label}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
