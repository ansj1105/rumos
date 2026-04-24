import { HomeSeriesOverview } from "@/components/home-series-overview";
import { HomeStorySection, type StoryHighlightItem } from "@/components/home-story-section";
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
  const brandOriginTitle = "LUMOS:";
  const storyDisplayLines =
    locale === "ko" ? ["\uBE0C\uB79C\uB4DC \uC5B4\uC6D0 :", "\uB8E8\uBAA8\uC2A4"] : ["Brand Origin :", "LUMOS"];
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
            title: "\uBE44\uC804",
            body: "Trusting LASER Light through LUMOS",
          },
          {
            key: "goal",
            label: "Goal",
            title: "\uBAA9\uD45C",
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

      {/* Patent section disabled on the home page */}
    </>
  );
}
