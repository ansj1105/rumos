import { PRODUCT_DISPLAY_NAMES } from "./product-display";

export const defaultSiteConfig = {
  id: 1,
  heroTitleKo: "정밀 공정에 맞는\n신뢰 가능한 광학 솔루션",
  heroTitleEn: "Reliable optical solutions for precision manufacturing",
  heroDescriptionKo:
    "루모스는 산업용 검사 환경에 맞춘 광학 장비와 소프트웨어를 공급합니다.",
  heroDescriptionEn:
    "Lumos delivers industrial optical hardware and software for production inspection workflows.",
  heroImageUrl: "/hero-main-camera-hud.png",
  heroFontSize: 52,
  storyTitleKo: "브랜드 어원 : 루모스",
  storyTitleEn: "Brand Origin : Rumos",
  storyBodyKo:
    "LUMOS는 빛을 뜻하는 라틴어 'Lumen'에서 유래했습니다. 정확한 측정을 통해 빛의 본질을 포착하고, 광학 및 레이저 빔 분석 분야에 신뢰할 수 있는 정밀도를 제공하겠다는 의미를 담고 있습니다.",
  storyBodyEn:
    "LUMOS comes from the Latin 'Lumen' (Light). It represents our mission to capture the true essence of light through precise measurement and to deliver trusted precision for optics and laser beam analysis.",
  storyFontSize: 18,
  seriesTitleKo: "LUMOS series",
  seriesTitleEn: "LUMOS series",
  seriesLeadKo: "",
  seriesLeadEn: "",
  seoTitleKo: "루모스 | 산업용 광학 솔루션",
  seoTitleEn: "Lumos | Industrial Optical Solutions",
  seoDescriptionKo:
    "루모스 제품, 애플리케이션, 자료실, 문의를 제공하는 공식 웹사이트입니다.",
  seoDescriptionEn:
    "Official website for Lumos products, applications, resources, and contact.",
} as const;

export const defaultApplications = [
  {
    slug: "semiconductor",
    titleKo: "Semiconductor",
    titleEn: "Semiconductor",
    summaryKo:
      "반도체 제조 공정에서 레이저 가공의 정밀도는 최종 수율과 직결됩니다. 차세대 패키징을 위한 LUM-B의 레이저 솔더링(Laser Soldering)부터 대면적 공정에 최적화된 LUM-B-L의 웨이퍼 어닐링(Wafer Annealing)에 이르기까지 정확한 에너지 분포 제어가 필수적입니다. 또한, LUM-F를 활용한 웨이퍼 그루빙 및 다이싱(Wafer Grooving & Dicing)과 TGV 공정, 그리고 LUM-Z의 초정밀 스텔스 다이싱(Stealth Dicing) 및 TGV 솔루션을 통해 기판 손상을 완벽히 방지하고 최고 수준의 공정 재현성을 보장합니다.",
    summaryEn:
      "In semiconductor manufacturing, laser-processing precision is directly tied to final yield. From LUM-B for laser soldering in next-generation packaging to LUM-B-L for wafer annealing optimized for large-area processes, precise energy-distribution control is essential. In addition, LUM-F supports wafer grooving, dicing, and TGV processes, while LUM-Z enables ultra-precise stealth dicing and TGV solutions to prevent substrate damage and ensure the highest level of process repeatability.",
    imageUrl: "/applications/semiconductor.png",
    bulletsKo: [],
    bulletsEn: [],
  },
  {
    slug: "solar-cell",
    titleKo: "Solar Cell",
    titleEn: "Solar Cell",
    summaryKo:
      "태양전지의 효율 극대화를 위해서는 제조 공정의 결점 없는 정밀함이 요구됩니다. 엣지 아이솔레이션(Edge Isolation), 스크라이빙(Scribing) 등의 레이저 가공 시 열영향구역(HAZ)과 미세 크랙을 최소화하려면 흔들림 없는 빔 품질이 필수적입니다. 당사의 첨단 빔 모니터링 시스템은 광원을 완벽하게 최적화하여 태양전지의 광전 효율과 제품 수명을 획기적으로 향상시킵니다.",
    summaryEn:
      "Maximizing solar-cell efficiency requires defect-free manufacturing precision. During laser processes such as edge isolation and scribing, stable beam quality is essential to minimize heat-affected zones and micro-cracks. Our advanced beam-monitoring system fully optimizes the light source to significantly improve photovoltaic efficiency and product lifetime.",
    imageUrl: "/applications/solar-cell.png",
    bulletsKo: [],
    bulletsEn: [],
  },
  {
    slug: "medical-bio",
    titleKo: "Medical & Bio",
    titleEn: "Medical & Bio",
    summaryKo:
      "의료 및 생명공학 분야에서 광학 시스템의 신뢰성은 환자의 안전과 직결됩니다. 피부 미용 레이저, 정밀 외과용 장비 및 고해상도 바이오 이미징 시스템은 설계된 출력 스펙을 오차 없이 준수해야 합니다. 당사의 솔루션은 정밀한 빔 진단을 통해 실시간으로 에너지 대칭성을 검증하여, 의료 기기의 안전하고 완벽한 품질 보증(QA) 체계를 지원합니다.",
    summaryEn:
      "In medical and bioengineering applications, the reliability of optical systems is directly tied to patient safety. Aesthetic lasers, precision surgical equipment, and high-resolution bio-imaging systems must meet designed output specifications without deviation. Our solution verifies energy symmetry in real time through precise beam diagnostics and supports a safe, complete quality-assurance system for medical devices.",
    imageUrl: "/applications/medical-bio.png",
    bulletsKo: [],
    bulletsEn: [],
  },
  {
    slug: "automotive-lidar",
    titleKo: "Automotive (Second Battery, LiDAR)",
    titleEn: "Automotive (Second Battery, LiDAR)",
    summaryKo:
      "전기차와 자율주행 시대로의 전환은 첨단 광학 기술을 바탕으로 완성됩니다. 이차전지의 화재를 예방하는 정밀한 레이저 용접부터, 자율주행의 핵심인 라이다(LiDAR) 센서의 빔 확산 패턴 및 안전성 검증까지 완벽한 품질 관리가 요구됩니다. 특히 고출력 LUM-B-L 모델은 빅셀(VCSEL) 검사에 최적화되어 있어, 무결점 전장 부품 생산과 센서 신뢰성 확보를 위한 핵심 레이저 진단 솔루션을 제공합니다.",
    summaryEn:
      "The transition to electric vehicles and autonomous driving is built on advanced optical technology. From precision laser welding that helps prevent secondary-battery fires to beam-spread pattern and safety verification for LiDAR sensors, complete quality control is required. In particular, the high-power LUM-B-L model is optimized for VCSEL inspection, delivering a core laser-diagnostic solution for defect-free automotive components and sensor reliability.",
    imageUrl: "/applications/automotive-lidar.png",
    bulletsKo: [],
    bulletsEn: [],
  },
  {
    slug: "oled-display",
    titleKo: "OLED Display",
    titleEn: "OLED Display",
    summaryKo:
      "플렉시블 및 초박막 디스플레이는 레이저 미세 가공 기술의 정점을 요구합니다. 당사는 LUM-B-L을 통한 플렉시블 패널 박리(Laser Lift-Off) 및 Micro LED 공정, LUM-F를 활용한 UTG 커팅 및 초미세 홀 드릴링(Laser Hole Drilling) 등 핵심 공정에 최적화된 빔 프로파일링을 제공합니다. 더불어 고속 양산을 위한 LUM-B의 고속 빔 분할(High-Speed Beam Splitting) 및 솔더링, LUM-Z의 멀티 스팟(Multi Spot) 분석을 통해 치밀한 에너지 균일도 제어를 실현하여 압도적인 양산 수율 달성을 돕습니다.",
    summaryEn:
      "Flexible and ultra-thin displays demand the highest level of laser micromachining. We provide beam profiling optimized for key processes including flexible-panel laser lift-off and Micro LED processes with LUM-B-L, as well as UTG cutting and ultra-fine laser hole drilling with LUM-F. In addition, LUM-B supports high-speed beam splitting and soldering for mass production, while LUM-Z enables multi-spot analysis to realize tight energy-uniformity control and maximize production yield.",
    imageUrl: "/applications/oled-display.png",
    bulletsKo: [],
    bulletsEn: [],
  },
  {
    slug: "aoi",
    titleKo: "AOI",
    titleEn: "AOI",
    summaryKo:
      "자동 광학 검사(AOI) 시스템의 정확도는 비전을 비추는 조명 및 광원의 품질에 크게 의존합니다. 불균일한 빛 분포는 미세 불량을 놓치거나 오검출을 유발할 수 있습니다. LUM-B 모델은 레이저 소스의 품질 보증 및 연구개발(Laser Source QA & R&D)은 물론, 초기 레이저 정렬(Initial Laser Alignment) 과정에서 탁월한 성능을 발휘합니다. 이를 통해 첨단 광학 측정 기술로 AOI 장비의 조명 균일도를 정밀하게 교정하여, 마이크로 단위의 결함을 일관되게 찾아내는 완벽한 검사 신뢰성을 제공합니다.",
    summaryEn:
      "The accuracy of automated optical inspection (AOI) systems depends heavily on the quality of illumination and light sources. Uneven light distribution can lead to missed micro defects or false detections. The LUM-B model delivers excellent performance not only in laser source QA and R&D, but also during initial laser alignment. With advanced optical measurement technology, it precisely calibrates illumination uniformity in AOI equipment and provides reliable inspection performance for consistent micron-level defect detection.",
    imageUrl: "/applications/aoi.png",
    bulletsKo: [],
    bulletsEn: [],
  },
] as const;

export const defaultProducts = [
  {
    slug: "lum-b",
    name: PRODUCT_DISPLAY_NAMES["lum-b"],
  },
  {
    slug: "lum-b-l",
    name: PRODUCT_DISPLAY_NAMES["lum-b-l"],
  },
  {
    slug: "lum-f",
    name: PRODUCT_DISPLAY_NAMES["lum-f"],
  },
  {
    slug: "lum-z",
    name: PRODUCT_DISPLAY_NAMES["lum-z"],
  },
  {
    slug: "software",
    name: PRODUCT_DISPLAY_NAMES.software,
  },
  {
    slug: "ifi",
    name: PRODUCT_DISPLAY_NAMES.ifi,
  },
  {
    slug: "customizing",
    name: PRODUCT_DISPLAY_NAMES.customizing,
  },
].map((item, index) => ({
  slug: item.slug,
  displayOrder: index + 1,
  nameKo: item.name,
  nameEn: item.name,
  heroEyebrowKo: null,
  heroEyebrowEn: null,
  heroTitleKo: null,
  heroTitleEn: null,
  heroLeadKo: null,
  heroLeadEn: null,
  heroBgImageUrl: null,
  heroBgOpacity: 0.9,
  summaryKo: `${item.name} 제품 개요와 핵심 사양을 소개합니다.`,
  summaryEn: `Overview and key specifications for ${item.name}.`,
  contentKo: `${item.name}는 공정 조건에 따른 광학 검사 요구에 대응하도록 설계된 루모스 제품군입니다.`,
  contentEn: `${item.name} is part of the Lumos product lineup designed for optical inspection requirements across different process conditions.`,
  featuresKo: ["안정적인 측정", "반복 정밀도", "공정 대응형 구성"],
  featuresEn: ["Stable measurement", "Repeatable precision", "Process-oriented configuration"],
  applicationsKo: ["정밀 검사 라인", "반도체 공정", "광학 측정 시스템"],
  applicationsEn: ["Precision inspection lines", "Semiconductor processes", "Optical measurement systems"],
  specsKo: [
    { label: "구성", value: "모듈형 시스템" },
    { label: "운영", value: "공정 조건별 대응" },
  ],
  specsEn: [
    { label: "Configuration", value: "Modular system" },
    { label: "Operation", value: "Adapted to process conditions" },
  ],
  imageUrl: null,
  seoTitleKo: `${item.name} | 루모스`,
  seoTitleEn: `${item.name} | Lumos`,
  seoDescriptionKo: `${item.name} 제품 상세 안내 페이지입니다.`,
  seoDescriptionEn: `Detailed product page for ${item.name}.`,
})) as Array<{
  slug: string;
  displayOrder: number;
  nameKo: string;
  nameEn: string;
  heroEyebrowKo: string | null;
  heroEyebrowEn: string | null;
  heroTitleKo: string | null;
  heroTitleEn: string | null;
  heroLeadKo: string | null;
  heroLeadEn: string | null;
  heroBgImageUrl: string | null;
  heroBgOpacity: number;
  summaryKo: string;
  summaryEn: string;
  contentKo: string;
  contentEn: string;
  featuresKo: string[];
  featuresEn: string[];
  applicationsKo: string[];
  applicationsEn: string[];
  specsKo: Array<{ label: string; value: string }>;
  specsEn: Array<{ label: string; value: string }>;
  imageUrl: string | null;
  seoTitleKo: string;
  seoTitleEn: string;
  seoDescriptionKo: string;
  seoDescriptionEn: string;
}>;

export const defaultResources = [
  {
    slug: "company-profile",
    displayIndex: 1,
    titleKo: "회사 소개서",
    titleEn: "Company Profile",
    excerptKo: "루모스 회사 소개 자료 예시입니다.",
    excerptEn: "Sample Lumos company introduction resource.",
    bodyKo:
      "자료실 상세 페이지는 문서 설명, 첨부 파일 링크, 게시 시점을 제공하도록 구현했습니다.",
    bodyEn:
      "The resource detail page provides document descriptions, file links, and publish timestamps.",
    fileUrl: null,
  },
  {
    slug: "patent-10-2932994-laser-optical-system",
    displayIndex: 2,
    titleKo: "[특허증] 10-2932994 레이저 광학 시스템",
    titleEn: "[Patent] 10-2932994 Laser Optical System",
    excerptKo: "레이저 광학 시스템 관련 특허 문서입니다.",
    excerptEn: "Patent document for a laser optical system.",
    bodyKo:
      "LUMOS의 광학 설계 및 계측 시스템 역량과 연계된 레이저 광학 시스템 특허 문서입니다.",
    bodyEn:
      "This patent document covers a laser optical system related to the optical design and metrology capabilities behind LUMOS.",
    fileUrl: "/uploads/resources/patent-10-2932994-laser-optical-system.pdf",
  },
  {
    slug: "patent-10-2946121-laser-beam-shaping-device",
    displayIndex: 3,
    titleKo: "[특허증] 10-2946121 레이저 빔 성형장치",
    titleEn: "[Patent] 10-2946121 Laser Beam Shaping Device",
    excerptKo: "레이저 빔 성형장치 관련 특허 문서입니다.",
    excerptEn: "Patent document for a laser beam shaping device.",
    bodyKo:
      "빔 프로파일 제어와 공정 정밀도 향상을 위한 레이저 빔 성형장치 특허 문서입니다.",
    bodyEn:
      "This patent document covers a laser beam shaping device for beam profile control and improved process precision.",
    fileUrl: "/uploads/resources/patent-10-2946121-laser-beam-shaping-device.pdf",
  },
  {
    slug: "patent-10-2948666-laser-optical-device",
    displayIndex: 4,
    titleKo: "[특허증] 10-2948666 레이저 광학장치",
    titleEn: "[Patent] 10-2948666 Laser Optical Device",
    excerptKo: "레이저 광학장치 관련 특허 문서입니다.",
    excerptEn: "Patent document for a laser optical device.",
    bodyKo:
      "광학 경로 구성과 계측 안정성 확보를 위한 레이저 광학장치 특허 문서입니다.",
    bodyEn:
      "This patent document covers a laser optical device for optical path configuration and measurement stability.",
    fileUrl: "/uploads/resources/patent-10-2948666-laser-optical-device.pdf",
  },
  {
    slug: "cert-10-2077732-10-2243189",
    displayIndex: 5,
    titleKo: "[기술인증증빙] 특허증 10-2077732호 10-2243189호",
    titleEn: "[Technical Certification] Patent 10-2077732 and 10-2243189",
    excerptKo: "관련 특허 인증 증빙 문서입니다.",
    excerptEn: "Supporting certification document for related patents.",
    bodyKo:
      "레이저 가공장치 및 진공빔 프로파일링장치 특허와 연계된 기술 인증 증빙 문서입니다.",
    bodyEn:
      "This certification document supports the related patents for the laser processing device and vacuum beam profiling device.",
    fileUrl: "/uploads/resources/cert-10-2077732-10-2243189.pdf",
  },
  {
    slug: "patent-10-2077732-laser-processing-device",
    displayIndex: 6,
    titleKo: "[특허증] 10-2077732호 레이저가공장치",
    titleEn: "[Patent] 10-2077732 Laser Processing Device",
    excerptKo: "레이저가공장치 관련 특허 문서입니다.",
    excerptEn: "Patent document for a laser processing device.",
    bodyKo:
      "레이저 기반 가공 공정과 장비 구현 구조를 다루는 레이저가공장치 특허 문서입니다.",
    bodyEn:
      "This patent document covers a laser processing device for laser-based manufacturing process and equipment implementation.",
    fileUrl: "/uploads/resources/patent-10-2077732-laser-processing-device.pdf",
  },
  {
    slug: "patent-10-2243189-vacuum-beam-profiling-device",
    displayIndex: 7,
    titleKo: "[특허증] 10-2243189호 진공빔프로파일링장치",
    titleEn: "[Patent] 10-2243189 Vacuum Beam Profiling Device",
    excerptKo: "진공빔프로파일링장치 관련 특허 문서입니다.",
    excerptEn: "Patent document for a vacuum beam profiling device.",
    bodyKo:
      "진공 환경에서의 빔 특성 측정과 프로파일 분석을 위한 특허 문서입니다.",
    bodyEn:
      "This patent document covers beam characteristic measurement and profile analysis in a vacuum environment.",
    fileUrl: "/uploads/resources/patent-10-2243189-vacuum-beam-profiling-device.pdf",
  },
] as const;

export const defaultPageHeroConfigs = [
  {
    pageKey: "applications",
    eyebrowKo: "APPLICATION",
    eyebrowEn: "APPLICATION",
    titleKo: "Applications",
    titleEn: "Applications",
    descriptionKo: "산업별 공정 환경에 맞는 광학 측정 및 검사 적용 분야를 소개합니다.",
    descriptionEn: "Explore optical measurement and inspection use cases across industrial workflows.",
    backgroundImageUrl: "/subpage-applications-bg.png",
    backgroundOpacity: 0.6,
  },
  {
    pageKey: "products",
    eyebrowKo: "Product",
    eyebrowEn: "Product",
    titleKo: "Products",
    titleEn: "Products",
    descriptionKo: "공정 조건과 검사 목적에 맞는 루모스 제품군을 확인하실 수 있습니다.",
    descriptionEn: "Explore the Lumos product lineup for different inspection goals and process conditions.",
    backgroundImageUrl: "/subpage-products-laser-bg.png",
    backgroundOpacity: 0.9,
  },
  {
    pageKey: "contact-quote",
    eyebrowKo: "문의하기",
    eyebrowEn: "Contact",
    titleKo: "문의하기",
    titleEn: "Contact",
    descriptionKo: "적용 목적과 요청 내용을 남겨주시면 검토 후 적합한 담당자가 안내드립니다.",
    descriptionEn: "Share your application and request, and the right team will follow up with you.",
    backgroundImageUrl: "/subpage-contact-bg.png",
    backgroundOpacity: 0.9,
  },
  {
    pageKey: "contact-distributors",
    eyebrowKo: "대리점소개",
    eyebrowEn: "Distributors",
    titleKo: "대리점소개",
    titleEn: "Distributor Information",
    descriptionKo: "Lumos 제품의 국내외 공급 및 협력 파트너 구성을 안내드립니다.",
    descriptionEn: "Find information about Lumos distribution channels and partner expansion.",
    backgroundImageUrl: "/subpage-contact-bg.png",
    backgroundOpacity: 0.9,
  },
  {
    pageKey: "contact-directions",
    eyebrowKo: "찾아오시는 길",
    eyebrowEn: "Directions",
    titleKo: "찾아오시는 길",
    titleEn: "Directions",
    descriptionKo: "루모스 방문을 위한 위치와 연락처를 안내드립니다.",
    descriptionEn: "Find our office location and contact information for your visit.",
    backgroundImageUrl: "/subpage-contact-bg.png",
    backgroundOpacity: 0.9,
  },
  {
    pageKey: "contact-resources",
    eyebrowKo: "자료실",
    eyebrowEn: "Resources",
    titleKo: "자료실",
    titleEn: "Resource Library",
    descriptionKo: "자료실 게시물과 다운로드 자료를 제공합니다.",
    descriptionEn: "Browse resource posts and downloadable reference materials.",
    backgroundImageUrl: "/subpage-contact-bg.png",
    backgroundOpacity: 0.9,
  },
  {
    pageKey: "legal-privacy",
    eyebrowKo: "Legal",
    eyebrowEn: "Legal",
    titleKo: "개인정보처리방침",
    titleEn: "Privacy Policy",
    descriptionKo: "Lumos 웹사이트 이용 과정에서 수집되는 기본 정보와 처리 기준을 안내합니다.",
    descriptionEn: "This page explains how Lumos handles basic information collected through the website.",
    backgroundImageUrl: "/subpage-contact-bg.png",
    backgroundOpacity: 0.6,
  },
  {
    pageKey: "legal-terms",
    eyebrowKo: "Legal",
    eyebrowEn: "Legal",
    titleKo: "이용약관",
    titleEn: "Terms of Service",
    descriptionKo: "Lumos 웹사이트 이용에 관한 기본 조건과 책임 범위를 안내합니다.",
    descriptionEn: "This page outlines the basic terms and responsibilities for using the Lumos website.",
    backgroundImageUrl: "/subpage-contact-bg.png",
    backgroundOpacity: 0.6,
  },
] as const;
