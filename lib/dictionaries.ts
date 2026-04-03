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
    title: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
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
    website: string;
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
          { label: "견적문의", href: "/contact/quote" },
          { label: "대리점소개", href: "/contact/distributors" },
          { label: "찾아오시는길", href: "/contact/directions" },
          { label: "자료실", href: "/contact/resources" },
        ],
      },
    ],
    hero: {
      eyebrow: "OPTICAL INSPECTION PLATFORM",
      title: "정밀 공정에 맞는 신뢰 가능한 광학 솔루션",
      description:
        "루모스는 산업용 검사 환경에 맞춘 광학 장비와 소프트웨어를 공급합니다.",
      ctaPrimary: "제품 보기",
      ctaSecondary: "문의하기",
    },
    story: {
      title: "Brand Story",
      body:
        "LUMOS는 빛을 뜻하는 라틴어 'Lumen'에서 유래했습니다. 정확한 측정을 통해 빛의 본질을 포착하고, 광학 및 레이저 빔 분석 분야에 신뢰할 수 있는 정밀도를 제공하겠다는 의미를 담고 있습니다.",
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
      company: "#1306 Daerung Techno Town-18, 19 Gasan digital 1-ro, Geumcheon-gu, Seoul, 08594, Korea",
      email: "sales@lumosity.co.kr",
      phone: "+82 (0)2 852-0533",
      fax: "+82 (0)2 853-0537",
      website: "www.Lumosity.co.kr",
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
          { label: "Quote Request", href: "/contact/quote" },
          { label: "Distributors", href: "/contact/distributors" },
          { label: "Directions", href: "/contact/directions" },
          { label: "Resources", href: "/contact/resources" },
        ],
      },
    ],
    hero: {
      eyebrow: "OPTICAL INSPECTION PLATFORM",
      title: "Reliable optical solutions for precision manufacturing",
      description:
        "Lumos delivers industrial optical hardware and software for production inspection workflows.",
      ctaPrimary: "View products",
      ctaSecondary: "Contact us",
    },
    story: {
      title: "Brand Story",
      body:
        "LUMOS comes from the Latin 'Lumen' (Light). It represents our mission to capture the true essence of light through precise measurement and to deliver trusted precision for optics and laser beam analysis.",
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
        "#1306 Daerung Techno Town-18, 19 Gasan digital 1-ro, Geumcheon-gu, Seoul, 08594, Korea",
      email: "sales@lumosity.co.kr",
      phone: "+82 (0)2 852-0533",
      fax: "+82 (0)2 853-0537",
      website: "www.Lumosity.co.kr",
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
