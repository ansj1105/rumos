"use client";

import { useRef } from "react";

import type { Locale } from "@/lib/site";

type ApplicationIndexItem = {
  slug: string;
  titleKo: string;
  titleEn: string;
};

export function ApplicationsIndexNav({
  locale,
  items,
}: {
  locale: Locale;
  items: readonly ApplicationIndexItem[];
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
    <section className="applicationsIndex">
      <div className="container applicationsIndexShell">
        <button
          type="button"
          className="applicationsIndexMore isPrev"
          onClick={scrollPrev}
          aria-label={locale === "ko" ? "이전 어플리케이션 보기" : "Previous applications"}
        >
          &lt;
        </button>

        <div ref={navRef} className="applicationsIndexInner">
          {items.map((entry, index) => (
            <a key={entry.slug} href={`#${entry.slug}`} className="applicationsIndexLink">
              <span className="applicationsIndexNo">{String(index + 1).padStart(2, "0")}</span>
              <span>{locale === "ko" ? entry.titleKo : entry.titleEn}</span>
            </a>
          ))}
        </div>

        <button
          type="button"
          className="applicationsIndexMore isNext"
          onClick={scrollNext}
          aria-label={locale === "ko" ? "다음 어플리케이션 보기" : "More applications"}
        >
          &gt;
        </button>
      </div>
    </section>
  );
}
