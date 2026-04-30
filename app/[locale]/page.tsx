import { HomeSeriesOverview } from "@/components/home-series-overview";
import { HomeStorySection } from "@/components/home-story-section";
import { Hero } from "@/components/hero";
import { getProducts, getSiteConfig } from "@/lib/content";
import type { Locale } from "@/lib/site";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const [config, products] = await Promise.all([getSiteConfig(), getProducts()]);
  const brandOriginTitle = locale === "ko" ? "브랜드 어원 : 루모스" : "Brand Origin: LUMOS";
  const storyDisplayLines = ["The Origin", "of LUMOS"];
  const storyParagraphs = [
    "LUMOS comes from the Latin 'Lumen' (Light). It represents our mission to capture the true essence of light through precise measurement. We deliver trusted precision for optics and laser beam analysis.",
    "True laser performance is defined by accurate measurement, not just appearance. LUMOS empowers users to evaluate performance with clarity through advanced beam profiling. Our goal is to set the new industry standard in precision metrology.",
  ];

  return (
    <>
      <Hero locale={locale} heroImageUrl={config?.heroImageUrl} />
      <HomeStorySection
        brandOriginTitle={brandOriginTitle}
        storyDisplayLines={storyDisplayLines}
        storyParagraphs={storyParagraphs}
        storyFontSize={config?.storyFontSize}
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
