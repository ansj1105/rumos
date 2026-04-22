import { HomeSeriesOverview } from "@/components/home-series-overview";
import { HomeStorySection, type StoryHighlightItem } from "@/components/home-story-section";
import { PatentSection } from "@/components/patent-section";
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
    "LUMOS:";
  const storyDisplayLines =
    locale === "ko" ? ["브랜드 어원 :", "루모스"] : ["Brand Origin :", "LUMOS"];
  const storySource = (locale === "ko" ? config?.storyBodyKo : config?.storyBodyEn) ?? dict.story.body;
  const storyParagraphs = storySource
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const storyHighlights: StoryHighlightItem[] =
    locale === "ko"
      ? [
          {
            key: "vision",
            label: "Vision",
            title: "비전",
            body: "Trusting LASER Light through LUMOS",
          },
          {
            key: "goal",
            label: "Goal",
            title: "목표",
            body: "The Trusted Standard for Laser Beam Measurement",
          },
        ]
      : [
          {
            key: "vision",
            label: "Vision",
            title: "Vision",
            body: "Trusting LASER Light through LUMOS",
          },
          {
            key: "goal",
            label: "Goal",
            title: "Goal",
            body: "The Trusted Standard for Laser Beam Measurement",
          },
        ];
  const patentSection =
    locale === "ko"
      ? {
          title: "Certification",
          lead: "LUMOS의 광학·레이저 계측 역량을 뒷받침하는 핵심 특허 및 인증 구조입니다.",
          more: "더보기 +",
          cards: [
            {
              type: "Certification",
              title: "레이저 광학 시스템",
              summary: "광학 경로 구성과 정밀 계측 시스템 구현에 관한 핵심 특허 문서",
              date: "10-2932994",
              href: `/${locale}/contact/resources/patent-10-2932994-laser-optical-system`,
            },
            {
              type: "Certification",
              title: "레이저 빔 성형장치",
              summary: "빔 프로파일 제어와 공정 정밀도 향상에 관한 특허 문서",
              date: "10-2946121",
              href: `/${locale}/contact/resources/patent-10-2946121-laser-beam-shaping-device`,
            },
            {
              type: "Certification",
              title: "레이저 광학장치",
              summary: "광학 안정성과 레이저 계측 구조를 다루는 특허 문서",
              date: "10-2948666",
              href: `/${locale}/contact/resources/patent-10-2948666-laser-optical-device`,
            },
            {
              type: "Certification",
              title: "기술인증증빙",
              summary: "특허 10-2077732호 및 10-2243189호 관련 인증 증빙 문서",
              date: "Certification",
              href: `/${locale}/contact/resources/cert-10-2077732-10-2243189`,
            },
            {
              type: "Certification",
              title: "레이저가공장치",
              summary: "레이저 기반 가공 공정 및 장비 구현 구조에 관한 특허 문서",
              date: "10-2077732",
              href: `/${locale}/contact/resources/patent-10-2077732-laser-processing-device`,
            },
            {
              type: "Certification",
              title: "진공빔프로파일링장치",
              summary: "진공 환경에서의 빔 특성 측정과 분석을 위한 특허 문서",
              date: "10-2243189",
              href: `/${locale}/contact/resources/patent-10-2243189-vacuum-beam-profiling-device`,
            },
          ],
        }
      : {
          title: "Certification",
          lead: "A reference section for the patents and certifications behind LUMOS optical and laser metrology capabilities.",
          more: "More +",
          cards: [
            {
              type: "Certification",
              title: "Laser Optical System",
              summary: "Core patent document covering optical path configuration and precision metrology system design",
              date: "10-2932994",
              href: `/${locale}/contact/resources/patent-10-2932994-laser-optical-system`,
            },
            {
              type: "Certification",
              title: "Laser Beam Shaping Device",
              summary: "Patent document for beam profile control and improved process precision",
              date: "10-2946121",
              href: `/${locale}/contact/resources/patent-10-2946121-laser-beam-shaping-device`,
            },
            {
              type: "Certification",
              title: "Laser Optical Device",
              summary: "Patent document covering laser optical device architecture and measurement stability",
              date: "10-2948666",
              href: `/${locale}/contact/resources/patent-10-2948666-laser-optical-device`,
            },
            {
              type: "Certification",
              title: "Technical Certification",
              summary: "Supporting certification document for patents 10-2077732 and 10-2243189",
              date: "Certification",
              href: `/${locale}/contact/resources/cert-10-2077732-10-2243189`,
            },
            {
              type: "Certification",
              title: "Laser Processing Device",
              summary: "Patent document for laser-based processing equipment structure",
              date: "10-2077732",
              href: `/${locale}/contact/resources/patent-10-2077732-laser-processing-device`,
            },
            {
              type: "Certification",
              title: "Vacuum Beam Profiling Device",
              summary: "Patent document for beam measurement and profile analysis in vacuum environments",
              date: "10-2243189",
              href: `/${locale}/contact/resources/patent-10-2243189-vacuum-beam-profiling-device`,
            },
          ],
        };
  return (
    <>
      <Hero locale={locale} heroImageUrl={config?.heroImageUrl} />
      <HomeStorySection
        brandOriginTitle={brandOriginTitle}
        storyDisplayLines={storyDisplayLines}
        storyParagraphs={storyParagraphs}
        storyFontSize={config?.storyFontSize}
        storyHighlights={storyHighlights}
      />

      <HomeSeriesOverview
        locale={locale}
        title={locale === "ko" ? config?.seriesTitleKo : config?.seriesTitleEn}
        lead={locale === "ko" ? config?.seriesLeadKo : config?.seriesLeadEn}
        products={products}
      />

      <PatentSection
        title={patentSection.title}
        lead={patentSection.lead}
        moreLabel={patentSection.more}
        moreHref={`/${locale}/contact/resources`}
        cards={patentSection.cards}
      />
    </>
  );
}
