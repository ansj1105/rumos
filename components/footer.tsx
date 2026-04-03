import Image from "next/image";
import Link from "next/link";

import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/site";

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const productNav = dict.nav.find((item) => item.href === "/products");
  const quickNav = dict.nav.filter((item) => item.href !== "/products");

  return (
    <footer className="siteFooter">
      <div className="container footerInner">
        <div className="footerGrid">
          <div className="footerBrandBlock">
            <Link href={`/${locale}`} className="footerBrand" aria-label={dict.brand}>
              <Image
                src="/lumos-logo-footer.png"
                alt={dict.brand}
                width={318}
                height={86}
                className="footerBrandLogo"
              />
            </Link>
          </div>

          <div className="footerBlock">
            <strong>contact us</strong>
            <span>{dict.footer.company}</span>
            <span>T. {dict.footer.phone}</span>
            <span>F. {dict.footer.fax}</span>
            <a href={`mailto:${dict.footer.email}`} className="footerEmail">
              {dict.footer.email}
            </a>
          </div>

          <div className="footerBlock">
            <strong>Product</strong>
            {productNav?.children?.map((item) => (
              <Link key={item.href} href={`/${locale}${item.href}`}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="footerBlock">
            <strong>quick link</strong>
            {quickNav.map((item) => (
              <div key={item.href} className="footerLinkGroup">
                <Link href={`/${locale}${item.href}`} className="footerGroupTitle">
                  {item.label}
                </Link>
                {item.children?.map((child) => (
                  <Link key={child.href} href={`/${locale}${child.href}`} className="footerSubLink">
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>

          <div className="footerBlock">
            <strong>legal</strong>
            {dict.footer.legal.map((item) => (
              <Link key={item.href} href={`/${locale}${item.href}`}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="footerBottom">
          <span>{dict.brand}</span>
          <span style={{ color: "var(--muted)" }}>
              Copyright 2026 Lumos. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
