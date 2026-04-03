import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactSubnav } from "@/components/contact-subnav";
import { SubpageHero } from "@/components/subpage-hero";
import { getResourceBySlug } from "@/lib/content";
import type { Locale } from "@/lib/site";
import { siteUrl } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const resource = await getResourceBySlug(slug);

  if (!resource) {
    return {};
  }

  const title = locale === "ko" ? resource.titleKo : resource.titleEn;
  const description = locale === "ko" ? resource.excerptKo : resource.excerptEn;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${locale}/contact/resources/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `${siteUrl}/${locale}/contact/resources/${slug}`,
    },
  };
}

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const resource = await getResourceBySlug(slug);

  if (!resource || !resource.published) {
    notFound();
  }

  return (
    <div className="resourcesPage">
      <SubpageHero
        eyebrow={locale === "ko" ? "자료 상세" : "Resource Detail"}
        title={locale === "ko" ? resource.titleKo : resource.titleEn}
        description={locale === "ko" ? resource.excerptKo : resource.excerptEn}
        tone="resources"
        backgroundImageUrl="/subpage-contact-bg.png"
        lightText
      />
      <ContactSubnav locale={locale} activeHref="/contact/resources" />
      <div className="container subpageContent">
        <div className="resourceDetailHead">
          <span>{new Date(resource.createdAt).toLocaleDateString(locale === "ko" ? "ko-KR" : "en-US")}</span>
          {resource.fileUrl ? (
            <a href={resource.fileUrl} target="_blank" rel="noreferrer" className="button secondary">
              {locale === "ko" ? "다운로드" : "Download"}
            </a>
          ) : null}
        </div>
        <div className="resourceDetailBody pageBody">
          <p style={{ margin: 0, lineHeight: 1.9 }}>
            {locale === "ko" ? resource.bodyKo : resource.bodyEn}
          </p>
        </div>
      </div>
    </div>
  );
}
