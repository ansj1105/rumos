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
  const isKo = locale === "ko";

  if (!resource || !resource.published) {
    notFound();
  }

  const title = isKo ? resource.titleKo : resource.titleEn;
  const excerpt = isKo ? resource.excerptKo : resource.excerptEn;
  const body = isKo ? resource.bodyKo : resource.bodyEn;
  const createdAtLabel = new Date(resource.createdAt).toLocaleDateString(isKo ? "ko-KR" : "en-US");
  const authorLabel = isKo ? "LUMOS" : "LUMOS";
  const attachmentName = resource.fileUrl
    ? decodeURIComponent(resource.fileUrl.split("/").pop() ?? resource.fileUrl)
    : null;
  const hasPdfPreview = resource.fileUrl?.toLowerCase().endsWith(".pdf") ?? false;

  return (
    <div className="resourcesPage">
      <SubpageHero
        eyebrow={isKo ? "자료 상세" : "Resource Detail"}
        title={title}
        description={excerpt}
        tone="resources"
        backgroundImageUrl="/subpage-contact-bg.png"
        lightText
      />
      <ContactSubnav locale={locale} activeHref="/contact/resources" />
      <div className="container subpageContent">
        <div className="resourceDetailLayout pageBody">
          <section className="resourceDetailSummary">
            <div className="resourceDetailTitleBlock">
              <strong>{isKo ? "제목" : "Title"}</strong>
              <h2 className="resourceDetailTitle">{title}</h2>
            </div>
            <div className="resourceDetailMetaLine">
              <div className="resourceMetaInline">
                <strong>{isKo ? "작성자" : "Author"}</strong>
                <span>{authorLabel}</span>
              </div>
              <div className="resourceMetaInline">
                <strong>{isKo ? "작성일시" : "Published"}</strong>
                <span>{createdAtLabel}</span>
              </div>
            </div>
          </section>

          <section className="resourceDetailContentCard resourceDetailContentMain">
            <div className="resourceDetailSectionHead">
              <strong>{isKo ? "내용" : "Content"}</strong>
            </div>
            <div className="resourceDetailBody">
              {hasPdfPreview ? (
                <div className="resourcePreviewPanel">
                  <iframe
                    src={`${resource.fileUrl}#view=FitH`}
                    title={attachmentName ?? title}
                    className="resourcePreviewFrame"
                  />
                </div>
              ) : null}
              <p style={{ margin: 0, lineHeight: 1.9 }}>{body}</p>
            </div>
          </section>

          <section className="resourceDetailContentCard">
            <div className="resourceDetailSectionHead">
              <strong>{isKo ? "첨부파일" : "Attachment"}</strong>
            </div>
            <div className="resourceAttachmentBox">
              {resource.fileUrl ? (
                <>
                  <strong className="resourceAttachmentName">{attachmentName}</strong>
                  <a href={resource.fileUrl} target="_blank" rel="noreferrer" className="button secondary">
                    {isKo ? "파일 다운로드" : "Download File"}
                  </a>
                </>
              ) : (
                <span>{isKo ? "첨부된 파일이 없습니다." : "No file attached."}</span>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
