/**
 * API endpoint to submit student registration
 * POST /api/registration/submit
 */

export const runtime = "nodejs"; // Force Node.js runtime for Prisma

import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { registrationSchema } from "@/lib/validation";
import { calculateFee, FrequencyType } from "@/lib/pricing";
import { generateApplicationId } from "@/lib/utils";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = registrationSchema.safeParse(body);

    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message, 400);
    }

    const data = validation.data;

    // Calculate fee server-side (never trust client)
    const feeBreakdown = calculateFee(
      data.frequency as FrequencyType,
      data.country,
    );

    // Generate unique application ID
    const applicationId = generateApplicationId();

    // Create registration record
    const registration = await prisma.registration.create({
      data: {
        applicationId,
        fullName: data.fullName,
        parentName: data.parentName || null,
        email: data.email,
        phone: data.phone,
        country: data.country,
        state: data.state || null,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth || null,
        experience: data.experience,
        programme: data.programme,
        frequency: data.frequency,
        sessionsPerMonth: feeBreakdown.sessions,
        days: data.days, // Already a JSON string from frontend
        time: data.time,
        timezone: data.timezone || null,
        currency: feeBreakdown.currency,
        amount: feeBreakdown.amountInSmallestUnit, // Store in kobo/cents
        paymentStatus: "PENDING",
      },
    });

    return successResponse(
      {
        applicationId: registration.applicationId,
        registrationId: registration.id,
        currency: registration.currency,
        amount: feeBreakdown.amount, // Display amount
        amountForPayment: feeBreakdown.amountInSmallestUnit, // For Paystack
        formatted: feeBreakdown.formatted,
      },
      "Registration submitted successfully",
    );
  } catch (error) {
    console.error("Registration error:", error);
    return errorResponse("Failed to submit registration", 500);
  }
}
