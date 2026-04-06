import Link from "next/link";

import { SubpageHero } from "@/components/subpage-hero";
import { getPageHeroConfig, getProducts } from "@/lib/content";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/site";

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
        <div className="productsDirectory">
          {products.map((product, index) => (
            <Link
              key={product.slug}
              href={`/${locale}/products/${product.slug}`}
              className="productDirectoryRow"
            >
              <span className="productDirectoryNo">{String(index + 1).padStart(2, "0")}</span>
              <strong className="productDirectoryName">
                {locale === "ko" ? product.nameKo : product.nameEn}
              </strong>
              <span className="productDirectorySummary">
                {locale === "ko" ? product.summaryKo : product.summaryEn}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
