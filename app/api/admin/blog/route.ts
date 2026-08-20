/**
 * Admin Blog API
 * GET /api/admin/blog - List all blog posts (published and drafts)
 * POST /api/admin/blog - Create new blog post
 */

export const runtime = 'nodejs'; // Force Node.js runtime

import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/admin-middleware";
import { successResponse, errorResponse } from "@/lib/api-response";
import { z } from "zod";

// Validation schema
const blogPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  coverImage: z.string().url().optional().nullable(),
  author: z.string().min(2, "Author name is required"),
  published: z.boolean().default(false),
});

export async function GET(request: NextRequest) {
  // Verify authentication
  const { error, admin } = requireAdminAuth(request);
  if (error) return error;

  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get("published");

    // Build where clause
    const where: any = {};
    if (published === "true") {
      where.published = true;
    } else if (published === "false") {
      where.published = false;
    }

    // Fetch blog posts
    const posts = await prisma.blogPost.findMany({
      where,
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    });

    return successResponse({ posts });
  } catch (err) {
    console.error("Fetch blog posts error:", err);
    return errorResponse("Failed to fetch blog posts", 500);
  }
}

export async function POST(request: NextRequest) {
  // Verify authentication
  const { error, admin } = requireAdminAuth(request);
  if (error) return error;

  try {
    const body = await request.json();

    // Validate input
    const validation = blogPostSchema.safeParse(body);

    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message, 400);
    }

    const data = validation.data;

    // Check if slug already exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug: data.slug },
    });

    if (existingPost) {
      return errorResponse("A post with this slug already exists", 400);
    }

    // Create blog post
    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage || null,
        author: data.author,
        published: data.published,
        publishedAt: data.published ? new Date() : null,
      },
    });

    return successResponse(post, "Blog post created successfully");
  } catch (err) {
    console.error("Create blog post error:", err);
    return errorResponse("Failed to create blog post", 500);
  }
}
