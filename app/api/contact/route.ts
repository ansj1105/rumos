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
  try {
    const body = inquirySchema.parse(await request.json());

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
      message: "Inquiry submitted successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Unable to submit the inquiry.",
      },
      { status: 400 },
    );
  }
}
