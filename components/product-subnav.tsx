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

  function scrollPrev() {
    navRef.current?.scrollBy({
      left: -180,
      behavior: "smooth",
    });
  }

  return (
    <div className="productSubnav">
      <div className="container productSubnavShell">
        <button
          type="button"
          className="productSubnavMore isPrev"
          onClick={scrollPrev}
          aria-label={locale === "ko" ? "이전 제품 보기" : "Previous products"}
        >
          &lt;
        </button>
        <div ref={navRef} className="productSubnavInner">
          <Link href={`/${locale}/products`} className={`productSubnavLink ${!activeSlug ? "isActive" : ""}`}>
            {locale === "ko" ? "전체 제품" : "All Products"}
          </Link>
          {products.map((product, index) => (
            <Link
              key={product.slug}
              href={`/${locale}/products/${product.slug}`}
              className={`productSubnavLink ${activeSlug === product.slug ? "isActive" : ""}`}
            >
              <span className="productSubnavIndex">{String(index + 1).padStart(2, "0")}</span>
              {product.label}
            </Link>
          ))}
        </div>
        <button
          type="button"
          className="productSubnavMore isNext"
          onClick={scrollNext}
          aria-label={locale === "ko" ? "다음 제품 보기" : "More products"}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
