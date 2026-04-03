"use client";

import { useEffect, useRef, useState } from "react";

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
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    const nav = navRef.current;

    if (!nav) {
      return;
    }

    function updateScrollState() {
      if (!nav) {
        return;
      }

      const maxScrollLeft = nav.scrollWidth - nav.clientWidth;
      setCanScrollPrev(nav.scrollLeft > 4);
      setCanScrollNext(maxScrollLeft - nav.scrollLeft > 4);
    }

    updateScrollState();
    nav.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      nav.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [items.length]);

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
          className={`applicationsIndexMore isPrev ${canScrollPrev ? "isVisible" : ""}`}
          onClick={scrollPrev}
          aria-label={locale === "ko" ? "이전 어플리케이션 보기" : "Previous applications"}
          aria-hidden={!canScrollPrev}
          tabIndex={canScrollPrev ? 0 : -1}
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
          className={`applicationsIndexMore isNext ${canScrollNext ? "isVisible" : ""}`}
          onClick={scrollNext}
          aria-label={locale === "ko" ? "다음 어플리케이션 보기" : "More applications"}
          aria-hidden={!canScrollNext}
          tabIndex={canScrollNext ? 0 : -1}
        >
          &gt;
        </button>
      </div>
    </section>
  );
}
