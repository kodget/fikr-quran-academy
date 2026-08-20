/**
 * Admin Testimonials API
 * GET /api/admin/testimonials - List all testimonials
 * POST /api/admin/testimonials - Create new testimonial
 */

export const runtime = 'nodejs'; // Force Node.js runtime

import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/admin-middleware";
import { successResponse, errorResponse } from "@/lib/api-response";
import { z } from "zod";

// Validation schema
const testimonialSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.string().min(2, "Role must be at least 2 characters"),
  country: z.string().min(2, "Country is required"),
  text: z.string().min(10, "Testimonial text must be at least 10 characters"),
  rating: z.number().min(1).max(5).default(5),
  image: z.string().optional().nullable(),
  published: z.boolean().default(false),
  order: z.number().default(0),
});

export async function GET(request: NextRequest) {
  // Verify authentication
  const { error, admin } = requireAdminAuth(request);
  if (error) return error;

  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get("published");

    // Build where clause
    const where: any = {};
    if (published === "true") {
      where.published = true;
    } else if (published === "false") {
      where.published = false;
    }

    // Fetch testimonials
    const testimonials = await prisma.testimonial.findMany({
      where,
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    return successResponse({ testimonials });
  } catch (err) {
    console.error("Fetch testimonials error:", err);
    return errorResponse("Failed to fetch testimonials", 500);
  }
}

export async function POST(request: NextRequest) {
  // Verify authentication
  const { error, admin } = requireAdminAuth(request);
  if (error) return error;

  try {
    const body = await request.json();

    // Validate input
    const validation = testimonialSchema.safeParse(body);

    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message, 400);
    }

    const data = validation.data;

    // Create testimonial
    const testimonial = await prisma.testimonial.create({
      data: {
        name: data.name,
        role: data.role,
        country: data.country,
        text: data.text,
        rating: data.rating,
        image: data.image || null,
        published: data.published,
        order: data.order,
      },
    });

    return successResponse(testimonial, "Testimonial created successfully");
  } catch (err) {
    console.error("Create testimonial error:", err);
    return errorResponse("Failed to create testimonial", 500);
  }
}
