"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import type { Locale } from "@/lib/site";

type SeriesCardItem = {
  slug: string;
  name: string;
  imageUrl: string;
  imageClassName: string;
};

const seriesItems: SeriesCardItem[] = [
  {
    slug: "lum-b",
    name: "Raw Beam Profiler (LUM-B)",
    imageUrl: "/products/lum-b/main.png",
    imageClassName: "isLumB",
  },
  {
    slug: "lum-b-l",
    name: "Large Beam Profiler (LUM-B-L)",
    imageUrl: "/products/lum-b-l/main.png",
    imageClassName: "isLumBL",
  },
  {
    slug: "lum-f",
    name: "Focus Beam Profiler (LUM-F)",
    imageUrl: "/products/lum-f/main.png",
    imageClassName: "isLumF",
  },
  {
    slug: "lum-z",
    name: "3D Beam Profiling and Analysis (LUM-Z)",
    imageUrl: "/products/lum-z/main.png",
    imageClassName: "isLumZ",
  },
  {
    slug: "software",
    name: "Lumosity (Software)",
    imageUrl: "/products/software/main.png",
    imageClassName: "isSoftware",
  },
  {
    slug: "ifi",
    name: "Infinity Flat Top Imaging Optics (IFI)",
    imageUrl: "/products/ifi/main.png",
    imageClassName: "isIFI",
  },
  {
    slug: "customizing",
    name: "Customizing",
    imageUrl: "/products/lum-b/main.png",
    imageClassName: "isLumB",
  },
];

type SeriesProductSource = {
  slug: string;
  imageUrl: string | null;
};

export function HomeSeriesOverview({
  locale,
  title,
  products,
}: {
  locale: Locale;
  title?: string | null;
  lead?: string | null;
  products?: SeriesProductSource[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const mergedSeriesItems = seriesItems.map((item) => {
    const product = products?.find((candidate) => candidate.slug === item.slug);
    return {
      ...item,
      imageUrl: product?.imageUrl || item.imageUrl,
    };
  });
  const desktopTopRow = mergedSeriesItems.slice(0, 4);
  const desktopBottomRow = mergedSeriesItems.slice(4, 7);

  function goToPrev() {
    setCurrentIndex((index) => (index === 0 ? mergedSeriesItems.length - 1 : index - 1));
  }

  function goToNext() {
    setCurrentIndex((index) => (index + 1) % mergedSeriesItems.length);
  }

  return (
    <section id="homeSeriesSection" className="homeSeriesSection">
      <div className="container homeSeriesInner">
        <div className="homeSeriesHead">
          <h2 className="sectionTitle">{title ?? "LUMOS series"}</h2>
        </div>

        <div className="homeSeriesDesktop">
          <div className="homeSeriesRow isTop">
            {desktopTopRow.map((item) => (
              <SeriesFeatureCard key={item.slug} item={item} locale={locale} />
            ))}
          </div>
          <div className="homeSeriesRow isBottom">
            {desktopBottomRow.map((item) => (
              <SeriesFeatureCard key={item.slug} item={item} locale={locale} />
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
              {mergedSeriesItems.map((item) => (
                <div key={item.slug} className="homeSeriesSlide">
                  <SeriesFeatureCard item={item} locale={locale} />
                </div>
              ))}
            </div>
          </div>

          <div className="homeSeriesSliderControls">
            <button
              type="button"
              className="homeSeriesSliderButton"
              onClick={goToPrev}
              aria-label="Previous product"
            >
              ‹
            </button>

            <div className="homeSeriesSliderDots">
              {mergedSeriesItems.map((item, index) => (
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

function SeriesFeatureCard({
  item,
  locale,
}: {
  item: SeriesCardItem;
  locale: Locale;
}) {
  return (
    <Link href={`/${locale}/products/${item.slug}`} className="seriesFeatureCard" data-series-slug={item.slug}>
      <div className="seriesFeatureMedia">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          sizes="(max-width: 960px) 100vw, 25vw"
          className={`seriesFeatureImage ${item.imageClassName}`}
        />
      </div>
      <div className="seriesFeatureContent">
        <strong className="seriesFeatureTitle">{item.name}</strong>
      </div>
    </Link>
  );
}
