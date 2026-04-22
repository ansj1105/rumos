import { FadeImage } from "@/components/fade-image";
import type { Locale } from "@/lib/site";

const historyParagraphs = [
  "Just as Coherent AVIA laser became the primary production tool for display laser applications after it had been worldwide first applied to mass production lines in mobile display in Korea, Metrolux (Germany) FM100 model was adopted as a monitoring module into mass production in 2016 in Korea. Since then, beam profilers, along with power meters, have become a default option in laser equipment monitoring in Laser microprocessing systems in Korea.",
  "As the Korean distributor of Metrolux for 20 years, Shinhotek had accumulated extensive know-how by supplying hundreds of beam profilers to mass production lines in Korea. In the early 2000s, Metrolux regrettably decided to discontinue its products. Building on the reputation and quality of Metrolux that had been established over the years, we carried on Metrolux legacy through approximately four years of development and launched a new brand, LUMOS in 2026. As Korea's first commercial beam profiler, LUMOS incorporates the needs of customers in Korea's key industries semiconductors, displays, secondary batteries, and PCBs into the quality of our beam profilers.",
  "We are confident in stating that our products are the world's most optimized for mass production.",
];

const companyPrinciples = [
  {
    heading: "Vision",
    body: '"Trusting LASER Light through LUMOS"',
  },
  {
    heading: "Goal",
    body: '"The Trusted Standard for Laser Beam Measurement"',
  },
];

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  await params;

  return (
    <div className="companyPage">
      <section className="companyHeroBand">
        <div className="companyHeroMedia">
          <FadeImage
            src="/company/history-bg.png"
            alt="LUMOS history background"
            fill
            priority
            sizes="100vw"
            className="companyHeroImage"
            skeletonClassName="companyHeroSkeleton"
          />
          <div className="companyHeroOverlay" />
        </div>
      </section>

      <section className="companyHistorySection">
        <div className="container">
          <div className="companyHistorySurface">
            <div className="companyHistoryHeading">
              <h1 className="companyHistoryTitle">History of LUMOS</h1>
              <div className="companyHistoryKicker">
                <span className="companyHistoryKickerMark" aria-hidden="true" />
                <span>LASER BEAM PROFILER</span>
              </div>
            </div>
            <div className="companyHistoryBody">
              {historyParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="companyPrinciplesSection">
        <div className="container">
          <div className="companyPrinciplesSurface">
            <div className="companyPrinciplesIntro">
              <strong className="companyPrinciplesBrand">LUMOS</strong>
              <p className="companyPrinciplesLead">The first Beam Profiler in Korea</p>
            </div>

            <div className="companyPrinciplesTable" role="table" aria-label="LUMOS vision and goal">
              {companyPrinciples.map((item) => (
                <div key={item.heading} className="companyPrinciplesColumn" role="rowgroup">
                  <div className="companyPrinciplesHead" role="row">
                    <span role="columnheader">{item.heading}</span>
                  </div>
                  <div className="companyPrinciplesCell" role="row">
                    <p role="cell">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="companyOriginSection">
        <div className="container">
          <div className="companyOriginSurface">
            <div className="companyOriginMedia">
              <FadeImage
                src="/company/origin-bg.png"
                alt="LUMOS origin laboratory"
                fill
                sizes="100vw"
                className="companyOriginImage"
                skeletonClassName="companyOriginSkeleton"
              />
              <div className="companyOriginOverlay" />
            </div>

            <div className="companyOriginLayout">
              <div className="companyOriginTitleBlock">
                <h2 className="companyOriginTitle">The Origin of LUMOS</h2>
              </div>

              <div className="companyOriginCopy">
                <strong className="companyOriginHeading">Brand Origin: LUMOS</strong>
                <div className="companyOriginBody">
                  <p>
                    LUMOS comes from the Latin <strong>&apos;Lumen&apos;</strong> (Light). It
                    represents our mission to capture the true essence of light through precise
                    measurement. We deliver trusted precision for optics and laser beam analysis.
                  </p>
                  <p>
                    True laser performance is defined by <strong>accurate measurement</strong>, not
                    just appearance. LUMOS empowers users to evaluate performance with clarity
                    through advanced beam profiling. Our goal is to set the new industry standard
                    in precision metrology.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
