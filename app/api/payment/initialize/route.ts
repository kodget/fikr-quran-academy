/**
 * API endpoint to initialize payment with Paystack
 * POST /api/payment/initialize
 */

export const runtime = 'nodejs'; // Force Node.js runtime

import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { initializePayment, generatePaymentReference } from "@/lib/paystack";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { registrationId, applicationId } = body;

    // Validate inputs
    if (!registrationId || !applicationId) {
      return errorResponse("Registration ID and Application ID are required", 400);
    }

    // Fetch registration record
    const registration = await prisma.registration.findUnique({
      where: { id: registrationId },
    });

    if (!registration) {
      return errorResponse("Registration not found", 404);
    }

    // Check if already paid
    if (registration.paymentStatus === "PAID") {
      return errorResponse("Payment already completed for this registration", 400);
    }

    // Generate payment reference
    const paymentReference = generatePaymentReference(applicationId);

    // Get callback URL from environment
    const callbackUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/payment/callback`;

    // Initialize payment with Paystack
    const paymentData = await initializePayment({
      email: registration.email,
      amount: registration.amount, // Already in kobo/cents from registration
      currency: registration.currency as "NGN" | "USD",
      reference: paymentReference,
      metadata: {
        registrationId: registration.id,
        applicationId: registration.applicationId,
        fullName: registration.fullName,
        programme: registration.programme,
        frequency: registration.frequency,
      },
      callbackUrl,
    });

    // Update registration with payment reference
    await prisma.registration.update({
      where: { id: registrationId },
      data: {
        paymentReference,
        paymentStatus: "PROCESSING",
      },
    });

    return successResponse({
      authorizationUrl: paymentData.authorizationUrl,
      reference: paymentReference,
      accessCode: paymentData.accessCode,
    }, "Payment initialized successfully");
  } catch (error) {
    console.error("Payment initialization error:", error);
    
    // Return user-friendly error message
    const errorMessage = error instanceof Error ? error.message : "Failed to initialize payment";
    return errorResponse(errorMessage, 500);
  }
}
