import {
  deleteResource,
  saveInquiryReply,
  saveResource,
  sendInquiryReply,
  updateInquiryStatus,
} from "@/app/admin/actions";
import { AdminApplicationsTabs } from "@/components/admin-applications-tabs";
import { AdminHomeTabs } from "@/components/admin-home-tabs";
import { AdminInquiriesTabs } from "@/components/admin-inquiries-tabs";
import { AdminProductsTabs } from "@/components/admin-products-tabs";
import { AdminResourcesTabs } from "@/components/admin-resources-tabs";

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
  products,
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
  products: Array<{
    id: number;
    slug: string;
    nameKo: string;
    nameEn: string;
    imageUrl: string | null;
    displayOrder: number;
  }>;
}) {
  return <AdminHomeTabs siteConfig={siteConfig} pageHeroConfigs={pageHeroConfigs} products={products} />;
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
  return <AdminResourcesTabs resources={resources} />;
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
  return <AdminInquiriesTabs inquiries={inquiries} />;
}
