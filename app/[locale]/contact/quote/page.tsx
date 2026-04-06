import { ContactSubnav } from "@/components/contact-subnav";
import { ContactForm } from "@/components/forms/contact-form";
import { SubpageHero } from "@/components/subpage-hero";
import { getPageHeroConfig } from "@/lib/content";
import type { Locale } from "@/lib/site";

export default async function QuotePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const heroConfig = await getPageHeroConfig("contact-quote");
  const isKo = locale === "ko";

  return (
    <div className="contactPage">
      <SubpageHero
        eyebrow={isKo ? heroConfig?.eyebrowKo || "견적문의" : heroConfig?.eyebrowEn || "Quote Request"}
        title={isKo ? heroConfig?.titleKo || "견적문의" : heroConfig?.titleEn || "Quote Request"}
        description={isKo
          ? heroConfig?.descriptionKo || "필요한 제품군과 적용 공정, 요청 조건을 남겨주시면 검토 후 안내드립니다."
          : heroConfig?.descriptionEn || "Share the product line, process conditions, and requirements for a tailored quotation."}
        tone="contact"
        backgroundImageUrl={heroConfig?.backgroundImageUrl || "/subpage-contact-bg.png"}
        backgroundOpacity={heroConfig?.backgroundOpacity ?? 0.9}
        lightText
      />
      <ContactSubnav locale={locale} activeHref="/contact/quote" />
      <div className="container subpageContent">
        <div className="contactIntro">
          <div className="contactInfoRow">
            <strong>{locale === "ko" ? "Quotation Form" : "Quotation Form"}</strong>
            <span>
              {locale === "ko"
                ? "적용 장비, 공정 조건, 요청 수량 등 필요한 정보를 함께 남겨주세요."
                : "Please include equipment type, process conditions, and required quantity."}
            </span>
          </div>
        </div>
        <div className="pageBody">
          <section className="contactDirectSection">
            <div className="contactDirectHead">
              <strong>{isKo ? "Direct Contact" : "Direct Contact"}</strong>
              <p>
                {isKo
                  ? "긴급 문의나 기본 상담이 필요하시면 아래 연락처로 바로 연락하실 수 있습니다."
                  : "For urgent requests or initial consultation, you can reach Lumos directly using the details below."}
              </p>
            </div>
            <div className="contactDirectGrid">
              <article className="contactDirectCard">
                <span>{isKo ? "Phone" : "Phone"}</span>
                <strong>02-852-0533</strong>
                <p>{isKo ? "평일 기준 제품 문의 및 기술 상담" : "Weekday sales and technical consultation"}</p>
              </article>
              <article className="contactDirectCard">
                <span>{isKo ? "Email" : "Email"}</span>
                <strong>sales@lumosity.co.kr</strong>
                <p>{isKo ? "견적, 제품 자료, 협업 문의 접수" : "Quotations, product 자료 requests, and collaboration inquiries"}</p>
              </article>
              <article className="contactDirectCard">
                <span>{isKo ? "Headquarter" : "Headquarter"}</span>
                <strong>{isKo ? "서울 금천구 가산디지털 1로 19" : "19 Gasan digital 1-ro, Geumcheon-gu, Seoul"}</strong>
                <p>{isKo ? "대륭테크노타운 18차 1306호" : "Daerung Techno Town-18, #1306"}</p>
              </article>
            </div>
            <div className="contactDirectNotice">
              {isKo
                ? "평일 기준 상담시간 08:00 - 17:00 (KST)"
                : "Consultation hours: Weekdays 08:00 - 17:00 (KST)"}
            </div>
          </section>
          <ContactForm locale={locale} />
        </div>
      </div>
    </div>
  );
}
