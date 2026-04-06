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

  return (
    <div className="contactPage">
      <SubpageHero
        eyebrow={locale === "ko" ? heroConfig?.eyebrowKo || "견적문의" : heroConfig?.eyebrowEn || "Quote Request"}
        title={locale === "ko" ? heroConfig?.titleKo || "견적문의" : heroConfig?.titleEn || "Quote Request"}
        description={locale === "ko"
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
          <ContactForm locale={locale} />
        </div>
      </div>
    </div>
  );
}
