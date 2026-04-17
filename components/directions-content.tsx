type DirectionsContentProps = {
  locale: string;
};

const address = "서울특별시 금천구 가산디지털 1로 19 대륭테크노타운 18차 1306호";
const rdCenterAddress =
  "#1307 Daerung Techno Town-18, 19 Gasan digital 1-ro, Geumcheon-gu, Seoul, 08594, Korea";
const factoryAddress =
  "#1609, #1010, 58, Gasan digital 1-ro, Geumcheon-gu, Seoul, 08591, Korea";
const latitude = 37.467837;
const longitude = 126.886559;
const coordinates = `${latitude},${longitude}`;
const encodedCoordinates = encodeURIComponent(coordinates);
const googleMapEmbedUrl = `https://www.google.com/maps?output=embed&q=${encodedCoordinates}&z=17`;
const googleMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedCoordinates}`;
const kakaoMapUrl = `https://map.kakao.com/link/map/${encodeURIComponent("루모스")},${latitude},${longitude}`;

export function DirectionsContent({ locale }: DirectionsContentProps) {
  const isKo = locale === "ko";

  return (
    <div className="pageBody twoCol">
      <div className="card directionsInfoCard">
        <div className="stack">
          <strong>{isKo ? "주소" : "Address"}</strong>
          <span>08594 {address}</span>
          <strong>{isKo ? "연락처" : "Contact"}</strong>
          <span>T. 02-852-0533</span>
          <span>F. 02-853-0537</span>
          <div className="directionsLocationGroup">
            <strong>R&D Center</strong>
            <span>{rdCenterAddress}</span>
          </div>
          <div className="directionsLocationGroup">
            <strong>Factory</strong>
            <span>{factoryAddress}</span>
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
      <div className="card directionsMapCard">
        <iframe
          title={isKo ? "루모스 오시는 길 지도" : "Lumos directions map"}
          src={googleMapEmbedUrl}
          width="100%"
          className="directionsMapIframe"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
