import Link from "next/link";
import Image from "next/image";

import { SubpageHero } from "@/components/subpage-hero";
import { getPageHeroConfig, getProducts } from "@/lib/content";
import { getDictionary } from "@/lib/dictionaries";
import { PRODUCT_DISPLAY_NAMES } from "@/lib/product-display";
import type { Locale } from "@/lib/site";

const productOverviewCopy = {
  "lum-b": {
    title: PRODUCT_DISPLAY_NAMES["lum-b"],
    bodyEn:
      "A versatile RAW laser beam profiler for industrial and research applications. It supports a wide range of lasers (UV to IR) with selectable models based on wavelength and sensor configurations.",
    bodyKo:
      "산업 · 연구 현장에서 범용적으로 사용 가능한 RAW 레이저 빔 프로파일러이며, 파장대와 센서 구성에 따라 모델을 선택하여 다양한 레이저(UV~IR)에 대응할 수 있습니다.",
  },
  "lum-f": {
    title: PRODUCT_DISPLAY_NAMES["lum-f"],
    bodyEn:
      "A micro spot measurement beam profiler featuring an all-in-one integrated design that covers the UV to IR spectrum.",
    bodyKo:
      "UV~IR 구간 측정을 ONE-BODY 통합 구조로 제공하는 Micro Spot Measurement 빔 프로파일러입니다.",
  },
  "lum-b-l": {
    title: PRODUCT_DISPLAY_NAMES["lum-b-l"],
    bodyEn:
      "A large-area sensor-based beam profiler designed for large-diameter beam measurements. It is ideal for verifying the quality of expansive beams, including expanded beams, flat-top beams, and pre-scanning beams.",
    bodyKo:
      "대면적 센서 기반으로 대구경 · 대형 빔 측정을 지원하는 빔 프로파일러이며, 확장빔과 플랫탑빔, 스캐닝 전 빔 품질 검증에 적합합니다.",
  },
  "lum-z": {
    title: PRODUCT_DISPLAY_NAMES["lum-z"],
    bodyEn:
      "A precision 3D beam profiling and analysis system designed for detailed spot size and depth-of-focus evaluation, supported by intuitive 2D and 3D profile viewers.",
    bodyKo:
      "정밀한 3D 빔 프로파일링 및 분석을 위해 설계된 전용 시스템입니다. 스팟 사이즈(Spot size)와 초점 심도(DOF) 측정이 가능하며, 직관적인 2D 및 3D 빔 프로파일 뷰어를 통해 3D 광도(Intensity) 분포를 상세하게 분석할 수 있습니다.",
  },
  ifi: {
    title: PRODUCT_DISPLAY_NAMES.ifi,
    bodyEn:
      "An IFI series optical solution that maintains beam uniformity above 90% across focal ranges and supports infinity flat top projection with NA.",
    bodyKo:
      "전 초점 거리 범위에서 90% 이상의 빔 균일도를 유지하고 Infinity Flat Top 투영을 지원하는 IFI 시리즈 광학 솔루션입니다.",
  },
  software: {
    title: PRODUCT_DISPLAY_NAMES.software,
    bodyEn:
      "An intuitive beam analysis software suite that accurately analyzes only the required area through automatic center detection and ROI functions, even across diverse beam shapes.",
    bodyKo:
      "다양한 빔 형태에서도 자동 중심 검출과 ROI 기능을 통해 필요한 영역만 정확하게 분석할 수 있는 직관적인 빔 분석 소프트웨어입니다.",
  },
  customizing: {
    title: PRODUCT_DISPLAY_NAMES.customizing,
    bodyEn:
      "A customization program for adapting optics, mechanics, and software around specific beam measurement environments and line-integration requirements.",
    bodyKo:
      "특정 빔 계측 환경과 라인 연동 요구사항에 맞춰 광학, 기구, 소프트웨어 구성을 최적화하는 맞춤형 솔루션 프로그램입니다.",
  },
} as const;

const productFallbackImages = {
  "lum-b": "/products/lum-b/main.png",
  "lum-b-l": "/products/lum-b-l/main.png",
  "lum-f": "/products/lum-f/main.png",
  "lum-z": "/products/lum-z/main.png",
  ifi: "/products/ifi/main.png",
  software: "/products/software/main.png",
  customizing: "/products/lum-b/main.png",
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
        backgroundImageUrl={heroConfig?.backgroundImageUrl || "/subpage-products-hero.png"}
        desktopBackgroundImageUrl="/subpage-products-hero-pc.png"
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
                  src={
                    product.imageUrl ||
                    productFallbackImages[product.slug as keyof typeof productFallbackImages] ||
                    "/products/lum-b/main.png"
                  }
                  alt={locale === "ko" ? product.nameKo : product.nameEn}
                  width={1200}
                  height={900}
                  sizes="(max-width: 960px) 100vw, 280px"
                  className="productShowcaseImage"
                />
              </div>
              <div className="productShowcaseBody">
                <h2 className="productShowcaseTitle">
                  {productOverviewCopy[product.slug as keyof typeof productOverviewCopy]?.title ??
                    `${locale === "ko" ? product.nameKo : product.nameEn}`}
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
