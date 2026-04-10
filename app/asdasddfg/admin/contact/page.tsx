import { ContactAdminSection } from "@/components/admin-sections";
import { getPageHeroConfigs } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminContactPage() {
  const pageHeroConfigs = await getPageHeroConfigs();

  return <ContactAdminSection pageHeroConfigs={pageHeroConfigs} />;
}
