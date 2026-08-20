/**
 * Admin Route Protection Middleware
 * Utilities for protecting admin API routes
 */

import { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";
import { errorResponse } from "@/lib/api-response";

export interface AuthenticatedRequest extends NextRequest {
  admin?: {
    adminId: string;
    email: string;
    name: string;
  };
}

/**
 * Verify admin authentication from request
 * Returns the decoded token payload or null if invalid
 */
export function verifyAdminAuth(request: NextRequest) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.substring(7); // Remove "Bearer " prefix

    // Verify token
    const decoded = verifyToken(token);

    if (!decoded) {
      return null;
    }

    return {
      adminId: decoded.adminId,
      email: decoded.email,
      name: decoded.name,
    };
  } catch (error) {
    console.error("Admin auth verification error:", error);
    return null;
  }
}

/**
 * Require admin authentication
 * Use at the start of protected API routes
 */
export function requireAdminAuth(request: NextRequest) {
  const admin = verifyAdminAuth(request);

  if (!admin) {
    return {
      error: errorResponse("Authentication required", 401),
      admin: null,
    };
  }

  return {
    error: null,
    admin,
  };
}

/**
 * Example usage in an API route:
 * 
 * export async function GET(request: NextRequest) {
 *   const { error, admin } = requireAdminAuth(request);
 *   if (error) return error;
 *   
 *   // Admin is authenticated, proceed with route logic
 *   // Use admin.adminId, admin.email, admin.name
 * }
 */
