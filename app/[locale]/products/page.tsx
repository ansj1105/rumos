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
      "A beam profiler that performs real-time, high-precision measurement and analysis of laser beam shapes based on a high-resolution sensor.",
    bodyKo:
      "\uACE0\uD574\uC0C1\uB3C4 \uC13C\uC11C\uB97C \uAE30\uBC18\uC73C\uB85C \uB808\uC774\uC800 \uBE54 \uD615\uC0C1\uC744 \uC2E4\uC2DC\uAC04 \uC815\uBC00 \uCE21\uC815\u00B7\uBD84\uC11D\uD558\uB294 \uBE54 \uD504\uB85C\uD30C\uC77C\uB7EC",
  },
  "lum-b-l": {
    title: PRODUCT_DISPLAY_NAMES["lum-b-l"],
    bodyEn:
      "A beam profiler based on a large-area sensor for high-resolution measurement and analysis of beams up to 38 x 27 mm.",
    bodyKo:
      "\uB300\uBA74\uC801 \uC13C\uC11C\uB97C \uAE30\uBC18\uC73C\uB85C \uCD5C\uB300 38 \u00D7 27 mm \uBE54\uC744 \uACE0\uD574\uC0C1\uB3C4\uB85C \uCE21\uC815\u00B7\uBD84\uC11D\uD558\uB294 \uBE54 \uD504\uB85C\uD30C\uC77C\uB7EC",
  },
  "lum-f": {
    title: PRODUCT_DISPLAY_NAMES["lum-f"],
    bodyEn:
      "A high-resolution micro beam profiler for precise measurement of fine spots down to approximately 3 um.",
    bodyKo:
      "\uCD5C\uC18C \u00D83\u03BCm \uC218\uC900\uC758 \uBBF8\uC138 \uC2A4\uD31F\uC744 \uC815\uBC00 \uCE21\uC815\uD558\uB294 \uACE0\uD574\uC0C1\uB3C4 \uB9C8\uC774\uD06C\uB85C \uBE54 \uD504\uB85C\uD30C\uC77C\uB7EC",
  },
  "lum-z": {
    title: PRODUCT_DISPLAY_NAMES["lum-z"],
    bodyEn:
      "A beam profiler that precisely measures and analyzes laser beam spot size and DOF in 3D through Z-axis scanning.",
    bodyKo:
      "LUM-Z\uB294 Z\uCD95 \uC2A4\uCE94\uC744 \uD1B5\uD574 \uB808\uC774\uC800 \uBE54\uC758 \uC2A4\uD31F \uD06C\uAE30\uC640 DOF\uB97C 3D\uB85C \uC815\uBC00 \uCE21\uC815\u00B7\uBD84\uC11D\uD558\uB294 \uBE54 \uD504\uB85C\uD30C\uC77C\uB7EC",
  },
  software: {
    title: PRODUCT_DISPLAY_NAMES.software,
    bodyEn:
      "Beam profiling software that integrates ISO-standard analysis with 2D and 3D visualization.",
    bodyKo:
      "ISO \uD45C\uC900 \uAE30\uBC18 \uBD84\uC11D\uACFC 2D\u00B73D \uC2DC\uAC01\uD654\uB97C \uD1B5\uD569 \uC81C\uACF5\uD558\uB294 \uBE54 \uD504\uB85C\uD30C\uC77C\uB9C1 \uC18C\uD504\uD2B8\uC6E8\uC5B4",
  },
  ifi: {
    title: PRODUCT_DISPLAY_NAMES.ifi,
    bodyEn:
      "Infinity Flat Top imaging optics delivering over 90% uniformity across the entire focal range.",
    bodyKo:
      "\uC804 \uCD08\uC810 \uC601\uC5ED \uC804\uBC18\uC5D0\uC11C 90% \uC774\uC0C1 \uADE0\uC77C\uB3C4\uB97C \uAD6C\uD604\uD558\uB294 Infinity Flat Top \uC774\uBBF8\uC9D5 \uAD11\uD559\uACC4",
  },
  customizing: {
    title: PRODUCT_DISPLAY_NAMES.customizing,
    bodyEn:
      "Custom optical design optimized for process conditions to deliver the highest beam quality.",
    bodyKo:
      "\uACF5\uC815 \uC870\uAC74\uC5D0 \uCD5C\uC801\uD654\uB41C \uB9DE\uCDA4\uD615 \uAD11\uD559 \uC124\uACC4\uB85C \uCD5C\uC0C1\uC758 \uBE54 \uD488\uC9C8 \uAD6C\uD604",
  },
} as const;

const productFallbackImages = {
  "lum-b": "/products/lum-b/main.png",
  "lum-b-l": "/products/lum-b-l/main.png",
  "lum-f": "/products/lum-f/main.png",
  "lum-z": "/products/lum-z/main.png",
  ifi: "/products/ifi/main.png",
  software: "/products/software/main.png",
  customizing: "/products/customizing/main.png",
} as const;

function getProductShowcaseImage(slug: string, imageUrl?: string | null) {
  if (slug === "customizing") {
    return productFallbackImages.customizing;
  }

  return imageUrl || productFallbackImages[slug as keyof typeof productFallbackImages] || "/products/lum-b/main.png";
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const [products, heroConfig] = await Promise.all([getProducts(), getPageHeroConfig("products")]);
  const productsHeroBackgroundImage =
    !heroConfig?.backgroundImageUrl ||
    heroConfig.backgroundImageUrl === "/subpage-products-hero.png" ||
    heroConfig.backgroundImageUrl === "/subpage-products-hero-pc.png" ||
    heroConfig.backgroundImageUrl === "/subpage-lum-b-bg.png"
      ? "/subpage-products-laser-bg.png"
      : heroConfig.backgroundImageUrl;

  return (
    <div className="productsPage">
      <SubpageHero
        eyebrow={locale === "ko" ? heroConfig?.eyebrowKo || "Product" : heroConfig?.eyebrowEn || "Product"}
        title={locale === "ko" ? heroConfig?.titleKo || dict.products.title : heroConfig?.titleEn || dict.products.title}
        description={
          locale === "ko" ? heroConfig?.descriptionKo || dict.products.lead : heroConfig?.descriptionEn || dict.products.lead
        }
        tone="products"
        backgroundImageUrl={productsHeroBackgroundImage}
        desktopBackgroundImageUrl={productsHeroBackgroundImage}
        backgroundOpacity={heroConfig?.backgroundOpacity ?? 0.9}
      />
      <div className="container subpageContent">
        <div className="productsShowcase">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/${locale}/products/${product.slug}`}
              className="productShowcaseRow"
            >
              <div className="productShowcaseMedia">
                <Image
                  src={getProductShowcaseImage(product.slug, product.imageUrl)}
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
                    ? productOverviewCopy[product.slug as keyof typeof productOverviewCopy]?.bodyKo ?? product.summaryKo
                    : productOverviewCopy[product.slug as keyof typeof productOverviewCopy]?.bodyEn ?? product.summaryEn}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
