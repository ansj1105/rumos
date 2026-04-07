import { HomeSeriesOverview } from "@/components/home-series-overview";
import { Hero } from "@/components/hero";
import { getProducts, getSiteConfig } from "@/lib/content";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/site";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const [config, products] = await Promise.all([getSiteConfig(), getProducts()]);
  const brandOriginTitle =
    locale === "ko" ? "브랜드 어원 : 루모스" : "Brand Origin : Rumos";
  const legacyStoryTitles = new Set([
    "산업 현장과 공정 목적에 맞춘 광학 설계",
    "Optical engineering aligned with industrial processes",
    "LUMOS 이름 어원",
    "Origin of the name LUMOS",
    "LUMOS : 브랜드 어원",
    "The Origin of LUMOS",
  ]);
  const configuredStoryTitle = locale === "ko" ? config?.storyTitleKo : config?.storyTitleEn;
  const storyTitle =
    configuredStoryTitle && !legacyStoryTitles.has(configuredStoryTitle)
      ? configuredStoryTitle
      : brandOriginTitle;
  const storySource = (locale === "ko" ? config?.storyBodyKo : config?.storyBodyEn) ?? dict.story.body;
  const storyParagraphs = storySource
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const storyClosing =
    locale === "ko"
      ? "진정한 레이저 성능은 외형이 아니라 정확한 측정으로 정의됩니다. LUMOS는 고도화된 빔 프로파일링을 통해 사용자가 성능을 명확하게 평가할 수 있도록 돕고, 정밀 계측 분야의 새로운 기준을 제시합니다."
      : "True laser performance is defined by accurate measurement, not just appearance. LUMOS empowers users to evaluate performance with clarity through advanced beam profiling and aims to set a new standard in precision metrology.";
  const relationContent =
    locale === "ko"
      ? {
          eyebrow: "Relationship | SHINHOTEK",
          title: "신호택과의 관계",
          body:
            "루모스는 신호택이 축적해 온 광학·레이저 응용 경험을 바탕으로, 레이저 빔 측정과 정밀 광학 솔루션에 집중해 전개하는 브랜드입니다. 신호택의 산업 네트워크와 기술 기반 위에서 루모스는 빔 프로파일링과 계측 중심의 제품 경험을 더 선명하게 전달합니다.",
          button: "이동하기",
        }
      : {
          eyebrow: "Relationship | SHINHOTEK",
          title: "Relation to SHINHOTEK",
          body:
            "LUMOS is presented as a focused brand built on SHINHOTEK's optics and laser application experience, with a clearer emphasis on beam measurement and precision optical solutions. On top of SHINHOTEK's industrial network and technical foundation, LUMOS sharpens the product experience around beam profiling and metrology.",
          button: "Visit SHINHOTEK",
        };

  return (
    <>
      <Hero
        locale={locale}
        heroTitle={locale === "ko" ? config?.heroTitleKo : config?.heroTitleEn}
        heroDescription={
          locale === "ko" ? config?.heroDescriptionKo : config?.heroDescriptionEn
        }
        heroImageUrl={config?.heroImageUrl}
        heroFontSize={config?.heroFontSize}
      />

      <section id="storySection" className="storySection">
        <div className="container storyInner">
          <div className="storyLeadBlock">
            <h2 className="storyDisplayTitle">
              {storyTitle}
            </h2>
          </div>
          <div className="storyContent">
            <span className="storyEyebrow">{brandOriginTitle}</span>
            <div className="storyParagraphs">
              {storyParagraphs.map((paragraph, index) => (
                <p
                  key={`${index}-${paragraph.slice(0, 24)}`}
                  className="storyParagraph"
                  style={config?.storyFontSize ? { fontSize: `${config.storyFontSize}px` } : undefined}
                >
                  {paragraph}
                </p>
              ))}
              <p
                className="storyParagraph storyParagraphEmphasis"
                style={config?.storyFontSize ? { fontSize: `${config.storyFontSize}px` } : undefined}
              >
                {storyClosing}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="storyRelationSection">
        <div className="container storyRelationCard">
          <div className="storyRelationCopy">
            <span className="storyEyebrow">{relationContent.eyebrow}</span>
            <h3 className="storyRelationTitle">{relationContent.title}</h3>
            <p className="storyRelationBody">{relationContent.body}</p>
          </div>
          <a
            className="button primary storyRelationLink"
            href="https://www.shinhotek.com/"
            target="_blank"
            rel="noreferrer"
          >
            {relationContent.button}
          </a>
        </div>
      </section>

      <HomeSeriesOverview
        locale={locale}
        title={locale === "ko" ? config?.seriesTitleKo : config?.seriesTitleEn}
        lead={locale === "ko" ? config?.seriesLeadKo : config?.seriesLeadEn}
        products={products}
      />
    </>
  );
}
