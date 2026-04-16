import Link from "next/link";

import { ContactSubnav } from "@/components/contact-subnav";
import { ContactForm } from "@/components/forms/contact-form";
import { SubpageHero } from "@/components/subpage-hero";
import { getPageHeroConfig } from "@/lib/content";
import type { Locale } from "@/lib/site";

const inquiryTopics = {
  consultationSales: {
    labelKo: "상담 및 견적 문의",
    labelEn: "Consultation & Quotation",
    titleKo: "상담 및 견적 문의",
    titleEn: "Consultation & Quotation",
    descriptionKo:
      "제품 적용 가능 여부 검토부터 견적, 구매 조건, 납기 협의까지 상담 및 견적 관련 문의를 접수합니다.\nT : +82-02-852-0533\nM : Sales@lumosity.co.kr",
    descriptionEn:
      "Use this for product fit review, quotations, purchasing conditions, and delivery discussions.\nT : +82-02-852-0533\nM : Sales@lumosity.co.kr",
  },
  supportRma: {
    labelKo: "지원 & RMA",
    labelEn: "Support & RMA",
    titleKo: "지원 & RMA",
    titleEn: "Support & RMA",
    descriptionKo:
      "설치 이후 운용 지원, 기술 점검, 장애 대응, 수리 및 RMA 진행 관련 문의를 접수합니다.\nM : Technical@shinhotek.com",
    descriptionEn:
      "Use this for operational support after installation, technical inspection, troubleshooting, repair, and RMA requests.\nM : Technical@shinhotek.com",
  },
} as const;

export default async function QuotePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams?: Promise<{ topic?: string }>;
}) {
  const { locale } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const heroConfig = await getPageHeroConfig("contact-quote");
  const isKo = locale === "ko";
  const selectedTopic =
    resolvedSearchParams?.topic && resolvedSearchParams.topic in inquiryTopics
      ? (resolvedSearchParams.topic as keyof typeof inquiryTopics)
      : "consultationSales";
  const activeTopic = inquiryTopics[selectedTopic];
  const introTitle = isKo ? activeTopic.titleKo : activeTopic.titleEn;
  const introDescription = isKo ? activeTopic.descriptionKo : activeTopic.descriptionEn;

  return (
    <div className="contactPage">
      <SubpageHero
        eyebrow={isKo ? "문의하기" : "Contact Us"}
        title={isKo ? "문의하기" : "Contact Us"}
        description={isKo
          ? heroConfig?.descriptionKo || "적용 목적과 요청 내용을 남겨주시면 검토 후 적합한 담당자가 안내드립니다."
          : heroConfig?.descriptionEn || "Share your application and request, and the right team will follow up with you."}
        tone="contact"
        backgroundImageUrl={heroConfig?.backgroundImageUrl || "/subpage-contact-bg.png"}
        backgroundOpacity={heroConfig?.backgroundOpacity ?? 0.9}
        lightText
      />
      <ContactSubnav locale={locale} activeHref="/contact/quote" />
      <div className="container subpageContent">
        <div className="contactIntro">
          <div className="contactInfoRow">
            <strong>{isKo ? "문의하기" : "Contact Us"}</strong>
            <span>
              {isKo
                ? "선택하시면 해당 목적에 맞는 내용으로 접수됩니다."
                : "Select the inquiry path below and submit the form for the right team."}
            </span>
          </div>
        </div>
        <div className="pageBody">
          <section className="contactDirectSection">
            <div className="contactDirectHead">
              <strong>{isKo ? "문의 유형 선택" : "Choose Your Inquiry Path"}</strong>
              <p>
                {isKo
                  ? "목적에 맞는 항목을 선택하면 아래 폼이 해당 문의로 접수됩니다."
                  : "Choose the option that matches your purpose. The form below will be submitted under that request type."}
              </p>
            </div>
            <div className="contactDirectGrid">
              {(Object.entries(inquiryTopics) as Array<
                [keyof typeof inquiryTopics, (typeof inquiryTopics)[keyof typeof inquiryTopics]]
              >).map(([key, topic]) => (
                <Link
                  key={key}
                  href={`/${locale}/contact/quote?topic=${key}`}
                  className={`contactDirectCard ${selectedTopic === key ? "isActive" : ""}`}
                >
                  <strong>{isKo ? topic.titleKo : topic.titleEn}</strong>
                  <p>{isKo ? topic.descriptionKo : topic.descriptionEn}</p>
                </Link>
              ))}
            </div>
            <div className="contactDirectNotice">
              {isKo
                ? "상담시간 7:00~16:00(KST)"
                : "Hours 7:00~16:00 (KST)"}
            </div>
          </section>
          <div className="contactFormCaption">
            <strong>{introTitle}</strong>
            <p>{introDescription}</p>
          </div>
          <ContactForm locale={locale} inquiryType={introTitle} />
        </div>
      </div>
    </div>
  );
}
