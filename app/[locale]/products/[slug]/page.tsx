import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FadeImage } from "@/components/fade-image";
import { ProductVideoPanel } from "@/components/product-video-panel";
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

const lumBFilterRows = [
  {
    label: "Wavelength[nm]",
    lumBD: "200 - 1064",
    lumBNM: "343 - 1064",
  },
  {
    label: "Type",
    lumBD: "Reflective",
    lumBNM: "Absorptive",
  },
  {
    label: "Optical Density (1)",
    lumBD: "0.1 up to 4.0",
    lumBNM: "0.1 up to 6.0",
  },
] as const;

const lumBLFilterRows = [
  {
    label: "Wavelength [nm]",
    value: "400 - 1100",
  },
  {
    label: "Type",
    value: "Absorptive",
  },
  {
    label: "Optical Density(1)",
    value: "0.1 up to 6.0",
  },
  {
    label: "Clear Aperture [mm]",
    value: "< 45 mm x 45 mm",
  },
] as const;

const lumFFilterRows = [
  {
    label: "Wavelength[nm]",
    values: ["240 - 355", "343 - 355", "485 - 570", "980 - 1064"],
  },
  {
    label: "Type",
    values: ["Reflective", "Absorptive", "Absorptive", "Absorptive"],
  },
  {
    label: "Optical Density (2)",
    values: ["0.1 up to 4.0", "0.1 up to 6.0", "0.1 up to 6.0", "0.1 up to 6.0"],
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

const lumBLTechnicalRows = [
  { label: "Wavelength [nm]", value: "400 - 1064" },
  { label: "Resolution [pixels]", value: "8424 X 6032 [51 MP]" },
  { label: "Pixel Size [µm]", value: "4.6 X 4.6" },
  { label: "Sensor Size [mm]", value: "38.75 X 27.75" },
  { label: "Minimum Measurable Spot Size", value: "Ø 92 µm" },
  { label: "Sensor Type [Shutter]", value: "CMOS [Global Shutter]" },
  { label: "Electrical Data", value: "10-28 V / Gigabit Ethernet" },
] as const;

const lumBLAccessoryRows = [
  { label: "Data", value: "5 m / 10 m / 15 m" },
  { label: "Power (Trigger) (with AC Adapter)", value: "5 m / 10 m / 15 m" },
  { label: "USB", value: "Include Operation Program / Manual / Certificate" },
] as const;

const lumFTechnicalRows = [
  { label: "Wavelength [nm]", values: ["240 - 355", "343 - 355", "485 - 570", "980 - 1064"] },
  {
    label: "Resolution [Pixels]",
    groups: [
      { value: "2848 X 2848 [8.1 MP]", span: 2 },
      { value: "2856 X 2848 [8.1 MP]", span: 2 },
    ],
  },
  { label: "Pixel Size [µm]", value: "2.74 X 2.74" },
  { label: "Sensor Size [mm]", value: "7.8 X 7.8" },
  { label: "Magnification", values: ["X20", "X10", "X05"] },
  { label: "Minimum Measurable Spot Size", values: ["Ø 3 µm", "Ø 6 µm", "Ø 14 µm"] },
  { label: "Sensor Type [Shutter]", value: "CMOS [Global Shutter]" },
  { label: "Electrical Data", value: "10-28 V / Gigabit Ethernet, POE" },
] as const;

const lumFAccessoryRows = [
  { label: "Data", value: "5 m / 10 m / 15 m" },
  { label: "Power (Trigger)", value: "5 m / 10 m / 15 m" },
  { label: "Adapter", value: "1.5 m (CEE 7/4 > IEC C13)" },
  { label: "Power Adapter", value: "100-240 VAC(50/60Hz), 1.5A > 24 VDC, 3.0A" },
  { label: "USB", value: "Include Operation Program / Manual / Certificate" },
] as const;

const lumZSpecRows = [
  { label: "LUM-Z Stroke", value: "10mm" },
  { label: "Min. Scan Step", value: "10um" },
  { label: "Max. Scan Time", value: "<200sec/1mm" },
  { label: "Min. beam Size.", value: ">3um" },
  { label: "Wavelength", value: "343~1064nm (Selection)" },
  { label: "Power", value: "<1W" },
] as const;

const ifiTechnicalRows = [
  { label: "Wavelength(1) [nm]", values: ["808, 976, 1064", "808, 976, 1064", "808, 976, 1064"] },
  { label: "Fiber Core Size(2) [mm]", values: ["0.6 X 0.6", "0.6 X 0.6", "0.6 X 0.6"] },
  { label: "Fiber NA", values: ["0.22", "0.22", "0.22"] },
  { label: "LASER Power [W]", values: ["< 2000 (with Water Cooling)", "< 2000 (with Water Cooling)", "< 2000 (with Water Cooling)"] },
  { label: "Connector Type(1)", values: ["QBH, D80", "QBH, D80", "QBH, D80"] },
  { label: "Beam Profile", values: ["Flat Top Square", "Flat Top Square", "Flat Top Square"] },
  { label: "Flat Top Size(3) [mm]", values: ["2 X 2 - 30 X 30", "5 X 5 - 30 X 30", "7 X 7 - 30 X 30"] },
  { label: "WD(3) [mm]", values: ["200 - 2500", "50 - 540", "50 - 320"] },
  { label: "Infinity Flat Top Size(3) [mm]", values: ["30 X 30 - ∞", "30 X 30 - ∞", "30 X 30 - ∞"] },
  { label: "Infinity WD(3) [mm]", values: ["2500 - ∞", "540 - ∞", "320 - ∞"] },
  { label: "Uniformity [%]", values: ["> 90", "> 90", "> 90"] },
  { label: "Operating Temperature [°C]", values: ["0 to 60", "0 to 60", "0 to 60"] },
  { label: "Storage Temperature [°C]", values: ["-20 to 80", "-20 to 80", "-20 to 80"] },
  { label: "Relative Humidity [%]", values: ["10 to 95", "10 to 95", "10 to 95"] },
] as const;

const ifiRemarks = [
  "Custom specifications are available upon request.",
  "Supports core sizes up to 1.2mm; image size scales proportionally to the core size",
  "The projected beam size relative to distance may vary depending on the specific system configuration, and the maximum achievable size is virtually unlimited",
] as const;

const productDetailFeatureOverrides: Record<string, string[]> = {
  "lum-b": [
    "Multiple Cameras can be connected to One Program",
    "User-Customizable parameter windows in Lumosity SW",
  ],
  "lum-b-l": [
    "Measurable up to 38 mm X 27 mm using Large Area Sensor",
    "Protective Cap Structure to Prevent Filter Breakage",
    "User-Customizable parameter windows in Lumosity SW",
  ],
  "lum-f": [
    "ONE-BODY Integrated modular solution from UV to IR",
    "User-Customizable parameter windows in Lumosity SW",
    "Replaceable objective unit per wavelengths and magnifications",
    "Requires only focal point alignment",
  ],
  "lum-z": [
    "Measurable spot size and DOF",
    "3D intensity distribution",
    "2D & 3D Beam profile viewer",
  ],
  ifi: [
    "Maintain a superior beam UNIFORMITY OF OVER 90% across all focal ranges, ensuring consistent process quality",
    "Infinity flat top along with NA",
  ],
  software: [
    "ISO 11146 Standard Analysis: Supports international standard measurement methods (Second Moment, Knife-Edge, and Slit)",
    "1D Beam Profiling & 2D Viewer: Real-time imaging with simultaneous Cross & Beam Section view",
    "Advanced Diameter Analysis: Offers various diameter calculation options including Ellipse Fit, Threshold, and Min Area",
    "2D & 3D ROI Analysis: Evaluates Flatness, Uniformity, and Edge Steepness based on ISO 13694 standards / Intuitive beam shape verification via 3D visualization of 2D intensity data",
  ],
};

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
  const isLumBLSeries = slug === "lum-b-l";
  const isLumFSeries = slug === "lum-f";
  const isLumZSeries = slug === "lum-z";
  const isIFISeries = slug === "ifi";
  const isSoftwareSeries = slug === "software";
  const isCustomSeries = isLumBSeries || isLumBLSeries || isLumFSeries;
  const ui = {
    productDetail: locale === "ko" ? "Product Detail" : "Product Detail",
    overview: locale === "ko" ? "Overview" : "Overview",
    specification: locale === "ko" ? "Specification" : "Specification",
    features: locale === "ko" ? "Features" : "Features",
    applications: locale === "ko" ? "Applications" : "Applications",
    filterOptions: locale === "ko" ? "Filter Options" : "Filter Options",
    measurementView: locale === "ko" ? "Measurement View" : "Measurement View",
    software: locale === "ko" ? "Software" : "Software",
    feature: locale === "ko" ? "Feature" : "Feature",
    integration: locale === "ko" ? "Integration" : "Integration",
    technicalData: locale === "ko" ? "Technical Data" : "Technical Data",
    accessoryInfo: locale === "ko" ? "Information for Accessories" : "Information for Accessories",
    productOverview: locale === "ko" ? "Product Overview" : "Product Overview",
    keyFeatures: locale === "ko" ? "Features" : "Features",
    targetApplications: locale === "ko" ? "Target Applications" : "Target Applications",
    quickSpecs: locale === "ko" ? "Quick Specs" : "Quick Specs",
    filterTitle: locale === "ko" ? "Neutral Density Filter Configuration" : "Neutral Density Filter Configuration",
    zOverview: locale === "ko" ? "LUM-Z Overview" : "LUM-Z Overview",
    zSpec: locale === "ko" ? "Z Axis Scan Spec" : "Z Axis Scan Spec",
    scanAnalysis: locale === "ko" ? "Scan Analysis Interface" : "Scan Analysis Interface",
    scanAnalysisCaption:
      locale === "ko"
        ? "실제 제품을 통한 분석 시연 영상입니다."
        : "This is a demonstration video of analysis using the actual product.",
    softwareOverview: locale === "ko" ? "Lumosity Software Overview" : "Lumosity Software Overview",
    softwareCore: locale === "ko" ? "Core Software Functions" : "Core Software Functions",
    softwareAnalysis: locale === "ko" ? "Beam Analysis Features" : "Beam Analysis Features",
    softwareInterface: locale === "ko" ? "Operation & Interface" : "Operation & Interface",
  };
  const productHeroEyebrow =
    locale === "ko"
      ? product.heroEyebrowKo ?? ui.productDetail
      : product.heroEyebrowEn ?? ui.productDetail;
  const productHeroTitle =
    locale === "ko"
      ? product.heroTitleKo ?? `${product.nameKo}`
      : product.heroTitleEn ?? `${product.nameEn}`;
  const productHeroLead =
    locale === "ko"
      ? product.heroLeadKo ?? product.summaryKo
      : product.heroLeadEn ?? product.summaryEn;
  const productHeroBgImageUrl =
    product.heroBgImageUrl ??
    (slug === "lum-b"
      ? "/subpage-lum-b-bg.png"
      : slug === "lum-b-l"
        ? "/subpage-lum-b-l-bg.png"
        : slug === "lum-f"
          ? "/subpage-lum-f-bg.png"
            : slug === "lum-z"
              ? "/subpage-lum-z-bg.png"
              : slug === "ifi"
                ? "/products/ifi/main.png"
              : slug === "software"
                ? "/subpage-software-bg.png"
        : null);
  const productHeroBgOpacity = product.heroBgOpacity ?? 0.9;
  const productDetailSummary =
    isLumBSeries
      ? (
        locale === "ko"
          ? "LUM-B 시리즈는 Raw Laser Beam Profiling과 분석을 위한 카메라 기반 측정 장비로, 다양한 필터 옵션과 해상도 구성을 통해 산업용 광학 계측 환경에 대응합니다."
          : "The LUM-B Series is a camera-based measurement platform for raw laser beam profiling and analysis, offering multiple filter and resolution options for industrial optical metrology environments."
      )
      : isLumBLSeries
        ? (
          locale === "ko"
            ? "LUM-B-L 시리즈는 대면적 레이저 빔 프로파일링을 위한 고해상도 측정 기기로, 대형 센서와 넓은 유효 개구를 통해 확장된 계측 환경에 대응합니다."
            : "The LUM-B-L Series is a high-resolution platform for large-area laser beam profiling, combining a large sensor and wide clear aperture for expanded measurement environments."
        )
        : isLumFSeries
          ? (
            locale === "ko"
              ? "LUM-F 시리즈는 고배율 초점 빔 프로파일링을 위한 측정 기기로, 파장별 렌즈 유닛과 필터 구성을 통해 미세 스폿 계측 환경에 대응합니다."
              : "The LUM-F Series is a focused beam profiling platform built for fine spot measurement, combining wavelength-specific objective units and filter configurations."
          )
          : isLumZSeries
            ? (
              locale === "ko"
                ? "LUM-Z 시리즈는 빔 전파축 방향의 형상을 스캔하고 분석하기 위한 3D 빔 프로파일링 플랫폼으로, 정밀 스텝 제어와 다양한 파장 선택 환경에 대응합니다."
                : "The LUM-Z Series is a 3D beam profiling platform for scanning and analyzing beam propagation, built for precision step control and selectable wavelength environments."
            )
            : isIFISeries
              ? (
                locale === "ko"
                  ? "IFI 시리즈는 전 초점 거리 범위에서 90% 이상의 빔 균일도를 유지하도록 설계된 Infinity Flat Top 광학 솔루션으로, 일관된 공정 품질을 지원합니다."
                  : "The IFI Series is an infinity flat top optical solution engineered to maintain beam uniformity above 90% across focal ranges for stable process quality."
              )
            : isSoftwareSeries
              ? (
                locale === "ko"
                  ? "다양한 빔 형태에서도 자동 중심 검출과 ROI 기능을 통해 필요한 영역만 정확하게 분석할 수 있는 직관적인 빔 분석 소프트웨어입니다."
                  : "An intuitive beam analysis software suite that accurately analyzes only the required area through automatic center detection and ROI functions, even across diverse beam shapes."
              )
              : (locale === "ko" ? product.contentKo : product.contentEn);
  const displayFeatures = productDetailFeatureOverrides[slug] ?? features;

  return (
    <div className="productsPage">
      <SubpageHero
        eyebrow={productHeroEyebrow}
        title={productHeroTitle}
        description={productHeroLead}
        tone="products"
        backgroundImageUrl={productHeroBgImageUrl}
        backgroundOpacity={productHeroBgOpacity}
      />
      <ProductSubnav locale={locale} products={navItems} activeSlug={slug} />
      <div className="productDetailHero">
        <div className="container productDetailHeroInner">
          <div className="productDetailCopy">
            <div className="productMetaLine">
              <span>Lumos Series</span>
              <strong>{locale === "ko" ? product.nameKo : product.nameEn}</strong>
              <p>{productDetailSummary}</p>
            </div>
          </div>
          <div className="productDetailVisual">
            <div className="productDetailVisualPanel">
              {isLumBSeries ? (
                <FadeImage
                  src="/products/lum-b/main.png"
                  alt="LUM-B camera"
                  fill
                  sizes="(max-width: 960px) 100vw, 44vw"
                  className="productDetailVisualImage"
                  skeletonClassName="productDetailVisualSkeleton"
                />
              ) : isLumBLSeries ? (
                <FadeImage
                  src="/products/lum-b-l/main.png"
                  alt="LUM-B-L camera"
                  fill
                  sizes="(max-width: 960px) 100vw, 44vw"
                  className="productDetailVisualImage"
                  skeletonClassName="productDetailVisualSkeleton"
                />
              ) : isLumFSeries ? (
                <FadeImage
                  src="/products/lum-f/main.png"
                  alt="LUM-F camera"
                  fill
                  sizes="(max-width: 960px) 100vw, 44vw"
                  className="productDetailVisualImage"
                  skeletonClassName="productDetailVisualSkeleton"
                />
              ) : isLumZSeries ? (
                <FadeImage
                  src="/products/lum-z/main.png"
                  alt="LUM-Z camera"
                  fill
                  sizes="(max-width: 960px) 100vw, 44vw"
                  className="productDetailVisualImage"
                  skeletonClassName="productDetailVisualSkeleton"
                />
              ) : isIFISeries ? (
                <FadeImage
                  src="/products/ifi/main.png"
                  alt="IFI optical module"
                  fill
                  sizes="(max-width: 960px) 100vw, 44vw"
                  className="productDetailVisualImage"
                  skeletonClassName="productDetailVisualSkeleton"
                />
              ) : isSoftwareSeries ? (
                <FadeImage
                  src="/products/software/main.png"
                  alt="Lumosity software interface"
                  fill
                  sizes="(max-width: 960px) 100vw, 44vw"
                  className="productDetailVisualImage isSoftware"
                  skeletonClassName="productDetailVisualSkeleton"
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
        {isCustomSeries ? (
          <>
            <section className="productSection">
              <div className="productSectionHead">
                <span className="eyebrow">FEATURE</span>
                <h2 className="sectionTitle">{ui.keyFeatures}</h2>
              </div>
              <ol className="productFeatureList">
                {displayFeatures.map((feature) => (
                  <li key={feature} className="productFeatureItem">
                    <span>{feature}</span>
                  </li>
                ))}
              </ol>
            </section>

            {isLumBSeries ? (
              <>
                <section className="productSection">
                  <div className="productSectionHead">
                    <span className="eyebrow">FEATURE</span>
                    <h2 className="sectionTitle">{ui.filterTitle}</h2>
                  </div>
                  <div className="lumBFilterComposite">
                    <div className="lumBFilterSpectrum">
                      <Image
                        src="/products/lum-b/lum-b-filter-spectrum.png"
                        alt="LUM-B filter wavelength spectrum"
                        width={1520}
                        height={157}
                        className="lumBFilterSpectrumImage"
                      />
                    </div>
                    <div className="lumBFilterLayout">
                      <div className="lumBFilterDevice">
                        <Image
                          src="/products/lum-b/lum-b-filter-device.png"
                          alt="LUM-B camera with neutral density filter"
                          width={1024}
                          height={1024}
                          className="lumBFilterDeviceImage"
                        />
                        <div className="lumBFilterArrow" aria-hidden="true">
                          <span className="lumBFilterArrowStem" />
                          <span className="lumBFilterArrowHead" />
                          <span className="lumBFilterArrowDot" />
                        </div>
                      </div>
                      <div className="lumBFilterTableWrap">
                        <table className="lumBFilterTable">
                          <thead>
                            <tr>
                              <th colSpan={3}>
                                Kind of <strong>Neutral Density Filter</strong>
                              </th>
                            </tr>
                            <tr>
                              <th>{ui.technicalData}</th>
                              <th>for LUM-B-D</th>
                              <th>for LUM-B-N/M</th>
                            </tr>
                          </thead>
                          <tbody>
                            {lumBFilterRows.map((row) => (
                              <tr key={row.label}>
                                <th>{row.label}</th>
                                <td>{row.lumBD}</td>
                                <td>{row.lumBNM}</td>
                              </tr>
                            ))}
                            <tr>
                              <th>Clear Aperture [mm]</th>
                              <td colSpan={2}>&lt; Ø 20 mm</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="productSection">
                  <div className="productSectionHead">
                    <span className="eyebrow">FEATURE</span>
                    <h2 className="sectionTitle">{ui.accessoryInfo}</h2>
                  </div>
                  <div className="productAccessoryBlock">
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
            ) : isLumBLSeries ? (
              <>
                <section className="productSection">
                  <div className="productSectionHead">
                    <span className="eyebrow">FEATURE</span>
                    <h2 className="sectionTitle">{ui.filterTitle}</h2>
                  </div>
                  <div className="lumBFilterComposite">
                    <div className="lumBFilterSpectrum">
                      <Image
                        src="/products/lum-b-l/lum-b-l-filter-spectrum.png"
                        alt="LUM-B-L filter wavelength spectrum"
                        width={1233}
                        height={147}
                        className="lumBFilterSpectrumImage"
                      />
                    </div>
                    <div className="lumBFilterLayout isLargeArea">
                      <div className="lumBFilterDevice isLargeArea">
                        <Image
                          src="/products/lum-b-l/lum-b-l-filter-device.png"
                          alt="LUM-B-L camera with neutral density filter"
                          width={1536}
                          height={1024}
                          className="lumBFilterDeviceImage isLargeArea"
                        />
                        <div className="lumBFilterArrow isLargeArea" aria-hidden="true">
                          <span className="lumBFilterArrowStem" />
                          <span className="lumBFilterArrowHead" />
                          <span className="lumBFilterArrowDot" />
                        </div>
                      </div>
                      <div className="lumBFilterTableWrap">
                        <table className="lumBFilterTable isSingleModel">
                          <thead>
                            <tr>
                              <th colSpan={2}>
                                Kind of <strong>Neutral Density Filter</strong>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {lumBLFilterRows.map((row) => (
                              <tr key={row.label}>
                                <th>{row.label}</th>
                                <td>{row.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="productSection">
                  <div className="productSectionHead">
                    <span className="eyebrow">FEATURE</span>
                    <h2 className="sectionTitle">{ui.technicalData}</h2>
                  </div>

                  <div className="productSpecBlock">
                    <table className="productTechTable">
                      <thead>
                        <tr>
                          <th>{ui.technicalData}</th>
                          <th colSpan={3}>LUM-B-L</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lumBLTechnicalRows.map((row) => (
                          <tr key={row.label}>
                            <th>{row.label}</th>
                            <td colSpan={3}>{row.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="productAccessoryBlock">
                    <div className="productAccessoryHeading">{ui.accessoryInfo}</div>
                    <table className="productAccessoryTable">
                      <tbody>
                        {lumBLAccessoryRows.map((row) => (
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
                    <span className="eyebrow">FEATURE</span>
                    <h2 className="sectionTitle">{ui.filterTitle}</h2>
                  </div>
                  <div className="lumFFilterComposite">
                    <div className="lumFFilterHero">
                      <div className="lumFFilterMedia">
                        <div className="lumFFilterBodyWrap">
                          <Image
                            src="/products/lum-f/lum-f-filter-body.png"
                            alt="LUM-F main body"
                            width={1536}
                            height={1024}
                            className="lumFFilterBodyImage"
                          />
                          <Image
                            src="/products/lum-f/lum-f-filter-holder.png"
                            alt="LUM-F filter holder"
                            width={768}
                            height={1024}
                            className="lumFFilterHolderImage"
                          />
                          <div className="lumFFilterArrow isHolder" aria-hidden="true">
                            <span className="lumFFilterArrowStem" />
                            <span className="lumFFilterArrowHead" />
                            <span className="lumFFilterArrowDot" />
                          </div>
                          <div className="lumFFilterArrow isLens" aria-hidden="true">
                            <span className="lumFFilterArrowStem" />
                            <span className="lumFFilterArrowHead" />
                            <span className="lumFFilterArrowDot" />
                          </div>
                        </div>
                      </div>

                      <div className="lumFFilterObjectiveCard">
                        <div className="lumFFilterObjectiveHead">
                          Objective Lens Unit<sup>(1)</sup>
                        </div>
                        <div className="lumFFilterObjectiveBody">
                          <div className="lumFFilterObjectiveCopy">
                            <p>
                              Can <strong>Select Magnification</strong>
                              <br />
                              from min. X05 to max. X20
                            </p>
                            <p>
                              Available <strong>3 types of Wavelength</strong>
                            </p>
                            <ul className="lumFFilterObjectiveList">
                              <li><strong>UV</strong> : 343 nm – 355 nm</li>
                              <li><strong>VIS</strong> : 485 nm – 570 nm</li>
                              <li><strong>NIR</strong> : 980 nm – 1064 nm</li>
                              <li><strong>DUV</strong>/Provisional : 240 nm – 355 nm</li>
                            </ul>
                          </div>
                          <Image
                            src="/products/lum-f/lum-f-filter-lens.png"
                            alt="LUM-F objective lens unit"
                            width={768}
                            height={1024}
                            className="lumFFilterLensImage"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="lumFFilterSpectrum">
                      <Image
                        src="/products/lum-f/lum-f-filter-spectrum.png"
                        alt="LUM-F filter wavelength spectrum"
                        width={1800}
                        height={300}
                        className="lumFFilterSpectrumImage"
                      />
                    </div>

                    <div className="lumFFilterTableWrap">
                      <table className="lumFFilterTable">
                        <thead>
                          <tr>
                            <th colSpan={5}>
                              Kind of <strong>Neutral Density Filter</strong>
                            </th>
                          </tr>
                          <tr>
                            <th>{ui.technicalData}</th>
                            <th>for DUV</th>
                            <th>for UV</th>
                            <th>for VIS</th>
                            <th>for NIR</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lumFFilterRows.map((row) => (
                            <tr key={row.label}>
                              <th>{row.label}</th>
                              {row.values.map((value) => (
                                <td key={`${row.label}-${value}`}>{value}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>

                <section className="productSection">
                  <div className="productSectionHead">
                    <span className="eyebrow">FEATURE</span>
                    <h2 className="sectionTitle">{ui.technicalData}</h2>
                  </div>

                  <div className="productSpecBlock">
                    <table className="productTechTable">
                      <thead>
                        <tr>
                          <th>{ui.technicalData}</th>
                          {isLumBLSeries ? (
                            <th colSpan={3}>LUM-B-L</th>
                          ) : (
                            <>
                              <th>LUM-F-DUV</th>
                              <th>LUM-F-UV</th>
                              <th>LUM-F-VIS</th>
                              <th>LUM-F-NIR</th>
                            </>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {lumFTechnicalRows.map((row) => (
                          <tr key={row.label}>
                            <th>{row.label}</th>
                            {"groups" in row ? (
                              row.groups.map((group, index) => (
                                <td key={`${row.label}-${index}`} colSpan={group.span}>
                                  {group.value}
                                </td>
                              ))
                            ) : "values" in row ? (
                              row.values.map((value, index) => (
                                <td
                                  key={`${row.label}-${value}`}
                                  colSpan={row.values.length === 3 && index === 0 ? 2 : 1}
                                >
                                  {value}
                                </td>
                              ))
                            ) : (
                              <td colSpan={4}>{row.value}</td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="productAccessoryBlock">
                    <div className="productAccessoryHeading">{ui.accessoryInfo}</div>
                    <table className="productAccessoryTable">
                      <tbody>
                        {lumFAccessoryRows.map((row) => (
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
            )}
          </>
        ) : isLumZSeries ? (
          <>
            <section className="productSection">
              <div className="productSectionHead">
                <span className="eyebrow">FEATURE</span>
                <h2 className="sectionTitle">{ui.keyFeatures}</h2>
              </div>
              <ol className="productFeatureList">
                {displayFeatures.map((feature) => (
                  <li key={feature} className="productFeatureItem">
                    <span>{feature}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="productSection productFeatureVisualSection">
              <div className="productSectionHead">
                <span className="eyebrow">FEATURE</span>
                <h2 className="sectionTitle">{ui.scanAnalysis}</h2>
              </div>
              <ProductVideoPanel src="/products/lum-z/scan-demo.mp4" />
              <p className="productFeatureVisualCaption">{ui.scanAnalysisCaption}</p>
            </section>

            <section className="productSection">
              <div className="productSectionHead">
                <span className="eyebrow">FEATURE</span>
                <h2 className="sectionTitle">{ui.zSpec}</h2>
              </div>
              <div className="productSpecBlock">
                <table className="productTechTable">
                  <thead>
                    <tr>
                      <th />
                      <th>Spec</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lumZSpecRows.map((row) => (
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
        ) : isIFISeries ? (
          <>
            <section className="productSection">
              <div className="productSectionHead">
                <span className="eyebrow">FEATURE</span>
                <h2 className="sectionTitle">{ui.keyFeatures}</h2>
              </div>
              <ol className="productFeatureList">
                {displayFeatures.map((feature) => (
                  <li key={feature} className="productFeatureItem">
                    <span>{feature}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="productSection productFeatureVisualSection">
              <div className="productSectionHead">
                <span className="eyebrow">FEATURE</span>
                <h2 className="sectionTitle">IFI Beam Projection</h2>
              </div>
              <div className="productFeatureVisualPanel">
                <Image
                  src="/products/ifi/feature.png"
                  alt="IFI beam projection concept"
                  width={1164}
                  height={762}
                  sizes="(max-width: 960px) 100vw, 74vw"
                  className="productFeatureVisualImage"
                />
              </div>
            </section>

            <section className="productSection">
              <div className="productSectionHead">
                <span className="eyebrow">FEATURE</span>
                <h2 className="sectionTitle">{ui.technicalData}</h2>
              </div>
              <div className="productSpecBlock">
                <table className="productTechTable">
                  <thead>
                    <tr>
                      <th>{ui.technicalData}</th>
                      <th>IFI-S</th>
                      <th>IFI-X4</th>
                      <th>IFI-X8</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ifiTechnicalRows.map((row) => (
                      <tr key={row.label}>
                        <th>{row.label}</th>
                        {row.values.map((value) => (
                          <td key={`${row.label}-${value}`}>{value}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="productSection">
              <div className="productSectionHead">
                <span className="eyebrow">FEATURE</span>
                <h2 className="sectionTitle">REMARKS</h2>
              </div>
              <div className="softwareInterfaceList">
                {ifiRemarks.map((item, index) => (
                  <div key={item} className="softwareInterfaceItem">
                    <span className="productFeatureMark" />
                    <span>{`(${index + 1}) ${item}`}</span>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : isSoftwareSeries ? (
          <>
            <section className="productSection">
              <div className="productSectionHead">
                <span className="eyebrow">FEATURE</span>
                <h2 className="sectionTitle">{ui.keyFeatures}</h2>
              </div>
              <ol className="productFeatureList">
                {displayFeatures.map((feature) => (
                  <li key={feature} className="productFeatureItem">
                    <span>{feature}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="productSection productFeatureVisualSection">
              <div className="productSectionHead">
                <span className="eyebrow">FEATURE</span>
                <h2 className="sectionTitle">{ui.softwareOverview}</h2>
              </div>
              <ProductVideoPanel src="/products/software/feature-demo.mp4" />
            </section>

            <section className="productSection productFeatureVisualSection">
              <div className="productSectionHead">
                <span className="eyebrow">FEATURE</span>
                <h2 className="sectionTitle">{ui.softwareCore}</h2>
              </div>
              <div className="softwareFeatureGrid">
                {(locale === "ko"
                  ? [
                      ["장비 제어", "측정 장비 연결, 동작 조건 설정, 계측 시퀀스 실행"],
                      ["실시간 시각화", "빔 형상, 강도 분포, 프로파일 결과를 실시간으로 표시"],
                      ["측정 데이터 저장", "조건별 측정 결과와 이미지, 이력 데이터를 프로젝트 단위로 보관"],
                      ["리포트 출력", "분석 결과를 운영 문서나 품질 보고 형식으로 정리"],
                    ]
                  : [
                      ["Device Control", "Connect instruments, configure test conditions, and run measurement sequences."],
                      ["Live Visualization", "Display beam shape, intensity distribution, and profile output in real time."],
                      ["Measurement Logging", "Store result sets, captured images, and run history by project."],
                      ["Report Output", "Organize analysis results into operational or quality-report formats."],
                    ]).map(([title, body]) => (
                  <div key={title} className="softwareFeatureCard">
                    <strong>{title}</strong>
                    <p>{body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="productSection productFeatureVisualSection">
              <div className="productSectionHead">
                <span className="eyebrow">FEATURE</span>
                <h2 className="sectionTitle">{ui.softwareAnalysis}</h2>
              </div>
              <div className="softwareFeatureGrid">
                {(locale === "ko"
                  ? [
                      ["빔 크기 분석", "가우시안 기반 직경, FWHM, 1/e² 크기를 비교 분석합니다."],
                      ["센터 및 정렬 확인", "빔 중심 좌표와 위치 편차를 확인해 정렬 상태를 점검합니다."],
                      ["에너지 분포 확인", "2D/3D 분포와 라인 프로파일로 강도 변화를 확인합니다."],
                      ["공정 이력 비교", "배치별 측정값을 누적해 추세 변화와 이상 여부를 비교합니다."],
                    ]
                  : [
                      ["Beam Size Analysis", "Compare Gaussian diameter, FWHM, and 1/e² beam size metrics."],
                      ["Center & Alignment", "Check beam center coordinates and positional deviation for alignment review."],
                      ["Energy Distribution", "Review intensity changes through 2D/3D distribution and line profiles."],
                      ["Process History", "Compare accumulated measurement results across batches and operating conditions."],
                    ]).map(([title, body]) => (
                  <div key={title} className="softwareFeatureCard">
                    <strong>{title}</strong>
                    <p>{body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="productSection">
              <div className="productSectionHead">
                <span className="eyebrow">FEATURE</span>
                <h2 className="sectionTitle">{ui.softwareInterface}</h2>
              </div>
              <div className="softwareInterfaceList">
                {(locale === "ko"
                  ? [
                      "프로젝트 단위 장비 설정과 측정 조건 저장",
                      "현장 운용을 위한 측정 결과 내보내기 및 로그 관리",
                      "생산 라인 또는 외부 소프트웨어 연동을 고려한 데이터 구조",
                      "작업자 중심 화면 구성으로 반복 측정 업무에 대응",
                    ]
                  : [
                      "Save instrument configuration and measurement conditions by project.",
                      "Export results and manage operational logs for production use.",
                      "Structured data flow for line-side systems or external software integration.",
                      "Operator-oriented screens for repeated measurement workflows.",
                    ]).map((item) => (
                  <div key={item} className="softwareInterfaceItem">
                    <span className="productFeatureMark" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <>
        <section className="productSection">
          <div className="productSectionHead">
            <span className="eyebrow">FEATURE</span>
            <h2 className="sectionTitle">{ui.keyFeatures}</h2>
          </div>
          <ol className="productFeatureList">
            {displayFeatures.map((feature) => (
              <li key={feature} className="productFeatureItem">
                <span>{feature}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="productSection productSectionSplit">
          <div>
            <div className="productSectionHead">
              <span className="eyebrow">FEATURE</span>
              <h2 className="sectionTitle">{ui.targetApplications}</h2>
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
              <span className="eyebrow">FEATURE</span>
              <h2 className="sectionTitle">{ui.quickSpecs}</h2>
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
