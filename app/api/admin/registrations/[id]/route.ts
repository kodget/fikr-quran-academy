/**
 * Admin Single Registration API
 * GET /api/admin/registrations/[id] - Get single registration
 * PATCH /api/admin/registrations/[id] - Update registration
 */

export const runtime = 'nodejs'; // Force Node.js runtime

import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/admin-middleware";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Verify authentication
  const { error, admin } = requireAdminAuth(request);
  if (error) return error;

  try {
    const registration = await prisma.registration.findUnique({
      where: { id: params.id },
    });

    if (!registration) {
      return errorResponse("Registration not found", 404);
    }

    return successResponse(registration);
  } catch (err) {
    console.error("Fetch registration error:", err);
    return errorResponse("Failed to fetch registration", 500);
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
    const { paymentStatus, notes } = body;

    // Validate payment status
    const validStatuses = ["PENDING", "PROCESSING", "PAID", "FAILED", "CANCELLED"];
    if (paymentStatus && !validStatuses.includes(paymentStatus)) {
      return errorResponse("Invalid payment status", 400);
    }

    // Update registration
    const updateData: any = {};
    if (paymentStatus) {
      updateData.paymentStatus = paymentStatus;
      
      // If setting to PAID, add verification timestamp
      if (paymentStatus === "PAID" && !updateData.paymentVerifiedAt) {
        updateData.paymentVerifiedAt = new Date();
      }
    }

    const updated = await prisma.registration.update({
      where: { id: params.id },
      data: updateData,
    });

    return successResponse(updated, "Registration updated successfully");
  } catch (err) {
    console.error("Update registration error:", err);
    return errorResponse("Failed to update registration", 500);
  }
}
