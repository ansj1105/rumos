import { FadeImage } from "@/components/fade-image";

export function SubpageHero({
  eyebrow,
  title,
  description,
  tone = "default",
  backgroundImageUrl,
  backgroundOpacity,
  lightText = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  tone?: "default" | "contact" | "applications" | "products" | "resources" | "directions";
  backgroundImageUrl?: string | null;
  backgroundOpacity?: number;
  lightText?: boolean;
}) {
  const resolvedOpacity =
    backgroundOpacity ?? (tone === "contact" || tone === "resources" || tone === "directions" ? 0.9 : 0.48);

  return (
    <section className={`subpageHero subpageHero-${tone}`}>
      <div className="subpageHeroBg">
        {backgroundImageUrl ? (
          <>
            <FadeImage
              src={backgroundImageUrl}
              alt=""
              fill
              sizes="100vw"
              className="subpageHeroBgBackdrop"
              skeletonClassName="subpageHeroBgSkeleton"
              style={{ opacity: Math.min(resolvedOpacity, 0.72) }}
            />
            <FadeImage
              src={backgroundImageUrl}
              alt=""
              fill
              sizes="100vw"
              className="subpageHeroBgImage"
              style={{ opacity: resolvedOpacity }}
            />
          </>
        ) : null}
        <div className={`subpageHeroBgOverlay is-${tone}`} />
      </div>
      <div className="container subpageHeroInner">
        <div className={`subpageHeroCopy ${lightText ? "isLightText" : ""}`}>
          <div className="eyebrow">{eyebrow}</div>
          <h1 className="sectionTitle">{title}</h1>
          <p className="sectionLead">{description}</p>
        </div>
      </div>
    </section>
  );
}
