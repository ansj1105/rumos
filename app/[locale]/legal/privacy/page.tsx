import { SubpageHero } from "@/components/subpage-hero";
import type { Locale } from "@/lib/site";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <div className="resourcesPage">
      <SubpageHero
        eyebrow="Legal"
        title={locale === "ko" ? "개인정보처리방침" : "Privacy Policy"}
        description={
          locale === "ko"
            ? "Lumos 웹사이트 이용 과정에서 수집되는 기본 정보와 처리 기준을 안내합니다."
            : "This page explains how Lumos handles basic information collected through the website."
        }
        tone="resources"
        backgroundImageUrl="/subpage-contact-bg.png"
        backgroundOpacity={0.6}
      />
      <div className="container subpageContent">
        <div className="resourceDetailBody">
          <p>
            {locale === "ko"
              ? "루모스는 문의 응대와 서비스 운영에 필요한 최소한의 정보만 수집하며, 수집된 정보는 문의 확인, 답변, 운영 기록 관리 목적에 한해 사용됩니다."
              : "Lumos collects only the minimum information required for inquiry handling and site operations. The collected information is used only for response handling, communication, and service records."}
          </p>
          <p>
            {locale === "ko"
              ? "문의 폼을 통해 전달된 회사명, 담당자명, 이메일, 연락처, 문의 내용은 내부 운영 기준에 따라 안전하게 보관되며, 법령상 요구가 없는 한 제3자에게 제공하지 않습니다."
              : "Company name, contact name, email, phone number, and inquiry details submitted through the contact form are stored securely according to internal operational policies and are not shared with third parties unless required by law."}
          </p>
        </div>
      </div>
    </div>
  );
}
