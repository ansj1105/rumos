import Link from "next/link";
import { ContactForm } from "@/components/forms/contact-form";
import { SubpageHero } from "@/components/subpage-hero";
import { getPageHeroConfig } from "@/lib/content";
import type { Locale } from "@/lib/site";

const inquiryTopics = {
  consultationSales: {
    titleKo: "상담 및 견적 문의",
    titleEn: "Consultation & Quotation",
    contacts: ["T : +82-02-852-0533", "M : Sales@lumosity.co.kr"],
  },
  supportRma: {
    titleKo: "지원 & RMA",
    titleEn: "Support & RMA",
    contacts: ["M : Technical@shinhotek.com"],
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
      {/* <ContactSubnav locale={locale} activeHref="/contact/quote" /> */}
      <div className="container subpageContent">
        <div className="pageBody">
          <section className="contactDirectSection">
            <div className="contactDirectHead">
              <strong>{isKo ? "문의 유형 선택" : "Choose Your Inquiry Path"}</strong>
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
                  <p>{topic.contacts.join("\n")}</p>
                </Link>
              ))}
            </div>
          </section>
          <ContactForm locale={locale} inquiryType={introTitle} />
        </div>
      </div>
    </div>
  );
}
