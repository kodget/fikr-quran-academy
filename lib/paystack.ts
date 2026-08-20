/**
 * Paystack Payment Gateway Integration
 * Handles payment initialization, verification, and webhook validation
 */

import crypto from "crypto";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_PUBLIC_KEY = process.env.PAYSTACK_PUBLIC_KEY;

if (!PAYSTACK_SECRET_KEY) {
  console.warn("⚠️  PAYSTACK_SECRET_KEY not set in environment variables");
}

if (!PAYSTACK_PUBLIC_KEY) {
  console.warn("⚠️  PAYSTACK_PUBLIC_KEY not set in environment variables");
}

// Paystack API base URL
const PAYSTACK_BASE_URL = "https://api.paystack.co";

/**
 * Initialize a payment transaction with Paystack
 */
export async function initializePayment(params: {
  email: string;
  amount: number; // Amount in kobo (for NGN) or cents (for USD)
  currency: "NGN" | "USD";
  reference: string;
  metadata?: Record<string, any>;
  callbackUrl?: string;
}) {
  if (!PAYSTACK_SECRET_KEY) {
    throw new Error("Paystack secret key not configured");
  }

  const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: params.email,
      amount: params.amount,
      currency: params.currency,
      reference: params.reference,
      metadata: params.metadata || {},
      callback_url: params.callbackUrl,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message || "Failed to initialize payment");
  }

  return {
    authorizationUrl: data.data.authorization_url,
    accessCode: data.data.access_code,
    reference: data.data.reference,
  };
}

/**
 * Verify a payment transaction
 */
export async function verifyPayment(reference: string) {
  if (!PAYSTACK_SECRET_KEY) {
    throw new Error("Paystack secret key not configured");
  }

  const response = await fetch(
    `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message || "Failed to verify payment");
  }

  const transaction = data.data;

  return {
    status: transaction.status, // success, failed, abandoned
    reference: transaction.reference,
    amount: transaction.amount,
    currency: transaction.currency,
    paidAt: transaction.paid_at,
    channel: transaction.channel,
    customer: {
      email: transaction.customer.email,
      customerCode: transaction.customer.customer_code,
    },
    metadata: transaction.metadata,
  };
}

/**
 * Validate Paystack webhook signature
 * Ensures the webhook request is genuinely from Paystack
 */
export function validateWebhookSignature(
  payload: string,
  signature: string
): boolean {
  if (!PAYSTACK_SECRET_KEY) {
    throw new Error("Paystack secret key not configured");
  }

  const hash = crypto
    .createHmac("sha512", PAYSTACK_SECRET_KEY)
    .update(payload)
    .digest("hex");

  return hash === signature;
}

/**
 * Get Paystack public key for client-side initialization
 */
export function getPaystackPublicKey(): string {
  if (!PAYSTACK_PUBLIC_KEY) {
    throw new Error("Paystack public key not configured");
  }
  return PAYSTACK_PUBLIC_KEY;
}

/**
 * Generate a unique payment reference
 */
export function generatePaymentReference(applicationId: string): string {
  const timestamp = Date.now();
  return `PAY-${applicationId}-${timestamp}`;
}

/**
 * Paystack webhook event types
 */
export type PaystackWebhookEvent =
  | "charge.success"
  | "charge.failed"
  | "transfer.success"
  | "transfer.failed";

/**
 * Paystack webhook payload structure
 */
export interface PaystackWebhookPayload {
  event: PaystackWebhookEvent;
  data: {
    reference: string;
    status: string;
    amount: number;
    currency: string;
    paid_at?: string;
    customer: {
      email: string;
      customer_code: string;
    };
    metadata?: Record<string, any>;
  };
}
