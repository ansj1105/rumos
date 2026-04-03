import Link from "next/link";

import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/site";

type HeroProps = {
  locale: Locale;
  heroTitle?: string;
  heroDescription?: string;
  heroImageUrl?: string | null;
  heroFontSize?: number;
};

export function Hero({
  locale,
  heroTitle,
  heroDescription,
  heroImageUrl,
  heroFontSize,
}: HeroProps) {
  const dict = getDictionary(locale);
  const backgroundImageUrl = heroImageUrl ?? "/hero-lab-bg.png";

  return (
    <section className="heroSection">
      <div
        className={`heroBackdrop ${backgroundImageUrl ? "hasImage" : ""}`}
        style={
          backgroundImageUrl
            ? {
                backgroundImage: `linear-gradient(90deg, rgba(9, 20, 33, 0.82) 0%, rgba(9, 20, 33, 0.64) 34%, rgba(9, 20, 33, 0.28) 62%, rgba(9, 20, 33, 0.18) 100%), url(${backgroundImageUrl})`,
              }
            : undefined
        }
      />
      <div className="container heroInner">
        <div className="heroCopy">
          <h1 className="headline" style={heroFontSize ? { fontSize: `clamp(32px, 5vw, ${heroFontSize}px)` } : undefined}>
            {heroTitle ?? dict.hero.title}
          </h1>
          <p className="subhead">{heroDescription ?? dict.hero.description}</p>
          <div className="buttonRow">
            <Link href={`/${locale}#homeSeriesSection`} className="button primary">
              {dict.hero.ctaPrimary}
            </Link>
            <Link href={`/${locale}/contact`} className="button secondary">
              {dict.hero.ctaSecondary}
            </Link>
          </div>
        </div>
        <div className="heroVisual" aria-hidden="true">
          <div className="heroVisualPanel">
            <div className="heroWheelWrap">
              <div className="heroWheel heroWheelOuter" />
              <div className="heroWheel heroWheelMiddle" />
              <div className="heroWheel heroWheelInner" />
              <div className="heroWheelCenter">
                <span>LUMOS</span>
              </div>
            </div>
            <div className="heroVisualCaption">
              {locale === "ko"
                ? "정밀 측정과 빔 분석이 수행되는 실제 광학 검사 환경"
                : "A real optical inspection environment for precision measurement and beam analysis"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
