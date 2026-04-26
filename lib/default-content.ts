import { PRODUCT_DISPLAY_NAMES } from "./product-display";

export const defaultSiteConfig = {
  id: 1,
  heroTitleKo: "\uC815\uBC00 \uACF5\uC815\uC5D0 \uB9DE\uB294\n\uC2E0\uB8B0 \uAC00\uB2A5\uD55C \uAD11\uD559 \uC194\uB8E8\uC158",
  heroTitleEn: "Reliable optical solutions for precision manufacturing",
  heroDescriptionKo:
    "\uB8E8\uBAA8\uC2A4\uB294 \uC0B0\uC5C5\uC6A9 \uAC80\uC0AC \uD658\uACBD\uC5D0 \uB9DE\uCD98 \uAD11\uD559 \uD558\uB4DC\uC6E8\uC5B4\uC640 \uC18C\uD504\uD2B8\uC6E8\uC5B4\uB97C \uACF5\uAE09\uD569\uB2C8\uB2E4.",
  heroDescriptionEn:
    "Lumos delivers industrial optical hardware and software for production inspection workflows.",
  heroImageUrl: "/hero-main-camera-hud.png",
  heroFontSize: 52,
  storyTitleKo: "\uBE0C\uB79C\uB4DC \uC5B4\uC6D0 : \uB8E8\uBAA8\uC2A4",
  storyTitleEn: "Brand Origin : Rumos",
  storyBodyKo:
    "LUMOS\uB294 \uBE5B\uC744 \uC758\uBBF8\uD558\uB294 \uB77C\uD2F4\uC5B4 'Lumen'\uC5D0\uC11C \uC720\uB798\uD588\uC2B5\uB2C8\uB2E4. \uC815\uD655\uD55C \uCE21\uC815\uC744 \uD1B5\uD574 \uBE5B\uC758 \uBCF8\uC9C8\uC744 \uD30C\uC545\uD558\uACE0, \uAD11\uD559 \uBC0F \uB808\uC774\uC800 \uBE54 \uBD84\uC11D \uBD84\uC57C\uC5D0\uC11C \uC2E0\uB8B0\uD560 \uC218 \uC788\uB294 \uC815\uBC00\uD568\uC744 \uC81C\uACF5\uD558\uACA0\uB2E4\uB294 \uC758\uBBF8\uB97C \uB2F4\uACE0 \uC788\uC2B5\uB2C8\uB2E4.",
  storyBodyEn:
    "LUMOS comes from the Latin 'Lumen' (Light). It represents our mission to capture the true essence of light through precise measurement and to deliver trusted precision for optics and laser beam analysis.",
  storyFontSize: 18,
  seriesTitleKo: "LUMOS series",
  seriesTitleEn: "LUMOS series",
  seriesLeadKo: "",
  seriesLeadEn: "",
  seoTitleKo: "\uB8E8\uBAA8\uC2A4 | \uC0B0\uC5C5\uC6A9 \uAD11\uD559 \uC194\uB8E8\uC158",
  seoTitleEn: "Lumos | Industrial Optical Solutions",
  seoDescriptionKo:
    "\uB8E8\uBAA8\uC2A4 \uC81C\uD488, \uC560\uD50C\uB9AC\uCF00\uC774\uC158, \uC790\uB8CC\uC2E4, \uBB38\uC758\uB97C \uC81C\uACF5\uD558\uB294 \uACF5\uC2DD \uC6F9\uC0AC\uC774\uD2B8\uC785\uB2C8\uB2E4.",
  seoDescriptionEn:
    "Official website for Lumos products, applications, resources, and contact.",
} as const;

export const defaultApplications = [
  {
    slug: "semiconductor",
    titleKo: "Semiconductor",
    titleEn: "Semiconductor",
    summaryKo:
      "\uBC18\uB3C4\uCCB4 \uC81C\uC870 \uACF5\uC815\uC5D0\uC11C \uB808\uC774\uC800 \uAC00\uACF5\uC758 \uC815\uBC00\uB3C4\uB294 \uCD5C\uC885 \uC218\uC728\uACFC \uC9C1\uACB0\uB429\uB2C8\uB2E4. \uCC28\uC138\uB300 \uD328\uD0A4\uC9D5\uC744 \uC704\uD55C LUM-B\uC758 \uB808\uC774\uC800 \uC194\uB354\uB9C1(Laser Soldering)\uBD80\uD130 \uB300\uBA74\uC801 \uACF5\uC815\uC5D0 \uCD5C\uC801\uD654\uB41C LUM-B-L\uC758 \uC6E8\uC774\uD37C \uC5B4\uB2D0\uB9C1(Wafer Annealing)\uC5D0 \uC774\uB974\uAE30\uAE4C\uC9C0 \uC815\uD655\uD55C \uC5D0\uB108\uC9C0 \uBD84\uD3EC \uC81C\uC5B4\uAC00 \uD544\uC218\uC801\uC785\uB2C8\uB2E4. \uB610\uD55C, LUM-F\uB97C \uD65C\uC6A9\uD55C \uC6E8\uC774\uD37C \uADF8\uB8E8\uBE59 \uBC0F \uB2E4\uC774\uC2F1(Wafer Grooving & Dicing)\uACFC TGV \uACF5\uC815, \uADF8\uB9AC\uACE0 LUM-Z\uC758 \uCD08\uC815\uBC00 \uC2A4\uD154\uC2A4 \uB2E4\uC774\uC2F1(Stealth Dicing) \uBC0F TGV \uC194\uB8E8\uC158\uC744 \uD1B5\uD574 \uAE30\uD310 \uC190\uC0C1\uC744 \uC644\uBCBD\uD788 \uBC29\uC9C0\uD558\uACE0 \uCD5C\uACE0 \uC218\uC900\uC758 \uACF5\uC815 \uC7AC\uD604\uC131\uC744 \uBCF4\uC7A5\uD569\uB2C8\uB2E4.",
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
      "\uD0DC\uC591\uC804\uC9C0\uC758 \uD6A8\uC728 \uADF9\uB300\uD654\uB97C \uC704\uD574\uC11C\uB294 \uC81C\uC870 \uACF5\uC815\uC758 \uACB0\uC810 \uC5C6\uB294 \uC815\uBC00\uD568\uC774 \uC694\uAD6C\uB429\uB2C8\uB2E4. \uC5E3\uC9C0 \uC544\uC774\uC194\uB808\uC774\uC158(Edge Isolation), \uC2A4\uD06C\uB77C\uC774\uBE59(Scribing) \uB4F1\uC758 \uB808\uC774\uC800 \uAC00\uACF5 \uC2DC \uC5F4\uC601\uD5A5\uAD6C\uC5ED(HAZ)\uACFC \uBBF8\uC138 \uD06C\uB799\uC744 \uCD5C\uC18C\uD654\uD558\uB824\uBA74 \uD754\uB4E4\uB9BC \uC5C6\uB294 \uBE54 \uD488\uC9C8\uC774 \uD544\uC218\uC801\uC785\uB2C8\uB2E4. \uB2F9\uC0AC\uC758 \uCCA8\uB2E8 \uBE54 \uBAA8\uB2C8\uD130\uB9C1 \uC2DC\uC2A4\uD15C\uC740 \uAD11\uC6D0\uC744 \uC644\uBCBD\uD558\uAC8C \uCD5C\uC801\uD654\uD558\uC5EC \uD0DC\uC591\uC804\uC9C0\uC758 \uAD11\uC804 \uD6A8\uC728\uACFC \uC81C\uD488 \uC218\uBA85\uC744 \uD68D\uAE30\uC801\uC73C\uB85C \uD5A5\uC0C1\uC2DC\uD0B5\uB2C8\uB2E4.",
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
      "\uC758\uB8CC \uBC0F \uC0DD\uBA85\uACF5\uD559 \uBD84\uC57C\uC5D0\uC11C \uAD11\uD559 \uC2DC\uC2A4\uD15C\uC758 \uC2E0\uB8B0\uC131\uC740 \uD658\uC790\uC758 \uC548\uC804\uACFC \uC9C1\uACB0\uB429\uB2C8\uB2E4. \uD53C\uBD80 \uBBF8\uC6A9 \uB808\uC774\uC800, \uC815\uBC00 \uC678\uACFC\uC6A9 \uC7A5\uBE44 \uBC0F \uACE0\uD574\uC0C1\uB3C4 \uBC14\uC774\uC624 \uC774\uBBF8\uC9D5 \uC2DC\uC2A4\uD15C\uC740 \uC124\uACC4\uB41C \uCD9C\uB825 \uC2A4\uD399\uC744 \uC624\uCC28 \uC5C6\uC774 \uC900\uC218\uD574\uC57C \uD569\uB2C8\uB2E4. \uB2F9\uC0AC\uC758 \uC194\uB8E8\uC158\uC740 \uC815\uBC00\uD55C \uBE54 \uC9C4\uB2E8\uC744 \uD1B5\uD574 \uC2E4\uC2DC\uAC04\uC73C\uB85C \uC5D0\uB108\uC9C0 \uB300\uCE6D\uC131\uC744 \uAC80\uC99D\uD558\uC5EC, \uC758\uB8CC \uAE30\uAE30\uC758 \uC548\uC804\uD558\uACE0 \uC644\uBCBD\uD55C \uD488\uC9C8 \uBCF4\uC99D(QA) \uCCB4\uACC4\uB97C \uC9C0\uC6D0\uD569\uB2C8\uB2E4.",
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
      "\uC804\uAE30\uCC28\uC640 \uC790\uC728\uC8FC\uD589 \uC2DC\uB300\uB85C\uC758 \uC804\uD658\uC740 \uCCA8\uB2E8 \uAD11\uD559 \uAE30\uC220\uC744 \uBC14\uD0D5\uC73C\uB85C \uC644\uC131\uB429\uB2C8\uB2E4. \uC774\uCC28\uC804\uC9C0\uC758 \uD654\uC7AC\uB97C \uC608\uBC29\uD558\uB294 \uC815\uBC00\uD55C \uB808\uC774\uC800 \uC6A9\uC811\uBD80\uD130, \uC790\uC728\uC8FC\uD589\uC758 \uD575\uC2EC\uC778 \uB77C\uC774\uB2E4(LiDAR) \uC13C\uC11C\uC758 \uBE54 \uD655\uC0B0 \uD328\uD134 \uBC0F \uC548\uC804\uC131 \uAC80\uC99D\uAE4C\uC9C0 \uC644\uBCBD\uD55C \uD488\uC9C8 \uAD00\uB9AC\uAC00 \uC694\uAD6C\uB429\uB2C8\uB2E4. \uD2B9\uD788 \uACE0\uCD9C\uB825 LUM-B-L \uBAA8\uB378\uC740 \uBE45\uC140(VCSEL) \uAC80\uC0AC\uC5D0 \uCD5C\uC801\uD654\uB418\uC5B4 \uC788\uC5B4, \uBB34\uACB0\uC810 \uC804\uC7A5 \uBD80\uD488 \uC0DD\uC0B0\uACFC \uC13C\uC11C \uC2E0\uB8B0\uC131 \uD655\uBCF4\uB97C \uC704\uD55C \uD575\uC2EC \uB808\uC774\uC800 \uC9C4\uB2E8 \uC194\uB8E8\uC158\uC744 \uC81C\uACF5\uD569\uB2C8\uB2E4.",
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
      "\uD50C\uB809\uC2DC\uBE14 \uBC0F \uCD08\uBC15\uB9C9 \uB514\uC2A4\uD50C\uB808\uC774\uB294 \uB808\uC774\uC800 \uBBF8\uC138 \uAC00\uACF5 \uAE30\uC220\uC758 \uC815\uC810\uC744 \uC694\uAD6C\uD569\uB2C8\uB2E4. \uB2F9\uC0AC\uB294 LUM-B-L\uC744 \uD1B5\uD55C \uD50C\uB809\uC2DC\uBE14 \uD328\uB110 \uBC15\uB9AC(Laser Lift-Off) \uBC0F Micro LED \uACF5\uC815, LUM-F\uB97C \uD65C\uC6A9\uD55C UTG \uCEE4\uD305 \uBC0F \uCD08\uBBF8\uC138 \uD640 \uB4DC\uB9B4\uB9C1(Laser Hole Drilling) \uB4F1 \uD575\uC2EC \uACF5\uC815\uC5D0 \uCD5C\uC801\uD654\uB41C \uBE54 \uD504\uB85C\uD30C\uC77C\uB9C1\uC744 \uC81C\uACF5\uD569\uB2C8\uB2E4. \uB354\uBD88\uC5B4 \uACE0\uC18D \uC591\uC0B0\uC744 \uC704\uD55C LUM-B\uC758 \uACE0\uC18D \uBE54 \uBD84\uD560(High-Speed Beam Splitting) \uBC0F \uC194\uB354\uB9C1, LUM-Z\uC758 \uBA40\uD2F0 \uC2A4\uD31F(Multi Spot) \uBD84\uC11D\uC744 \uD1B5\uD574 \uCE58\uBC00\uD55C \uC5D0\uB108\uC9C0 \uADE0\uC77C\uB3C4 \uC81C\uC5B4\uB97C \uC2E4\uD604\uD558\uC5EC \uC555\uB3C4\uC801\uC778 \uC591\uC0B0 \uC218\uC728 \uB2EC\uC131\uC744 \uB3D5\uC2B5\uB2C8\uB2E4.",
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
      "\uC790\uB3D9 \uAD11\uD559 \uAC80\uC0AC(AOI) \uC2DC\uC2A4\uD15C\uC758 \uC815\uD655\uB3C4\uB294 \uBE44\uC804\uC744 \uBE44\uCD94\uB294 \uC870\uBA85 \uBC0F \uAD11\uC6D0\uC758 \uD488\uC9C8\uC5D0 \uD06C\uAC8C \uC758\uC874\uD569\uB2C8\uB2E4. \uBD88\uADE0\uC77C\uD55C \uBE5B \uBD84\uD3EC\uB294 \uBBF8\uC138 \uBD88\uB7C9\uC744 \uB193\uCE58\uAC70\uB098 \uC624\uAC80\uCD9C\uC744 \uC720\uBC1C\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. LUM-B \uBAA8\uB378\uC740 \uB808\uC774\uC800 \uC18C\uC2A4\uC758 \uD488\uC9C8 \uBCF4\uC99D \uBC0F \uC5F0\uAD6C\uAC1C\uBC1C(Laser Source QA & R&D)\uC740 \uBB3C\uB860, \uCD08\uAE30 \uB808\uC774\uC800 \uC815\uB82C(Initial Laser Alignment) \uACFC\uC815\uC5D0\uC11C \uD0C1\uC6D4\uD55C \uC131\uB2A5\uC744 \uBC1C\uD718\uD569\uB2C8\uB2E4. \uC774\uB97C \uD1B5\uD574 \uCCA8\uB2E8 \uAD11\uD559 \uCE21\uC815 \uAE30\uC220\uB85C AOI \uC7A5\uBE44\uC758 \uC870\uBA85 \uADE0\uC77C\uB3C4\uB97C \uC815\uBC00\uD558\uAC8C \uAD50\uC815\uD558\uC5EC, \uB9C8\uC774\uD06C\uB85C \uB2E8\uC704\uC758 \uACB0\uD568\uC744 \uC77C\uAD00\uB418\uAC8C \uCC3E\uC544\uB0B4\uB294 \uC644\uBCBD\uD55C \uAC80\uC0AC \uC2E0\uB8B0\uC131\uC744 \uC81C\uACF5\uD569\uB2C8\uB2E4.",
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
