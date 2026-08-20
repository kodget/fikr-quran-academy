/**
 * Admin Registrations API
 * GET /api/admin/registrations - List all registrations with filters
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
    const country = searchParams.get("country");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (status && status !== "all") {
      where.paymentStatus = status.toUpperCase();
    }

    if (country && country !== "all") {
      where.country = country;
    }

    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { applicationId: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
      ];
    }

    // Fetch registrations with pagination
    const [registrations, total] = await Promise.all([
      prisma.registration.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.registration.count({ where }),
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasMore = page < totalPages;

    return successResponse({
      registrations,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore,
      },
    });
  } catch (err) {
    console.error("Fetch registrations error:", err);
    return errorResponse("Failed to fetch registrations", 500);
  }
}
