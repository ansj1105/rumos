"use client";

import Link from "next/link";
import { useRef } from "react";

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
  const navRef = useRef<HTMLDivElement | null>(null);

  function scrollNext() {
    navRef.current?.scrollBy({
      left: 180,
      behavior: "smooth",
    });
  }

  return (
    <div className="productSubnav">
      <div className="container productSubnavShell">
        <div ref={navRef} className="productSubnavInner">
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
        <button type="button" className="productSubnavMore" onClick={scrollNext} aria-label="More products">
          &gt;
        </button>
      </div>
    </div>
  );
}
