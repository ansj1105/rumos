import Image from "next/image";

import { SubpageHero } from "@/components/subpage-hero";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/site";

const applicationEntries = [
  {
    slug: "semiconductor",
    titleKo: "Semiconductor",
    titleEn: "Semiconductor",
    imageUrl: "/applications/semiconductor.png",
    bodyKo:
      "반도체 제조 공정에서 레이저 가공의 정밀도는 최종 수율과 직결됩니다. 대면적 웨이퍼 어닐링부터 TGV, ABF 비아 드릴링 등 차세대 패키징에 이르기까지 정확한 초점과 에너지 분포 제어가 필수적입니다. 당사의 초정밀 빔 프로파일링 솔루션은 기판 손상을 방지하고 최고 수준의 공정 재현성을 보장합니다.",
    bodyEn:
      "In semiconductor manufacturing, laser precision directly dictates final yield. From large-area wafer annealing to TGV and ABF via drilling for next-generation packaging, exact focal control and energy distribution are critical. Our ultra-precise beam profiling solutions prevent substrate damage and maintain top-tier process repeatability.",
  },
  {
    slug: "solar-cell",
    titleKo: "Solar Cell",
    titleEn: "Solar Cell",
    imageUrl: "/applications/solar-cell.png",
    bodyKo:
      "태양전지의 효율 극대화를 위해서는 제조 공정의 결점 없는 정밀함이 요구됩니다. 엣지 아이솔레이션, 스크라이빙 등의 레이저 가공 시 열영향구역(HAZ)과 미세 크랙을 최소화하려면 흔들림 없는 빔 품질이 필수적입니다. 첨단 빔 모니터링을 통해 광원을 최적화하여 태양전지의 광전 효율과 수명을 획기적으로 향상시킵니다.",
    bodyEn:
      "Maximizing solar-cell efficiency requires flawless manufacturing precision. During edge isolation and laser scribing, stable beam quality is essential to minimize heat-affected zones and micro-cracks. Advanced beam monitoring optimizes the light source to improve photovoltaic efficiency and product lifetime.",
  },
  {
    slug: "medical-bio",
    titleKo: "Medical & Bio",
    titleEn: "Medical & Bio",
    imageUrl: "/applications/medical-bio.png",
    bodyKo:
      "의료 및 생명공학 분야에서 광학 시스템의 퀄리티는 환자의 안전과 직결됩니다. 피부 미용 레이저, 외과용 장비 및 고해상도 바이오 이미징 시스템은 설계된 출력 스펙을 오차 없이 준수해야 합니다. 정밀한 빔 진단을 통해 실시간으로 에너지 대칭성을 검증하여 의료 기기의 안전한 품질 보증을 지원합니다.",
    bodyEn:
      "In medical and bio applications, optical-system quality is directly tied to patient safety. Aesthetic lasers, surgical equipment, and high-resolution bio-imaging systems must meet designed output specifications without deviation. Precision beam diagnostics verify energy symmetry in real time and support safe medical-device quality assurance.",
  },
  {
    slug: "automotive-lidar",
    titleKo: "Automotive (Second Battery, LiDAR)",
    titleEn: "Automotive (Second Battery, LiDAR)",
    imageUrl: "/applications/automotive-lidar.png",
    bodyKo:
      "전기차와 자율주행 시대로의 전환은 첨단 광학 기술을 바탕으로 완성됩니다. 이차전지의 화재를 예방하는 정밀한 레이저 용접부터, 자율주행의 눈인 라이다(LiDAR) 센서의 빔 확산 패턴 및 안전성 검증까지. 무결점 전장 부품 생산과 센서 신뢰성 확보를 위한 핵심 레이저 진단 솔루션을 제공합니다.",
    bodyEn:
      "The transition to electric mobility and autonomous driving depends on advanced optical technology. From precision laser welding that helps prevent battery failures to beam-pattern and safety verification for LiDAR sensors, we provide essential laser diagnostic solutions for defect-free automotive production and sensor reliability.",
  },
  {
    slug: "oled-display",
    titleKo: "OLED Display",
    titleEn: "OLED Display",
    imageUrl: "/applications/oled-display.png",
    bodyKo:
      "플렉시블 및 초박막 디스플레이는 레이저 미세 가공의 정점을 요구합니다. 플렉시블 패널 박리를 위한 LLO 공정부터 UTG 커팅에 이르기까지, 초점과 대면적 에너지 균일도에 대한 치밀한 제어가 필요합니다. 고해상도 빔 프로파일링으로 핵심 가공 파라미터를 모니터링하여 압도적인 양산 수율을 달성할 수 있도록 돕습니다.",
    bodyEn:
      "Flexible and ultra-thin displays push the limits of laser micromachining. From LLO for panel separation to UTG cutting, these processes demand meticulous control over focal position and large-area energy uniformity. High-resolution beam profiling monitors critical processing parameters to help achieve exceptional production yields.",
  },
  {
    slug: "aoi",
    titleKo: "AOI",
    titleEn: "AOI",
    imageUrl: "/applications/aoi.png",
    bodyKo:
      "자동 광학 검사(AOI) 시스템의 정확도는 비전을 비추는 조명 및 광원의 품질에 크게 의존합니다. 불균일한 빛 분포는 미세 불량을 놓치거나 오검출을 유발합니다. 첨단 광학 측정 기술로 AOI 장비의 조명 균일도를 정밀 교정하여, 마이크로 단위의 결함을 일관되게 찾아내는 완벽한 검사 신뢰성을 제공합니다.",
    bodyEn:
      "Automated Optical Inspection (AOI) accuracy depends heavily on illumination quality. Uneven light distribution can cause missed defects or false detections. Our advanced optical measurement approach precisely calibrates AOI illumination uniformity, enabling consistent micron-level defect detection and dependable inspection performance.",
  },
] as const;

export default async function ApplicationsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <div className="applicationsPage">
      <SubpageHero
        eyebrow="APPLICATION"
        title={dict.applications.title}
        description={dict.applications.lead}
        tone="applications"
      />

      <section className="applicationsIndex">
        <div className="container applicationsIndexInner">
          {applicationEntries.map((entry, index) => (
            <a key={entry.slug} href={`#${entry.slug}`} className="applicationsIndexLink">
              <span className="applicationsIndexNo">{String(index + 1).padStart(2, "0")}</span>
              <span>{locale === "ko" ? entry.titleKo : entry.titleEn}</span>
            </a>
          ))}
        </div>
      </section>

      <div className="applicationsBody applicationsBodyShowcase">
        <div className="container applicationsShowcase">
          {applicationEntries.map((entry) => (
            <section key={entry.slug} id={entry.slug} className="applicationShowcaseRow">
              <div className="applicationShowcaseMedia">
                <Image
                  src={entry.imageUrl}
                  alt={locale === "ko" ? entry.titleKo : entry.titleEn}
                  width={960}
                  height={720}
                  className="applicationShowcaseImage"
                />
              </div>
              <div className="applicationShowcaseBody">
                <h2 className="applicationShowcaseTitle">
                  {locale === "ko" ? entry.titleKo : entry.titleEn}
                </h2>
                <p className="applicationShowcaseText">
                  {locale === "ko" ? entry.bodyKo : entry.bodyEn}
                </p>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
