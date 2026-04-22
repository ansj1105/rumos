import Image from "next/image";
import Link from "next/link";

import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/site";

const footerProductLabels: Record<string, string> = {
  "/products/lum-b": "LUM-B",
  "/products/lum-b-l": "LUM-B-L",
  "/products/lum-f": "LUM-F",
  "/products/lum-z": "LUM-Z",
  "/products/software": "Software",
  "/products/ifi": "IFI",
  "/products/customizing": "Customizing",
};

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const phoneHref = `tel:${dict.footer.phone.replace(/[^\d+]/g, "")}`;
  const companyNav = dict.nav.find((item) => item.href === "/company" || item.label === "Company");
  const productNav = dict.nav.find((item) => item.href === "/products");
  const applicationNav = dict.nav.find((item) => item.href === "/applications");
  const contactNav = dict.nav.find((item) => item.href === "/contact");
  const footerLabels =
    locale === "ko"
      ? {
          heading: "Headquarter",
          product: "Product",
          quickLink: "Quick Link",
          legal: "Legal",
          company: "Company",
          application: "어플리케이션",
          contactUs: "문의하기",
          telFaxPrefix: "Tel.",
          copyright: "Copyright 2026 Lumos. All Rights Reserved.",
        }
      : {
          heading: "Headquarter",
          product: "Product",
          quickLink: "Quick Link",
          legal: "Legal",
          company: "Company",
          application: "Application",
          contactUs: "Contact Us",
          telFaxPrefix: "Tel.",
          copyright: "Copyright 2026 Lumos. All Rights Reserved.",
        };

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
            <strong>{footerLabels.heading}</strong>
            <span>{dict.footer.company}</span>
            {dict.footer.companyLine2 ? <span>{dict.footer.companyLine2}</span> : null}
            <span>
              {footerLabels.telFaxPrefix} <a href={phoneHref} className="footerPhoneLink">{dict.footer.phone}</a>
            </span>
            <span>
              Fax. {dict.footer.fax}
            </span>
            <span className="footerEmail">
              {dict.footer.email}
            </span>
          </div>

          <div className="footerBlock">
            <strong>{footerLabels.product}</strong>
            {productNav?.children?.map((item) => (
              <Link key={item.href} href={`/${locale}${item.href}`}>
                {footerProductLabels[item.href] ?? item.label}
              </Link>
            ))}
          </div>

          <div className="footerBlock">
            <strong>{footerLabels.quickLink}</strong>
            {companyNav ? <Link href={`/${locale}${companyNav.href}`}>{footerLabels.company}</Link> : null}
            {applicationNav ? <Link href={`/${locale}${applicationNav.href}`}>{footerLabels.application}</Link> : null}
            {contactNav ? <Link href={`/${locale}${contactNav.href}`}>{footerLabels.contactUs}</Link> : null}
            {productNav ? <Link href={`/${locale}${productNav.href}`}>{footerLabels.product}</Link> : null}
          </div>

          <div className="footerBlock">
            <strong>{footerLabels.legal}</strong>
            {dict.footer.legal.map((item) => (
              <Link key={item.href} href={`/${locale}${item.href}`}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="footerBottom">
          <span style={{ color: "var(--muted)" }}>{footerLabels.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
