import Image from "next/image";
import Link from "next/link";

import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/site";

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <footer className="siteFooter">
      <div className="container footerInner">
        <div className="footerGrid">
          <div className="footerBlock">
            <strong className="footerBrand">
              <Image
                src="/lumos-logo.png"
                alt={dict.brand}
                width={318}
                height={86}
                className="footerBrandLogo"
              />
            </strong>
            <span>{dict.footer.company}</span>
            <span>08594</span>
            <span>T. 02-852-0533</span>
            <span>F. 02-853-0537</span>
          </div>
          <div className="footerBlock">
            <strong>Quick Links</strong>
            <Link href={`/${locale}/applications`}>Applications</Link>
            <Link href={`/${locale}/products`}>Products</Link>
            <Link href={`/${locale}/contact`}>Contact</Link>
          </div>
          <div className="footerBlock">
            <strong>Legal</strong>
            {dict.footer.legal.map((item) => (
              <span key={item}>{item}</span>
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
