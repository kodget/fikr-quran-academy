/**
 * Admin Single Blog Post API
 * GET /api/admin/blog/[id] - Get single blog post
 * PATCH /api/admin/blog/[id] - Update blog post
 * DELETE /api/admin/blog/[id] - Delete blog post
 */

export const runtime = 'nodejs'; // Force Node.js runtime

import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/admin-middleware";
import { successResponse, errorResponse } from "@/lib/api-response";
import { z } from "zod";

const updateSchema = z.object({
  title: z.string().min(3).optional(),
  slug: z.string().min(3).optional(),
  excerpt: z.string().min(10).optional(),
  content: z.string().min(50).optional(),
  coverImage: z.string().url().optional().nullable(),
  author: z.string().min(2).optional(),
  published: z.boolean().optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Verify authentication
  const { error, admin } = requireAdminAuth(request);
  if (error) return error;

  try {
    const post = await prisma.blogPost.findUnique({
      where: { id: params.id },
    });

    if (!post) {
      return errorResponse("Blog post not found", 404);
    }

    return successResponse(post);
  } catch (err) {
    console.error("Fetch blog post error:", err);
    return errorResponse("Failed to fetch blog post", 500);
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

    // If slug is being updated, check if it's unique
    if (data.slug) {
      const existingPost = await prisma.blogPost.findFirst({
        where: {
          slug: data.slug,
          NOT: { id: params.id },
        },
      });

      if (existingPost) {
        return errorResponse("A post with this slug already exists", 400);
      }
    }

    // Get current post to check published status
    const currentPost = await prisma.blogPost.findUnique({
      where: { id: params.id },
    });

    if (!currentPost) {
      return errorResponse("Blog post not found", 404);
    }

    // Prepare update data
    const updateData: any = { ...data };

    // If publishing for the first time, set publishedAt
    if (data.published && !currentPost.published) {
      updateData.publishedAt = new Date();
    }

    // If unpublishing, clear publishedAt
    if (data.published === false && currentPost.published) {
      updateData.publishedAt = null;
    }

    // Update blog post
    const updated = await prisma.blogPost.update({
      where: { id: params.id },
      data: updateData,
    });

    return successResponse(updated, "Blog post updated successfully");
  } catch (err) {
    console.error("Update blog post error:", err);
    return errorResponse("Failed to update blog post", 500);
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
    await prisma.blogPost.delete({
      where: { id: params.id },
    });

    return successResponse(null, "Blog post deleted successfully");
  } catch (err) {
    console.error("Delete blog post error:", err);
    return errorResponse("Failed to delete blog post", 500);
  }
}
