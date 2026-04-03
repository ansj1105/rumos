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
  const heroBgStyle =
    backgroundImageUrl
      ? {
          backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.48) 42%, rgba(255,255,255,0.62) 100%), linear-gradient(90deg, rgba(15, 34, 61, 0.035) 1px, transparent 1px), linear-gradient(rgba(15, 34, 61, 0.035) 1px, transparent 1px), url("${backgroundImageUrl}")`,
          backgroundSize: "auto, 56px 56px, 56px 56px, cover",
          backgroundPosition: "center, center, center, center",
          backgroundRepeat: "no-repeat, repeat, repeat, no-repeat",
          opacity: String(backgroundOpacity ?? 0.48),
        }
      : undefined;

  return (
    <section className={`subpageHero subpageHero-${tone}`}>
      <div className="subpageHeroBg" style={heroBgStyle} />
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
