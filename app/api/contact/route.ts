import { NextResponse } from "next/server";
import { z } from "zod";

import { sendInquiryMail } from "@/lib/mailer";
import { prisma } from "@/lib/prisma";

const inquirySchema = z.object({
  company: z.string().optional().nullable(),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  message: z.string().min(10),
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
