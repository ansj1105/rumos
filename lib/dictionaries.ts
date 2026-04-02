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
    company: string;
    legal: string[];
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
      { label: "오시는 길", href: "/directions" },
      { label: "Application", href: "/applications" },
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
        label: "Contact",
        href: "/contact",
        children: [
          { label: "Contact Us", href: "/contact" },
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
        "Rumos는 빛을 뜻하는 어원을 바탕으로, 공정 품질을 선명하게 드러내는 광학 기술 브랜드를 지향합니다.",
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
      company: "서울특별시 금천구 가산디지털 1로 19 대륭테크노타운 18차 1306호",
      legal: ["개인정보처리방침", "이용약관"],
    },
    admin: {
      title: "관리자",
      lead: "메인, 제품, 애플리케이션, 자료실, 문의를 운영자가 직접 관리합니다.",
    },
  },
  en: {
    localeName: "English",
    brand: "Rumos",
    meta: {
      title: "Rumos | Industrial Optical Solutions",
      description:
        "Official website for Rumos products, applications, contact, and resources.",
    },
    nav: [
      { label: "Directions", href: "/directions" },
      { label: "Applications", href: "/applications" },
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
        label: "Contact",
        href: "/contact",
        children: [
          { label: "Contact Us", href: "/contact" },
          { label: "Resources", href: "/contact/resources" },
        ],
      },
    ],
    hero: {
      eyebrow: "OPTICAL INSPECTION PLATFORM",
      title: "Reliable optical solutions for precision manufacturing",
      description:
        "Rumos delivers industrial optical hardware and software for production inspection workflows.",
      ctaPrimary: "View products",
      ctaSecondary: "Contact us",
    },
    story: {
      title: "Brand Story",
      body:
        "Rumos is inspired by light, with a brand direction centered on optical technology that reveals process quality with clarity.",
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
      lead: "Explore the Rumos product lineup for different inspection goals and process conditions.",
    },
    contact: {
      title: "Contact",
      lead: "Inquiries are stored in the database, and optionally emailed through SMTP.",
      formTitle: "Contact Us",
      formBody: "The default form collects company, name, email, and message.",
      resourceTitle: "Resources",
    },
    footer: {
      company:
        "1306, Daeryung Technotown 18-cha, 19 Gasan digital 1-ro, Geumcheon-gu, Seoul, Korea",
      legal: ["Privacy Policy", "Terms of Service"],
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
