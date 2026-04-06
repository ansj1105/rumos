"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import type { Locale } from "@/lib/site";

const seriesItems = [
  {
    slug: "lum-b",
    name: "LUM-B",
    taglineKo: "Raw Beam Profiler",
    taglineEn: "Raw Beam Profiler",
    imageUrl: "/products/lum-b/main.png",
    imageClassName: "isLumB",
  },
  {
    slug: "lum-b-l",
    name: "LUM-B-L",
    taglineKo: "Large Beam Profiler",
    taglineEn: "Large Beam Profiler",
    imageUrl: "/products/lum-b-l/main.png",
    imageClassName: "isLumBL",
  },
  {
    slug: "lum-f",
    name: "LUM-F",
    taglineKo: "Focus Beam Profiler",
    taglineEn: "Focus Beam Profiler",
    imageUrl: "/products/lum-f/main.png",
    imageClassName: "isLumF",
  },
  {
    slug: "lum-z",
    name: "LUM-Z",
    taglineKo: "3D Beam Profiler",
    taglineEn: "3D Beam Profiler",
    imageUrl: "/products/lum-z/main.png",
    imageClassName: "isLumZ",
  },
  {
    slug: "software",
    name: "Software",
    taglineKo: "Lumosity Software",
    taglineEn: "Lumosity Software",
    imageUrl: "/products/software/main.png",
    imageClassName: "isSoftware",
  },
] as const;

export function HomeSeriesOverview({
  locale,
  title,
  lead,
}: {
  locale: Locale;
  title?: string | null;
  lead?: string | null;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState<number | null>(null);

  function goToPrev() {
    setCurrentIndex((index) => (index === 0 ? seriesItems.length - 1 : index - 1));
  }

  function goToNext() {
    setCurrentIndex((index) => (index + 1) % seriesItems.length);
  }

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % seriesItems.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="homeSeriesSection" className="homeSeriesSection">
      <div className="container homeSeriesInner">
        <div className="homeSeriesHead">
          <h2 className="sectionTitle">{title ?? "LUMOS series overview"}</h2>
          <p className="sectionLead">
            {lead ??
              (locale === "ko"
                ? "빔 프로파일러와 운용 소프트웨어 라인업을 한 번에 확인할 수 있습니다."
                : "Explore the beam profiler lineup and operational software in one view.")}
          </p>
        </div>

        <div className="homeSeriesRailDesktop">
          <div className="homeSeriesRail">
            {seriesItems.map((item) => (
              <SeriesCard key={item.slug} item={item} locale={locale} />
            ))}
          </div>
        </div>

        <div className="homeSeriesSlider">
          <div
            className="homeSeriesSliderViewport"
            onPointerDown={(event) => setDragStartX(event.clientX)}
            onPointerUp={(event) => {
              if (dragStartX === null) {
                return;
              }

              const delta = dragStartX - event.clientX;

              if (Math.abs(delta) > 40) {
                if (delta > 0) {
                  goToNext();
                } else {
                  goToPrev();
                }
              }

              setDragStartX(null);
            }}
            onPointerCancel={() => setDragStartX(null)}
            onPointerLeave={() => setDragStartX(null)}
          >
            <div
              className="homeSeriesSliderTrack"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {seriesItems.map((item) => (
                <div key={item.slug} className="homeSeriesSlide">
                  <Link href={`/${locale}/products/${item.slug}`} className="seriesCard seriesCardMobile">
                    <div className="seriesCardMedia">
                      <div className={`seriesCardMediaFrame ${item.imageClassName}`}>
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          width={1200}
                          height={900}
                          sizes="84vw"
                          className={`seriesCardImage ${item.imageClassName}`}
                        />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <Link
            href={`/${locale}/products/${seriesItems[currentIndex].slug}`}
            className="seriesCardBody seriesCardBodyMobile"
          >
            <div className="seriesCardText">
              <strong>{seriesItems[currentIndex].name}</strong>
              <span>{locale === "ko" ? seriesItems[currentIndex].taglineKo : seriesItems[currentIndex].taglineEn}</span>
            </div>
            <span className="seriesCardArrow" aria-hidden="true">
              ↗
            </span>
          </Link>

          <div className="homeSeriesSliderControls" aria-hidden="true">
            <button
              type="button"
              className="homeSeriesSliderButton"
              onClick={goToPrev}
              aria-label="Previous product"
            >
              ‹
            </button>

            <div className="homeSeriesSliderDots">
              {seriesItems.map((item, index) => (
                <button
                  key={item.slug}
                  type="button"
                  className={`homeSeriesSliderDot ${index === currentIndex ? "isActive" : ""}`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to ${item.name}`}
                />
              ))}
            </div>

            <button
              type="button"
              className="homeSeriesSliderButton"
              onClick={goToNext}
              aria-label="Next product"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SeriesCard({
  item,
  locale,
}: {
  item: (typeof seriesItems)[number];
  locale: Locale;
}) {
  return (
    <Link href={`/${locale}/products/${item.slug}`} className="seriesCard">
      <div className="seriesCardMedia">
        <div className={`seriesCardMediaFrame ${item.imageClassName}`}>
          <Image
            src={item.imageUrl}
            alt={item.name}
            width={1200}
            height={900}
            sizes="(max-width: 960px) 84vw, (max-width: 1180px) 32vw, 20vw"
            className={`seriesCardImage ${item.imageClassName}`}
          />
        </div>
      </div>

      <div className="seriesCardBody">
        <div className="seriesCardText">
          <strong>{item.name}</strong>
          <span>{locale === "ko" ? item.taglineKo : item.taglineEn}</span>
        </div>
        <span className="seriesCardArrow" aria-hidden="true">
          ↗
        </span>
      </div>
    </Link>
  );
}
