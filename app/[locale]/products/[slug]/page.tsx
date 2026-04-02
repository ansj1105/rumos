import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductSubnav } from "@/components/product-subnav";
import { SubpageHero } from "@/components/subpage-hero";
import { getProductBySlug, getProducts } from "@/lib/content";
import { getProductReference } from "@/lib/product-reference";
import type { Locale } from "@/lib/site";
import { siteUrl } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {};
  }

  const title = locale === "ko" ? product.seoTitleKo : product.seoTitleEn;
  const description =
    locale === "ko" ? product.seoDescriptionKo : product.seoDescriptionEn;

  return {
    title: title ?? (locale === "ko" ? product.nameKo : product.nameEn),
    description: description ?? (locale === "ko" ? product.summaryKo : product.summaryEn),
    alternates: {
      canonical: `${siteUrl}/${locale}/products/${slug}`,
    },
    openGraph: {
      title: title ?? (locale === "ko" ? product.nameKo : product.nameEn),
      description: description ?? (locale === "ko" ? product.summaryKo : product.summaryEn),
      type: "article",
      url: `${siteUrl}/${locale}/products/${slug}`,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const [product, products] = await Promise.all([getProductBySlug(slug), getProducts()]);

  if (!product || !product.published) {
    notFound();
  }

  const navItems = products.map((item) => ({
    slug: item.slug,
    label: locale === "ko" ? item.nameKo : item.nameEn,
  }));
  const reference = getProductReference(slug, locale);
  const localizedFeatures =
    locale === "ko" ? product.featuresKo : product.featuresEn;
  const localizedApplications =
    locale === "ko" ? product.applicationsKo : product.applicationsEn;
  const localizedSpecs = locale === "ko" ? product.specsKo : product.specsEn;
  const features = Array.isArray(localizedFeatures) && localizedFeatures.length > 0
    ? localizedFeatures.map((item) => String(item))
    : reference.features;
  const applications = Array.isArray(localizedApplications) && localizedApplications.length > 0
    ? localizedApplications.map((item) => String(item))
    : reference.applications;
  const specs = Array.isArray(localizedSpecs) && localizedSpecs.length > 0
    ? localizedSpecs
        .map((item) =>
          typeof item === "object" && item && "label" in item && "value" in item
            ? { label: String(item.label), value: String(item.value) }
            : null,
        )
        .filter((item): item is { label: string; value: string } => Boolean(item))
    : reference.specs;

  return (
    <div className="productsPage">
      <ProductSubnav locale={locale} products={navItems} activeSlug={slug} />
      <SubpageHero
        eyebrow="Product Detail"
        title={locale === "ko" ? product.nameKo : product.nameEn}
        description={locale === "ko" ? product.summaryKo : product.summaryEn}
        tone="products"
      />
      <div className="productDetailHero">
        <div className="container productDetailHeroInner">
          <div className="productDetailCopy">
            <div className="productMetaLine">
              <span>{reference.family}</span>
              <span>•</span>
              <span>{reference.applications[0]}</span>
            </div>
          </div>
          <div className="productDetailVisual">
            <div className="productDetailVisualPanel">
              <div className="productDetailVisualMark">{locale === "ko" ? product.nameKo : product.nameEn}</div>
              <div className="productDetailVisualGrid" />
            </div>
          </div>
        </div>
      </div>

      <div className="container subpageContent">
        <section className="productSection">
          <div className="productSectionHead">
            <span className="eyebrow">Overview</span>
            <h2 className="sectionTitle">Product Overview</h2>
          </div>
          <div className="productOverviewBody">
            <p style={{ margin: 0, lineHeight: 1.9 }}>
              {locale === "ko" ? product.contentKo : product.contentEn}
            </p>
          </div>
        </section>

        <section className="productSection">
          <div className="productSectionHead">
            <span className="eyebrow">Features</span>
            <h2 className="sectionTitle">Key Features</h2>
          </div>
          <div className="productFeatureList">
            {features.map((feature) => (
              <div key={feature} className="productFeatureItem">
                <span className="productFeatureMark" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="productSection productSectionSplit">
          <div>
            <div className="productSectionHead">
              <span className="eyebrow">Applications</span>
              <h2 className="sectionTitle">Target Applications</h2>
            </div>
            <div className="productApplicationList">
              {applications.map((item) => (
                <div key={item} className="productApplicationItem">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="productSectionHead">
              <span className="eyebrow">Specification</span>
              <h2 className="sectionTitle">Quick Specs</h2>
            </div>
            <div className="productSpecTable">
              {specs.map((spec) => (
                <div key={spec.label} className="productSpecRow">
                  <strong>{spec.label}</strong>
                  <span>{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
