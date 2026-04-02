import nodemailer from "nodemailer";

type InquiryMail = {
  company?: string | null;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  locale: string;
};

export async function sendInquiryMail(payload: InquiryMail) {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASS,
    CONTACT_RECEIVER_EMAIL,
  } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !CONTACT_RECEIVER_EMAIL) {
    return { sent: false, reason: "SMTP not configured" };
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === "true",
    auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });

  await transporter.sendMail({
    to: CONTACT_RECEIVER_EMAIL,
    from: SMTP_USER || CONTACT_RECEIVER_EMAIL,
    subject: `[Rumos] New inquiry from ${payload.name}`,
    text: [
      `Locale: ${payload.locale}`,
      `Company: ${payload.company ?? "-"}`,
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone ?? "-"}`,
      "",
      payload.message,
    ].join("\n"),
  });

  return { sent: true };
}
