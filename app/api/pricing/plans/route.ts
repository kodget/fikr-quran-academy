/**
 * API endpoint to get all available pricing plans
 * GET /api/pricing/plans
 */

export const runtime = "nodejs"; // Force Node.js runtime

import { NextRequest } from "next/server";
import { getAllPlans, getCurrencyByCountry } from "@/lib/pricing";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get("country");

    const plans = getAllPlans();

    // If country is provided, include currency-specific pricing
    if (country) {
      const currency = getCurrencyByCountry(country);
      const plansWithCurrency = plans.map((plan) => ({
        ...plan,
        currency,
        price: currency === "NGN" ? plan.naira : plan.usd,
        formatted:
          currency === "NGN"
            ? `₦${plan.naira.toLocaleString()}`
            : `$${plan.usd}`,
      }));

      return successResponse({
        plans: plansWithCurrency,
        currency,
        country,
      });
    }

    // Return all plans with both currencies
    return successResponse({ plans });
  } catch (error) {
    console.error("Get plans error:", error);
    return errorResponse("Failed to retrieve pricing plans", 500);
  }
}
