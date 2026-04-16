import {
  defaultApplications,
  defaultPageHeroConfigs,
  defaultProducts,
  defaultResources,
  defaultSiteConfig,
} from "@/lib/default-content";
import { prisma } from "@/lib/prisma";
import type { Locale } from "@/lib/site";

const fallbackNow = new Date();

const fallbackSiteConfig = {
  ...defaultSiteConfig,
  heroImageHistory: [],
  createdAt: fallbackNow,
  updatedAt: fallbackNow,
};

const fallbackApplications = defaultApplications.map((application, index) => ({
  id: index + 1,
  ...application,
  sortOrder: index + 1,
  published: true,
  createdAt: fallbackNow,
  updatedAt: fallbackNow,
}));

const fallbackProducts = defaultProducts.map((product, index) => ({
  id: index + 1,
  ...product,
  published: true,
  createdAt: fallbackNow,
  updatedAt: fallbackNow,
}));

const fallbackResources = defaultResources.map((resource, index) => ({
  id: index + 1,
  ...resource,
  published: true,
  publishedAt: fallbackNow,
  createdAt: fallbackNow,
  updatedAt: fallbackNow,
}));

const fallbackPageHeroConfigs = defaultPageHeroConfigs.map((config, index) => ({
  id: index + 1,
  ...config,
  backgroundImageUrl: config.backgroundImageUrl ?? null,
  createdAt: fallbackNow,
  updatedAt: fallbackNow,
}));

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
      include: {
        heroImageHistory: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
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
    const products = await prisma.product.findMany({
      where: { published: true },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
    });

    const mergedProducts = fallbackProducts.map((fallbackProduct) => {
      const existingProduct = products.find((product) => product.slug === fallbackProduct.slug);

      return existingProduct
        ? {
            ...existingProduct,
            displayOrder: fallbackProduct.displayOrder,
          }
        : fallbackProduct;
    });

    const extraProducts = products.filter(
      (product) => !fallbackProducts.some((fallbackProduct) => fallbackProduct.slug === product.slug),
    );

    return [...mergedProducts, ...extraProducts].sort(
      (a, b) => a.displayOrder - b.displayOrder || a.createdAt.getTime() - b.createdAt.getTime(),
    );
  } catch (error) {
    logFallback("products", error);
    return fallbackProducts;
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
    });

    if (!product) {
      return fallbackProducts.find((item) => item.slug === slug) ?? null;
    }

    const fallbackProduct = fallbackProducts.find((item) => item.slug === slug);

    return fallbackProduct
      ? {
          ...product,
          displayOrder: fallbackProduct.displayOrder,
        }
      : product;
  } catch (error) {
    logFallback(`product:${slug}`, error);
    return fallbackProducts.find((product) => product.slug === slug) ?? null;
  }
}

export async function getResources() {
  try {
    return await prisma.resource.findMany({
      where: { published: true },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
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

export async function getPageHeroConfigs() {
  try {
    return await prisma.pageHeroConfig.findMany({
      orderBy: { pageKey: "asc" },
    });
  } catch (error) {
    logFallback("pageHeroConfigs", error);
    return fallbackPageHeroConfigs;
  }
}

export async function getPageHeroConfig(pageKey: string) {
  try {
    return await prisma.pageHeroConfig.findUnique({
      where: { pageKey },
    });
  } catch (error) {
    logFallback(`pageHeroConfig:${pageKey}`, error);
    return fallbackPageHeroConfigs.find((config) => config.pageKey === pageKey) ?? null;
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
