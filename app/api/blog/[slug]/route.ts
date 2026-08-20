/**
 * Public Blog Post API
 * GET /api/blog/[slug] - Get single published blog post by slug
 */

export const runtime = 'nodejs'; // Force Node.js runtime

import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Fetch only if published
    const post = await prisma.blogPost.findFirst({
      where: {
        slug: params.slug,
        published: true,
      },
    });

    if (!post) {
      return errorResponse("Blog post not found", 404);
    }

    return successResponse({ post });
  } catch (error) {
    console.error("Fetch blog post error:", error);
    return errorResponse("Failed to fetch blog post", 500);
  }
}
