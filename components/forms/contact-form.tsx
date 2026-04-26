"use client";

import { useState, type FormEvent } from "react";

type FieldName = "company" | "name" | "email" | "phone" | "message";

const REQUIRED_FIELDS: FieldName[] = ["company", "name", "email", "phone", "message"];

export function ContactForm({
  locale,
  inquiryType,
}: {
  locale: string;
  inquiryType: string;
}) {
  const [status, setStatus] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const isKo = locale === "ko";
  const requiredErrorMessage = isKo ? "\uD544\uC218 \uC785\uB825 \uAC12\uC785\uB2C8\uB2E4" : "This field is required.";

  function validateForm(formData: FormData) {
    const nextErrors: Partial<Record<FieldName, string>> = {};

    for (const field of REQUIRED_FIELDS) {
      const value = formData.get(field);
      if (typeof value !== "string" || value.trim().length === 0) {
        nextErrors[field] = requiredErrorMessage;
      }
    }

    return nextErrors;
  }

  function clearFieldError(field: FieldName) {
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");

    const formData = new FormData(event.currentTarget);
    const nextErrors = validateForm(formData);

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      return;
    }

    setFieldErrors({});
    setSubmitting(true);

    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        inquiryType,
        company: formData.get("company"),
        position: formData.get("position"),
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
    if (response.ok) {
      event.currentTarget.reset();
    }
    setSubmitting(false);
  }

  return (
    <form onSubmit={onSubmit} className="contactForm" noValidate>
      <div className="contactFormTypeBanner">
        <strong>{isKo ? "\uBB38\uC758 \uC720\uD615" : "Inquiry Type"}</strong>
        <span>{inquiryType}</span>
      </div>
      <div className="contactFormGrid">
        <div className="field">
          <label htmlFor="company" className="contactFormLabel isRequired">
            {isKo ? "\uD68C\uC0AC\uBA85" : "Company"}
          </label>
          <input
            id="company"
            name="company"
            aria-invalid={fieldErrors.company ? "true" : "false"}
            onChange={() => clearFieldError("company")}
          />
          {fieldErrors.company ? <p className="contactFormError">{fieldErrors.company}</p> : null}
        </div>
        <div className="field">
          <label htmlFor="name" className="contactFormLabel isRequired">
            {isKo ? "\uB2F4\uB2F9\uC790\uBA85" : "Name"}
          </label>
          <input
            id="name"
            name="name"
            aria-invalid={fieldErrors.name ? "true" : "false"}
            onChange={() => clearFieldError("name")}
          />
          {fieldErrors.name ? <p className="contactFormError">{fieldErrors.name}</p> : null}
        </div>
        <div className="field">
          <label htmlFor="position" className="contactFormLabel">
            {isKo ? "\uC9C1\uCC45" : "Position"}
          </label>
          <input id="position" name="position" />
        </div>
        <div className="field">
          <label htmlFor="email" className="contactFormLabel isRequired">
            {isKo ? "\uC774\uBA54\uC77C" : "Email"}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            aria-invalid={fieldErrors.email ? "true" : "false"}
            onChange={() => clearFieldError("email")}
          />
          {fieldErrors.email ? <p className="contactFormError">{fieldErrors.email}</p> : null}
        </div>
        <div className="field">
          <label htmlFor="phone" className="contactFormLabel isRequired">
            {isKo ? "\uC5F0\uB77D\uCC98" : "Phone"}
          </label>
          <input
            id="phone"
            name="phone"
            aria-invalid={fieldErrors.phone ? "true" : "false"}
            onChange={() => clearFieldError("phone")}
          />
          {fieldErrors.phone ? <p className="contactFormError">{fieldErrors.phone}</p> : null}
        </div>
      </div>
      <div className="field">
        <label htmlFor="message" className="contactFormLabel isRequired">
          {isKo ? "\uBB38\uC758 \uB0B4\uC6A9" : "Message"}
        </label>
        <textarea
          id="message"
          name="message"
          aria-invalid={fieldErrors.message ? "true" : "false"}
          onChange={() => clearFieldError("message")}
        />
        {fieldErrors.message ? <p className="contactFormError">{fieldErrors.message}</p> : null}
      </div>
      <button className="button primary" disabled={submitting} type="submit">
        {submitting
          ? isKo
            ? "\uC804\uC1A1 \uC911..."
            : "Sending..."
          : isKo
            ? "\uBB38\uC758\uD558\uAE30"
            : "Send Inquiry"}
      </button>
      {status ? <p className="contactFormStatus">{status}</p> : null}
    </form>
  );
}
