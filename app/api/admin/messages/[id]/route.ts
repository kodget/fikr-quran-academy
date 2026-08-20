/**
 * Admin Single Message API
 * GET /api/admin/messages/[id] - Get single message
 * PATCH /api/admin/messages/[id] - Update message status
 * DELETE /api/admin/messages/[id] - Delete message
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
    const message = await prisma.contactMessage.findUnique({
      where: { id: params.id },
    });

    if (!message) {
      return errorResponse("Message not found", 404);
    }

    // Mark as read if it's unread
    if (message.status === "UNREAD") {
      await prisma.contactMessage.update({
        where: { id: params.id },
        data: { status: "READ" },
      });
      message.status = "READ";
    }

    return successResponse(message);
  } catch (err) {
    console.error("Fetch message error:", err);
    return errorResponse("Failed to fetch message", 500);
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
    const { status } = body;

    // Validate status
    const validStatuses = ["UNREAD", "READ", "ARCHIVED"];
    if (status && !validStatuses.includes(status)) {
      return errorResponse("Invalid status", 400);
    }

    // Update message
    const updated = await prisma.contactMessage.update({
      where: { id: params.id },
      data: { status },
    });

    return successResponse(updated, "Message updated successfully");
  } catch (err) {
    console.error("Update message error:", err);
    return errorResponse("Failed to update message", 500);
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
    await prisma.contactMessage.delete({
      where: { id: params.id },
    });

    return successResponse(null, "Message deleted successfully");
  } catch (err) {
    console.error("Delete message error:", err);
    return errorResponse("Failed to delete message", 500);
  }
}
