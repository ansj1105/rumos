import Link from "next/link";
import Image from "next/image";

import { SubpageHero } from "@/components/subpage-hero";
import { getPageHeroConfig, getProducts } from "@/lib/content";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/site";

const productOverviewCopy = {
  "lum-b": {
    title: "LUM-B Series",
    bodyEn:
      "A versatile RAW laser beam profiler for industrial and research applications. It supports a wide range of lasers (UV to IR) with selectable models based on wavelength and sensor configurations.",
    bodyKo:
      "산업 · 연구 현장에서 범용적으로 사용 가능한 RAW 레이저 빔 프로파일러이며, 파장대와 센서 구성에 따라 모델을 선택하여 다양한 레이저(UV~IR)에 대응할 수 있습니다.",
  },
  "lum-f": {
    title: "LUM-F Series",
    bodyEn:
      "A micro spot measurement beam profiler featuring an all-in-one integrated design that covers the UV to IR spectrum.",
    bodyKo:
      "UV~IR 구간 측정을 ONE-BODY 통합 구조로 제공하는 Micro Spot Measurement 빔 프로파일러입니다.",
  },
  "lum-b-l": {
    title: "LUM-B-L Series",
    bodyEn:
      "A large-area sensor-based beam profiler designed for large-diameter beam measurements. It is ideal for verifying the quality of expansive beams, including expanded beams, flat-top beams, and pre-scanning beams.",
    bodyKo:
      "대면적 센서 기반으로 대구경 · 대형 빔 측정을 지원하는 빔 프로파일러이며, 확장빔과 플랫탑빔, 스캐닝 전 빔 품질 검증에 적합합니다.",
  },
  "lum-z": {
    title: "LUM-Z Series",
    bodyEn:
      "A precision 3D beam profiling and analysis system designed for detailed spot size and depth-of-focus evaluation, supported by intuitive 2D and 3D profile viewers.",
    bodyKo:
      "정밀한 3D 빔 프로파일링 및 분석을 위해 설계된 전용 시스템입니다. 스팟 사이즈(Spot size)와 초점 심도(DOF) 측정이 가능하며, 직관적인 2D 및 3D 빔 프로파일 뷰어를 통해 3D 광도(Intensity) 분포를 상세하게 분석할 수 있습니다.",
  },
  software: {
    title: "Software",
    bodyEn: "Details are currently being finalized.",
    bodyKo: "현재 미정",
  },
} as const;

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const [products, heroConfig] = await Promise.all([getProducts(), getPageHeroConfig("products")]);

  return (
    <div className="productsPage">
      <SubpageHero
        eyebrow={locale === "ko" ? heroConfig?.eyebrowKo || "Product" : heroConfig?.eyebrowEn || "Product"}
        title={locale === "ko" ? heroConfig?.titleKo || dict.products.title : heroConfig?.titleEn || dict.products.title}
        description={locale === "ko" ? heroConfig?.descriptionKo || dict.products.lead : heroConfig?.descriptionEn || dict.products.lead}
        tone="products"
        backgroundImageUrl={heroConfig?.backgroundImageUrl || "/subpage-lum-b-bg.png"}
        backgroundOpacity={heroConfig?.backgroundOpacity ?? 0.9}
      />
      <div className="container subpageContent">
        <div className="productsShowcase">
          {products.map((product, index) => (
            <Link
              key={product.slug}
              href={`/${locale}/products/${product.slug}`}
              className="productShowcaseRow"
            >
              <div className="productShowcaseMedia">
                <Image
                  src={product.imageUrl || "/products/lum-b/main.png"}
                  alt={locale === "ko" ? product.nameKo : product.nameEn}
                  width={1200}
                  height={900}
                  sizes="(max-width: 960px) 100vw, 280px"
                  className="productShowcaseImage"
                />
              </div>
              <div className="productShowcaseBody">
                <span className="productDirectoryNo">{String(index + 1).padStart(2, "0")}</span>
                <h2 className="productShowcaseTitle">
                  {productOverviewCopy[product.slug as keyof typeof productOverviewCopy]?.title ??
                    `${locale === "ko" ? product.nameKo : product.nameEn} Series`}
                </h2>
                <p className="productShowcaseText">
                  {locale === "ko"
                    ? productOverviewCopy[product.slug as keyof typeof productOverviewCopy]?.bodyKo ??
                      product.summaryKo
                    : productOverviewCopy[product.slug as keyof typeof productOverviewCopy]?.bodyEn ??
                      product.summaryEn}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
