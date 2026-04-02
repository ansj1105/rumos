import { ContactForm } from "@/components/forms/contact-form";
import { SubpageHero } from "@/components/subpage-hero";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/site";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <div className="contactPage">
      <SubpageHero
        eyebrow="Contact"
        title={dict.contact.title}
        description={
          locale === "ko"
            ? "제품 문의와 협업 요청을 남겨주시면 확인 후 연락드립니다."
            : "Leave your product inquiry or collaboration request and our team will respond."
        }
        tone="contact"
      />
      <div className="container subpageContent">
        <div className="contactIntro">
          <div className="contactInfoRow">
            <strong>{dict.contact.formTitle}</strong>
          </div>
        </div>
        <div className="pageBody">
          <ContactForm locale={locale} />
        </div>
      </div>
    </div>
  );
}
