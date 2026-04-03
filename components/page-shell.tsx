import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ScrollTopButton } from "@/components/scroll-top-button";
import { VisitTracker } from "@/components/visit-tracker";
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
      <VisitTracker locale={locale} />
      <Header locale={locale} />
      <main>{children}</main>
      <ScrollTopButton />
      <Footer locale={locale} />
    </div>
  );
}
