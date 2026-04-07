import Link from "next/link";

import { ContactSubnav } from "@/components/contact-subnav";
import { ContactForm } from "@/components/forms/contact-form";
import { SubpageHero } from "@/components/subpage-hero";
import { getPageHeroConfig } from "@/lib/content";
import type { Locale } from "@/lib/site";

const inquiryTopics = {
  consultation: {
    labelKo: "상담 요청",
    labelEn: "Request a Consultation",
    titleKo: "Request a Consultation",
    titleEn: "Request a Consultation",
    descriptionKo: "적용 공정과 목표를 남겨주시면 제품 적합성과 대응 방향을 검토해 드립니다.",
    descriptionEn: "Share your process and objectives, and we will review fit and next steps.",
  },
  sales: {
    labelKo: "영업 문의",
    labelEn: "Contact Sales",
    titleKo: "Contact Sales",
    titleEn: "Contact Sales",
    descriptionKo: "제품 사양, 수량, 일정, 협업 범위 등 구매 관련 내용을 남겨주세요.",
    descriptionEn: "Use this for product specs, quantity, schedule, and commercial discussions.",
  },
  support: {
    labelKo: "지원 및 RMA",
    labelEn: "Support & RMA Request",
    titleKo: "Support & RMA Request",
    titleEn: "Support & RMA Request",
    descriptionKo: "설치, 운용, 장애 대응, 반품 및 RMA 요청과 관련된 내용을 남겨주세요.",
    descriptionEn: "Use this for installation, troubleshooting, service support, and RMA requests.",
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
      : "consultation";
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
                ? "아래 문의 유형을 선택하시면 해당 목적에 맞는 내용으로 접수됩니다."
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
                  ? "상담, 영업, 기술지원 중 목적에 맞는 항목을 선택하면 아래 폼이 해당 문의로 접수됩니다."
                  : "Choose consultation, sales, or support. The form below will be submitted under that request type."}
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
                  <span>{isKo ? topic.labelKo : topic.labelEn}</span>
                  <strong>{isKo ? topic.titleKo : topic.titleEn}</strong>
                  <p>{isKo ? topic.descriptionKo : topic.descriptionEn}</p>
                  <span className="contactDirectAction">
                    {selectedTopic === key
                      ? isKo
                        ? "선택됨"
                        : "Selected"
                      : isKo
                        ? "선택하기"
                        : "Select"}
                  </span>
                </Link>
              ))}
            </div>
            <div className="contactDirectNotice">
              {isKo
                ? "상담시간 08:00 - 17:00 (KST) · 대표전화 02-852-0533 · sales@lumosity.co.kr"
                : "Hours 08:00 - 17:00 (KST) · Tel. 02-852-0533 · sales@lumosity.co.kr"}
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
