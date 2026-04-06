"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  clearAdminSession,
  createAdminSession,
  ensureAdminAccount,
  logAdminAccess,
  requireAdminSession,
} from "@/lib/admin-auth";
import { sendInquiryReplyMail } from "@/lib/mailer";
import { createPasswordHash, verifyPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";

function parseBoolean(value: FormDataEntryValue | null) {
  return value === "on" || value === "true";
}

function parseTextArray(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseSpecArray(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, ...rest] = line.split("|");
      return {
        label: label?.trim() ?? "",
        value: rest.join("|").trim(),
      };
    })
    .filter((item) => item.label && item.value);
}

function parseOptionalNumber(value: FormDataEntryValue | null, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function revalidatePublicPages() {
  revalidatePath("/ko");
  revalidatePath("/en");
  revalidatePath("/ko/applications");
  revalidatePath("/en/applications");
  revalidatePath("/ko/products");
  revalidatePath("/en/products");
  revalidatePath("/ko/contact");
  revalidatePath("/en/contact");
  revalidatePath("/ko/contact/quote");
  revalidatePath("/en/contact/quote");
  revalidatePath("/ko/contact/distributors");
  revalidatePath("/en/contact/distributors");
  revalidatePath("/ko/contact/directions");
  revalidatePath("/en/contact/directions");
  revalidatePath("/ko/contact/resources");
  revalidatePath("/en/contact/resources");
  revalidatePath("/ko/legal/privacy");
  revalidatePath("/en/legal/privacy");
  revalidatePath("/ko/legal/terms");
  revalidatePath("/en/legal/terms");
}

function revalidateAdminPages() {
  revalidatePath("/asdasddfg");
  revalidatePath("/asdasddfg/admin");
}

async function storeHeroHistory(imageUrl: string) {
  if (!imageUrl) {
    return;
  }

  await prisma.heroImageHistory.create({
    data: {
      siteConfigId: 1,
      imageUrl,
    },
  });

  const history = await prisma.heroImageHistory.findMany({
    where: { siteConfigId: 1 },
    orderBy: { createdAt: "desc" },
  });

  const staleIds = history.slice(10).map((item) => item.id);

  if (staleIds.length > 0) {
    await prisma.heroImageHistory.deleteMany({
      where: { id: { in: staleIds } },
    });
  }
}

export async function updateSiteConfig(formData: FormData) {
  const current = await prisma.siteConfig.findUnique({ where: { id: 1 } });
  const heroImageUrl = String(formData.get("heroImageUrl") ?? "").trim() || null;

  await prisma.siteConfig.upsert({
    where: { id: 1 },
    update: {
      heroTitleKo: String(formData.get("heroTitleKo") ?? ""),
      heroTitleEn: String(formData.get("heroTitleEn") ?? ""),
      heroDescriptionKo: String(formData.get("heroDescriptionKo") ?? ""),
      heroDescriptionEn: String(formData.get("heroDescriptionEn") ?? ""),
      heroImageUrl,
      heroFontSize: Number(formData.get("heroFontSize") ?? 52),
      storyTitleKo: String(formData.get("storyTitleKo") ?? ""),
      storyTitleEn: String(formData.get("storyTitleEn") ?? ""),
      storyBodyKo: String(formData.get("storyBodyKo") ?? ""),
      storyBodyEn: String(formData.get("storyBodyEn") ?? ""),
      storyFontSize: Number(formData.get("storyFontSize") ?? 18),
      seriesTitleKo: String(formData.get("seriesTitleKo") ?? ""),
      seriesTitleEn: String(formData.get("seriesTitleEn") ?? ""),
      seriesLeadKo: String(formData.get("seriesLeadKo") ?? ""),
      seriesLeadEn: String(formData.get("seriesLeadEn") ?? ""),
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
      heroImageUrl,
      heroFontSize: Number(formData.get("heroFontSize") ?? 52),
      storyTitleKo: String(formData.get("storyTitleKo") ?? ""),
      storyTitleEn: String(formData.get("storyTitleEn") ?? ""),
      storyBodyKo: String(formData.get("storyBodyKo") ?? ""),
      storyBodyEn: String(formData.get("storyBodyEn") ?? ""),
      storyFontSize: Number(formData.get("storyFontSize") ?? 18),
      seriesTitleKo: String(formData.get("seriesTitleKo") ?? ""),
      seriesTitleEn: String(formData.get("seriesTitleEn") ?? ""),
      seriesLeadKo: String(formData.get("seriesLeadKo") ?? ""),
      seriesLeadEn: String(formData.get("seriesLeadEn") ?? ""),
      seoTitleKo: String(formData.get("seoTitleKo") ?? ""),
      seoTitleEn: String(formData.get("seoTitleEn") ?? ""),
      seoDescriptionKo: String(formData.get("seoDescriptionKo") ?? ""),
      seoDescriptionEn: String(formData.get("seoDescriptionEn") ?? ""),
    },
  });

  if (heroImageUrl && current?.heroImageUrl !== heroImageUrl) {
    await storeHeroHistory(heroImageUrl);
  }

  revalidatePublicPages();
  revalidateAdminPages();
}

export async function updateHeroSection(formData: FormData) {
  const current = await prisma.siteConfig.findUnique({ where: { id: 1 } });
  const heroImageUrl = String(formData.get("heroImageUrl") ?? "").trim() || null;

  await prisma.siteConfig.upsert({
    where: { id: 1 },
    update: {
      heroTitleKo: String(formData.get("heroTitleKo") ?? ""),
      heroTitleEn: String(formData.get("heroTitleEn") ?? ""),
      heroDescriptionKo: String(formData.get("heroDescriptionKo") ?? ""),
      heroDescriptionEn: String(formData.get("heroDescriptionEn") ?? ""),
      heroImageUrl,
      heroFontSize: Number(formData.get("heroFontSize") ?? 52),
    },
    create: {
      id: 1,
      heroTitleKo: String(formData.get("heroTitleKo") ?? ""),
      heroTitleEn: String(formData.get("heroTitleEn") ?? ""),
      heroDescriptionKo: String(formData.get("heroDescriptionKo") ?? ""),
      heroDescriptionEn: String(formData.get("heroDescriptionEn") ?? ""),
      heroImageUrl,
      heroFontSize: Number(formData.get("heroFontSize") ?? 52),
      storyTitleKo: "",
      storyTitleEn: "",
      storyBodyKo: "",
      storyBodyEn: "",
      storyFontSize: 18,
      seriesTitleKo: "LUMOS series overview",
      seriesTitleEn: "LUMOS series overview",
      seriesLeadKo: "",
      seriesLeadEn: "",
      seoTitleKo: "",
      seoTitleEn: "",
      seoDescriptionKo: "",
      seoDescriptionEn: "",
    },
  });

  if (heroImageUrl && current?.heroImageUrl !== heroImageUrl) {
    await storeHeroHistory(heroImageUrl);
  }

  revalidatePublicPages();
  revalidateAdminPages();
}

export async function updateStorySection(formData: FormData) {
  await prisma.siteConfig.upsert({
    where: { id: 1 },
    update: {
      storyTitleKo: String(formData.get("storyTitleKo") ?? ""),
      storyTitleEn: String(formData.get("storyTitleEn") ?? ""),
      storyBodyKo: String(formData.get("storyBodyKo") ?? ""),
      storyBodyEn: String(formData.get("storyBodyEn") ?? ""),
      storyFontSize: Number(formData.get("storyFontSize") ?? 18),
    },
    create: {
      id: 1,
      heroTitleKo: "",
      heroTitleEn: "",
      heroDescriptionKo: "",
      heroDescriptionEn: "",
      heroImageUrl: null,
      heroFontSize: 52,
      storyTitleKo: String(formData.get("storyTitleKo") ?? ""),
      storyTitleEn: String(formData.get("storyTitleEn") ?? ""),
      storyBodyKo: String(formData.get("storyBodyKo") ?? ""),
      storyBodyEn: String(formData.get("storyBodyEn") ?? ""),
      storyFontSize: Number(formData.get("storyFontSize") ?? 18),
      seriesTitleKo: "LUMOS series overview",
      seriesTitleEn: "LUMOS series overview",
      seriesLeadKo: "",
      seriesLeadEn: "",
      seoTitleKo: "",
      seoTitleEn: "",
      seoDescriptionKo: "",
      seoDescriptionEn: "",
    },
  });

  revalidatePublicPages();
  revalidateAdminPages();
}

export async function updateSeriesSection(formData: FormData) {
  await prisma.siteConfig.upsert({
    where: { id: 1 },
    update: {
      seriesTitleKo: String(formData.get("seriesTitleKo") ?? ""),
      seriesTitleEn: String(formData.get("seriesTitleEn") ?? ""),
      seriesLeadKo: String(formData.get("seriesLeadKo") ?? ""),
      seriesLeadEn: String(formData.get("seriesLeadEn") ?? ""),
    },
    create: {
      id: 1,
      heroTitleKo: "",
      heroTitleEn: "",
      heroDescriptionKo: "",
      heroDescriptionEn: "",
      heroImageUrl: null,
      heroFontSize: 52,
      storyTitleKo: "",
      storyTitleEn: "",
      storyBodyKo: "",
      storyBodyEn: "",
      storyFontSize: 18,
      seriesTitleKo: String(formData.get("seriesTitleKo") ?? ""),
      seriesTitleEn: String(formData.get("seriesTitleEn") ?? ""),
      seriesLeadKo: String(formData.get("seriesLeadKo") ?? ""),
      seriesLeadEn: String(formData.get("seriesLeadEn") ?? ""),
      seoTitleKo: "",
      seoTitleEn: "",
      seoDescriptionKo: "",
      seoDescriptionEn: "",
    },
  });

  revalidatePublicPages();
  revalidateAdminPages();
}

export async function restoreHeroImage(formData: FormData) {
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();

  if (!imageUrl) {
    return;
  }

  await prisma.siteConfig.update({
    where: { id: 1 },
    data: { heroImageUrl: imageUrl },
  });

  await storeHeroHistory(imageUrl);

  revalidatePublicPages();
  revalidateAdminPages();
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
    bulletsKo: parseTextArray(formData.get("bulletsKo")),
    bulletsEn: parseTextArray(formData.get("bulletsEn")),
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

  revalidatePublicPages();
  revalidateAdminPages();
}

export async function savePageHeroConfig(formData: FormData) {
  const pageKey = String(formData.get("pageKey") ?? "").trim();

  if (!pageKey) {
    return;
  }

  const data = {
    eyebrowKo: String(formData.get("eyebrowKo") ?? "").trim(),
    eyebrowEn: String(formData.get("eyebrowEn") ?? "").trim(),
    titleKo: String(formData.get("titleKo") ?? "").trim(),
    titleEn: String(formData.get("titleEn") ?? "").trim(),
    descriptionKo: String(formData.get("descriptionKo") ?? "").trim(),
    descriptionEn: String(formData.get("descriptionEn") ?? "").trim(),
    backgroundImageUrl: String(formData.get("backgroundImageUrl") ?? "").trim() || null,
    backgroundOpacity: parseOptionalNumber(formData.get("backgroundOpacity"), 0.6),
  };

  await prisma.pageHeroConfig.upsert({
    where: { pageKey },
    update: data,
    create: {
      pageKey,
      ...data,
    },
  });

  revalidatePublicPages();
  revalidateAdminPages();
}

export async function saveProduct(formData: FormData) {
  const id = Number(formData.get("id") ?? 0);

  if (id === 0) {
    const count = await prisma.product.count();
    if (count >= 10) {
      throw new Error("Products are limited to 10 entries.");
    }
  }

  const data = {
    slug: String(formData.get("slug") ?? ""),
    displayOrder: Number(formData.get("displayOrder") ?? 0),
    nameKo: String(formData.get("nameKo") ?? ""),
    nameEn: String(formData.get("nameEn") ?? ""),
    heroEyebrowKo: String(formData.get("heroEyebrowKo") ?? "").trim() || null,
    heroEyebrowEn: String(formData.get("heroEyebrowEn") ?? "").trim() || null,
    heroTitleKo: String(formData.get("heroTitleKo") ?? "").trim() || null,
    heroTitleEn: String(formData.get("heroTitleEn") ?? "").trim() || null,
    heroLeadKo: String(formData.get("heroLeadKo") ?? "").trim() || null,
    heroLeadEn: String(formData.get("heroLeadEn") ?? "").trim() || null,
    heroBgImageUrl: String(formData.get("heroBgImageUrl") ?? "").trim() || null,
    heroBgOpacity: parseOptionalNumber(formData.get("heroBgOpacity"), 0.9),
    summaryKo: String(formData.get("summaryKo") ?? ""),
    summaryEn: String(formData.get("summaryEn") ?? ""),
    contentKo: String(formData.get("contentKo") ?? ""),
    contentEn: String(formData.get("contentEn") ?? ""),
    featuresKo: parseTextArray(formData.get("featuresKo")),
    featuresEn: parseTextArray(formData.get("featuresEn")),
    applicationsKo: parseTextArray(formData.get("applicationsKo")),
    applicationsEn: parseTextArray(formData.get("applicationsEn")),
    specsKo: parseSpecArray(formData.get("specsKo")),
    specsEn: parseSpecArray(formData.get("specsEn")),
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

  revalidatePublicPages();
  revalidateAdminPages();
}

export async function deleteProduct(formData: FormData) {
  const id = Number(formData.get("id") ?? 0);

  if (!id) {
    return;
  }

  await prisma.product.delete({ where: { id } });
  revalidatePublicPages();
  revalidateAdminPages();
}

export async function saveResource(formData: FormData) {
  const id = Number(formData.get("id") ?? 0);
  const data = {
    slug: String(formData.get("slug") ?? ""),
    displayIndex: Number(formData.get("displayIndex") ?? 1),
    titleKo: String(formData.get("titleKo") ?? ""),
    titleEn: String(formData.get("titleEn") ?? ""),
    excerptKo: String(formData.get("excerptKo") ?? ""),
    excerptEn: String(formData.get("excerptEn") ?? ""),
    bodyKo: String(formData.get("bodyKo") ?? ""),
    bodyEn: String(formData.get("bodyEn") ?? ""),
    fileUrl: String(formData.get("fileUrl") ?? "") || null,
    publishedAt: new Date(String(formData.get("publishedAt") ?? new Date().toISOString())),
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

  revalidatePublicPages();
  revalidateAdminPages();
}

export async function deleteResource(formData: FormData) {
  const id = Number(formData.get("id") ?? 0);

  if (!id) {
    return;
  }

  await prisma.resource.delete({ where: { id } });
  revalidatePublicPages();
  revalidateAdminPages();
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

  revalidateAdminPages();
}

export async function saveInquiryReply(formData: FormData) {
  const id = Number(formData.get("id") ?? 0);

  await prisma.inquiry.update({
    where: { id },
    data: {
      internalNote: String(formData.get("internalNote") ?? "") || null,
      replySubject: String(formData.get("replySubject") ?? "") || null,
      replyBody: String(formData.get("replyBody") ?? "") || null,
      status: (String(formData.get("status") ?? "REVIEWING") || "REVIEWING") as
        | "RECEIVED"
        | "REVIEWING"
        | "REPLIED",
    },
  });

  revalidateAdminPages();
}

export async function sendInquiryReply(formData: FormData) {
  const id = Number(formData.get("id") ?? 0);
  const inquiry = await prisma.inquiry.findUnique({ where: { id } });

  if (!inquiry || !inquiry.replySubject || !inquiry.replyBody) {
    throw new Error("Inquiry reply content is incomplete.");
  }

  await sendInquiryReplyMail({
    to: inquiry.email,
    subject: inquiry.replySubject,
    body: inquiry.replyBody,
  });

  await prisma.inquiry.update({
    where: { id },
    data: {
      status: "REPLIED",
      replySentAt: new Date(),
    },
  });

  revalidateAdminPages();
}

export async function loginAdmin(formData: FormData) {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const seeded = await ensureAdminAccount();
  const admin = await prisma.adminAccount.findUnique({
    where: { username },
  });

  if (!admin || !verifyPassword(password, admin.passwordHash)) {
    await logAdminAccess({
      username: username || seeded.username,
      adminId: admin?.id ?? null,
      success: false,
    });
    redirect("/asdasddfg?error=invalid");
  }

  await createAdminSession(admin.id);
  await logAdminAccess({
    username: admin.username,
    adminId: admin.id,
    success: true,
  });
  redirect("/asdasddfg/admin/home");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/asdasddfg");
}

export async function changeAdminPassword(formData: FormData) {
  const session = await requireAdminSession();
  const currentPassword = String(formData.get("currentPassword") ?? "");
  const nextPassword = String(formData.get("nextPassword") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!verifyPassword(currentPassword, session.admin.passwordHash)) {
    throw new Error("Current password is incorrect.");
  }

  if (nextPassword.length < 8 || nextPassword !== confirmPassword) {
    throw new Error("New password validation failed.");
  }

  await prisma.adminAccount.update({
    where: { id: session.adminId },
    data: {
      passwordHash: createPasswordHash(nextPassword),
    },
  });

  await clearAdminSession();
  redirect("/asdasddfg?message=password-updated");
}
