import { SubpageHero } from "@/components/subpage-hero";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/site";

const address = "서울특별시 금천구 가산디지털 1로 19 대륭테크노타운 18차 1306호";
const encodedAddress = encodeURIComponent(address);
const googleMapEmbedUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=17&ie=UTF8&iwloc=B&output=embed`;
const googleMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
const kakaoMapUrl = `https://map.kakao.com/link/search/${encodedAddress}`;

export default async function DirectionsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <div className="subpageShell">
      <SubpageHero
        eyebrow="Directions"
        title={dict.directions.title}
        description={dict.directions.body}
        tone="directions"
      />
      <div className="container subpageContent">
        <div className="pageBody twoCol">
          <div className="card" style={{ padding: 28 }}>
            <div className="stack">
              <strong>Address</strong>
              <span>08594 {address}</span>
              <strong>Contact</strong>
              <span>T. 02-852-0533</span>
              <span>F. 02-853-0537</span>
              <div className="buttonRow" style={{ marginTop: 10 }}>
                <a href={googleMapUrl} target="_blank" rel="noreferrer" className="button secondary">
                  Google Maps
                </a>
                <a href={kakaoMapUrl} target="_blank" rel="noreferrer" className="button secondary">
                  Kakao Map
                </a>
              </div>
            </div>
          </div>
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <iframe
              title={locale === "ko" ? "루모스 오시는 길 지도" : "Rumos directions map"}
              src={googleMapEmbedUrl}
              width="100%"
              height="420"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
