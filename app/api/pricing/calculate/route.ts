/**
 * API endpoint to calculate fee based on frequency and country
 * POST /api/pricing/calculate
 */

export const runtime = "nodejs"; // Force Node.js runtime

import { NextRequest } from "next/server";
import { calculateFee, isValidFrequency } from "@/lib/pricing";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { frequency, country } = body;

    // Validate inputs
    if (!frequency || !country) {
      return errorResponse("Frequency and country are required");
    }

    if (!isValidFrequency(frequency)) {
      return errorResponse("Invalid frequency selection");
    }

    if (typeof country !== "string" || country.trim().length < 2) {
      return errorResponse("Invalid country selection");
    }

    // Calculate fee
    const feeBreakdown = calculateFee(frequency, country);

    return successResponse(feeBreakdown);
  } catch (error) {
    console.error("Pricing calculation error:", error);
    return errorResponse("Failed to calculate pricing", 500);
  }
}
