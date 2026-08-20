/**
 * Admin Single Testimonial API
 * GET /api/admin/testimonials/[id] - Get single testimonial
 * PATCH /api/admin/testimonials/[id] - Update testimonial
 * DELETE /api/admin/testimonials/[id] - Delete testimonial
 */

export const runtime = 'nodejs'; // Force Node.js runtime

import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/admin-middleware";
import { successResponse, errorResponse } from "@/lib/api-response";
import { z } from "zod";

const updateSchema = z.object({
  name: z.string().min(2).optional(),
  role: z.string().min(2).optional(),
  country: z.string().min(2).optional(),
  text: z.string().min(10).optional(),
  rating: z.number().min(1).max(5).optional(),
  image: z.string().optional().nullable(),
  published: z.boolean().optional(),
  order: z.number().optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Verify authentication
  const { error, admin } = requireAdminAuth(request);
  if (error) return error;

  try {
    const testimonial = await prisma.testimonial.findUnique({
      where: { id: params.id },
    });

    if (!testimonial) {
      return errorResponse("Testimonial not found", 404);
    }

    return successResponse(testimonial);
  } catch (err) {
    console.error("Fetch testimonial error:", err);
    return errorResponse("Failed to fetch testimonial", 500);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Verify authentication
  const { error, admin } = requireAdminAuth(request);
  if (error) return error;

  try {
    const body = await request.json();

    // Validate input
    const validation = updateSchema.safeParse(body);

    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message, 400);
    }

    const data = validation.data;

    // Update testimonial
    const updated = await prisma.testimonial.update({
      where: { id: params.id },
      data,
    });

    return successResponse(updated, "Testimonial updated successfully");
  } catch (err) {
    console.error("Update testimonial error:", err);
    return errorResponse("Failed to update testimonial", 500);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Verify authentication
  const { error, admin } = requireAdminAuth(request);
  if (error) return error;

  try {
    await prisma.testimonial.delete({
      where: { id: params.id },
    });

    return successResponse(null, "Testimonial deleted successfully");
  } catch (err) {
    console.error("Delete testimonial error:", err);
    return errorResponse("Failed to delete testimonial", 500);
  }
}
