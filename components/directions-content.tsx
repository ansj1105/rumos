type DirectionsContentProps = {
  locale: string;
};

const address = "서울특별시 금천구 가산디지털 1로 19 대륭테크노타운 18차 1306호";
const encodedAddress = encodeURIComponent(address);
const googleMapEmbedUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=17&ie=UTF8&iwloc=B&output=embed`;
const googleMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
const kakaoMapUrl = `https://map.kakao.com/link/search/${encodedAddress}`;

export function DirectionsContent({ locale }: DirectionsContentProps) {
  return (
    <div className="pageBody twoCol">
      <div className="card directionsInfoCard">
        <div className="stack">
          <strong>{locale === "ko" ? "Address" : "Address"}</strong>
          <span>08594 {address}</span>
          <strong>{locale === "ko" ? "Contact" : "Contact"}</strong>
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
      <div className="card directionsMapCard">
        <iframe
          title={locale === "ko" ? "루모스 오시는 길 지도" : "Lumos directions map"}
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
