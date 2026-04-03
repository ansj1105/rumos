import { HomeSeriesOverview } from "@/components/home-series-overview";
import { Hero } from "@/components/hero";
import { getSiteConfig } from "@/lib/content";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/site";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const config = await getSiteConfig();
  const storySource = (locale === "ko" ? config?.storyBodyKo : config?.storyBodyEn) ?? dict.story.body;
  const storyParagraphs = storySource
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const storyClosing =
    locale === "ko"
      ? "진정한 레이저 성능은 외형이 아니라 정확한 측정으로 정의됩니다. LUMOS는 고도화된 빔 프로파일링을 통해 사용자가 성능을 명확하게 평가할 수 있도록 돕고, 정밀 계측 분야의 새로운 기준을 제시합니다."
      : "True laser performance is defined by accurate measurement, not just appearance. LUMOS empowers users to evaluate performance with clarity through advanced beam profiling and aims to set a new standard in precision metrology.";

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

      <section className="storySection">
        <div className="container storyInner">
          <div className="storyLeadBlock">
            <h2 className="storyDisplayTitle">
              {locale === "ko" ? "LUMOS : 브랜드 어원" : "The Origin of LUMOS"}
            </h2>
          </div>
          <div className="storyContent">
            <span className="storyEyebrow">
              {locale === "ko" ? "Brand Origin | LUMOS" : "Brand Origin | LUMOS"}
            </span>
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

      <HomeSeriesOverview locale={locale} />
    </>
  );
}
