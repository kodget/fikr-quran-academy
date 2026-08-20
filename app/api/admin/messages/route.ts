/**
 * Admin Messages API
 * GET /api/admin/messages - List all contact messages with filters
 */

export const runtime = 'nodejs'; // Force Node.js runtime

import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/admin-middleware";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  // Verify authentication
  const { error, admin } = requireAdminAuth(request);
  if (error) return error;

  try {
    const { searchParams } = new URL(request.url);
    
    // Filter parameters
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (status && status !== "all") {
      where.status = status.toUpperCase();
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { message: { contains: search, mode: "insensitive" } },
      ];
    }

    // Fetch messages with pagination
    const [messages, total] = await Promise.all([
      prisma.contactMessage.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.contactMessage.count({ where }),
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasMore = page < totalPages;

    return successResponse({
      messages,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore,
      },
    });
  } catch (err) {
    console.error("Fetch messages error:", err);
    return errorResponse("Failed to fetch messages", 500);
  }
}
