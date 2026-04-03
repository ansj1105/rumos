import Image from "next/image";

export function SubpageHero({
  eyebrow,
  title,
  description,
  tone = "default",
  backgroundImageUrl,
  backgroundOpacity,
}: {
  eyebrow: string;
  title: string;
  description: string;
  tone?: "default" | "contact" | "applications" | "products" | "resources" | "directions";
  backgroundImageUrl?: string | null;
  backgroundOpacity?: number;
}) {
  return (
    <section className={`subpageHero subpageHero-${tone}`}>
      <div className="subpageHeroBg">
        {backgroundImageUrl ? (
          <Image
            src={backgroundImageUrl}
            alt=""
            fill
            priority
            sizes="100vw"
            className="subpageHeroBgImage"
            style={{ opacity: backgroundOpacity ?? 0.48 }}
          />
        ) : null}
        <div className="subpageHeroBgOverlay" />
      </div>
      <div className="container subpageHeroInner">
        <div className="subpageHeroCopy">
          <div className="eyebrow">{eyebrow}</div>
          <h1 className="sectionTitle">{title}</h1>
          <p className="sectionLead">{description}</p>
        </div>
      </div>
    </section>
  );
}
