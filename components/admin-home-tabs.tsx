"use client";

import { useState } from "react";

import {
  restoreHeroImage,
  updateHeroSection,
  updateSeriesSection,
  updateSiteConfig,
  updateStorySection,
} from "@/app/admin/actions";
import { AdminPageHeroTabs } from "@/components/admin-page-hero-tabs";
import { siteUrl } from "@/lib/site";

type SiteConfigData = {
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

type PageHeroConfigData = {
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
};

const homeTabItems = [
  { key: "hero", label: "Hero" },
  { key: "story", label: "Story" },
  { key: "series", label: "Series" },
  { key: "history", label: "History" },
  { key: "seo", label: "SEO" },
  { key: "subhero", label: "Sub Hero" },
] as const;

export function AdminHomeTabs({
  siteConfig,
  pageHeroConfigs,
}: {
  siteConfig: SiteConfigData;
  pageHeroConfigs: PageHeroConfigData[];
}) {
  const recentHistory = siteConfig.heroImageHistory.slice(0, 5);
  const [activeKey, setActiveKey] = useState<(typeof homeTabItems)[number]["key"]>("hero");

  return (
    <div className="lumosAdminTabs">
      <div className="lumosAdminTabList" role="tablist" aria-label="Home settings tabs">
        {homeTabItems.map((item) => (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={activeKey === item.key}
            className={`lumosAdminTabButton ${activeKey === item.key ? "isActive" : ""}`}
            onClick={() => setActiveKey(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {activeKey === "hero" ? (
        <section className="lumosAdminSectionCard">
          <div className="lumosAdminSectionHead">
            <div>
              <h2>Hero Section</h2>
              <p>배경 이미지 URL, 메인 카피, 폰트 크기를 관리합니다.</p>
            </div>
          </div>
          <form action={updateHeroSection} className="lumosAdminForm">
            <div className="lumosAdminClientPreview">
              <div className="lumosAdminAssetPreviewHead">
                <strong>Client Page Preview</strong>
                <span>/ko</span>
              </div>
              <div className="lumosAdminClientPreviewFrame">
                <iframe
                  src={`${siteUrl}/ko`}
                  title="home hero preview"
                  loading="lazy"
                  className="lumosAdminClientPreviewIframe"
                />
              </div>
            </div>
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
            <button type="submit" className="lumosAdminPrimaryButton">
              Hero 저장
            </button>
          </form>
        </section>
      ) : null}

      {activeKey === "story" ? (
        <section className="lumosAdminSectionCard">
          <div className="lumosAdminSectionHead">
            <div>
              <h2>Story Section</h2>
              <p>브랜드 어원 섹션 문구와 폰트 크기를 관리합니다.</p>
            </div>
          </div>
          <form action={updateStorySection} className="lumosAdminForm">
            <div className="lumosAdminClientPreview">
              <div className="lumosAdminAssetPreviewHead">
                <strong>Client Page Preview</strong>
                <span>/ko#storySection</span>
              </div>
              <div className="lumosAdminClientPreviewFrame">
                <iframe
                  src={`${siteUrl}/ko#storySection`}
                  title="story section preview"
                  loading="lazy"
                  className="lumosAdminClientPreviewIframe"
                />
              </div>
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
            <button type="submit" className="lumosAdminPrimaryButton">
              어원 영역 저장
            </button>
          </form>
        </section>
      ) : null}

      {activeKey === "series" ? (
        <section className="lumosAdminSectionCard">
          <div className="lumosAdminSectionHead">
            <div>
              <h2>Series Section</h2>
              <p>메인 시리즈 소개 섹션의 제목과 설명을 관리하고 실제 섹션을 미리봅니다.</p>
            </div>
          </div>
          <form action={updateSeriesSection} className="lumosAdminForm">
            <div className="lumosAdminClientPreview">
              <div className="lumosAdminAssetPreviewHead">
                <strong>Client Page Preview</strong>
                <span>/ko#homeSeriesSection</span>
              </div>
              <div className="lumosAdminClientPreviewFrame">
                <iframe
                  src={`${siteUrl}/ko#homeSeriesSection`}
                  title="home series section preview"
                  loading="lazy"
                  className="lumosAdminClientPreviewIframe"
                />
              </div>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Series Title KO</span>
                <input name="seriesTitleKo" defaultValue={siteConfig.seriesTitleKo} />
              </label>
              <label className="field">
                <span>Series Title EN</span>
                <input name="seriesTitleEn" defaultValue={siteConfig.seriesTitleEn} />
              </label>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Series Lead KO</span>
                <textarea name="seriesLeadKo" defaultValue={siteConfig.seriesLeadKo} />
              </label>
              <label className="field">
                <span>Series Lead EN</span>
                <textarea name="seriesLeadEn" defaultValue={siteConfig.seriesLeadEn} />
              </label>
            </div>
            <button type="submit" className="lumosAdminPrimaryButton">
              상품 섹션 저장
            </button>
          </form>
        </section>
      ) : null}

      {activeKey === "history" ? (
        <section className="lumosAdminSectionCard">
          <div className="lumosAdminSectionHead">
            <div>
              <h2>Hero Image History</h2>
              <p>최근 5개 변경 이력을 표시합니다. 전체 보관은 최대 10개입니다.</p>
            </div>
          </div>
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
        </section>
      ) : null}

      {activeKey === "seo" ? (
        <section className="lumosAdminSectionCard">
          <div className="lumosAdminSectionHead">
            <div>
              <h2>SEO Settings</h2>
              <p>메인 페이지 SEO 메타 정보를 관리합니다.</p>
            </div>
          </div>
          <form action={updateSiteConfig} className="lumosAdminForm">
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
            <input type="hidden" name="heroTitleKo" value={siteConfig.heroTitleKo} />
            <input type="hidden" name="heroTitleEn" value={siteConfig.heroTitleEn} />
            <input type="hidden" name="heroDescriptionKo" value={siteConfig.heroDescriptionKo} />
            <input type="hidden" name="heroDescriptionEn" value={siteConfig.heroDescriptionEn} />
            <input type="hidden" name="heroImageUrl" value={siteConfig.heroImageUrl ?? ""} />
            <input type="hidden" name="heroFontSize" value={siteConfig.heroFontSize} />
            <input type="hidden" name="storyTitleKo" value={siteConfig.storyTitleKo} />
            <input type="hidden" name="storyTitleEn" value={siteConfig.storyTitleEn} />
            <input type="hidden" name="storyBodyKo" value={siteConfig.storyBodyKo} />
            <input type="hidden" name="storyBodyEn" value={siteConfig.storyBodyEn} />
            <input type="hidden" name="storyFontSize" value={siteConfig.storyFontSize} />
            <input type="hidden" name="seriesTitleKo" value={siteConfig.seriesTitleKo} />
            <input type="hidden" name="seriesTitleEn" value={siteConfig.seriesTitleEn} />
            <input type="hidden" name="seriesLeadKo" value={siteConfig.seriesLeadKo} />
            <input type="hidden" name="seriesLeadEn" value={siteConfig.seriesLeadEn} />
            <button type="submit" className="lumosAdminPrimaryButton">
              SEO 저장
            </button>
          </form>
        </section>
      ) : null}

      {activeKey === "subhero" ? (
        <section className="lumosAdminSectionCard">
          <div className="lumosAdminSectionHead">
            <div>
              <h2>Sub Hero Settings</h2>
              <p>각 서브페이지 공통 상단 배경 이미지와 문구를 페이지별로 관리합니다.</p>
            </div>
          </div>
          <AdminPageHeroTabs pageHeroConfigs={pageHeroConfigs} />
        </section>
      ) : null}
    </div>
  );
}
