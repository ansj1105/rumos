import Link from "next/link";

import { FadeImage } from "@/components/fade-image";
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
      <div className={`heroBackdrop ${backgroundImageUrl ? "hasImage" : ""}`}>
        {backgroundImageUrl ? (
          <FadeImage
            src={backgroundImageUrl}
            alt=""
            fill
            priority
            sizes="100vw"
            className="heroBackdropImage"
            skeletonClassName="heroBackdropSkeleton"
          />
        ) : null}
      </div>
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
      </div>
    </section>
  );
}
