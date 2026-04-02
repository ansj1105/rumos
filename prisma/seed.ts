import { PrismaClient } from "@prisma/client";

import { createPasswordHash } from "../lib/password";
import {
  defaultApplications,
  defaultProducts,
  defaultResources,
  defaultSiteConfig,
} from "../lib/default-content";

const prisma = new PrismaClient();

async function main() {
  await prisma.siteConfig.upsert({
    where: { id: 1 },
    update: {},
    create: {
      ...defaultSiteConfig,
    },
  });

  for (const [index, application] of defaultApplications.entries()) {
    await prisma.application.upsert({
      where: { slug: application.slug },
      update: {
        ...application,
        sortOrder: index + 1,
      },
      create: {
        ...application,
        sortOrder: index + 1,
      },
    });
  }

  for (const product of defaultProducts) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        ...product,
      },
    });
  }

  for (const resource of defaultResources) {
    await prisma.resource.upsert({
      where: { slug: resource.slug },
      update: {},
      create: {
        ...resource,
      },
    });
  }

  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "change-me";

  await prisma.adminAccount.upsert({
    where: { username: adminUsername },
    update: {},
    create: {
      username: adminUsername,
      passwordHash: createPasswordHash(adminPassword),
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
