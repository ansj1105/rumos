import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import type { Locale } from "@/lib/site";

export function PageShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <div className="shell">
      <Header locale={locale} />
      <main>{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
