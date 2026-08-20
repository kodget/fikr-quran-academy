/**
 * Public Contact Form API
 * POST /api/contact
 */

export const runtime = "nodejs"; // Force Node.js runtime

import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { sendContactNotification } from "@/lib/resend";
import { z } from "zod";

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = contactSchema.safeParse(body);

    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message, 400);
    }

    const { name, email, message } = validation.data;

    // Create contact message in database
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        message,
        status: "UNREAD",
      },
    });

    // Send email notification to admin
    try {
      await sendContactNotification({
        name,
        email,
        message,
      });
      console.log("✅ Contact notification email sent to admin");
    } catch (emailError) {
      console.error("⚠️ Failed to send email notification:", emailError);
      // Continue even if email fails - message is already saved to database
    }

    return successResponse(
      {
        id: contactMessage.id,
        createdAt: contactMessage.createdAt,
      },
      "Message sent successfully. We'll get back to you soon!",
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return errorResponse("Failed to send message. Please try again.", 500);
  }
}
