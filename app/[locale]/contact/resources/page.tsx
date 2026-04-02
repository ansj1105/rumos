import Link from "next/link";

import { SubpageHero } from "@/components/subpage-hero";
import { getResources } from "@/lib/content";
import type { Locale } from "@/lib/site";

export default async function ResourceListPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const resources = await getResources();

  return (
    <div className="resourcesPage">
      <SubpageHero
        eyebrow="Resources"
        title="Resource Library"
        description="자료실 게시물과 다운로드 자료를 제공합니다."
        tone="resources"
      />
      <div className="container subpageContent">
        <div className="resourcesTableWrap">
          <div className="resourcesTableHead">
            <span>No.</span>
            <span>Title</span>
            <span>Date</span>
          </div>
          <div className="resourcesTableBody">
            {resources.map((resource) => (
              <Link
                key={resource.slug}
                href={`/${locale}/contact/resources/${resource.slug}`}
                className="resourcesRow"
              >
                <span>{String(resource.displayIndex ?? 0).padStart(2, "0")}</span>
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
