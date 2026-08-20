/**
 * API endpoint to verify payment status
 * GET /api/payment/verify?reference=PAY-xxx
 */

export const runtime = 'nodejs'; // Force Node.js runtime

import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPayment } from "@/lib/paystack";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get("reference");

    if (!reference) {
      return errorResponse("Payment reference is required", 400);
    }

    // Find registration by payment reference
    const registration = await prisma.registration.findFirst({
      where: { paymentReference: reference },
    });

    if (!registration) {
      return errorResponse("Registration not found for this payment reference", 404);
    }

    // Verify payment with Paystack
    const paymentData = await verifyPayment(reference);

    // Check if payment was successful
    if (paymentData.status === "success") {
      // Update registration status
      await prisma.registration.update({
        where: { id: registration.id },
        data: {
          paymentStatus: "PAID",
          paymentVerifiedAt: new Date(),
        },
      });

      return successResponse({
        status: "success",
        reference: paymentData.reference,
        amount: paymentData.amount,
        currency: paymentData.currency,
        paidAt: paymentData.paidAt,
        applicationId: registration.applicationId,
        registrationId: registration.id,
      }, "Payment verified successfully");
    } else if (paymentData.status === "failed") {
      // Update registration to failed status
      await prisma.registration.update({
        where: { id: registration.id },
        data: {
          paymentStatus: "FAILED",
        },
      });

      return errorResponse("Payment failed. Please try again.", 400);
    } else {
      // Payment still pending or abandoned
      return successResponse({
        status: paymentData.status,
        reference: paymentData.reference,
      }, "Payment is still being processed");
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Failed to verify payment";
    return errorResponse(errorMessage, 500);
  }
}
