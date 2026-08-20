/**
 * Admin Email API
 * POST /api/admin/email - Send email to students
 * GET /api/admin/email - Get email logs
 */

export const runtime = "nodejs"; // Force Node.js runtime

import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/admin-middleware";
import { successResponse, errorResponse } from "@/lib/api-response";
import { sendAdminEmail } from "@/lib/resend";
import { z } from "zod";

// Validation schema
const emailSchema = z.object({
  recipientType: z.enum(["all-registered", "all-paid", "individual"]),
  recipient: z.string().optional(), // Email address for individual
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  body: z.string().min(10, "Email body must be at least 10 characters"),
});

export async function POST(request: NextRequest) {
  // Verify authentication
  const { error, admin } = requireAdminAuth(request);
  if (error) return error;

  try {
    const body = await request.json();

    // Validate input
    const validation = emailSchema.safeParse(body);

    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message, 400);
    }

    const data = validation.data;

    // Validate individual recipient
    if (data.recipientType === "individual" && !data.recipient) {
      return errorResponse(
        "Recipient email is required for individual emails",
        400,
      );
    }

    // Get recipients based on type
    let recipients: string[] = [];
    let recipientIdentifier = "";

    switch (data.recipientType) {
      case "all-registered":
        const allRegistrations = await prisma.registration.findMany({
          select: { email: true },
        });
        recipients = allRegistrations.map((r: { email: string }) => r.email);
        recipientIdentifier = "all-registered";
        break;

      case "all-paid":
        const paidRegistrations = await prisma.registration.findMany({
          where: { paymentStatus: "PAID" },
          select: { email: true },
        });
        recipients = paidRegistrations.map((r: { email: string }) => r.email);
        recipientIdentifier = "all-paid";
        break;

      case "individual":
        recipients = [data.recipient!];
        recipientIdentifier = data.recipient!;
        break;
    }

    if (recipients.length === 0) {
      return errorResponse("No recipients found for the selected group", 400);
    }

    // Send emails using Resend
    const emailsSent: string[] = [];
    const emailsFailed: string[] = [];

    for (const recipientEmail of recipients) {
      try {
        // Send email via Resend
        await sendAdminEmail({
          to: recipientEmail,
          subject: data.subject,
          body: data.body,
          senderEmail: admin.email,
        });

        // Log successful email
        await prisma.emailLog.create({
          data: {
            sender: admin.email,
            recipientType: data.recipientType,
            recipient: recipientEmail,
            subject: data.subject,
            body: data.body,
            status: "SENT",
            sentAt: new Date(),
          },
        });

        emailsSent.push(recipientEmail);
        console.log(`✅ Email sent to: ${recipientEmail}`);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        console.error(
          `❌ Failed to send email to ${recipientEmail}:`,
          errorMessage,
        );

        // Log failed email
        await prisma.emailLog.create({
          data: {
            sender: admin.email,
            recipientType: data.recipientType,
            recipient: recipientEmail,
            subject: data.subject,
            body: data.body,
            status: "FAILED",
            errorMessage,
          },
        });

        emailsFailed.push(recipientEmail);
      }
    }

    return successResponse(
      {
        sent: emailsSent.length,
        failed: emailsFailed.length,
        recipients: emailsSent,
      },
      `Successfully sent ${emailsSent.length} email(s)${emailsFailed.length > 0 ? `, ${emailsFailed.length} failed` : ""}`,
    );
  } catch (err) {
    console.error("Send email error:", err);
    return errorResponse("Failed to send emails", 500);
  }
}

export async function GET(request: NextRequest) {
  // Verify authentication
  const { error, admin } = requireAdminAuth(request);
  if (error) return error;

  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");

    // Fetch recent email logs
    const logs = await prisma.emailLog.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return successResponse({ logs });
  } catch (err) {
    console.error("Fetch email logs error:", err);
    return errorResponse("Failed to fetch email logs", 500);
  }
}
