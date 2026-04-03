export const defaultSiteConfig = {
  id: 1,
  heroTitleKo: "정밀 공정에 맞는 신뢰 가능한 광학 솔루션",
  heroTitleEn: "Reliable optical solutions for precision manufacturing",
  heroDescriptionKo:
    "루모스는 산업용 검사 환경에 맞춘 광학 장비와 소프트웨어를 공급합니다.",
  heroDescriptionEn:
    "Lumos delivers industrial optical hardware and software for production inspection workflows.",
  heroImageUrl: "/hero-semiconductor-bg.jpg",
  heroFontSize: 52,
  storyTitleKo: "LUMOS 이름 어원",
  storyTitleEn: "Origin of the name LUMOS",
  storyBodyKo:
    "LUMOS는 빛을 뜻하는 라틴어 'Lumen'에서 유래했습니다. 정확한 측정을 통해 빛의 본질을 포착하고, 광학 및 레이저 빔 분석 분야에 신뢰할 수 있는 정밀도를 제공하겠다는 의미를 담고 있습니다.",
  storyBodyEn:
    "LUMOS comes from the Latin 'Lumen' (Light). It represents our mission to capture the true essence of light through precise measurement and to deliver trusted precision for optics and laser beam analysis.",
  storyFontSize: 18,
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
    titleKo: "반도체 검사",
    titleEn: "Semiconductor Inspection",
    summaryKo: "웨이퍼 및 공정 품질 확인을 위한 광학 검사 적용 사례",
    summaryEn: "Optical inspection use cases for wafer and process quality control",
    imageUrl: null,
    bulletsKo: [
      "고해상도 표면 결함 검출",
      "라인 연동형 공정 품질 점검",
      "반복 정밀도 확보",
      "고속 검사 대응",
      "데이터 기반 리포팅",
    ],
    bulletsEn: [
      "High-resolution surface defect detection",
      "Inline process quality checks",
      "Repeatable precision",
      "High-speed inspection support",
      "Data-driven reporting",
    ],
  },
  {
    slug: "nand",
    titleKo: "NAND 공정",
    titleEn: "NAND Process",
    summaryKo: "미세 패턴 검출과 품질 안정화 중심의 적용 사례",
    summaryEn: "Applications focused on fine-pattern detection and quality stability",
    imageUrl: null,
    bulletsKo: [
      "미세 패턴 식별",
      "공정 편차 모니터링",
      "재작업률 감소",
      "장비 통합 용이성",
      "결과 추적성 확보",
    ],
    bulletsEn: [
      "Fine-pattern identification",
      "Process variation monitoring",
      "Reduced rework rate",
      "Ease of machine integration",
      "Traceable results",
    ],
  },
] as const;

export const defaultProducts = [
  {
    slug: "lum-b",
    name: "LUM-B",
  },
  {
    slug: "lum-b-l",
    name: "LUM-B-L",
  },
  {
    slug: "lum-f",
    name: "LUM-F",
  },
  {
    slug: "lum-z",
    name: "LUM-Z",
  },
  {
    slug: "software",
    name: "Software",
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
] as const;
