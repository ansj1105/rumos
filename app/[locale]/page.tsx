import { HomeSeriesOverview } from "@/components/home-series-overview";
import { Hero } from "@/components/hero";
import { StoryHighlightCard } from "@/components/story-highlight-card";
import { getProducts, getSiteConfig } from "@/lib/content";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/site";

type StoryHighlightItem = {
  key: "light" | "precision" | "mission";
  label: string;
  title: string;
  body: string;
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const [config, products] = await Promise.all([getSiteConfig(), getProducts()]);
  const brandOriginTitle =
    locale === "ko" ? "Brand Origin : LUMOS" : "Brand Origin : LUMOS";
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
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const storyHighlights: StoryHighlightItem[] =
    locale === "ko"
      ? [
          {
            key: "light",
            label: "Lumen",
            title: "빛의 어원",
            body: "LUMOS의 이름은 빛의 본질을 정밀하게 읽어내겠다는 출발점에서 시작되었습니다.",
          },
          {
            key: "precision",
            label: "Precision",
            title: "정밀 측정",
            body: "광학과 레이저 계측에서 필요한 정확도와 반복성을 브랜드의 핵심 가치로 삼습니다.",
          },
          {
            key: "mission",
            label: "Mission",
            title: "측정의 사명",
            body: "빛을 더 명확하게 이해하고 공정 해석을 더 선명하게 만드는 장비 경험을 지향합니다.",
          },
        ]
      : [
          {
            key: "light",
            label: "Lumen",
            title: "Origin of Light",
            body: "The LUMOS name starts from the idea of reading the essence of light with clarity and discipline.",
          },
          {
            key: "precision",
            label: "Precision",
            title: "Measured Accuracy",
            body: "Precision and repeatability in optical and laser metrology define the core value of the brand.",
          },
          {
            key: "mission",
            label: "Mission",
            title: "Purpose of Measurement",
            body: "We aim to make light easier to understand and industrial process analysis more reliable.",
          },
        ];
  const patentSection =
    locale === "ko"
      ? {
          title: "Patent & Certification",
          lead: "LUMOS의 광학·레이저 계측 역량을 뒷받침하는 핵심 특허 및 인증 구조입니다.",
          more: "더보기 +",
          cards: [
            {
              type: "Patent",
              title: "레이저 빔 측정 장치",
              summary: "정밀 계측 기반의 빔 형상 분석과 공정 재현성 확보를 위한 핵심 구조 특허",
              date: "2024.05.21",
              accent: true,
            },
            {
              type: "Patent",
              title: "광학 신호 정렬 보정 기술",
              summary: "센서 정합성과 반복 측정 안정도를 높이기 위한 보정 로직 관련 출원 구조",
              date: "2024.01.18",
            },
            {
              type: "Certification",
              title: "산업용 광학 모듈 인증",
              summary: "현장 적용성과 신뢰성 확보를 위한 성능 및 품질 검증 항목 정리",
              date: "2023.11.02",
            },
            {
              type: "IP Portfolio",
              title: "정밀 광학 설계 자산화",
              summary: "핵심 공정 기술과 설계 노하우를 포트폴리오 형태로 축적하는 구조",
              date: "2023.08.14",
            },
          ],
        }
      : {
          title: "Patent & Certification",
          lead: "A reference section for the patents and certifications behind LUMOS optical and laser metrology capabilities.",
          more: "More +",
          cards: [
            {
              type: "Patent",
              title: "Laser Beam Measurement Device",
              summary: "Core patent structure for beam-shape analysis and process repeatability in precision metrology",
              date: "2024.05.21",
              accent: true,
            },
            {
              type: "Patent",
              title: "Optical Signal Alignment Calibration",
              summary: "Filed structure focused on calibration logic for sensor alignment and stable repeated measurements",
              date: "2024.01.18",
            },
            {
              type: "Certification",
              title: "Industrial Optical Module Certification",
              summary: "Structured around performance and quality verification for reliable field deployment",
              date: "2023.11.02",
            },
            {
              type: "IP Portfolio",
              title: "Precision Optical Design Assets",
              summary: "A portfolio structure that accumulates key process know-how and optical design assets",
              date: "2023.08.14",
            },
          ],
        };
  return (
    <>
      <Hero locale={locale} heroImageUrl={config?.heroImageUrl} />

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
            </div>
            <div className="storyHighlightGrid">
              {storyHighlights.map((item) => (
                <StoryHighlightCard
                  key={item.key}
                  iconKey={item.key}
                  label={item.label}
                  title={item.title}
                  body={item.body}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="patentSection">
        <div className="container patentInner">
          <div className="patentHead">
            <div>
              <h2 className="sectionTitle patentTitle">{patentSection.title}</h2>
              <p className="sectionLead patentLead">{patentSection.lead}</p>
            </div>
            <a className="patentMoreLink" href={`/${locale}/contact/resources`}>
              {patentSection.more}
            </a>
          </div>

          <div className="patentGrid">
            {patentSection.cards.map((item) => (
              <article key={`${item.type}-${item.title}`} className={`patentCard ${item.accent ? "isAccent" : ""}`}>
                <span className="patentCardType">{item.type}</span>
                <h3 className="patentCardTitle">{item.title}</h3>
                <p className="patentCardSummary">{item.summary}</p>
                <div className="patentCardFoot">
                  <span className="patentCardDate">{item.date}</span>
                  <span className="patentCardIcon" aria-hidden="true" />
                </div>
              </article>
            ))}
          </div>
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
