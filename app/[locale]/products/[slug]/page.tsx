import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FadeImage } from "@/components/fade-image";
import { SubpageHero } from "@/components/subpage-hero";
import { getProductBySlug } from "@/lib/content";
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
    label: "Pixel Size [um]",
    values: ["2.74 X 2.74", "2.74 X 2.74", "4.5 X 4.5"],
  },
  {
    label: "Sensor Size [mm]",
    values: ["7.8 X 7.8", "7.8 X 7.8", "14.4 X 9.9"],
  },
  {
    label: "Minimum Measurable Spot Size",
    values: ["Dia. 60 um", "Dia. 60 um", "Dia. 100 um"],
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
    label: "Optical Density",
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
    label: "Optical Density",
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
    label: "Optical Density",
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

const lumBAccessoryRemarks = [
  "OD 1.0 ND filter is provided as standard. If you need an ND filter of a different OD, you can purchase additional filters.",
  "5 m cable is provided by default if the user does not select",
] as const;

const lumBRemarks = [
  "The measurement wavelength needs to be checked before ordering.",
  "With ISO-1146 as the standard for measurable values, the minimum measurable size is 20 pixels.",
] as const;

const lumBLTechnicalRows = [
  { label: "Wavelength [nm]", value: "400 - 1064" },
  { label: "Resolution [pixels]", value: "8424 X 6032 [51 MP]" },
  { label: "Pixel Size [um]", value: "4.6 X 4.6" },
  { label: "Sensor Size [mm]", value: "38.75 X 27.75" },
  { label: "Minimum Measurable Spot Size", value: "Dia. 92 um" },
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
  { label: "Pixel Size [um]", value: "2.74 X 2.74" },
  { label: "Sensor Size [mm]", value: "7.8 X 7.8" },
  { label: "Magnification", values: ["X20", "X10", "X05"] },
  { label: "Minimum Measurable Spot Size", values: ["Dia. 3 um", "Dia. 6 um", "Dia. 14 um"] },
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
  { label: "Min. Scan Step", value: "10 um" },
  { label: "Max. Scan Time", value: "<200sec/1mm" },
  { label: "Min. beam Size.", value: ">3 um" },
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
  { label: "Infinity Flat Top Size(3) [mm]", values: ["30 X 30 - Infinity", "30 X 30 - Infinity", "30 X 30 - Infinity"] },
  { label: "Infinity WD(3) [mm]", values: ["2500 - Infinity", "540 - Infinity", "320 - Infinity"] },
  { label: "Uniformity [%]", values: ["> 90", "> 90", "> 90"] },
  { label: "Operating Temperature [deg C]", values: ["0 to 60", "0 to 60", "0 to 60"] },
  { label: "Storage Temperature [deg C]", values: ["-20 to 80", "-20 to 80", "-20 to 80"] },
  { label: "Relative Humidity [%]", values: ["10 to 95", "10 to 95", "10 to 95"] },
] as const;

const ifiRemarks = [
  "Custom specifications are available upon request.",
  "Supports core sizes up to 1.2mm; image size scales proportionally to the core size",
  "The projected beam size relative to distance may vary depending on the specific system configuration, and the maximum achievable size is virtually unlimited",
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
  const product = await getProductBySlug(slug);

  if (!product || !product.published) {
    notFound();
  }

  const isLumBSeries = slug === "lum-b";
  const isLumBLSeries = slug === "lum-b-l";
  const isLumFSeries = slug === "lum-f";
  const isLumZSeries = slug === "lum-z";
  const isIFISeries = slug === "ifi";
  const isSoftwareSeries = slug === "software";
  const isCustomSeries = isLumBSeries || isLumBLSeries || isLumFSeries;
  const ui = {
    productDetail: locale === "ko" ? "Product Detail" : "Product Detail",
    technicalData: locale === "ko" ? "Specifications" : "Specifications",
    zSpec: locale === "ko" ? "Z Axis Scan Spec" : "Z Axis Scan Spec",
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
    !product.heroBgImageUrl ||
    product.heroBgImageUrl === "/subpage-lum-b-bg.png" ||
    product.heroBgImageUrl === "/subpage-lum-b-l-bg.png" ||
    product.heroBgImageUrl === "/subpage-lum-f-bg.png" ||
    product.heroBgImageUrl === "/subpage-lum-z-bg.png" ||
    product.heroBgImageUrl === "/subpage-software-bg.png" ||
    product.heroBgImageUrl === "/products/ifi/main.png"
      ? "/subpage-products-laser-bg.png"
      : product.heroBgImageUrl;
  const productHeroBgOpacity = product.heroBgOpacity ?? 0.9;
  const productDetailHeroVisual = isLumBSeries
    ? { src: "/products/detail-hero/lumb.jpeg", alt: "LUM-B detail hero image" }
    : isLumBLSeries
      ? { src: "/products/detail-hero/lumbl.png", alt: "LUM-B-L detail hero image" }
      : isLumFSeries
        ? { src: "/products/detail-hero/lumf.png", alt: "LUM-F detail hero image" }
        : isLumZSeries
          ? { src: "/products/detail-hero/lumz.jpeg", alt: "LUM-Z detail hero image" }
          : isIFISeries
            ? { src: "/products/detail-hero/ifi.png", alt: "IFI detail hero image" }
            : isSoftwareSeries
              ? { src: "/products/software/main.png", alt: "Lumosity software detail hero image" }
              : { src: "/products/lum-b/main.png", alt: "Customizing detail hero image" };
  const productDetailHeroHeadline = isLumBSeries
    ? "LUM-B"
    : isLumBLSeries
      ? "LUM-B-L"
      : isLumFSeries
        ? "LUM-F"
        : isLumZSeries
          ? "LUM-Z"
          : isIFISeries
            ? "IFI"
            : isSoftwareSeries
              ? "Lumosity"
              : "Customizing";
  const productDetailHeroSubline = isLumBSeries
    ? "Raw Laser Beam Profiling and Analysis"
    : isLumBLSeries
      ? "Larger Beam Profiling and Analysis"
      : isLumFSeries
        ? "High-Precision Micro Beam Profiling and Analysis"
        : isLumZSeries
          ? "3D Beam Profiling and Analysis"
          : isIFISeries
            ? "Infinity Flat top Imaging optics"
            : isSoftwareSeries
              ? "Beam Profiling Software"
              : "Custom Optical Beam Profiling Solution";

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
      <div className="productDetailHero">
        <div className="container productDetailHeroInner">
          <div className="productDetailCopy">
            <div className="productMetaLine">
              <span>{productDetailHeroHeadline}</span>
              <strong>{productDetailHeroSubline}</strong>
            </div>
          </div>
          <div className="productDetailVisual">
            <div className="productDetailVisualPanel">
              <FadeImage
                src={productDetailHeroVisual.src}
                alt={productDetailHeroVisual.alt}
                fill
                sizes="(max-width: 960px) 100vw, 44vw"
                className={`productDetailVisualImage ${isSoftwareSeries ? "isSoftware" : ""} ${isLumBSeries ? "isLumBCover" : ""}`}
                skeletonClassName="productDetailVisualSkeleton"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container subpageContent">
        {isCustomSeries ? (
          <>
            {isLumBSeries ? (
              <section className="productSection">
                <div className="productSectionHead">
                  <h2 className="sectionTitle">{ui.technicalData}</h2>
                </div>
                <div className="lumBTechnicalComposite">
                  <div className="lumBTechnicalVisual">
                    <Image
                      src="/products/lum-b/lum-b-tech-visual.png"
                      alt="LUM-B technical overview"
                      width={1600}
                      height={900}
                      className="lumBTechnicalVisualImage"
                    />
                  </div>
                  <div className="productSpecBlock">
                    <table className="productTechTable">
                      <thead>
                        <tr>
                          <th>{ui.technicalData}</th>
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
                  <div className="lumBRemarksBlock">
                    <div className="productAccessoryHeading">REMARKS</div>
                    <div className="lumBRemarksList">
                      {lumBRemarks.map((item, index) => (
                        <div key={item} className="lumBRemarkItem">{`(${index + 1}) ${item}`}</div>
                      ))}
                      <div className="lumBRemarkItem isEmphasis">
                        For changes in the exterior structure, it is necessary to check in advance whether it is possible before ordering.
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ) : isLumBLSeries ? (
              <section className="productSection">
                <div className="productSectionHead">
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
              </section>
            ) : (
              <section className="productSection">
                <div className="productSectionHead">
                  <h2 className="sectionTitle">{ui.technicalData}</h2>
                </div>
                <div className="productSpecBlock">
                  <table className="productTechTable">
                    <thead>
                      <tr>
                        <th>{ui.technicalData}</th>
                        <th>LUM-F-DUV</th>
                        <th>LUM-F-UV</th>
                        <th>LUM-F-VIS</th>
                        <th>LUM-F-NIR</th>
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
              </section>
            )}
          </>
        ) : isLumZSeries ? (
          <section className="productSection">
            <div className="productSectionHead">
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
        ) : isIFISeries ? (
          <>
            <section className="productSection">
              <div className="productSectionHead">
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
                <h2 className="sectionTitle">REMARKS</h2>
              </div>
              <div className="softwareInterfaceList">
                {ifiRemarks.map((item, index) => (
                  <div key={item} className="softwareInterfaceItem">
                    <span>{`(${index + 1}) ${item}`}</span>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : null}
      </div>
    </div>
  );
}
