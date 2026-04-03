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
  const isSoftwareSeries = slug === "software";
  const isCustomSeries = isLumBSeries || isLumBLSeries || isLumFSeries;

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
            {isLumBLSeries ? (
              <Image
                src="/products/lum-b-l/title.png"
                alt="LUM-B-L title"
                width={756}
                height={202}
                className="productSeriesTitleImage"
              />
            ) : isLumFSeries ? (
              <Image
                src="/products/lum-f/title.png"
                alt="LUM-F title"
                width={768}
                height={244}
                className="productSeriesTitleImage"
              />
            ) : isLumZSeries ? (
              <Image
                src="/products/lum-z/title.png"
                alt="LUM-Z title"
                width={760}
                height={225}
                className="productSeriesTitleImage"
              />
            ) : isSoftwareSeries ? (
              <div className="productMetaLine">
                <span>LUMOS Software Series</span>
              </div>
            ) : (
              <div className="productMetaLine">
                <span>{`LUMOS ${locale === "ko" ? product.nameKo : product.nameEn} Series`}</span>
              </div>
            )}
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
              ) : isLumBLSeries ? (
                <Image
                  src="/products/lum-b-l/main.png"
                  alt="LUM-B-L camera"
                  fill
                  sizes="(max-width: 960px) 100vw, 44vw"
                  className="productDetailVisualImage"
                />
              ) : isLumFSeries ? (
                <Image
                  src="/products/lum-f/main.png"
                  alt="LUM-F camera"
                  fill
                  sizes="(max-width: 960px) 100vw, 44vw"
                  className="productDetailVisualImage"
                />
              ) : isLumZSeries ? (
                <Image
                  src="/products/lum-z/main.png"
                  alt="LUM-Z camera"
                  fill
                  sizes="(max-width: 960px) 100vw, 44vw"
                  className="productDetailVisualImage"
                />
              ) : isSoftwareSeries ? (
                <>
                  <div className="productDetailVisualMark">LUMOS SOFTWARE</div>
                  <div className="productDetailVisualGrid" />
                  <div className="softwareVisualPanel">
                    <strong>{locale === "ko" ? "통합 제어 및 분석" : "Integrated Control & Analysis"}</strong>
                    <p>
                      {locale === "ko"
                        ? "장비 제어, 실시간 시각화, 분석, 저장, 외부 시스템 연동을 하나의 운영 환경에서 제공합니다."
                        : "Control, live visualization, analysis, logging, and external system integration are handled in one operational workspace."}
                    </p>
                  </div>
                </>
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
                <span className="eyebrow">Overview</span>
                <h2 className="sectionTitle">
                  {isLumBSeries
                    ? "LUM-B Series Overview"
                    : isLumBLSeries
                      ? "LUM-B-L Series Overview"
                      : "LUM-F Series Overview"}
                </h2>
              </div>
              <div className="productOverviewBody">
                <p style={{ margin: 0, lineHeight: 1.9 }}>
                  {isLumBSeries
                    ? (
                      locale === "ko"
                        ? "LUM-B 시리즈는 Raw Laser Beam Profiling과 분석을 위한 카메라 기반 측정 장비로, 다양한 필터 옵션과 해상도 구성을 통해 산업용 광학 계측 환경에 대응합니다."
                        : "The LUM-B Series is a camera-based measurement platform for raw laser beam profiling and analysis, offering multiple filter and resolution options for industrial optical metrology environments."
                    )
                    : (
                      isLumBLSeries
                        ? (
                          locale === "ko"
                            ? "LUM-B-L 시리즈는 대면적 레이저 빔 프로파일링을 위한 고해상도 측정 플랫폼으로, 대형 센서와 넓은 유효 개구를 통해 확장된 계측 환경에 대응합니다."
                            : "The LUM-B-L Series is a high-resolution platform for large-area laser beam profiling, combining a large sensor and wide clear aperture for expanded measurement environments."
                        )
                        : (
                          locale === "ko"
                            ? "LUM-F 시리즈는 고배율 초점 빔 프로파일링을 위한 측정 플랫폼으로, 파장별 렌즈 유닛과 필터 구성을 통해 미세 스폿 계측 환경에 대응합니다."
                            : "The LUM-F Series is a focused beam profiling platform built for fine spot measurement, combining wavelength-specific objective units and filter configurations."
                        )
                    )}
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
                  src={
                    isLumBSeries
                      ? "/products/lum-b/filter.png"
                      : isLumBLSeries
                        ? "/products/lum-b-l/filter.png"
                        : "/products/lum-f/filter.png"
                  }
                  alt={
                    isLumBSeries
                      ? "LUM-B filter configuration"
                      : isLumBLSeries
                        ? "LUM-B-L filter configuration"
                        : "LUM-F filter configuration"
                  }
                  width={1066}
                  height={isLumBSeries ? 656 : isLumBLSeries ? 598 : 661}
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
                      {isLumBSeries ? (
                        <>
                          <th>LUM-B-D</th>
                          <th>LUM-B-N</th>
                          <th>LUM-B-M</th>
                        </>
                      ) : isLumBLSeries ? (
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
                    {isLumBSeries
                      ? (
                        <>
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
                        </>
                      ) : isLumBLSeries ? (
                        <>
                          {lumBLTechnicalRows.map((row) => (
                            <tr key={row.label}>
                              <th>{row.label}</th>
                              <td colSpan={3}>{row.value}</td>
                            </tr>
                          ))}
                        </>
                      ) : (
                        <>
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
                        </>
                      )}
                  </tbody>
                </table>
              </div>

              <div className="productAccessoryBlock">
                <div className="productAccessoryHeading">Information for Accessories</div>
                <table className="productAccessoryTable">
                  <tbody>
                    {(isLumBSeries
                      ? lumBAccessoryRows
                      : isLumBLSeries
                        ? lumBLAccessoryRows
                        : lumFAccessoryRows).map((row) => (
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
        ) : isLumZSeries ? (
          <>
            <section className="productSection">
              <div className="productSectionHead">
                <span className="eyebrow">Overview</span>
                <h2 className="sectionTitle">LUM-Z Series Overview</h2>
              </div>
              <div className="productOverviewBody">
                <p style={{ margin: 0, lineHeight: 1.9 }}>
                  {locale === "ko"
                    ? "LUM-Z 시리즈는 빔 전파축 방향의 형상을 스캔하고 분석하기 위한 3D 빔 프로파일링 플랫폼으로, 정밀 스텝 제어와 다양한 파장 선택 환경에 대응합니다."
                    : "The LUM-Z Series is a 3D beam profiling platform for scanning and analyzing beam propagation, built for precision step control and selectable wavelength environments."}
                </p>
              </div>
            </section>

            <section className="productSection productFeatureVisualSection">
              <div className="productSectionHead">
                <span className="eyebrow">Measurement View</span>
                <h2 className="sectionTitle">Scan Analysis Interface</h2>
              </div>
              <div className="productFeatureVisualPanel">
                <Image
                  src="/products/lum-z/feature.png"
                  alt="LUM-Z measurement view"
                  width={963}
                  height={646}
                  className="productFeatureVisualImage"
                />
              </div>
            </section>

            <section className="productSection">
              <div className="productSectionHead">
                <span className="eyebrow">Specification</span>
                <h2 className="sectionTitle">Z Axis Scan Spec</h2>
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
        ) : isSoftwareSeries ? (
          <>
            <section className="productSection">
              <div className="productSectionHead">
                <span className="eyebrow">Overview</span>
                <h2 className="sectionTitle">Lumosity Software Overview</h2>
              </div>
              <div className="productOverviewBody">
                <p style={{ margin: 0, lineHeight: 1.9 }}>
                  {locale === "ko"
                    ? "Lumosity는 빔 프로파일링 장비 제어, 측정 데이터 시각화, 분석, 로깅을 통합한 운영 소프트웨어로 생산 라인과 외부 시스템 연동까지 고려한 환경을 제공합니다."
                    : "Lumosity is an operational software suite that combines device control, measurement visualization, analysis, and logging, with support for production line integration and external systems."}
                </p>
              </div>
            </section>

            <section className="productSection productFeatureVisualSection">
              <div className="productSectionHead">
                <span className="eyebrow">Software</span>
                <h2 className="sectionTitle">Core Software Functions</h2>
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
                <span className="eyebrow">Feature</span>
                <h2 className="sectionTitle">Beam Analysis Features</h2>
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
                <span className="eyebrow">Integration</span>
                <h2 className="sectionTitle">Operation & Interface</h2>
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
