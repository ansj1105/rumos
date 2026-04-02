import { prisma } from "@/lib/prisma";
import type { Locale } from "@/lib/site";

const fallbackSiteConfig = {
  id: 1,
  heroTitleKo: "정밀 공정에 맞는 신뢰 가능한 광학 솔루션",
  heroTitleEn: "Reliable optical solutions for precision manufacturing",
  heroDescriptionKo:
    "루모스는 산업용 검사 환경에 맞춘 광학 장비와 소프트웨어를 공급합니다.",
  heroDescriptionEn:
    "Lumos delivers industrial optical hardware and software for production inspection workflows.",
  storyBodyKo:
    "Lumos는 빛을 뜻하는 어원을 기반으로 공정 품질을 선명하게 드러내는 광학 기술 브랜드를 지향합니다.",
  storyBodyEn:
    "Lumos is inspired by light and aims to reveal process quality with clarity through industrial optical technology.",
  seoTitleKo: "루모스 | 산업용 광학 솔루션",
  seoTitleEn: "Lumos | Industrial Optical Solutions",
  seoDescriptionKo:
    "루모스 제품, 애플리케이션, 자료실, 문의를 제공하는 공식 웹사이트입니다.",
  seoDescriptionEn:
    "Official website for Lumos products, applications, resources, and contact.",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const fallbackApplications = [
  {
    id: 1,
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
    sortOrder: 1,
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
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
    sortOrder: 2,
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const fallbackProducts = [
  "lum-b",
  "lum-b-l",
  "lum-f",
  "lum-z",
  "software",
].map((slug, index) => {
  const nameMap: Record<string, string> = {
    "lum-b": "LUM-B",
    "lum-b-l": "LUM-B-L",
    "lum-f": "LUM-F",
    "lum-z": "LUM-Z",
    software: "Software",
  };
  const name = nameMap[slug];

  return {
    id: index + 1,
    slug,
    nameKo: name,
    nameEn: name,
    summaryKo: `${name} 제품 개요와 핵심 사양을 소개합니다.`,
    summaryEn: `Overview and key specifications for ${name}.`,
    contentKo:
      `${name}는 산업용 광학 검사 환경에서 안정적인 측정과 반복 정밀도를 확보하기 위한 제품군입니다. 적용 공정 조건에 맞춰 장비 구성과 운영 흐름을 설계할 수 있도록 구성했습니다.`,
    contentEn:
      `${name} is a product line built for stable measurement and repeatable precision in industrial optical inspection environments. It is structured to support equipment configuration and operational flow based on process requirements.`,
    imageUrl: null,
    seoTitleKo: `${name} | 루모스`,
    seoTitleEn: `${name} | Lumos`,
    seoDescriptionKo: `${name} 제품 상세 안내 페이지입니다.`,
    seoDescriptionEn: `Detailed product page for ${name}.`,
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});

const fallbackResources = [
  {
    id: 1,
    slug: "company-profile",
    titleKo: "회사 소개서",
    titleEn: "Company Profile",
    excerptKo: "루모스 회사 소개 자료 예시입니다.",
    excerptEn: "Sample Lumos company introduction resource.",
    bodyKo:
      "자료실 상세 페이지는 문서 설명, 첨부 파일 링크, 게시 시점을 제공하도록 구현했습니다.",
    bodyEn:
      "The resource detail page provides document descriptions, file links, and publish timestamps.",
    fileUrl: null,
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

function logFallback(scope: string, error: unknown) {
  console.warn(`[content] falling back to static data for ${scope}`);
  if (process.env.NODE_ENV !== "production") {
    console.warn(error);
  }
}

export async function getSiteConfig() {
  try {
    return await prisma.siteConfig.findUnique({
      where: { id: 1 },
    });
  } catch (error) {
    logFallback("siteConfig", error);
    return fallbackSiteConfig;
  }
}

export async function getApplications() {
  try {
    return await prisma.application.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    });
  } catch (error) {
    logFallback("applications", error);
    return fallbackApplications;
  }
}

export async function getProducts() {
  try {
    return await prisma.product.findMany({
      where: { published: true },
      orderBy: { createdAt: "asc" },
    });
  } catch (error) {
    logFallback("products", error);
    return fallbackProducts;
  }
}

export async function getProductBySlug(slug: string) {
  try {
    return await prisma.product.findUnique({
      where: { slug },
    });
  } catch (error) {
    logFallback(`product:${slug}`, error);
    return fallbackProducts.find((product) => product.slug === slug) ?? null;
  }
}

export async function getResources() {
  try {
    return await prisma.resource.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    logFallback("resources", error);
    return fallbackResources;
  }
}

export async function getResourceBySlug(slug: string) {
  try {
    return await prisma.resource.findUnique({
      where: { slug },
    });
  } catch (error) {
    logFallback(`resource:${slug}`, error);
    return fallbackResources.find((resource) => resource.slug === slug) ?? null;
  }
}

export function pickLocalized<T extends Record<string, unknown>>(
  data: T,
  locale: Locale,
  field: string,
) {
  const suffix = locale === "ko" ? "Ko" : "En";
  return data[`${field}${suffix}` as keyof T];
}
