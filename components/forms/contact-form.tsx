"use client";

import { useState } from "react";

export function ContactForm({
  locale,
  inquiryType,
}: {
  locale: string;
  inquiryType: string;
}) {
  const [status, setStatus] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const isKo = locale === "ko";

  async function onSubmit(formData: FormData) {
    setSubmitting(true);
    setStatus("");

    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        inquiryType,
        company: formData.get("company"),
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        message: formData.get("message"),
        locale,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = (await response.json()) as { message?: string; error?: string };
    setStatus(data.message ?? data.error ?? "");
    setSubmitting(false);
  }

  return (
    <form
      action={onSubmit}
      className="contactForm"
    >
      <div className="contactFormTypeBanner">
        <strong>{isKo ? "문의 유형" : "Inquiry Type"}</strong>
        <span>{inquiryType}</span>
      </div>
      <div className="contactFormGrid">
        <div className="field">
          <label htmlFor="company">{isKo ? "회사명" : "Company"}</label>
          <input id="company" name="company" />
        </div>
        <div className="field">
          <label htmlFor="name">{isKo ? "담당자명" : "Name"}</label>
          <input id="name" name="name" required />
        </div>
        <div className="field">
          <label htmlFor="email">{isKo ? "이메일" : "Email"}</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div className="field">
          <label htmlFor="phone">{isKo ? "연락처" : "Phone"}</label>
          <input id="phone" name="phone" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="message">{isKo ? "문의 내용" : "Message"}</label>
        <textarea id="message" name="message" required />
      </div>
      <button className="button primary" disabled={submitting} type="submit">
        {submitting ? (isKo ? "전송 중..." : "Sending...") : isKo ? "문의 보내기" : "Send Inquiry"}
      </button>
      {status ? <p className="contactFormStatus">{status}</p> : null}
    </form>
  );
}
