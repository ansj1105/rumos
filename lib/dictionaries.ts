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
        label: "Application",
        href: "/applications",
        children: [{ label: "어플리케이션 소개", href: "/applications" }],
      },
      {
        label: "Product",
        href: "/products",
        children: [
          { label: "LUM-B", href: "/products/lum-b" },
          { label: "LUM-B-L", href: "/products/lum-b-l" },
          { label: "LUM-F", href: "/products/lum-f" },
          { label: "LUM-Z", href: "/products/lum-z" },
          { label: "Software", href: "/products/software" },
        ],
      },
      {
        label: "Contact Us",
        href: "/contact",
        children: [
          { label: "문의하기", href: "/contact/quote" },
          { label: "대리점소개", href: "/contact/distributors" },
          { label: "찾아오시는길", href: "/contact/directions" },
          { label: "자료실", href: "/contact/resources" },
        ],
      },
    ],
    hero: {
      eyebrow: "LUMOS Background | SHINHOTEK",
      titlePrefix: "About",
      titleHighlight: "LUMOS",
      lead:
        "LUMOS(루모스)는 정밀 광학 및 레이저 분야에서 다년간 노하우를 축적해 온 신호텍(Shinhotek)이 기획부터 R&D, 생산까지 전 과정을 직접 완성한 자체 개발 장비 브랜드입니다. 신호텍은 산업 현장의 고객들이 기존 장비들을 사용하며 겪는 높은 가격 장벽, 복잡한 소프트웨어, 늦은 기술 지원 등의 실질적인 불편함에 주목했습니다.",
      relationLabel: "SHINHOTEK",
      relationBody:
        "이러한 시장의 니즈를 근본적으로 해결하기 위해, 우리는 자체 기술력을 바탕으로 합리적인 도입 비용과 직관적인 인터페이스, 그리고 신속한 사후 관리를 모두 갖춘 LUMOS를 선보이게 되었습니다. 신호텍의 탄탄한 인프라와 독자적인 제조 역량을 통해, LUMOS는 레이저 측정 분야의 가장 신뢰할 수 있는 새로운 표준을 제시합니다.",
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
      formTitle: "Contact Us",
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
        label: "Applications",
        href: "/applications",
        children: [{ label: "Application Overview", href: "/applications" }],
      },
      {
        label: "Product",
        href: "/products",
        children: [
          { label: "LUM-B", href: "/products/lum-b" },
          { label: "LUM-B-L", href: "/products/lum-b-l" },
          { label: "LUM-F", href: "/products/lum-f" },
          { label: "LUM-Z", href: "/products/lum-z" },
          { label: "Software", href: "/products/software" },
        ],
      },
      {
        label: "Contact Us",
        href: "/contact",
        children: [
          { label: "Contact Us", href: "/contact/quote" },
          { label: "Distributors", href: "/contact/distributors" },
          { label: "Directions", href: "/contact/directions" },
          { label: "Resources", href: "/contact/resources" },
        ],
      },
    ],
    hero: {
      eyebrow: "LUMOS Background | SHINHOTEK",
      titlePrefix: "About",
      titleHighlight: "LUMOS",
      lead:
        "LUMOS is a proprietary equipment brand fully conceived, developed, and manufactured by Shinhotek, a company with years of expertise in precision optics and laser systems. Shinhotek recognized the practical friction customers faced with conventional equipment, including high acquisition costs, overly complex software, and slow technical support.",
      relationLabel: "SHINHOTEK",
      relationBody:
        "To address those issues at the root, we built LUMOS around our own engineering capabilities, combining a more reasonable entry cost, an intuitive interface, and responsive after-sales support. Backed by Shinhotek's solid infrastructure and in-house manufacturing capabilities, LUMOS is committed to setting the most trusted new standard in laser measurement.",
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
      formTitle: "Contact Us",
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
