import { ContactSubnav } from "@/components/contact-subnav";
import Link from "next/link";

import { SubpageHero } from "@/components/subpage-hero";
import { getPageHeroConfig, getResources } from "@/lib/content";
import type { Locale } from "@/lib/site";

export default async function ResourceListPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const [resources, heroConfig] = await Promise.all([
    getResources(),
    getPageHeroConfig("contact-resources"),
  ]);
  const eyebrow = locale === "ko" ? heroConfig?.eyebrowKo || "자료실" : heroConfig?.eyebrowEn || "Resources";
  const title = locale === "ko" ? heroConfig?.titleKo || "자료실" : heroConfig?.titleEn || "Resource Library";
  const description = locale === "ko"
    ? heroConfig?.descriptionKo || "자료실 게시물과 다운로드 자료를 제공합니다."
    : heroConfig?.descriptionEn || "Browse resource posts and downloadable reference materials.";

  return (
    <div className="resourcesPage">
      <SubpageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        tone="resources"
        backgroundImageUrl={heroConfig?.backgroundImageUrl || "/subpage-contact-bg.png"}
        backgroundOpacity={heroConfig?.backgroundOpacity ?? 0.9}
        lightText
      />
      <ContactSubnav locale={locale} activeHref="/contact/resources" />
      <div className="container subpageContent">
        <div className="resourcesTableWrap">
          <div className="resourcesTableHead">
            <span>No.</span>
            <span>{locale === "ko" ? "제목" : "Title"}</span>
            <span>{locale === "ko" ? "등록일" : "Date"}</span>
          </div>
          <div className="resourcesTableBody">
            {resources.map((resource, index) => (
              <Link
                key={resource.slug}
                href={`/${locale}/contact/resources/${resource.slug}`}
                className="resourcesRow"
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span className="resourcesRowTitle">
                  {locale === "ko" ? resource.titleKo : resource.titleEn}
                </span>
                <span>{new Date(resource.publishedAt ?? resource.createdAt).toLocaleDateString(locale === "ko" ? "ko-KR" : "en-US")}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
