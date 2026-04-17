"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import type { Locale } from "@/lib/site";

type SeriesCardItem = {
  slug: string;
  name: string;
  taglineKo: string;
  taglineEn: string;
  summaryKo: string;
  summaryEn: string;
  keywordsKo: string[];
  keywordsEn: string[];
  imageUrl: string;
  imageClassName: string;
  layoutClassName: string;
};

const seriesItems: SeriesCardItem[] = [
  {
    slug: "lum-b",
    name: "LUM-B",
    taglineKo: "Raw Beam Profiler",
    taglineEn: "Raw Beam Profiler",
    summaryKo:
      "레이저 소스의 기본 빔 형상과 균일도를 빠르게 파악할 수 있도록 설계된 표준형 프로파일러입니다.",
    summaryEn:
      "A standard profiler designed to capture core beam shape and uniformity data with speed and clarity.",
    keywordsKo: ["Raw beam", "Uniformity", "Alignment"],
    keywordsEn: ["Raw beam", "Uniformity", "Alignment"],
    imageUrl: "/products/lum-b/main.png",
    imageClassName: "isLumB",
    layoutClassName: "isPrimary",
  },
  {
    slug: "lum-b-l",
    name: "LUM-B-L",
    taglineKo: "Large Beam Profiler",
    taglineEn: "Large Beam Profiler",
    summaryKo:
      "대구경 광원과 넓은 조사 영역을 안정적으로 측정하기 위한 라지 포맷 빔 프로파일러입니다.",
    summaryEn:
      "A large-format beam profiler optimized for broad illumination zones and large-diameter sources.",
    keywordsKo: ["Large aperture", "Wide field", "Process setup"],
    keywordsEn: ["Large aperture", "Wide field", "Process setup"],
    imageUrl: "/products/lum-b-l/main.png",
    imageClassName: "isLumBL",
    layoutClassName: "isTopRight",
  },
  {
    slug: "lum-f",
    name: "LUM-F",
    taglineKo: "Focus Beam Profiler",
    taglineEn: "Focus Beam Profiler",
    summaryKo:
      "초점 위치와 집광 품질을 정밀하게 확인해 미세 공정에서 필요한 최적 조건을 빠르게 잡아냅니다.",
    summaryEn:
      "A focused-beam solution for fine process tuning, focal-position checks, and high-density spot analysis.",
    keywordsKo: ["Focus", "Spot size", "Fine tuning"],
    keywordsEn: ["Focus", "Spot size", "Fine tuning"],
    imageUrl: "/products/lum-f/main.png",
    imageClassName: "isLumF",
    layoutClassName: "isCenter",
  },
  {
    slug: "lum-z",
    name: "LUM-Z",
    taglineKo: "3D Beam Profiler",
    taglineEn: "3D Beam Profiler",
    summaryKo:
      "Z축 기반 분석으로 깊이 방향의 빔 거동까지 시각화해 입체적인 공정 검증을 지원합니다.",
    summaryEn:
      "A 3D profiling platform that visualizes beam behavior through the Z-axis for deeper process validation.",
    keywordsKo: ["3D mapping", "Z scan", "Depth profile"],
    keywordsEn: ["3D mapping", "Z scan", "Depth profile"],
    imageUrl: "/products/lum-z/main.png",
    imageClassName: "isLumZ",
    layoutClassName: "isBottomLeft",
  },
  {
    slug: "ifi",
    name: "IFI",
    taglineKo: "IFI Series",
    taglineEn: "IFI Series",
    summaryKo:
      "전 초점 거리 범위에서 90% 이상의 빔 균일도를 유지하도록 설계된 Infinity Flat Top 광학 솔루션입니다.",
    summaryEn:
      "An infinity flat top optical solution designed to maintain beam uniformity above 90% across focal ranges.",
    keywordsKo: ["Infinity flat top", "Uniformity", "NA"],
    keywordsEn: ["Infinity flat top", "Uniformity", "NA"],
    imageUrl: "/products/ifi/main.png",
    imageClassName: "isIFI",
    layoutClassName: "isBottomRight",
  },
  {
    slug: "software",
    name: "Software",
    taglineKo: "Lumosity Software",
    taglineEn: "Lumosity Software",
    summaryKo:
      "측정 데이터 시각화와 분석, 리포트까지 하나의 운용 환경에서 연결하는 소프트웨어 스위트입니다.",
    summaryEn:
      "An operational software suite that connects visualization, analysis, and reporting in one workflow.",
    keywordsKo: ["Visualization", "Analysis", "Reporting"],
    keywordsEn: ["Visualization", "Analysis", "Reporting"],
    imageUrl: "/products/software/main.png",
    imageClassName: "isSoftware",
    layoutClassName: "isSoftwareOffset",
  },
];

type SeriesProductSource = {
  slug: string;
  imageUrl: string | null;
};

export function HomeSeriesOverview({
  locale,
  title,
  lead,
  products,
}: {
  locale: Locale;
  title?: string | null;
  lead?: string | null;
  products?: SeriesProductSource[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [revealedSlugs, setRevealedSlugs] = useState<string[]>([]);
  const mosaicRef = useRef<HTMLDivElement | null>(null);
  const mergedSeriesItems = seriesItems.map((item) => {
    const product = products?.find((candidate) => candidate.slug === item.slug);
    return {
      ...item,
      imageUrl: product?.imageUrl || item.imageUrl,
    };
  });

  function goToPrev() {
    setCurrentIndex((index) => (index === 0 ? mergedSeriesItems.length - 1 : index - 1));
  }

  function goToNext() {
    setCurrentIndex((index) => (index + 1) % mergedSeriesItems.length);
  }

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % mergedSeriesItems.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [mergedSeriesItems.length]);

  useEffect(() => {
    const mosaicElement = mosaicRef.current;

    if (!mosaicElement) {
      return;
    }

    const cards = Array.from(mosaicElement.querySelectorAll<HTMLElement>(".seriesFeatureCard"));

    if (cards.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const slug = entry.target.getAttribute("data-series-slug");

          if (!slug) {
            return;
          }

          setRevealedSlugs((current) => (current.includes(slug) ? current : [...current, slug]));
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="homeSeriesSection" className="homeSeriesSection">
      <div className="container homeSeriesInner">
        <div className="homeSeriesDesktop">
          <div className="homeSeriesIntro">
            <div className="homeSeriesHead">
              <span className="eyebrow">Products Overview</span>
              <h2 className="sectionTitle">{title ?? "LUMOS series overview"}</h2>
              <p className="sectionLead">
                {lead ??
                  (locale === "ko"
                    ? "각 제품군 위로 마우스를 올리면 강조되고, 클릭하면 해당 제품 페이지로 이동합니다."
                    : "Hover each product to preview it in context, then click through to the product page.")}
              </p>
            </div>

          </div>

          <div ref={mosaicRef} className="homeSeriesMosaic">
            {mergedSeriesItems.map((item, index) => (
              <SeriesFeatureCard
                key={item.slug}
                item={item}
                locale={locale}
                isActive={currentIndex === index}
                isRevealed={revealedSlugs.includes(item.slug)}
                onActivate={() => setCurrentIndex(index)}
                revealIndex={index}
              />
            ))}
          </div>
        </div>

        <div className="homeSeriesSlider">
          <div className="homeSeriesHead">
            <span className="eyebrow">Products Overview</span>
            <h2 className="sectionTitle">{title ?? "LUMOS series overview"}</h2>
            <p className="sectionLead">
              {lead ??
                (locale === "ko"
                  ? "제품 카드를 좌우로 넘기고 선택해 각 제품 상세 페이지로 이동할 수 있습니다."
                  : "Swipe through the product cards and open the corresponding detail page.")}
            </p>
          </div>

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
                  <SeriesFeatureCard item={item} locale={locale} isActive isRevealed />
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
  isActive,
  isRevealed,
  onActivate,
  revealIndex,
}: {
  item: SeriesCardItem;
  locale: Locale;
  isActive: boolean;
  isRevealed?: boolean;
  onActivate?: () => void;
  revealIndex?: number;
}) {
  return (
    <Link
      href={`/${locale}/products/${item.slug}`}
      className={`seriesFeatureCard ${item.layoutClassName} ${isActive ? "isActive" : ""} ${isRevealed ? "isRevealed" : ""}`}
      data-series-slug={item.slug}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      style={{ ["--series-card-delay" as string]: `${(revealIndex ?? 0) * 90}ms` }}
    >
      <div className="seriesFeatureMedia">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          sizes="(max-width: 960px) 100vw, 42vw"
          className={`seriesFeatureImage ${item.imageClassName}`}
        />
      </div>
      <div
        className={`seriesFeatureContent ${item.slug === "software" ? "isSoftware" : ""}`}
      >
        <span className="seriesFeatureName">{item.name}</span>
        <strong className="seriesFeatureTitle">
          {locale === "ko" ? item.taglineKo : item.taglineEn}
        </strong>
        <p className="seriesFeatureSummary">
          {locale === "ko" ? item.summaryKo : item.summaryEn}
        </p>
      </div>
    </Link>
  );
}
