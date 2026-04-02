import Link from "next/link";

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

  return (
    <div className="productsPage">
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
