import type { Locale } from "@/lib/site";

type NavItem = {
  label: string;
  href: string;
  children?: Array<{ label: string; href: string }>;
};

type Dictionary = {
  localeName: string;
  brand: string;
  meta: {
    title: string;
    description: string;
  };
  nav: NavItem[];
  hero: {
    eyebrow: string;
    titlePrefix: string;
    titleHighlight: string;
    lead: string;
    relationLabel: string;
    relationBody: string;
    ctaDetail: string;
    visualLabel: string;
  };
  story: {
    title: string;
    body: string;
  };
  homepage: {
    productTitle: string;
    productLead: string;
    directionsTitle: string;
    directionsBody: string;
    applicationsTitle: string;
    applicationsBody: string;
  };
  directions: {
    title: string;
    body: string;
    mapHint: string;
  };
  applications: {
    title: string;
    lead: string;
  };
  products: {
    title: string;
    lead: string;
  };
  contact: {
    title: string;
    lead: string;
    formTitle: string;
    formBody: string;
    resourceTitle: string;
  };
  footer: {
    heading: string;
    company: string;
    companyLine2?: string;
    email: string;
    phone: string;
    fax: string;
    legal: Array<{ label: string; href: string }>;
  };
  admin: {
    title: string;
    lead: string;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  ko: {
    localeName: "한국어",
    brand: "루모스",
    meta: {
      title: "루모스 | 산업용 광학 솔루션",
      description:
        "루모스 제품, 애플리케이션, 문의 및 자료실을 제공하는 공식 웹사이트입니다.",
    },
    nav: [
      {
        label: "Company",
        href: "/company",
      },
      {
        label: "Application",
        href: "/applications",
        children: [{ label: "어플리케이션 소개", href: "/applications" }],
      },
      {
        label: "Product",
        href: "/products",
        children: [
          { label: "Raw Beam Profiler (LUM-B)", href: "/products/lum-b" },
          { label: "Large Beam Profiler (LUM-B-L)", href: "/products/lum-b-l" },
          { label: "Focus Beam Profiler (LUM-F)", href: "/products/lum-f" },
          { label: "3D Beam Profiling and Analysis (LUM-Z)", href: "/products/lum-z" },
          { label: "Lumosity (Software)", href: "/products/software" },
          { label: "Infinity Flat Top Imaging Optics (IFI)", href: "/products/ifi" },
          { label: "Customizing", href: "/products/customizing" },
        ],
      },
      {
        label: "Contact",
        href: "/contact",
        children: [
          { label: "문의하기", href: "/contact/quote" },
          { label: "대리점소개", href: "/contact/distributors" },
          { label: "찾아오시는 길", href: "/contact/directions" },
          { label: "자료실", href: "/contact/resources" },
        ],
      },
    ],
    hero: {
      eyebrow: "",
      titlePrefix: "About",
      titleHighlight: "LUMOS",
      lead:
        "전 세계의 하나뿐인 대면적 CMOS sensor가 적용된 Large Beam Profiler",
      relationLabel: "",
      relationBody:
        "신호텍은 20년간 Metrolux의 한국 대리점으로서 한국 양산라인에 수백 대의 빔프로파일러를 공급하며 그 노하우를 축적해 왔습니다. 2000년대 초반 Metrolux가 아쉽게도 제품 단종을 결정하게 되어, 그동안 축적해 놓은 Metrolux의 명성과 품질을 유산으로 4년여의 개발을 통해 이어받아 2026년 LUMOS라는 브랜드로 새롭게 출발하게 되었습니다. LUMOS는 한국 최초의 commercial beam profiler로서 한국의 강점인 반도체, 디스플레이, 2차전지, PCB 고객의 니즈를 빔프로파일러의 품질에 녹여냄으로써 세계에서 가장 양산에 최적화되어 있다고 감히 자부할 수 있습니다.",
      ctaDetail: "자세히 보기",
      visualLabel: "Precision optical engineering",
    },
    story: {
      title: "Brand Origin : LUMOS",
      body:
        "LUMOS는 라틴어로 '빛'을 뜻하는 'Lumen'에서 영감을 받아 탄생했으며,\n빛을 정밀하게 측정하고자 하는 우리의 사명을 담고 있습니다.",
    },
    homepage: {
      productTitle: "Product",
      productLead: "핵심 제품군과 소프트웨어 라인업을 확인하세요.",
      directionsTitle: "오시는 길",
      directionsBody:
        "서울 금천구 가산디지털 1로 19 대륭테크노타운 18차 1306호",
      applicationsTitle: "Applications",
      applicationsBody:
        "반도체, NAND 등 실제 산업 적용 사례를 한 페이지에서 정리합니다.",
    },
    directions: {
      title: "오시는 길",
      body:
        "루모스 방문을 위한 위치와 연락처를 안내드립니다.",
      mapHint: "운영 시 Kakao Map 또는 Naver Map 임베드를 연결하면 됩니다.",
    },
    applications: {
      title: "Applications",
      lead: "산업별 적용 포인트와 핵심 설명을 관리형 데이터로 제공합니다.",
    },
    products: {
      title: "Products",
      lead: "공정 조건과 검사 목적에 맞는 루모스 제품군을 확인하실 수 있습니다.",
    },
    contact: {
      title: "Contact",
      lead: "문의 접수는 DB에 저장되며, SMTP 설정 시 이메일도 함께 발송됩니다.",
      formTitle: "Contact",
      formBody: "회사명, 담당자, 이메일, 문의 내용 기준으로 기본 폼을 제공합니다.",
      resourceTitle: "자료실",
    },
    footer: {
      heading: "Headquarter",
      company: "1306 Daerung Techno Town-18, 19 Gasan digital 1-ro, Geumcheon-gu, Seoul, 08594, Korea",
      email: "sales@lumosity.co.kr",
      phone: "+82 (0)2 852-0533",
      fax: "+82 (0)2 853-0537",
      legal: [
        { label: "개인정보처리방침", href: "/legal/privacy" },
        { label: "이용약관", href: "/legal/terms" },
      ],
    },
    admin: {
      title: "관리자",
      lead: "메인, 제품, 애플리케이션, 자료실, 문의를 운영자가 직접 관리합니다.",
    },
  },
  en: {
    localeName: "English",
    brand: "Lumos",
    meta: {
      title: "Lumos | Industrial Optical Solutions",
      description:
        "Official website for Lumos products, applications, contact, and resources.",
    },
    nav: [
      {
        label: "Company",
        href: "/company",
      },
      {
        label: "Applications",
        href: "/applications",
        children: [{ label: "Application Overview", href: "/applications" }],
      },
      {
        label: "Product",
        href: "/products",
        children: [
          { label: "Raw Beam Profiler (LUM-B)", href: "/products/lum-b" },
          { label: "Large Beam Profiler (LUM-B-L)", href: "/products/lum-b-l" },
          { label: "Focus Beam Profiler (LUM-F)", href: "/products/lum-f" },
          { label: "3D Beam Profiling and Analysis (LUM-Z)", href: "/products/lum-z" },
          { label: "Lumosity (Software)", href: "/products/software" },
          { label: "Infinity Flat Top Imaging Optics (IFI)", href: "/products/ifi" },
          { label: "Customizing", href: "/products/customizing" },
        ],
      },
      {
        label: "Contact",
        href: "/contact",
        children: [
          { label: "Contact", href: "/contact/quote" },
          { label: "Distributors", href: "/contact/distributors" },
          { label: "Directions", href: "/contact/directions" },
          { label: "Resources", href: "/contact/resources" },
        ],
      },
    ],
    hero: {
      eyebrow: "",
      titlePrefix: "About",
      titleHighlight: "LUMOS",
      lead:
        "Large Beam Profiler with the world's only large-area CMOS sensor.",
      relationLabel: "",
      relationBody:
        "As the Korean distributor of Metrolux for 20 years, Shinhotek accumulated extensive know-how by supplying hundreds of beam profilers to mass production lines in Korea. When Metrolux regrettably decided to discontinue its products in the early 2000s, we carried forward its reputation and quality through approximately four years of development and launched a new brand, LUMOS, in 2026. As Korea's first commercial beam profiler, LUMOS reflects the needs of customers across Korean industries, including semiconductors, displays, secondary batteries, and PCBs. We are confident in stating that our products are among the world's most optimized for mass production.",
      ctaDetail: "Learn more",
      visualLabel: "Precision optical engineering",
    },
    story: {
      title: "Brand Origin : LUMOS",
      body:
        "LUMOS is inspired by the Latin Lumen (light),\nreflecting our mission to measure light with precision.",
    },
    homepage: {
      productTitle: "Products",
      productLead: "Explore the core product family and software lineup.",
      directionsTitle: "Directions",
      directionsBody:
        "1306, Daeryung Technotown 18-cha, 19 Gasan digital 1-ro, Geumcheon-gu, Seoul",
      applicationsTitle: "Applications",
      applicationsBody:
        "Industrial use cases such as semiconductor and NAND are organized on a single page.",
    },
    directions: {
      title: "Directions",
      body:
        "Find our office location and contact information for your visit.",
      mapHint: "Connect Kakao Map or Naver Map embed for production use.",
    },
    applications: {
      title: "Applications",
      lead: "Industry-specific use cases and key descriptions are delivered from managed content.",
    },
    products: {
      title: "Products",
      lead: "Explore the Lumos product lineup for different inspection goals and process conditions.",
    },
    contact: {
      title: "Contact",
      lead: "Inquiries are stored in the database, and optionally emailed through SMTP.",
      formTitle: "Contact",
      formBody: "The default form collects company, name, email, and message.",
      resourceTitle: "Resources",
    },
    footer: {
      heading: "Headquarter",
      company:
        "1306 Daerung Techno Town-18, 19 Gasan digital 1-ro, Geumcheon-gu, Seoul, 08594, Korea",
      email: "sales@lumosity.co.kr",
      phone: "+82 (0)2 852-0533",
      fax: "+82 (0)2 853-0537",
      legal: [
        { label: "Privacy Policy", href: "/legal/privacy" },
        { label: "Terms of Service", href: "/legal/terms" },
      ],
    },
    admin: {
      title: "Admin",
      lead: "Operators can manage homepage, products, applications, resources, and inquiries.",
    },
  },
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
