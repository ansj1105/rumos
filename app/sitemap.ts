import type { MetadataRoute } from "next";

import { prisma } from "@/lib/prisma";
import { locales, siteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, resources] = await Promise.all([
    prisma.product.findMany({ where: { published: true } }),
    prisma.resource.findMany({ where: { published: true } }),
  ]);

  const staticPaths = [
    "",
    "/directions",
    "/applications",
    "/products",
    "/contact",
    "/contact/quote",
    "/contact/distributors",
    "/contact/directions",
    "/contact/resources",
    "/legal/privacy",
    "/legal/terms",
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        lastModified: new Date(),
      });
    }

    for (const product of products) {
      entries.push({
        url: `${siteUrl}/${locale}/products/${product.slug}`,
        lastModified: product.updatedAt,
      });
    }

    for (const resource of resources) {
      entries.push({
        url: `${siteUrl}/${locale}/contact/resources/${resource.slug}`,
        lastModified: resource.updatedAt,
      });
    }
  }

  return entries;
}
