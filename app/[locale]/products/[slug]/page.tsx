import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductSubnav } from "@/components/product-subnav";
import { SubpageHero } from "@/components/subpage-hero";
import { getProductBySlug, getProducts } from "@/lib/content";
import { getProductReference } from "@/lib/product-reference";
import type { Locale } from "@/lib/site";
import { siteUrl } from "@/lib/site";

const lumBTechnicalRows = [
  {
    label: "Wavelength [nm]",
    values: ["200 - 1064", "343 - 1064", "343 - 1064"],
  },
  {
    label: "Resolution [Pixels]",
    values: ["2848 X 2848 [8.1 MP]", "2856 X 2848 [8.1 MP]", "3216 X 2208 [7.1 MP]"],
  },
  {
    label: "Pixel Size [µm]",
    values: ["2.74 X 2.74", "2.74 X 2.74", "4.5 X 4.5"],
  },
  {
    label: "Sensor Size [mm]",
    values: ["7.8 X 7.8", "7.8 X 7.8", "14.4 X 9.9"],
  },
  {
    label: "Minimum Measurable Spot Size",
    values: ["Ø 60 µm", "Ø 60 µm", "Ø 100 µm"],
  },
] as const;

const lumBSharedRows = [
  {
    label: "Sensor Type [Shutter]",
    value: "CMOS [Global Shutter]",
  },
  {
    label: "Electrical Data",
    value: "10-28 V / Gigabit Ethernet, POE",
  },
] as const;

const lumBAccessoryRows = [
  {
    label: "Data",
    value: "5 m / 10 m / 15 m",
  },
  {
    label: "Power (Trigger)",
    value: "5 m / 10 m / 15 m",
  },
  {
    label: "Adapter",
    value: "1.5 m (CEE 7/4 > IEC C13)",
  },
  {
    label: "Power Adapter",
    value: "100-240 VAC(50/60Hz), 1.5A > 24 VDC, 3.0A",
  },
  {
    label: "Mount Adapter",
    value: "C-Mount > SM1",
  },
  {
    label: "USB",
    value: "Include Operation Program / Manual / Certificate",
  },
] as const;

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
  const isLumBSeries = slug === "lum-b";

  return (
    <div className="productsPage">
      <ProductSubnav locale={locale} products={navItems} activeSlug={slug} />
      <SubpageHero
        eyebrow="Product Detail"
        title={`${locale === "ko" ? product.nameKo : product.nameEn} Series`}
        description={locale === "ko" ? product.summaryKo : product.summaryEn}
        tone="products"
      />
      <div className="productDetailHero">
        <div className="container productDetailHeroInner">
          <div className="productDetailCopy">
            <div className="productMetaLine">
              <span>{`LUMOS ${locale === "ko" ? product.nameKo : product.nameEn} Series`}</span>
            </div>
          </div>
          <div className="productDetailVisual">
            <div className="productDetailVisualPanel">
              {isLumBSeries ? (
                <Image
                  src="/products/lum-b/main.png"
                  alt="LUM-B camera"
                  fill
                  sizes="(max-width: 960px) 100vw, 44vw"
                  className="productDetailVisualImage"
                />
              ) : (
                <>
                  <div className="productDetailVisualMark">
                    {locale === "ko" ? product.nameKo : product.nameEn}
                  </div>
                  <div className="productDetailVisualGrid" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container subpageContent">
        {isLumBSeries ? (
          <>
            <section className="productSection">
              <div className="productSectionHead">
                <span className="eyebrow">Overview</span>
                <h2 className="sectionTitle">LUM-B Series Overview</h2>
              </div>
              <div className="productOverviewBody">
                <p style={{ margin: 0, lineHeight: 1.9 }}>
                  {locale === "ko"
                    ? "LUM-B 시리즈는 Raw Laser Beam Profiling과 분석을 위한 카메라 기반 측정 장비로, 다양한 필터 옵션과 해상도 구성을 통해 산업용 광학 계측 환경에 대응합니다."
                    : "The LUM-B Series is a camera-based measurement platform for raw laser beam profiling and analysis, offering multiple filter and resolution options for industrial optical metrology environments."}
                </p>
              </div>
            </section>

            <section className="productSection productFeatureVisualSection">
              <div className="productSectionHead">
                <span className="eyebrow">Filter Options</span>
                <h2 className="sectionTitle">Neutral Density Filter Configuration</h2>
              </div>
              <div className="productFeatureVisualPanel">
                <Image
                  src="/products/lum-b/filter.png"
                  alt="LUM-B filter configuration"
                  width={1066}
                  height={656}
                  className="productFeatureVisualImage"
                />
              </div>
            </section>

            <section className="productSection">
              <div className="productSectionHead">
                <span className="eyebrow">Specification</span>
                <h2 className="sectionTitle">Technical Data</h2>
              </div>

              <div className="productSpecBlock">
                <table className="productTechTable">
                  <thead>
                    <tr>
                      <th>Technical Data</th>
                      <th>LUM-B-D</th>
                      <th>LUM-B-N</th>
                      <th>LUM-B-M</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lumBTechnicalRows.map((row) => (
                      <tr key={row.label}>
                        <th>{row.label}</th>
                        {row.values.map((value) => (
                          <td key={`${row.label}-${value}`}>{value}</td>
                        ))}
                      </tr>
                    ))}
                    {lumBSharedRows.map((row) => (
                      <tr key={row.label}>
                        <th>{row.label}</th>
                        <td colSpan={3}>{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="productAccessoryBlock">
                <div className="productAccessoryHeading">Information for Accessories</div>
                <table className="productAccessoryTable">
                  <tbody>
                    {lumBAccessoryRows.map((row) => (
                      <tr key={row.label}>
                        <th>{row.label}</th>
                        <td>{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
