import { SubpageHero } from "@/components/subpage-hero";
import { getPageHeroConfig } from "@/lib/content";
import type { Locale } from "@/lib/site";

const distributorMarkers = [
  { id: "korea", label: "Korea", latitude: 37.5665, longitude: 126.978 },
  { id: "asia", label: "Asia", latitude: 1.3521, longitude: 103.8198 },
  { id: "europe", label: "Europe", latitude: 50.1109, longitude: 8.6821 },
  { id: "north-america", label: "North America", latitude: 37.7749, longitude: -122.4194 },
] as const;

function getMercatorPosition(latitude: number, longitude: number) {
  const clampedLatitude = Math.max(Math.min(latitude, 85), -85);
  const latitudeRadians = (clampedLatitude * Math.PI) / 180;
  const x = ((longitude + 180) / 360) * 100;
  const y = ((1 - Math.log(Math.tan(latitudeRadians) + 1 / Math.cos(latitudeRadians)) / Math.PI) / 2) * 100;

  return { x, y };
}

export default async function DistributorsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const isKo = locale === "ko";
  const heroConfig = await getPageHeroConfig("contact-distributors");
  const googleMapEmbedUrl = `https://www.google.com/maps?output=embed&ll=22,15&z=2&hl=${locale}`;

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
            <div className="distributorWorldMap">
              <iframe
                className="distributorMapFrame"
                src={googleMapEmbedUrl}
                title={isKo ? "대리점 위치 Google 지도" : "Distributor locations Google map"}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="distributorMarkerLayer" aria-hidden="true">
                {distributorMarkers.map((marker) => {
                  const position = getMercatorPosition(marker.latitude, marker.longitude);

                  return (
                    <span
                      key={marker.id}
                      className="distributorMapMarker"
                      style={{
                        left: `${position.x}%`,
                        top: `${position.y}%`,
                      }}
                      title={marker.label}
                    />
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
