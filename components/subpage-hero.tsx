export function SubpageHero({
  eyebrow,
  title,
  description,
  tone = "default",
}: {
  eyebrow: string;
  title: string;
  description: string;
  tone?: "default" | "contact" | "applications" | "products" | "resources" | "directions";
}) {
  return (
    <section className={`subpageHero subpageHero-${tone}`}>
      <div className="subpageHeroBg" />
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
