import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/lib/site";

const seriesItems = [
  {
    slug: "lum-b",
    name: "LUM-B",
    taglineKo: "Raw Beam Profiler",
    taglineEn: "Raw Beam Profiler",
    imageUrl: "/home-series/lum-b.png",
  },
  {
    slug: "lum-b-l",
    name: "LUM-B-L",
    taglineKo: "Large Beam Profiler",
    taglineEn: "Large Beam Profiler",
    imageUrl: "/home-series/lum-b-l.png",
  },
  {
    slug: "lum-f",
    name: "LUM-F",
    taglineKo: "Focus Beam Profiler",
    taglineEn: "Focus Beam Profiler",
    imageUrl: "/home-series/lum-f.png",
  },
  {
    slug: "lum-z",
    name: "LUM-Z",
    taglineKo: "3D Beam Profiler",
    taglineEn: "3D Beam Profiler",
    imageUrl: "/home-series/lum-z.png",
  },
  {
    slug: "software",
    name: "Software",
    taglineKo: "Inspection Control Suite",
    taglineEn: "Inspection Control Suite",
    imageUrl: null,
  },
] as const;

export function HomeSeriesOverview({ locale }: { locale: Locale }) {
  return (
    <section className="homeSeriesSection">
      <div className="container homeSeriesInner">
        <div className="homeSeriesHead">
          <h2 className="sectionTitle">LUMOS series overview</h2>
          <p className="sectionLead">
            {locale === "ko"
              ? "빔 프로파일러와 운용 소프트웨어 라인업을 한 번에 확인할 수 있습니다."
              : "Explore the beam profiler lineup and operational software in one view."}
          </p>
        </div>

        <div className="homeSeriesRail">
          {seriesItems.map((item) => {
            const href = `/${locale}/products/${item.slug}`;

            return (
              <Link key={item.slug} href={href} className="seriesCard">
                <div className="seriesCardMedia">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      sizes="(max-width: 720px) 80vw, (max-width: 1180px) 32vw, 20vw"
                      className="seriesCardImage"
                    />
                  ) : (
                    <div className="seriesCardSoftwareVisual" aria-hidden="true">
                      <div className="seriesCardSoftwareGrid" />
                      <div className="seriesCardSoftwarePanel">
                        <span className="seriesCardSoftwareChip">LUMOS UI</span>
                        <strong>Control</strong>
                        <span>Logging</span>
                        <span>Report</span>
                      </div>
                    </div>
                  )}
                  <div className="seriesCardOverlay" />
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
          })}
        </div>
      </div>
    </section>
  );
}
