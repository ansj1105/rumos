import { NextResponse } from "next/server";
import { z } from "zod";

import { sendInquiryMail } from "@/lib/mailer";
import { prisma } from "@/lib/prisma";

const inquirySchema = z.object({
  inquiryType: z.string().optional().nullable(),
  company: z.string().trim().min(1),
  position: z.string().optional().nullable(),
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().trim().min(1),
  message: z.string().trim().min(1),
  locale: z.string().min(2),
});

export async function POST(request: Request) {
  let locale = "en";

  try {
    const rawBody = await request.json();
    locale = typeof rawBody?.locale === "string" ? rawBody.locale : "en";
    const body = inquirySchema.parse(rawBody);
    const isKo = locale === "ko";

    await prisma.inquiry.create({
      data: {
        company: body.company,
        name: body.name,
        email: body.email,
        phone: body.phone,
        message: body.message,
        locale: body.locale,
        internalNote: [
          body.inquiryType ? `[Inquiry Type] ${body.inquiryType}` : null,
          body.position ? `[Position] ${body.position}` : null,
        ]
          .filter(Boolean)
          .join("\n") || null,
      },
    });

    await sendInquiryMail(body);

    return NextResponse.json({
      message: isKo
        ? "\uBB38\uC758\uAC00 \uC815\uC0C1\uC801\uC73C\uB85C \uC811\uC218\uB418\uC5C8\uC2B5\uB2C8\uB2E4."
        : "Your inquiry has been submitted successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          locale === "ko"
            ? "\uBB38\uC758 \uC811\uC218\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."
            : "Unable to submit the inquiry.",
      },
      { status: 400 },
    );
  }
}
