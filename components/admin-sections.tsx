import {
  deleteProduct,
  deleteResource,
  restoreHeroImage,
  saveApplication,
  saveInquiryReply,
  saveProduct,
  saveResource,
  sendInquiryReply,
  updateInquiryStatus,
  updateSiteConfig,
} from "@/app/admin/actions";
import { siteUrl } from "@/lib/site";

function textValue(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item))
      .join("\n");
  }

  return "";
}

function specValue(value: unknown) {
  if (!Array.isArray(value)) {
    return "";
  }

  return value
    .map((item) => {
      if (typeof item === "object" && item && "label" in item && "value" in item) {
        return `${String(item.label)}|${String(item.value)}`;
      }

      return "";
    })
    .filter(Boolean)
    .join("\n");
}

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
    seoTitleKo: string;
    seoTitleEn: string;
    seoDescriptionKo: string;
    seoDescriptionEn: string;
    heroImageHistory: Array<{ id: number; imageUrl: string; createdAt: Date }>;
  };
}) {
  const recentHistory = siteConfig.heroImageHistory.slice(0, 5);

  return (
    <div className="lumosAdminGrid">
      <AdminSectionCard
        title="Hero Section"
        description="배경 이미지 URL, 메인 카피, 폰트 크기를 관리합니다. 이미지 변경 이력은 최근 10개를 보관합니다."
      >
        <form action={updateSiteConfig} className="lumosAdminForm">
          <div className="lumosAdminFormGrid">
            <label className="field">
              <span>Hero Image URL</span>
              <input name="heroImageUrl" defaultValue={siteConfig.heroImageUrl ?? ""} />
            </label>
            <label className="field">
              <span>Hero Font Size</span>
              <input name="heroFontSize" type="number" min={28} max={90} defaultValue={siteConfig.heroFontSize} />
            </label>
            <label className="field">
              <span>Hero Title KO</span>
              <input name="heroTitleKo" defaultValue={siteConfig.heroTitleKo} />
            </label>
            <label className="field">
              <span>Hero Title EN</span>
              <input name="heroTitleEn" defaultValue={siteConfig.heroTitleEn} />
            </label>
          </div>
          <div className="lumosAdminFormGrid">
            <label className="field">
              <span>Hero Description KO</span>
              <textarea name="heroDescriptionKo" defaultValue={siteConfig.heroDescriptionKo} />
            </label>
            <label className="field">
              <span>Hero Description EN</span>
              <textarea name="heroDescriptionEn" defaultValue={siteConfig.heroDescriptionEn} />
            </label>
          </div>

          <div className="lumosAdminFormGrid">
            <label className="field">
              <span>Story Title KO</span>
              <input name="storyTitleKo" defaultValue={siteConfig.storyTitleKo} />
            </label>
            <label className="field">
              <span>Story Title EN</span>
              <input name="storyTitleEn" defaultValue={siteConfig.storyTitleEn} />
            </label>
            <label className="field">
              <span>Story Font Size</span>
              <input name="storyFontSize" type="number" min={14} max={36} defaultValue={siteConfig.storyFontSize} />
            </label>
          </div>
          <div className="lumosAdminFormGrid">
            <label className="field">
              <span>Story Body KO</span>
              <textarea name="storyBodyKo" defaultValue={siteConfig.storyBodyKo} />
            </label>
            <label className="field">
              <span>Story Body EN</span>
              <textarea name="storyBodyEn" defaultValue={siteConfig.storyBodyEn} />
            </label>
          </div>
          <div className="lumosAdminFormGrid">
            <label className="field">
              <span>SEO Title KO</span>
              <input name="seoTitleKo" defaultValue={siteConfig.seoTitleKo} />
            </label>
            <label className="field">
              <span>SEO Title EN</span>
              <input name="seoTitleEn" defaultValue={siteConfig.seoTitleEn} />
            </label>
          </div>
          <div className="lumosAdminFormGrid">
            <label className="field">
              <span>SEO Description KO</span>
              <textarea name="seoDescriptionKo" defaultValue={siteConfig.seoDescriptionKo} />
            </label>
            <label className="field">
              <span>SEO Description EN</span>
              <textarea name="seoDescriptionEn" defaultValue={siteConfig.seoDescriptionEn} />
            </label>
          </div>
          <button type="submit" className="lumosAdminPrimaryButton">
            메인 설정 저장
          </button>
        </form>
      </AdminSectionCard>

      <AdminSectionCard
        title="Hero Image History"
        description="최근 5개 변경 이력을 표시합니다. 전체 보관은 최대 10개입니다."
      >
        <div className="lumosAdminHistoryList">
          {recentHistory.length === 0 ? <p>아직 저장된 이력이 없습니다.</p> : null}
          {recentHistory.map((item) => (
            <div key={item.id} className="lumosAdminHistoryItem">
              <div>
                <strong>{item.imageUrl}</strong>
                <span>{item.createdAt.toLocaleString("ko-KR")}</span>
              </div>
              <form action={restoreHeroImage}>
                <input type="hidden" name="imageUrl" value={item.imageUrl} />
                <button type="submit" className="lumosAdminGhostButton">
                  적용
                </button>
              </form>
            </div>
          ))}
        </div>
      </AdminSectionCard>
    </div>
  );
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
  return (
    <div className="lumosAdminStack">
      {applications.map((application) => (
        <AdminSectionCard key={application.id} title={application.titleKo} description={application.slug}>
          <form action={saveApplication} className="lumosAdminForm">
            <div className="lumosAdminAssetPreview">
              <div className="lumosAdminAssetPreviewHead">
                <strong>Application Image</strong>
                <span>{application.imageUrl ? "연결됨" : "미연결"}</span>
              </div>
              <div className="lumosAdminAssetPreviewFrame">
                {application.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={application.imageUrl} alt={application.titleKo} className="lumosAdminAssetPreviewImage" />
                ) : (
                  <div className="lumosAdminAssetPreviewEmpty">No image connected</div>
                )}
              </div>
            </div>
            <div className="lumosAdminClientPreview">
              <div className="lumosAdminAssetPreviewHead">
                <strong>Client Page Preview</strong>
                <span>{`/ko/applications#${application.slug}`}</span>
              </div>
              <div className="lumosAdminClientPreviewFrame">
                <iframe
                  src={`${siteUrl}/ko/applications#${application.slug}`}
                  title={`${application.titleKo} preview`}
                  loading="lazy"
                  className="lumosAdminClientPreviewIframe"
                />
              </div>
            </div>
            <input type="hidden" name="id" value={application.id} />
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Slug</span>
                <input name="slug" defaultValue={application.slug} />
              </label>
              <label className="field">
                <span>Sort Order</span>
                <input name="sortOrder" type="number" defaultValue={application.sortOrder} />
              </label>
              <label className="field">
                <span>Image URL</span>
                <input name="imageUrl" defaultValue={application.imageUrl ?? ""} />
              </label>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Title KO</span>
                <input name="titleKo" defaultValue={application.titleKo} />
              </label>
              <label className="field">
                <span>Title EN</span>
                <input name="titleEn" defaultValue={application.titleEn} />
              </label>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Summary KO</span>
                <textarea name="summaryKo" defaultValue={application.summaryKo} />
              </label>
              <label className="field">
                <span>Summary EN</span>
                <textarea name="summaryEn" defaultValue={application.summaryEn} />
              </label>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Bullets KO</span>
                <textarea name="bulletsKo" defaultValue={textValue(application.bulletsKo)} />
              </label>
              <label className="field">
                <span>Bullets EN</span>
                <textarea name="bulletsEn" defaultValue={textValue(application.bulletsEn)} />
              </label>
            </div>
            <label className="lumosAdminCheckbox">
              <input type="checkbox" name="published" defaultChecked={application.published} />
              <span>노출</span>
            </label>
            <div className="lumosAdminActionRow">
              <a
                href={`${siteUrl}/ko/applications#${application.slug}`}
                target="_blank"
                rel="noreferrer"
                className="lumosAdminGhostButton"
              >
                프론트 미리보기
              </a>
              <button type="submit" className="lumosAdminPrimaryButton">
                Application 저장
              </button>
            </div>
          </form>
        </AdminSectionCard>
      ))}

      <AdminSectionCard title="새 Application 추가">
        <form action={saveApplication} className="lumosAdminForm">
          <div className="lumosAdminAssetPreview">
            <div className="lumosAdminAssetPreviewHead">
              <strong>Application Image</strong>
              <span>URL 입력 후 생성</span>
            </div>
            <div className="lumosAdminAssetPreviewFrame">
              <div className="lumosAdminAssetPreviewEmpty">Image preview will appear after save</div>
            </div>
          </div>
          <div className="lumosAdminFormGrid">
            <label className="field">
              <span>Slug</span>
              <input name="slug" placeholder="new-application" />
            </label>
            <label className="field">
              <span>Sort Order</span>
              <input name="sortOrder" type="number" defaultValue={99} />
            </label>
            <label className="field">
              <span>Image URL</span>
              <input name="imageUrl" />
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
          </div>
          <div className="lumosAdminFormGrid">
            <label className="field">
              <span>Summary KO</span>
              <textarea name="summaryKo" />
            </label>
            <label className="field">
              <span>Summary EN</span>
              <textarea name="summaryEn" />
            </label>
          </div>
          <div className="lumosAdminFormGrid">
            <label className="field">
              <span>Bullets KO</span>
              <textarea name="bulletsKo" />
            </label>
            <label className="field">
              <span>Bullets EN</span>
              <textarea name="bulletsEn" />
            </label>
          </div>
          <label className="lumosAdminCheckbox">
            <input type="checkbox" name="published" defaultChecked />
            <span>노출</span>
          </label>
          <button type="submit" className="lumosAdminPrimaryButton">
            Application 생성
          </button>
        </form>
      </AdminSectionCard>
    </div>
  );
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
  return (
    <div className="lumosAdminStack">
      {products.map((product) => (
        <AdminSectionCard key={product.id} title={product.nameKo} description={product.slug}>
          <form action={saveProduct} className="lumosAdminForm">
            <div className="lumosAdminClientPreview">
              <div className="lumosAdminAssetPreviewHead">
                <strong>Client Page Preview</strong>
                <span>{`/ko/products/${product.slug}`}</span>
              </div>
              <div className="lumosAdminClientPreviewFrame">
                <iframe
                  src={`${siteUrl}/ko/products/${product.slug}`}
                  title={`${product.nameKo} preview`}
                  loading="lazy"
                  className="lumosAdminClientPreviewIframe"
                />
              </div>
            </div>
            <input type="hidden" name="id" value={product.id} />
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Slug</span>
                <input name="slug" defaultValue={product.slug} />
              </label>
              <label className="field">
                <span>Display Order</span>
                <input name="displayOrder" type="number" defaultValue={product.displayOrder} />
              </label>
              <label className="field">
                <span>Image URL</span>
                <input name="imageUrl" defaultValue={product.imageUrl ?? ""} />
              </label>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Name KO</span>
                <input name="nameKo" defaultValue={product.nameKo} />
              </label>
              <label className="field">
                <span>Name EN</span>
                <input name="nameEn" defaultValue={product.nameEn} />
              </label>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Sub Hero Eyebrow KO</span>
                <input name="heroEyebrowKo" defaultValue={product.heroEyebrowKo ?? ""} />
              </label>
              <label className="field">
                <span>Sub Hero Eyebrow EN</span>
                <input name="heroEyebrowEn" defaultValue={product.heroEyebrowEn ?? ""} />
              </label>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Sub Hero Title KO</span>
                <input name="heroTitleKo" defaultValue={product.heroTitleKo ?? ""} />
              </label>
              <label className="field">
                <span>Sub Hero Title EN</span>
                <input name="heroTitleEn" defaultValue={product.heroTitleEn ?? ""} />
              </label>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Sub Hero Lead KO</span>
                <textarea name="heroLeadKo" defaultValue={product.heroLeadKo ?? ""} />
              </label>
              <label className="field">
                <span>Sub Hero Lead EN</span>
                <textarea name="heroLeadEn" defaultValue={product.heroLeadEn ?? ""} />
              </label>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Sub Hero BG Image URL</span>
                <input name="heroBgImageUrl" defaultValue={product.heroBgImageUrl ?? ""} />
              </label>
              <label className="field">
                <span>Sub Hero BG Opacity</span>
                <input
                  name="heroBgOpacity"
                  type="number"
                  min={0}
                  max={1}
                  step={0.05}
                  defaultValue={product.heroBgOpacity ?? 0.2}
                />
              </label>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Summary KO</span>
                <textarea name="summaryKo" defaultValue={product.summaryKo} />
              </label>
              <label className="field">
                <span>Summary EN</span>
                <textarea name="summaryEn" defaultValue={product.summaryEn} />
              </label>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Content KO</span>
                <textarea name="contentKo" defaultValue={product.contentKo} />
              </label>
              <label className="field">
                <span>Content EN</span>
                <textarea name="contentEn" defaultValue={product.contentEn} />
              </label>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Features KO</span>
                <textarea name="featuresKo" defaultValue={textValue(product.featuresKo)} />
              </label>
              <label className="field">
                <span>Features EN</span>
                <textarea name="featuresEn" defaultValue={textValue(product.featuresEn)} />
              </label>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Applications KO</span>
                <textarea name="applicationsKo" defaultValue={textValue(product.applicationsKo)} />
              </label>
              <label className="field">
                <span>Applications EN</span>
                <textarea name="applicationsEn" defaultValue={textValue(product.applicationsEn)} />
              </label>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Specs KO (label|value)</span>
                <textarea name="specsKo" defaultValue={specValue(product.specsKo)} />
              </label>
              <label className="field">
                <span>Specs EN (label|value)</span>
                <textarea name="specsEn" defaultValue={specValue(product.specsEn)} />
              </label>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>SEO Title KO</span>
                <input name="seoTitleKo" defaultValue={product.seoTitleKo ?? ""} />
              </label>
              <label className="field">
                <span>SEO Title EN</span>
                <input name="seoTitleEn" defaultValue={product.seoTitleEn ?? ""} />
              </label>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>SEO Description KO</span>
                <textarea name="seoDescriptionKo" defaultValue={product.seoDescriptionKo ?? ""} />
              </label>
              <label className="field">
                <span>SEO Description EN</span>
                <textarea name="seoDescriptionEn" defaultValue={product.seoDescriptionEn ?? ""} />
              </label>
            </div>
            <div className="lumosAdminActionRow">
              <label className="lumosAdminCheckbox">
                <input type="checkbox" name="published" defaultChecked={product.published} />
                <span>노출</span>
              </label>
              <div className="lumosAdminActionRowEnd">
                <a
                  href={`${siteUrl}/ko/products/${product.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="lumosAdminGhostButton"
                >
                  프론트 미리보기
                </a>
                <button type="submit" className="lumosAdminPrimaryButton">
                  Product 저장
                </button>
              </div>
            </div>
          </form>
          <form action={deleteProduct} className="lumosAdminInlineForm">
            <input type="hidden" name="id" value={product.id} />
            <button type="submit" className="lumosAdminDangerButton">
              삭제
            </button>
          </form>
        </AdminSectionCard>
      ))}

      <AdminSectionCard title="새 Product 추가" description="최대 10개까지 관리합니다.">
        <form action={saveProduct} className="lumosAdminForm">
          <div className="lumosAdminFormGrid">
            <label className="field">
              <span>Slug</span>
              <input name="slug" placeholder="new-product" />
            </label>
            <label className="field">
              <span>Display Order</span>
              <input name="displayOrder" type="number" defaultValue={products.length + 1} />
            </label>
            <label className="field">
              <span>Image URL</span>
              <input name="imageUrl" />
            </label>
          </div>
          <div className="lumosAdminFormGrid">
            <label className="field">
              <span>Name KO</span>
              <input name="nameKo" />
            </label>
            <label className="field">
              <span>Name EN</span>
              <input name="nameEn" />
            </label>
          </div>
          <div className="lumosAdminFormGrid">
            <label className="field">
              <span>Sub Hero Eyebrow KO</span>
              <input name="heroEyebrowKo" />
            </label>
            <label className="field">
              <span>Sub Hero Eyebrow EN</span>
              <input name="heroEyebrowEn" />
            </label>
          </div>
          <div className="lumosAdminFormGrid">
            <label className="field">
              <span>Sub Hero Title KO</span>
              <input name="heroTitleKo" />
            </label>
            <label className="field">
              <span>Sub Hero Title EN</span>
              <input name="heroTitleEn" />
            </label>
          </div>
          <div className="lumosAdminFormGrid">
            <label className="field">
              <span>Sub Hero Lead KO</span>
              <textarea name="heroLeadKo" />
            </label>
            <label className="field">
              <span>Sub Hero Lead EN</span>
              <textarea name="heroLeadEn" />
            </label>
          </div>
          <div className="lumosAdminFormGrid">
            <label className="field">
              <span>Sub Hero BG Image URL</span>
              <input name="heroBgImageUrl" />
            </label>
            <label className="field">
              <span>Sub Hero BG Opacity</span>
              <input name="heroBgOpacity" type="number" min={0} max={1} step={0.05} defaultValue={0.2} />
            </label>
          </div>
          <div className="lumosAdminFormGrid">
            <label className="field">
              <span>Summary KO</span>
              <textarea name="summaryKo" />
            </label>
            <label className="field">
              <span>Summary EN</span>
              <textarea name="summaryEn" />
            </label>
          </div>
          <div className="lumosAdminFormGrid">
            <label className="field">
              <span>Content KO</span>
              <textarea name="contentKo" />
            </label>
            <label className="field">
              <span>Content EN</span>
              <textarea name="contentEn" />
            </label>
          </div>
          <div className="lumosAdminFormGrid">
            <label className="field">
              <span>Features KO</span>
              <textarea name="featuresKo" />
            </label>
            <label className="field">
              <span>Features EN</span>
              <textarea name="featuresEn" />
            </label>
          </div>
          <div className="lumosAdminFormGrid">
            <label className="field">
              <span>Applications KO</span>
              <textarea name="applicationsKo" />
            </label>
            <label className="field">
              <span>Applications EN</span>
              <textarea name="applicationsEn" />
            </label>
          </div>
          <div className="lumosAdminFormGrid">
            <label className="field">
              <span>Specs KO (label|value)</span>
              <textarea name="specsKo" />
            </label>
            <label className="field">
              <span>Specs EN (label|value)</span>
              <textarea name="specsEn" />
            </label>
          </div>
          <div className="lumosAdminFormGrid">
            <label className="field">
              <span>SEO Title KO</span>
              <input name="seoTitleKo" />
            </label>
            <label className="field">
              <span>SEO Title EN</span>
              <input name="seoTitleEn" />
            </label>
          </div>
          <div className="lumosAdminFormGrid">
            <label className="field">
              <span>SEO Description KO</span>
              <textarea name="seoDescriptionKo" />
            </label>
            <label className="field">
              <span>SEO Description EN</span>
              <textarea name="seoDescriptionEn" />
            </label>
          </div>
          <label className="lumosAdminCheckbox">
            <input type="checkbox" name="published" defaultChecked />
            <span>노출</span>
          </label>
          <button type="submit" className="lumosAdminPrimaryButton">
            Product 생성
          </button>
        </form>
      </AdminSectionCard>
    </div>
  );
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
