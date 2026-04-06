import {
  deleteResource,
  saveInquiryReply,
  saveResource,
  sendInquiryReply,
  updateInquiryStatus,
} from "@/app/admin/actions";
import { AdminApplicationsTabs } from "@/components/admin-applications-tabs";
import { AdminHomeTabs } from "@/components/admin-home-tabs";
import { AdminProductsTabs } from "@/components/admin-products-tabs";
import { siteUrl } from "@/lib/site";

function dateValue(value: Date) {
  return value.toISOString().slice(0, 10);
}

export function AdminSectionCard({
  id,
  title,
  description,
  children,
}: {
  id?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="lumosAdminSectionCard">
      <div className="lumosAdminSectionHead">
        <div>
          <h2>{title}</h2>
          {description ? <p>{description}</p> : null}
        </div>
      </div>
      {children}
    </section>
  );
}

export function HomeAdminSection({
  siteConfig,
  pageHeroConfigs,
}: {
  siteConfig: {
    id: number;
    heroTitleKo: string;
    heroTitleEn: string;
    heroDescriptionKo: string;
    heroDescriptionEn: string;
    heroImageUrl: string | null;
    heroFontSize: number;
    storyTitleKo: string;
    storyTitleEn: string;
    storyBodyKo: string;
    storyBodyEn: string;
    storyFontSize: number;
    seriesTitleKo: string;
    seriesTitleEn: string;
    seriesLeadKo: string;
    seriesLeadEn: string;
    seoTitleKo: string;
    seoTitleEn: string;
    seoDescriptionKo: string;
    seoDescriptionEn: string;
    heroImageHistory: Array<{ id: number; imageUrl: string; createdAt: Date }>;
  };
  pageHeroConfigs: Array<{
    id: number;
    pageKey: string;
    eyebrowKo: string;
    eyebrowEn: string;
    titleKo: string;
    titleEn: string;
    descriptionKo: string;
    descriptionEn: string;
    backgroundImageUrl: string | null;
    backgroundOpacity: number;
  }>;
}) {
  return <AdminHomeTabs siteConfig={siteConfig} pageHeroConfigs={pageHeroConfigs} />;
}

export function ApplicationsAdminSection({
  applications,
}: {
  applications: Array<{
    id: number;
    slug: string;
    sortOrder: number;
    titleKo: string;
    titleEn: string;
    summaryKo: string;
    summaryEn: string;
    bulletsKo: unknown;
    bulletsEn: unknown;
    imageUrl: string | null;
    published: boolean;
  }>;
}) {
  return <AdminApplicationsTabs applications={applications} />;
}

export function ProductsAdminSection({
  products,
}: {
  products: Array<{
    id: number;
    slug: string;
    displayOrder: number;
    nameKo: string;
    nameEn: string;
    heroEyebrowKo: string | null;
    heroEyebrowEn: string | null;
    heroTitleKo: string | null;
    heroTitleEn: string | null;
    heroLeadKo: string | null;
    heroLeadEn: string | null;
    heroBgImageUrl: string | null;
    heroBgOpacity: number | null;
    summaryKo: string;
    summaryEn: string;
    contentKo: string;
    contentEn: string;
    featuresKo: unknown;
    featuresEn: unknown;
    applicationsKo: unknown;
    applicationsEn: unknown;
    specsKo: unknown;
    specsEn: unknown;
    imageUrl: string | null;
    seoTitleKo: string | null;
    seoTitleEn: string | null;
    seoDescriptionKo: string | null;
    seoDescriptionEn: string | null;
    published: boolean;
  }>;
}) {
  return <AdminProductsTabs products={products} />;
}

export function ResourcesAdminSection({
  resources,
}: {
  resources: Array<{
    id: number;
    slug: string;
    displayIndex: number;
    titleKo: string;
    titleEn: string;
    excerptKo: string;
    excerptEn: string;
    bodyKo: string;
    bodyEn: string;
    fileUrl: string | null;
    publishedAt: Date;
    published: boolean;
  }>;
}) {
  return (
    <div className="lumosAdminStack">
      <AdminSectionCard title="자료 목록" description="현재 등록된 자료를 순번 기준으로 빠르게 확인하고 이동할 수 있습니다.">
        <div className="lumosAdminDirectoryList">
          {resources.map((resource) => (
            <div key={resource.id} className="lumosAdminDirectoryItem">
              <div className="lumosAdminDirectoryPrimary">
                <strong>{String(resource.displayIndex).padStart(2, "0")}</strong>
                <div className="lumosAdminDirectoryCopy">
                  <span>{resource.titleKo}</span>
                  <small>{resource.slug}</small>
                </div>
              </div>
              <div className="lumosAdminDirectoryActions">
                <a
                  href={`${siteUrl}/ko/contact/resources/${resource.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="lumosAdminGhostButton"
                >
                  프론트 미리보기
                </a>
                <a href={`#resource-editor-${resource.id}`} className="lumosAdminGhostButton">
                  편집 이동
                </a>
              </div>
            </div>
          ))}
        </div>
      </AdminSectionCard>

      {resources.map((resource) => (
        <AdminSectionCard
          key={resource.id}
          id={`resource-editor-${resource.id}`}
          title={resource.titleKo}
          description={resource.slug}
        >
          <form action={saveResource} className="lumosAdminForm">
            <input type="hidden" name="id" value={resource.id} />
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Slug</span>
                <input name="slug" defaultValue={resource.slug} />
              </label>
              <label className="field">
                <span>Display Index</span>
                <input name="displayIndex" type="number" defaultValue={resource.displayIndex} />
              </label>
              <label className="field">
                <span>Published Date</span>
                <input name="publishedAt" type="date" defaultValue={dateValue(resource.publishedAt)} />
              </label>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Title KO</span>
                <input name="titleKo" defaultValue={resource.titleKo} />
              </label>
              <label className="field">
                <span>Title EN</span>
                <input name="titleEn" defaultValue={resource.titleEn} />
              </label>
              <label className="field">
                <span>File URL</span>
                <input name="fileUrl" defaultValue={resource.fileUrl ?? ""} />
              </label>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Excerpt KO</span>
                <textarea name="excerptKo" defaultValue={resource.excerptKo} />
              </label>
              <label className="field">
                <span>Excerpt EN</span>
                <textarea name="excerptEn" defaultValue={resource.excerptEn} />
              </label>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Body KO</span>
                <textarea name="bodyKo" defaultValue={resource.bodyKo} />
              </label>
              <label className="field">
                <span>Body EN</span>
                <textarea name="bodyEn" defaultValue={resource.bodyEn} />
              </label>
            </div>
            <div className="lumosAdminActionRow">
              <label className="lumosAdminCheckbox">
                <input type="checkbox" name="published" defaultChecked={resource.published} />
                <span>노출</span>
              </label>
              <div className="lumosAdminActionRowEnd">
                <a
                  href={`${siteUrl}/ko/contact/resources/${resource.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="lumosAdminGhostButton"
                >
                  프론트 미리보기
                </a>
                <button type="submit" className="lumosAdminPrimaryButton">
                  자료 저장
                </button>
              </div>
            </div>
          </form>
          <form action={deleteResource} className="lumosAdminInlineForm">
            <input type="hidden" name="id" value={resource.id} />
            <button type="submit" className="lumosAdminDangerButton">
              삭제
            </button>
          </form>
        </AdminSectionCard>
      ))}

      <AdminSectionCard title="새 자료 등록">
        <form action={saveResource} className="lumosAdminForm">
          <div className="lumosAdminFormGrid">
            <label className="field">
              <span>Slug</span>
              <input name="slug" placeholder="new-resource" />
            </label>
            <label className="field">
              <span>Display Index</span>
              <input name="displayIndex" type="number" defaultValue={resources.length + 1} />
            </label>
            <label className="field">
              <span>Published Date</span>
              <input name="publishedAt" type="date" defaultValue={dateValue(new Date())} />
            </label>
          </div>
          <div className="lumosAdminFormGrid">
            <label className="field">
              <span>Title KO</span>
              <input name="titleKo" />
            </label>
            <label className="field">
              <span>Title EN</span>
              <input name="titleEn" />
            </label>
            <label className="field">
              <span>File URL</span>
              <input name="fileUrl" />
            </label>
          </div>
          <div className="lumosAdminFormGrid">
            <label className="field">
              <span>Excerpt KO</span>
              <textarea name="excerptKo" />
            </label>
            <label className="field">
              <span>Excerpt EN</span>
              <textarea name="excerptEn" />
            </label>
          </div>
          <div className="lumosAdminFormGrid">
            <label className="field">
              <span>Body KO</span>
              <textarea name="bodyKo" />
            </label>
            <label className="field">
              <span>Body EN</span>
              <textarea name="bodyEn" />
            </label>
          </div>
          <label className="lumosAdminCheckbox">
            <input type="checkbox" name="published" defaultChecked />
            <span>노출</span>
          </label>
          <button type="submit" className="lumosAdminPrimaryButton">
            자료 생성
          </button>
        </form>
      </AdminSectionCard>
    </div>
  );
}

export function InquiriesAdminSection({
  inquiries,
}: {
  inquiries: Array<{
    id: number;
    company: string | null;
    name: string;
    email: string;
    phone: string | null;
    message: string;
    locale: string;
    status: string;
    internalNote: string | null;
    replySubject: string | null;
    replyBody: string | null;
    replySentAt: Date | null;
    createdAt: Date;
  }>;
}) {
  return (
    <div className="lumosAdminStack">
      {inquiries.map((inquiry) => (
        <AdminSectionCard
          key={inquiry.id}
          title={`${inquiry.name} / ${inquiry.email}`}
          description={`${inquiry.createdAt.toLocaleString("ko-KR")} · ${inquiry.status}`}
        >
          <div className="lumosAdminInquiryMeta">
            <div><strong>회사명</strong><span>{inquiry.company || "-"}</span></div>
            <div><strong>연락처</strong><span>{inquiry.phone || "-"}</span></div>
            <div><strong>언어</strong><span>{inquiry.locale}</span></div>
            <div><strong>답변 발송</strong><span>{inquiry.replySentAt ? inquiry.replySentAt.toLocaleString("ko-KR") : "미발송"}</span></div>
          </div>
          <div className="lumosAdminInquiryBody">{inquiry.message}</div>
          <form action={saveInquiryReply} className="lumosAdminForm">
            <input type="hidden" name="id" value={inquiry.id} />
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Status</span>
                <select name="status" defaultValue={inquiry.status}>
                  <option value="RECEIVED">RECEIVED</option>
                  <option value="REVIEWING">REVIEWING</option>
                  <option value="REPLIED">REPLIED</option>
                </select>
              </label>
              <label className="field">
                <span>Reply Subject</span>
                <input name="replySubject" defaultValue={inquiry.replySubject ?? ""} />
              </label>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Internal Note</span>
                <textarea name="internalNote" defaultValue={inquiry.internalNote ?? ""} />
              </label>
              <label className="field">
                <span>Reply Body</span>
                <textarea name="replyBody" defaultValue={inquiry.replyBody ?? ""} />
              </label>
            </div>
            <div className="lumosAdminActionRow">
              <button type="submit" className="lumosAdminPrimaryButton">
                답변 저장
              </button>
            </div>
          </form>
          <div className="lumosAdminInlineActions">
            <form action={updateInquiryStatus} className="lumosAdminInlineForm">
              <input type="hidden" name="id" value={inquiry.id} />
              <input type="hidden" name="status" value="REVIEWING" />
              <button type="submit" className="lumosAdminGhostButton">
                검토중으로 변경
              </button>
            </form>
            <form action={sendInquiryReply} className="lumosAdminInlineForm">
              <input type="hidden" name="id" value={inquiry.id} />
              <button type="submit" className="lumosAdminPrimaryButton">
                실제 답장 메일 발송
              </button>
            </form>
          </div>
        </AdminSectionCard>
      ))}
    </div>
  );
}
