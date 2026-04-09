import { FadeImage } from "@/components/fade-image";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/site";

type HeroProps = {
  locale: Locale;
  heroImageUrl?: string | null;
};

export function Hero({ locale, heroImageUrl }: HeroProps) {
  const dict = getDictionary(locale);
  const imageUrl = heroImageUrl ?? "/hero-lab-bg.avif";
  const imageAlt =
    locale === "ko"
      ? "LUMOS 정밀 광학 장비 소개 이미지"
      : "LUMOS precision optical equipment introduction image";

  return (
    <section className="heroSection">
      <div className="heroBackdrop" aria-hidden="true">
        <div className="heroBackdropTopWaves">
          <span />
          <span />
          <span />
        </div>
        <div className="heroBackdropWave" />
        <div className="heroBackdropGrid" />
      </div>
      <div className="container heroInner">
        <div className="heroCopy">
          <span className="eyebrow heroEyebrow">{dict.hero.eyebrow}</span>
          <h1 className="headline heroHeadline">
            <span className="heroHeadlineLine">{dict.hero.titlePrefix}</span>
            <span className="heroHeadlineLine heroHeadlineAccentLine">
              <span className="heroHeadlineHighlight">{dict.hero.titleHighlight}</span>
            </span>
          </h1>
          <div className="heroBody">
            <p className="subhead heroLead">{dict.hero.lead}</p>
            <div className="heroRelationBlock">
              <span className="heroRelationLabel">{dict.hero.relationLabel}</span>
              <p className="heroRelationText">{dict.hero.relationBody}</p>
            </div>
          </div>
          <div className="buttonRow heroButtonRow">
            <a
              href="https://www.shinhotek.com/"
              target="_blank"
              rel="noreferrer"
              className="button secondary heroDetailButton"
            >
              {dict.hero.ctaDetail}
            </a>
          </div>
        </div>

        <div className="heroMedia">
          <div className="heroMediaOrbit" aria-hidden="true" />
          <div className="heroMediaFrame">
            <FadeImage
              src={imageUrl}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width: 960px) 100vw, 48vw"
              className="heroMediaImage"
              skeletonClassName="heroBackdropSkeleton"
            />
            <div className="heroMediaOverlay" aria-hidden="true" />
            <div className="heroMediaSpec" aria-hidden="true">
              <span className="heroMediaSpecLabel">{dict.hero.visualLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
