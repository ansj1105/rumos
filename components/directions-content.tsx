"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type DirectionsContentProps = {
  locale: string;
};

type LocationItem = {
  id: "hq" | "rd" | "factory";
  labelKo: string;
  labelEn: string;
  addressKo: string;
  addressEn: string;
  query: string;
  latitude?: number;
  longitude?: number;
};

const locations: LocationItem[] = [
  {
    id: "hq",
    labelKo: "본사",
    labelEn: "Head Office",
    addressKo: "서울특별시 금천구 가산디지털1로 19 대륭테크노타운 18차 1306호, 08594",
    addressEn: "1306, Daerung Techno Town-18, 19 Gasan digital 1-ro, Geumcheon-gu, Seoul, 08594, Korea",
    query: "37.467837,126.886559",
    latitude: 37.467837,
    longitude: 126.886559,
  },
  {
    id: "rd",
    labelKo: "R&D Center",
    labelEn: "R&D Center",
    addressKo: "서울특별시 금천구 가산디지털1로 19 대륭테크노타운 18차 1307호, 08594",
    addressEn: "1307, Daerung Techno Town-18, 19 Gasan digital 1-ro, Geumcheon-gu, Seoul, 08594, Korea",
    query: "37.467837,126.886559",
    latitude: 37.467837,
    longitude: 126.886559,
  },
  {
    id: "factory",
    labelKo: "Factory",
    labelEn: "Factory",
    addressKo: "서울특별시 금천구 가산디지털1로 58 1609호, 1010호, 08591",
    addressEn: "1609, 1010, 58, Gasan digital 1-ro, Geumcheon-gu, Seoul, 08591, Korea",
    query: "37.471434,126.886417",
    latitude: 37.471434,
    longitude: 126.886417,
  },
];

export function DirectionsContent({ locale }: DirectionsContentProps) {
  const isKo = locale === "ko";
  const [activeLocationId, setActiveLocationId] = useState<LocationItem["id"]>("hq");

  const activeLocation = useMemo(
    () => locations.find((location) => location.id === activeLocationId) ?? locations[0],
    [activeLocationId],
  );

  const encodedQuery = encodeURIComponent(activeLocation.query);
  const googleMapEmbedUrl = `https://www.google.com/maps?output=embed&q=${encodedQuery}&z=17`;
  const googleMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;
  const kakaoMapUrl =
    activeLocation.latitude && activeLocation.longitude
      ? `https://map.kakao.com/link/map/${encodeURIComponent(isKo ? activeLocation.labelKo : activeLocation.labelEn)},${activeLocation.latitude},${activeLocation.longitude}`
      : `https://map.kakao.com/link/search/${encodedQuery}`;

  return (
    <div className="pageBody twoCol">
      <div className="card directionsInfoCard">
        <div className="directionsInfoLayout">
          <div className="directionsCompanyImageWrap">
            <Image
              src="/contact/company-building.png"
              alt={isKo ? "LUMOS 사옥 전경" : "LUMOS building"}
              width={520}
              height={520}
              className="directionsCompanyImage"
            />
          </div>

          <div className="stack">
            <strong>{isKo ? "본사" : "Head Office"}</strong>
            <span>{isKo ? locations[0].addressKo : locations[0].addressEn}</span>

            {locations.slice(1).map((location) => (
              <div key={location.id} className="directionsLocationGroup">
                <strong>{isKo ? location.labelKo : location.labelEn}</strong>
                <span>{isKo ? location.addressKo : location.addressEn}</span>
              </div>
            ))}

            <div className="directionsLocationGroup">
              <strong>Contact</strong>
              <span>T. 02-852-0533</span>
              <span>F. 02-853-0537</span>
            </div>

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
      </div>

      <div className="card directionsMapCard">
        <iframe
          title={isKo ? "루모스 오시는 길 지도" : "Lumos directions map"}
          src={googleMapEmbedUrl}
          width="100%"
          className="directionsMapIframe"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        <div className="directionsMapTabs" role="tablist" aria-label={isKo ? "위치 선택" : "Select location"}>
          {locations.map((location) => (
            <button
              key={location.id}
              type="button"
              role="tab"
              aria-selected={location.id === activeLocationId}
              className={`directionsMapTab ${location.id === activeLocationId ? "isActive" : ""}`}
              onClick={() => setActiveLocationId(location.id)}
            >
              {isKo ? location.labelKo : location.labelEn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
