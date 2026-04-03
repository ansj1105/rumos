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
            <h2 className="sectionTitle">
              {locale === "ko" ? "LUMOS 이름 어원" : "Origin of the name LUMOS"}
            </h2>
          </div>
          <div className="storyContent">
            <p
              className="sectionLead"
              style={config?.storyFontSize ? { fontSize: `${config.storyFontSize}px` } : undefined}
            >
              {locale === "ko" ? config?.storyBodyKo : config?.storyBodyEn ?? dict.story.body}
            </p>
            <div className="storyFacts">
              <div className="storyFact">
                <strong>{locale === "ko" ? "Optical Control" : "Optical Control"}</strong>
                <span>
                  {locale === "ko"
                    ? "정렬, 검출, 측정 과정에서 필요한 광학 안정성과 반복 정밀도를 기반으로 공정 품질을 지원합니다."
                    : "Supports process quality through optical stability and repeatable precision across alignment, detection, and measurement workflows."}
                </span>
              </div>
              <div className="storyFact">
                <strong>{locale === "ko" ? "Industrial Use" : "Industrial Use"}</strong>
                <span>
                  {locale === "ko"
                    ? "반도체와 정밀 공정 환경에서 요구되는 검사 조건에 맞춰 장비, 소프트웨어, 운영 흐름을 함께 설계합니다."
                    : "Combines equipment, software, and operational flow for inspection conditions required by semiconductor and precision manufacturing environments."}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
