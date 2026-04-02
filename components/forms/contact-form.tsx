"use client";

import { useState } from "react";

export function ContactForm({ locale }: { locale: string }) {
  const [status, setStatus] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(formData: FormData) {
    setSubmitting(true);
    setStatus("");

    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
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
      <div className="contactFormGrid">
      <div className="field">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" />
      </div>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" required />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />
      </div>
      <div className="field">
        <label htmlFor="phone">Phone</label>
        <input id="phone" name="phone" />
      </div>
      </div>
      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" required />
      </div>
      <button className="button primary" disabled={submitting} type="submit">
        {submitting ? "Sending..." : "Send Inquiry"}
      </button>
      {status ? <p style={{ margin: 0, color: "var(--blue-deep)" }}>{status}</p> : null}
    </form>
  );
}
