/**
 * Get Current Admin User
 * GET /api/admin/me
 * 
 * Returns the current authenticated admin user info
 */

export const runtime = 'nodejs'; // Force Node.js runtime

import { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return errorResponse("Authentication required", 401);
    }

    const token = authHeader.substring(7); // Remove "Bearer " prefix

    // Verify token
    const decoded = verifyToken(token);

    if (!decoded) {
      return errorResponse("Invalid or expired token", 401);
    }

    // Return admin info
    return successResponse({
      admin: {
        id: decoded.adminId,
        email: decoded.email,
        name: decoded.name,
      },
    });
  } catch (error) {
    console.error("Get admin info error:", error);
    return errorResponse("Failed to get user information", 500);
  }
}
