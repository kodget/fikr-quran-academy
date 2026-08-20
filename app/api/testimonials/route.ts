/**
 * Public Testimonials API
 * GET /api/testimonials - Get published testimonials
 */

export const runtime = 'nodejs'; // Force Node.js runtime

import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    // Fetch only published testimonials, ordered by custom order then date
    const testimonials = await prisma.testimonial.findMany({
      where: { published: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      select: {
        id: true,
        name: true,
        role: true,
        country: true,
        text: true,
        rating: true,
        image: true,
      },
    });

    return successResponse({ testimonials });
  } catch (error) {
    console.error("Fetch testimonials error:", error);
    return errorResponse("Failed to fetch testimonials", 500);
  }
}
