import Link from "next/link";

import { ProductSubnav } from "@/components/product-subnav";
import { SubpageHero } from "@/components/subpage-hero";
import { getProducts } from "@/lib/content";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/site";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const products = await getProducts();
  const navItems = products.map((product) => ({
    slug: product.slug,
    label: locale === "ko" ? product.nameKo : product.nameEn,
  }));

  return (
    <div className="productsPage">
      <ProductSubnav locale={locale} products={navItems} />
      <SubpageHero
        eyebrow="Product"
        title={dict.products.title}
        description={dict.products.lead}
        tone="products"
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
