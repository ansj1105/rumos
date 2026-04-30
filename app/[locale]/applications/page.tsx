import { ApplicationsIndexNav } from "@/components/applications-index-nav";
import { ApplicationImageRail } from "@/components/application-image-rail";
import { FadeImage } from "@/components/fade-image";
import { SubpageHero } from "@/components/subpage-hero";
import { applicationGalleryImages } from "@/lib/application-gallery";
import { getApplications, getPageHeroConfig } from "@/lib/content";
import { defaultApplications } from "@/lib/default-content";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/site";

export default async function ApplicationsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const [heroConfig, applications] = await Promise.all([
    getPageHeroConfig("applications"),
    getApplications(),
  ]);
  const applicationMap = new Map(applications.map((application) => [application.slug, application]));
  const applicationEntries = defaultApplications.map((entry) => {
    const source = applicationMap.get(entry.slug);
    return {
      slug: entry.slug,
      titleKo: source?.titleKo ?? entry.titleKo,
      titleEn: source?.titleEn ?? entry.titleEn,
      imageUrl: source?.imageUrl ?? entry.imageUrl ?? "",
      bodyKo: source?.summaryKo ?? entry.summaryKo,
      bodyEn: source?.summaryEn ?? entry.summaryEn,
      galleryImages: applicationGalleryImages[entry.slug] ?? [],
    };
  });

  return (
    <div className="applicationsPage">
      <SubpageHero
        eyebrow={locale === "ko" ? heroConfig?.eyebrowKo || "APPLICATION" : heroConfig?.eyebrowEn || "APPLICATION"}
        title={locale === "ko" ? heroConfig?.titleKo || dict.applications.title : heroConfig?.titleEn || dict.applications.title}
        description={locale === "ko" ? heroConfig?.descriptionKo || dict.applications.lead : heroConfig?.descriptionEn || dict.applications.lead}
        tone="applications"
        backgroundImageUrl={heroConfig?.backgroundImageUrl || "/subpage-applications-bg.png"}
        backgroundOpacity={heroConfig?.backgroundOpacity ?? 0.6}
      />
      {/* <ApplicationsIndexNav locale={locale} items={applicationEntries} /> */}

      <div className="applicationsBody applicationsBodyShowcase">
        <div className="container applicationsShowcase">
          {applicationEntries.map((entry) => (
            <section key={entry.slug} id={entry.slug} className="applicationShowcaseRow">
              <div className="applicationShowcaseMedia">
                <FadeImage
                  src={entry.imageUrl}
                  alt={locale === "ko" ? entry.titleKo : entry.titleEn}
                  width={960}
                  height={720}
                  sizes="(max-width: 960px) 100vw, 46vw"
                  className="applicationShowcaseImage"
                  skeletonClassName="applicationShowcaseSkeleton"
                />
              </div>
              <div className="applicationShowcaseBody">
                <h2 className="applicationShowcaseTitle">
                  {locale === "ko" ? entry.titleKo : entry.titleEn}
                </h2>
                <p className="applicationShowcaseText">
                  {locale === "ko" ? entry.bodyKo : entry.bodyEn}
                </p>
              </div>
              <ApplicationImageRail
                images={entry.galleryImages}
                title={locale === "ko" ? entry.titleKo : entry.titleEn}
              />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
