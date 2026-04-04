import { ContactSubnav } from "@/components/contact-subnav";
import { SubpageHero } from "@/components/subpage-hero";
import type { Locale } from "@/lib/site";

export default async function DistributorsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const isKo = locale === "ko";

  const overviewItems = isKo
    ? [
        {
          label: "운영 안내",
          value: "국내외 파트너 및 대리점 정보를 순차적으로 확장할 수 있도록 구성된 안내 페이지입니다.",
        },
        {
          label: "문의 접수",
          value: "제품 판매, 기술 협업, 지역 파트너십 문의는 견적문의 페이지를 통해 접수할 수 있습니다.",
        },
      ]
    : [
        {
          label: "Overview",
          value: "This page is structured to expand domestic and global distributor information over time.",
        },
        {
          label: "Inquiry Route",
          value: "Sales, technical collaboration, and regional partnership inquiries can be submitted through the quote page.",
        },
      ];

  const supportAreas = isKo
    ? [
        "지역별 판매 파트너 정보 정리",
        "제품군별 대응 가능 대리점 안내",
        "기술 지원 및 협업 창구 분리",
      ]
    : [
        "Regional sales partner information",
        "Distributor availability by product line",
        "Separated channels for technical support and collaboration",
      ];

  const placeholders = isKo
    ? [
        { region: "Korea", status: "준비중", note: "국내 판매 및 기술 대응 파트너 정보가 추가될 예정입니다." },
        { region: "Asia", status: "준비중", note: "아시아권 파트너 및 공급 채널 정보가 추가될 예정입니다." },
        { region: "Global", status: "준비중", note: "해외 대리점 및 협력 네트워크 정보가 추가될 예정입니다." },
      ]
    : [
        { region: "Korea", status: "Coming Soon", note: "Domestic sales and technical support partner information will be added here." },
        { region: "Asia", status: "Coming Soon", note: "Partner and supply channel information for Asia will be added here." },
        { region: "Global", status: "Coming Soon", note: "Global distributor and partner network information will be added here." },
      ];

  return (
    <div className="contactPage">
      <SubpageHero
        eyebrow={isKo ? "대리점소개" : "Distributors"}
        title={isKo ? "대리점소개" : "Distributor Information"}
        description={
          isKo
            ? "Lumos 제품의 국내외 공급 및 협력 파트너 구성을 안내드립니다."
            : "Find information about Lumos distribution channels and partner expansion."}
        tone="contact"
        backgroundImageUrl="/subpage-contact-bg.png"
        lightText
      />
      <ContactSubnav locale={locale} activeHref="/contact/distributors" />
      <div className="container subpageContent">
        <div className="pageBody">
          <div className="distributorLayout">
            <section className="distributorSection">
              <div className="distributorSectionHead">
                <span className="eyebrow">{isKo ? "Overview" : "Overview"}</span>
                <h2>{isKo ? "대리점 및 파트너 안내 구조" : "Partner and Distributor Structure"}</h2>
              </div>
              <div className="distributorOverviewGrid">
                {overviewItems.map((item) => (
                  <div key={item.label} className="distributorOverviewCard">
                    <strong>{item.label}</strong>
                    <p>{item.value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="distributorSection">
              <div className="distributorSectionHead">
                <span className="eyebrow">{isKo ? "Support Scope" : "Support Scope"}</span>
                <h2>{isKo ? "향후 안내될 지원 범위" : "Planned Support Coverage"}</h2>
              </div>
              <ul className="distributorBulletList">
                {supportAreas.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="distributorSection">
              <div className="distributorSectionHead">
                <span className="eyebrow">{isKo ? "Directory" : "Directory"}</span>
                <h2>{isKo ? "등록 예정 대리점 정보" : "Distributor Directory Placeholder"}</h2>
                <p>
                  {isKo
                    ? "추후 실제 대리점 데이터가 추가되면 아래 영역에 지역, 담당 범위, 연락처를 그대로 확장할 수 있습니다."
                    : "When actual distributor data is added later, this area can be extended with region, coverage, and contact details."}
                </p>
              </div>
              <div className="distributorDirectory">
                {placeholders.map((item) => (
                  <article key={item.region} className="distributorDirectoryCard">
                    <div className="distributorDirectoryMeta">
                      <strong>{item.region}</strong>
                      <span>{item.status}</span>
                    </div>
                    <p>{item.note}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="distributorSection distributorCtaSection">
              <div className="distributorSectionHead">
                <span className="eyebrow">{isKo ? "Contact" : "Contact"}</span>
                <h2>{isKo ? "파트너 문의 접수" : "Partnership Inquiry"}</h2>
              </div>
              <div className="distributorContactBox">
                <p>
                  {isKo
                    ? "판매 및 기술 협업 문의는 견적문의 페이지를 통해 접수해 주세요. 실제 대리점 정보가 추가되기 전까지는 본사에서 직접 안내드립니다."
                    : "Please submit sales and technical collaboration inquiries through the quote page. Until distributor data is added, Lumos headquarters will respond directly."}
                </p>
                <div className="distributorContactMeta">
                  <span>T. 02-852-0533</span>
                  <span>E. sales@lumosity.co.kr</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
