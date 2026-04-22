import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/site";
import type { CSSProperties } from "react";

type HeroProps = {
  locale: Locale;
  heroImageUrl?: string | null;
};

export function Hero({ locale, heroImageUrl }: HeroProps) {
  const dict = getDictionary(locale);
  const imageUrl = heroImageUrl ?? "/hero-lab-bg.avif";

  return (
    <section
      className="heroSection"
      style={{ ["--hero-image" as string]: `url("${imageUrl}")` } as CSSProperties}
    >
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
        </div>
      </div>
    </section>
  );
}
