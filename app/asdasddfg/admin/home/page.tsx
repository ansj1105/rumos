import { HomeAdminSection } from "@/components/admin-sections";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const siteConfig = await prisma.siteConfig.findUnique({
    where: { id: 1 },
    include: {
      heroImageHistory: {
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });

  if (!siteConfig) {
    return null;
  }

  return <HomeAdminSection siteConfig={siteConfig} />;
}
