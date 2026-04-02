"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

function parseBoolean(value: FormDataEntryValue | null) {
  return value === "on" || value === "true";
}

export async function updateSiteConfig(formData: FormData) {
  await prisma.siteConfig.upsert({
    where: { id: 1 },
    update: {
      heroTitleKo: String(formData.get("heroTitleKo") ?? ""),
      heroTitleEn: String(formData.get("heroTitleEn") ?? ""),
      heroDescriptionKo: String(formData.get("heroDescriptionKo") ?? ""),
      heroDescriptionEn: String(formData.get("heroDescriptionEn") ?? ""),
      storyBodyKo: String(formData.get("storyBodyKo") ?? ""),
      storyBodyEn: String(formData.get("storyBodyEn") ?? ""),
      seoTitleKo: String(formData.get("seoTitleKo") ?? ""),
      seoTitleEn: String(formData.get("seoTitleEn") ?? ""),
      seoDescriptionKo: String(formData.get("seoDescriptionKo") ?? ""),
      seoDescriptionEn: String(formData.get("seoDescriptionEn") ?? ""),
    },
    create: {
      id: 1,
      heroTitleKo: String(formData.get("heroTitleKo") ?? ""),
      heroTitleEn: String(formData.get("heroTitleEn") ?? ""),
      heroDescriptionKo: String(formData.get("heroDescriptionKo") ?? ""),
      heroDescriptionEn: String(formData.get("heroDescriptionEn") ?? ""),
      storyBodyKo: String(formData.get("storyBodyKo") ?? ""),
      storyBodyEn: String(formData.get("storyBodyEn") ?? ""),
      seoTitleKo: String(formData.get("seoTitleKo") ?? ""),
      seoTitleEn: String(formData.get("seoTitleEn") ?? ""),
      seoDescriptionKo: String(formData.get("seoDescriptionKo") ?? ""),
      seoDescriptionEn: String(formData.get("seoDescriptionEn") ?? ""),
    },
  });

  revalidatePath("/ko");
  revalidatePath("/en");
  revalidatePath("/admin");
}

export async function saveApplication(formData: FormData) {
  const id = Number(formData.get("id") ?? 0);
  const data = {
    slug: String(formData.get("slug") ?? ""),
    titleKo: String(formData.get("titleKo") ?? ""),
    titleEn: String(formData.get("titleEn") ?? ""),
    summaryKo: String(formData.get("summaryKo") ?? ""),
    summaryEn: String(formData.get("summaryEn") ?? ""),
    imageUrl: String(formData.get("imageUrl") ?? "") || null,
    bulletsKo: String(formData.get("bulletsKo") ?? "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean),
    bulletsEn: String(formData.get("bulletsEn") ?? "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean),
    sortOrder: Number(formData.get("sortOrder") ?? 0),
    published: parseBoolean(formData.get("published")),
  };

  if (id > 0) {
    await prisma.application.update({
      where: { id },
      data,
    });
  } else {
    await prisma.application.create({ data });
  }

  revalidatePath("/ko/applications");
  revalidatePath("/en/applications");
  revalidatePath("/admin");
}

export async function saveProduct(formData: FormData) {
  const id = Number(formData.get("id") ?? 0);
  const data = {
    slug: String(formData.get("slug") ?? ""),
    nameKo: String(formData.get("nameKo") ?? ""),
    nameEn: String(formData.get("nameEn") ?? ""),
    summaryKo: String(formData.get("summaryKo") ?? ""),
    summaryEn: String(formData.get("summaryEn") ?? ""),
    contentKo: String(formData.get("contentKo") ?? ""),
    contentEn: String(formData.get("contentEn") ?? ""),
    imageUrl: String(formData.get("imageUrl") ?? "") || null,
    seoTitleKo: String(formData.get("seoTitleKo") ?? "") || null,
    seoTitleEn: String(formData.get("seoTitleEn") ?? "") || null,
    seoDescriptionKo: String(formData.get("seoDescriptionKo") ?? "") || null,
    seoDescriptionEn: String(formData.get("seoDescriptionEn") ?? "") || null,
    published: parseBoolean(formData.get("published")),
  };

  if (id > 0) {
    await prisma.product.update({
      where: { id },
      data,
    });
  } else {
    await prisma.product.create({ data });
  }

  revalidatePath("/ko/products");
  revalidatePath("/en/products");
  revalidatePath("/admin");
}

export async function saveResource(formData: FormData) {
  const id = Number(formData.get("id") ?? 0);
  const data = {
    slug: String(formData.get("slug") ?? ""),
    titleKo: String(formData.get("titleKo") ?? ""),
    titleEn: String(formData.get("titleEn") ?? ""),
    excerptKo: String(formData.get("excerptKo") ?? ""),
    excerptEn: String(formData.get("excerptEn") ?? ""),
    bodyKo: String(formData.get("bodyKo") ?? ""),
    bodyEn: String(formData.get("bodyEn") ?? ""),
    fileUrl: String(formData.get("fileUrl") ?? "") || null,
    published: parseBoolean(formData.get("published")),
  };

  if (id > 0) {
    await prisma.resource.update({
      where: { id },
      data,
    });
  } else {
    await prisma.resource.create({ data });
  }

  revalidatePath("/ko/contact/resources");
  revalidatePath("/en/contact/resources");
  revalidatePath("/admin");
}

export async function updateInquiryStatus(formData: FormData) {
  const id = Number(formData.get("id"));
  const status = String(formData.get("status"));

  await prisma.inquiry.update({
    where: { id },
    data: {
      status: status as "RECEIVED" | "REVIEWING" | "REPLIED",
    },
  });

  revalidatePath("/admin");
}
