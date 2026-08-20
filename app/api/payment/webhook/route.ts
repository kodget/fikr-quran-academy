/**
 * API endpoint for Paystack webhook notifications
 * POST /api/payment/webhook
 * 
 * This endpoint receives real-time payment notifications from Paystack
 * and updates the registration status accordingly.
 * 
 * IMPORTANT: Configure this URL in your Paystack dashboard:
 * https://dashboard.paystack.com/#/settings/developer
 */

export const runtime = 'nodejs'; // Force Node.js runtime

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateWebhookSignature, PaystackWebhookPayload } from "@/lib/paystack";

export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature validation
    const rawBody = await request.text();
    const signature = request.headers.get("x-paystack-signature");

    if (!signature) {
      console.error("Webhook validation failed: No signature provided");
      return NextResponse.json({ error: "No signature" }, { status: 400 });
    }

    // Validate webhook signature
    const isValid = validateWebhookSignature(rawBody, signature);

    if (!isValid) {
      console.error("Webhook validation failed: Invalid signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // Parse the webhook payload
    const payload: PaystackWebhookPayload = JSON.parse(rawBody);

    // Log webhook event
    console.log(`Paystack webhook received: ${payload.event}`);

    // Handle different webhook events
    switch (payload.event) {
      case "charge.success":
        await handleChargeSuccess(payload);
        break;

      case "charge.failed":
        await handleChargeFailed(payload);
        break;

      default:
        console.log(`Unhandled webhook event: ${payload.event}`);
    }

    // Always return 200 to acknowledge receipt
    return NextResponse.json({ status: "success" }, { status: 200 });
  } catch (error) {
    console.error("Webhook processing error:", error);
    
    // Still return 200 to prevent Paystack from retrying
    // Log the error for manual investigation
    return NextResponse.json({ status: "error logged" }, { status: 200 });
  }
}

/**
 * Handle successful payment webhook
 */
async function handleChargeSuccess(payload: PaystackWebhookPayload) {
  const { reference, amount, currency, paid_at } = payload.data;

  try {
    // Find registration by payment reference
    const registration = await prisma.registration.findFirst({
      where: { paymentReference: reference },
    });

    if (!registration) {
      console.error(`Registration not found for reference: ${reference}`);
      return;
    }

    // Verify amount matches
    if (registration.amount !== amount) {
      console.error(
        `Amount mismatch for ${reference}: expected ${registration.amount}, got ${amount}`
      );
      return;
    }

    // Verify currency matches
    if (registration.currency !== currency) {
      console.error(
        `Currency mismatch for ${reference}: expected ${registration.currency}, got ${currency}`
      );
      return;
    }

    // Update registration to PAID status
    await prisma.registration.update({
      where: { id: registration.id },
      data: {
        paymentStatus: "PAID",
        paymentVerifiedAt: paid_at ? new Date(paid_at) : new Date(),
      },
    });

    console.log(`Payment successful for application: ${registration.applicationId}`);

    // TODO: Send confirmation email to student (Task 13)
  } catch (error) {
    console.error("Error processing charge.success webhook:", error);
    throw error;
  }
}

/**
 * Handle failed payment webhook
 */
async function handleChargeFailed(payload: PaystackWebhookPayload) {
  const { reference } = payload.data;

  try {
    // Find registration by payment reference
    const registration = await prisma.registration.findFirst({
      where: { paymentReference: reference },
    });

    if (!registration) {
      console.error(`Registration not found for reference: ${reference}`);
      return;
    }

    // Update registration to FAILED status
    await prisma.registration.update({
      where: { id: registration.id },
      data: {
        paymentStatus: "FAILED",
      },
    });

    console.log(`Payment failed for application: ${registration.applicationId}`);

    // TODO: Send payment failure notification email (Task 13)
  } catch (error) {
    console.error("Error processing charge.failed webhook:", error);
    throw error;
  }
}
