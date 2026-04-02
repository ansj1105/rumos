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

  return (
    <section className="heroSection">
      <div
        className={`heroBackdrop ${heroImageUrl ? "hasImage" : ""}`}
        style={heroImageUrl ? { backgroundImage: `linear-gradient(rgba(8, 17, 30, 0.45), rgba(8, 17, 30, 0.15)), url(${heroImageUrl})` } : undefined}
      />
      <div className="container heroInner">
        <div className="heroCopy">
          <h1 className="headline" style={heroFontSize ? { fontSize: `clamp(32px, 5vw, ${heroFontSize}px)` } : undefined}>
            {heroTitle ?? dict.hero.title}
          </h1>
          <p className="subhead">{heroDescription ?? dict.hero.description}</p>
          <div className="buttonRow">
            <Link href={`/${locale}/products`} className="button primary">
              {dict.hero.ctaPrimary}
            </Link>
            <Link href={`/${locale}/contact`} className="button secondary">
              {dict.hero.ctaSecondary}
            </Link>
          </div>
        </div>
        <div className="heroVisual" aria-hidden="true">
          <div className="heroVisualPanel">
            <div className="heroVisualGlow" />
            <div className="heroVisualPattern" />
            <div className="heroWheelWrap">
              <div className="heroWheel heroWheelOuter" />
              <div className="heroWheel heroWheelMiddle" />
              <div className="heroWheel heroWheelInner" />
              <div className="heroWheelCenter">
                <span>LUMOS</span>
              </div>
            </div>
            <div className="heroVisualFrame">
              <div className="heroVisualLabel">OPTICAL INSPECTION</div>
              <div className="heroVisualScreen">
                <div className="heroScan heroScanOne" />
                <div className="heroScan heroScanTwo" />
                <div className="heroScan heroScanThree" />
                <div className="heroAxis heroAxisHorizontal" />
                <div className="heroAxis heroAxisVertical" />
              </div>
            </div>
            <div className="heroVisualCaption">
              {locale === "ko"
                ? "반도체와 정밀 공정 환경을 위한 광학 측정 레이어"
                : "Optical measurement layers for semiconductor and precision processes"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
