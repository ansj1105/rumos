import { ContactSubnav } from "@/components/contact-subnav";
import { SubpageHero } from "@/components/subpage-hero";
import type { Locale } from "@/lib/site";

export default async function DistributorsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <div className="contactPage">
      <SubpageHero
        eyebrow={locale === "ko" ? "대리점소개" : "Distributors"}
        title={locale === "ko" ? "대리점소개" : "Distributor Information"}
        description={
          locale === "ko"
            ? "Lumos 제품의 국내외 공급 및 협력 파트너 구성을 안내드립니다."
            : "Find information about Lumos distribution and partner channels."}
        tone="contact"
      />
      <ContactSubnav locale={locale} activeHref="/contact/distributors" />
      <div className="container subpageContent">
        <div className="pageBody">
          <div className="contactIntro">
            <div className="contactInfoRow">
              <strong>{locale === "ko" ? "Partner Network" : "Partner Network"}</strong>
              <span>
                {locale === "ko"
                  ? "국내외 판매 및 기술 협력 문의는 Contact Us 또는 견적문의 페이지를 통해 접수해 주세요."
                  : "For sales and technical partnership inquiries, please use Contact Us or the quote request page."}
              </span>
            </div>
            <div className="contactInfoRow">
              <strong>{locale === "ko" ? "Representative Contact" : "Representative Contact"}</strong>
              <span>T. 02-852-0533</span>
              <span>E. info@lumos.co.kr</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
