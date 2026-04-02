import Link from "next/link";

import type { Locale } from "@/lib/site";

type ProductNavItem = {
  slug: string;
  label: string;
};

export function ProductSubnav({
  locale,
  products,
  activeSlug,
}: {
  locale: Locale;
  products: ProductNavItem[];
  activeSlug?: string;
}) {
  return (
    <div className="productSubnav">
      <div className="container productSubnavInner">
        <Link href={`/${locale}/products`} className={`productSubnavLink ${!activeSlug ? "isActive" : ""}`}>
          All Products
        </Link>
        {products.map((product) => (
          <Link
            key={product.slug}
            href={`/${locale}/products/${product.slug}`}
            className={`productSubnavLink ${activeSlug === product.slug ? "isActive" : ""}`}
          >
            {product.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
