/**
 * Admin Dashboard Statistics API
 * GET /api/admin/stats
 *
 * Returns comprehensive statistics for the admin dashboard
 */

export const runtime = "nodejs"; // Force Node.js runtime

import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/admin-middleware";
import { successResponse } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  // Verify authentication
  const { error, admin } = requireAdminAuth(request);
  if (error) return error;

  try {
    // Get registration statistics
    const [
      totalRegistrations,
      paidRegistrations,
      pendingPayments,
      failedPayments,
      processingPayments,
      unreadMessages,
      totalMessages,
      publishedTestimonials,
      totalTestimonials,
      publishedBlogPosts,
      draftBlogPosts,
      recentRegistrations,
      recentMessages,
    ] = await Promise.all([
      // Registration counts
      prisma.registration.count(),
      prisma.registration.count({ where: { paymentStatus: "PAID" } }),
      prisma.registration.count({ where: { paymentStatus: "PENDING" } }),
      prisma.registration.count({ where: { paymentStatus: "FAILED" } }),
      prisma.registration.count({ where: { paymentStatus: "PROCESSING" } }),

      // Message counts
      prisma.contactMessage.count({ where: { status: "UNREAD" } }),
      prisma.contactMessage.count(),

      // Testimonial counts
      prisma.testimonial.count({ where: { published: true } }),
      prisma.testimonial.count(),

      // Blog post counts
      prisma.blogPost.count({ where: { published: true } }),
      prisma.blogPost.count({ where: { published: false } }),

      // Recent activity
      prisma.registration.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          applicationId: true,
          fullName: true,
          email: true,
          country: true,
          paymentStatus: true,
          createdAt: true,
        },
      }),

      prisma.contactMessage.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          message: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

    // Calculate revenue (only from paid registrations)
    const revenueData = await prisma.registration.groupBy({
      by: ["currency"],
      where: { paymentStatus: "PAID" },
      _sum: {
        amount: true,
      },
    });

    // Format revenue data
    const revenue = revenueData.map(
      (item: { currency: string; _sum: { amount: number | null } }) => ({
        currency: item.currency,
        total: item._sum.amount || 0,
        formatted:
          item.currency === "NGN"
            ? `₦${((item._sum.amount || 0) / 100).toLocaleString()}`
            : `$${((item._sum.amount || 0) / 100).toLocaleString()}`,
      }),
    );

    // Get registration trend (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentRegistrationsCount = await prisma.registration.count({
      where: {
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
    });

    // Calculate statistics
    const stats = {
      registrations: {
        total: totalRegistrations,
        paid: paidRegistrations,
        pending: pendingPayments,
        processing: processingPayments,
        failed: failedPayments,
        last7Days: recentRegistrationsCount,
      },
      messages: {
        total: totalMessages,
        unread: unreadMessages,
        read: totalMessages - unreadMessages,
      },
      testimonials: {
        total: totalTestimonials,
        published: publishedTestimonials,
        unpublished: totalTestimonials - publishedTestimonials,
      },
      blog: {
        total: publishedBlogPosts + draftBlogPosts,
        published: publishedBlogPosts,
        drafts: draftBlogPosts,
      },
      revenue,
      recentActivity: {
        registrations: recentRegistrations,
        messages: recentMessages,
      },
    };

    return successResponse(stats);
  } catch (error) {
    console.error("Dashboard stats error:", error);
    throw error;
  }
}
