import { SubpageHero } from "@/components/subpage-hero";
import { getApplications } from "@/lib/content";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/site";

export default async function ApplicationsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const applications = await getApplications();

  return (
    <div className="applicationsPage">
      <SubpageHero
        eyebrow="APPLICATION"
        title={dict.applications.title}
        description={dict.applications.lead}
        tone="applications"
      />
      <section className="applicationsHeroMetaWrap">
        <div className="container applicationsHeroInner">
          <div className="applicationsHeroMeta">
            <div className="applicationsHeroMetaItem">
              <strong>{applications.length}</strong>
              <span>{locale === "ko" ? "핵심 적용 분야" : "Core sectors"}</span>
            </div>
            <div className="applicationsHeroMetaItem">
              <strong>01</strong>
              <span>{locale === "ko" ? "광학 검사 중심" : "Optical inspection focus"}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="applicationsIndex">
        <div className="container applicationsIndexInner">
          {applications.map((application, index) => (
            <a key={application.slug} href={`#${application.slug}`} className="applicationsIndexLink">
              <span className="applicationsIndexNo">{String(index + 1).padStart(2, "0")}</span>
              <span>{locale === "ko" ? application.titleKo : application.titleEn}</span>
            </a>
          ))}
        </div>
      </section>

      <div className="applicationsBody">
        <div className="container">
          <div className="applicationsList">
            {applications.map((application, index) => {
              const bullets = locale === "ko" ? application.bulletsKo : application.bulletsEn;
              return (
                <section
                  key={application.slug}
                  id={application.slug}
                  className={`applicationFeature ${index % 2 === 1 ? "isReversed" : ""}`}
                >
                  <div className="applicationVisual">
                    <div className="applicationVisualPanel">
                      <div className="applicationVisualBadge">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div className="applicationVisualLines" />
                      <div className="applicationVisualFrame">
                        <div className="applicationVisualBand" />
                        <div className="applicationVisualBand isSecond" />
                      </div>
                    </div>
                  </div>

                  <div className="applicationContent">
                    <span className="applicationKicker">Application Solution</span>
                    <h2 className="applicationTitle">
                      {locale === "ko" ? application.titleKo : application.titleEn}
                    </h2>
                    <p className="applicationSummary">
                      {locale === "ko" ? application.summaryKo : application.summaryEn}
                    </p>
                    <div className="applicationBulletGrid">
                      {(bullets as string[]).map((bullet) => (
                        <div key={bullet} className="applicationBullet">
                          <span className="applicationBulletMark" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
