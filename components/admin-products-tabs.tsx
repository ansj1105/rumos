"use client";

import { useMemo, useState } from "react";

import { deleteProduct, saveProduct } from "@/app/admin/actions";
import { siteUrl } from "@/lib/site";

type ProductItem = {
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
};

function textValue(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item)).join("\n");
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

export function AdminProductsTabs({
  products,
}: {
  products: ProductItem[];
}) {
  const sortedProducts = useMemo(
    () => [...products].sort((a, b) => a.displayOrder - b.displayOrder || a.id - b.id),
    [products],
  );
  const [activeId, setActiveId] = useState(sortedProducts[0]?.id ?? 0);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const activeProduct =
    sortedProducts.find((product) => product.id === activeId) ?? sortedProducts[0] ?? null;

  return (
    <div className="lumosAdminTabs">
      <div className="lumosAdminTabToolbar">
        <div className="lumosAdminTabList" role="tablist" aria-label="Products">
          {sortedProducts.map((product) => (
            <button
              key={product.id}
              type="button"
              role="tab"
              aria-selected={activeProduct?.id === product.id}
              className={`lumosAdminTabButton ${activeProduct?.id === product.id ? "isActive" : ""}`}
              onClick={() => {
                setActiveId(product.id);
                setShowCreateForm(false);
              }}
            >
              {product.nameKo}
            </button>
          ))}
        </div>
        <button
          type="button"
          className={`lumosAdminPrimaryButton ${showCreateForm ? "isSoftActive" : ""}`}
          onClick={() => setShowCreateForm((value) => !value)}
        >
          새 Product 추가
        </button>
      </div>

      {showCreateForm ? (
        <section className="lumosAdminSectionCard">
          <div className="lumosAdminSectionHead">
            <div>
              <h2>새 Product 추가</h2>
              <p>최대 10개까지 관리합니다.</p>
            </div>
          </div>
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
                <input name="heroBgOpacity" type="number" min={0} max={1} step={0.05} defaultValue={0.9} />
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
        </section>
      ) : activeProduct ? (
        <section className="lumosAdminSectionCard">
          <div className="lumosAdminSectionHead">
            <div>
              <h2>{activeProduct.nameKo}</h2>
              <p>{activeProduct.slug}</p>
            </div>
          </div>
          <form action={saveProduct} className="lumosAdminForm">
            <div className="lumosAdminClientPreview">
              <div className="lumosAdminAssetPreviewHead">
                <strong>Client Page Preview</strong>
                <span>{`/ko/products/${activeProduct.slug}`}</span>
              </div>
              <div className="lumosAdminClientPreviewFrame">
                <iframe
                  src={`${siteUrl}/ko/products/${activeProduct.slug}`}
                  title={`${activeProduct.nameKo} preview`}
                  loading="lazy"
                  scrolling="no"
                  className="lumosAdminClientPreviewIframe"
                />
              </div>
            </div>
            <input type="hidden" name="id" value={activeProduct.id} />
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Slug</span>
                <input name="slug" defaultValue={activeProduct.slug} />
              </label>
              <label className="field">
                <span>Display Order</span>
                <input name="displayOrder" type="number" defaultValue={activeProduct.displayOrder} />
              </label>
              <label className="field">
                <span>Image URL</span>
                <input name="imageUrl" defaultValue={activeProduct.imageUrl ?? ""} />
              </label>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Name KO</span>
                <input name="nameKo" defaultValue={activeProduct.nameKo} />
              </label>
              <label className="field">
                <span>Name EN</span>
                <input name="nameEn" defaultValue={activeProduct.nameEn} />
              </label>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Sub Hero Eyebrow KO</span>
                <input name="heroEyebrowKo" defaultValue={activeProduct.heroEyebrowKo ?? ""} />
              </label>
              <label className="field">
                <span>Sub Hero Eyebrow EN</span>
                <input name="heroEyebrowEn" defaultValue={activeProduct.heroEyebrowEn ?? ""} />
              </label>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Sub Hero Title KO</span>
                <input name="heroTitleKo" defaultValue={activeProduct.heroTitleKo ?? ""} />
              </label>
              <label className="field">
                <span>Sub Hero Title EN</span>
                <input name="heroTitleEn" defaultValue={activeProduct.heroTitleEn ?? ""} />
              </label>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Sub Hero Lead KO</span>
                <textarea name="heroLeadKo" defaultValue={activeProduct.heroLeadKo ?? ""} />
              </label>
              <label className="field">
                <span>Sub Hero Lead EN</span>
                <textarea name="heroLeadEn" defaultValue={activeProduct.heroLeadEn ?? ""} />
              </label>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Sub Hero BG Image URL</span>
                <input name="heroBgImageUrl" defaultValue={activeProduct.heroBgImageUrl ?? ""} />
              </label>
              <label className="field">
                <span>Sub Hero BG Opacity</span>
                <input
                  name="heroBgOpacity"
                  type="number"
                  min={0}
                  max={1}
                  step={0.05}
                  defaultValue={activeProduct.heroBgOpacity ?? 0.9}
                />
              </label>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Summary KO</span>
                <textarea name="summaryKo" defaultValue={activeProduct.summaryKo} />
              </label>
              <label className="field">
                <span>Summary EN</span>
                <textarea name="summaryEn" defaultValue={activeProduct.summaryEn} />
              </label>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Content KO</span>
                <textarea name="contentKo" defaultValue={activeProduct.contentKo} />
              </label>
              <label className="field">
                <span>Content EN</span>
                <textarea name="contentEn" defaultValue={activeProduct.contentEn} />
              </label>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Features KO</span>
                <textarea name="featuresKo" defaultValue={textValue(activeProduct.featuresKo)} />
              </label>
              <label className="field">
                <span>Features EN</span>
                <textarea name="featuresEn" defaultValue={textValue(activeProduct.featuresEn)} />
              </label>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Applications KO</span>
                <textarea name="applicationsKo" defaultValue={textValue(activeProduct.applicationsKo)} />
              </label>
              <label className="field">
                <span>Applications EN</span>
                <textarea name="applicationsEn" defaultValue={textValue(activeProduct.applicationsEn)} />
              </label>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Specs KO (label|value)</span>
                <textarea name="specsKo" defaultValue={specValue(activeProduct.specsKo)} />
              </label>
              <label className="field">
                <span>Specs EN (label|value)</span>
                <textarea name="specsEn" defaultValue={specValue(activeProduct.specsEn)} />
              </label>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>SEO Title KO</span>
                <input name="seoTitleKo" defaultValue={activeProduct.seoTitleKo ?? ""} />
              </label>
              <label className="field">
                <span>SEO Title EN</span>
                <input name="seoTitleEn" defaultValue={activeProduct.seoTitleEn ?? ""} />
              </label>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>SEO Description KO</span>
                <textarea name="seoDescriptionKo" defaultValue={activeProduct.seoDescriptionKo ?? ""} />
              </label>
              <label className="field">
                <span>SEO Description EN</span>
                <textarea name="seoDescriptionEn" defaultValue={activeProduct.seoDescriptionEn ?? ""} />
              </label>
            </div>
            <div className="lumosAdminActionRow">
              <label className="lumosAdminCheckbox">
                <input type="checkbox" name="published" defaultChecked={activeProduct.published} />
                <span>노출</span>
              </label>
              <div className="lumosAdminActionRowEnd">
                <a
                  href={`${siteUrl}/ko/products/${activeProduct.slug}`}
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
            <input type="hidden" name="id" value={activeProduct.id} />
            <button type="submit" className="lumosAdminDangerButton">
              삭제
            </button>
          </form>
        </section>
      ) : null}
    </div>
  );
}
