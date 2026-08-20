/**
 * Admin Login API
 * POST /api/admin/login
 */

export const runtime = 'nodejs'; // Force Node.js runtime

import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, generateToken } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate inputs
    if (!email || !password) {
      return errorResponse("Email and password are required", 400);
    }

    // Find admin by email
    const admin = await prisma.admin.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!admin) {
      // Don't reveal if email exists or not
      return errorResponse("Invalid email or password", 401);
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, admin.passwordHash);

    if (!isValidPassword) {
      return errorResponse("Invalid email or password", 401);
    }

    // Generate JWT token
    const token = generateToken({
      adminId: admin.id,
      email: admin.email,
      name: admin.name,
    });

    // Return success with token
    return successResponse(
      {
        token,
        admin: {
          id: admin.id,
          email: admin.email,
          name: admin.name,
        },
      },
      "Login successful"
    );
  } catch (error) {
    console.error("Admin login error:", error);
    return errorResponse("Login failed. Please try again.", 500);
  }
}
