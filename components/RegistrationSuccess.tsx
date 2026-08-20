"use client";

import { useState } from "react";

interface RegistrationSuccessProps {
  applicationId: string;
  registrationId: string;
  currency: string;
  amount: number; // Display amount (not in smallest units)
  formatted: string;
  onProceedToPayment: () => void;
}

function ICheck() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function RegistrationSuccess({
  applicationId,
  registrationId,
  currency,
  amount,
  formatted,
  onProceedToPayment,
}: RegistrationSuccessProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      // Initialize payment with Paystack
      const response = await fetch("/api/payment/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registrationId,
          applicationId,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to initialize payment");
      }

      // Redirect to Paystack payment page
      window.location.href = data.data.authorizationUrl;
    } catch (err) {
      console.error("Payment initialization error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to process payment",
      );
      setIsProcessing(false);
    }
  };

  return (
    <div
      className="p-12 text-center rounded-2xl"
      style={{
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
        style={{
          background: "rgba(232,116,68,0.2)",
          color: "var(--accent)",
        }}
      >
        <ICheck />
      </div>

      <h2
        className="font-display font-light text-3xl mb-4"
        style={{ color: "rgba(255,255,255,0.95)" }}
      >
        Registration Submitted
      </h2>

      <p
        className="font-sans text-base mb-8 max-w-md mx-auto"
        style={{ color: "rgba(255,255,255,0.6)" }}
      >
        Thank you for registering with Fikr Quran Academy. Your application has
        been received.
      </p>

      <div
        className="inline-block p-6 rounded-xl mb-8"
        style={{
          background: "rgba(232,116,68,0.1)",
          border: "1px solid rgba(232,116,68,0.3)",
        }}
      >
        <div
          className="font-sans text-xs uppercase tracking-wider mb-2"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Application ID
        </div>
        <div
          className="font-display text-2xl font-medium mb-4"
          style={{ color: "var(--accent)" }}
        >
          {applicationId}
        </div>

        <div
          className="font-sans text-xs uppercase tracking-wider mb-2 mt-6"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Payment Amount
        </div>
        <div
          className="font-display text-3xl font-medium"
          style={{ color: "var(--accent)" }}
        >
          {formatted}
        </div>
        <div
          className="font-sans text-xs mt-1"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          {currency === "NGN" ? "Nigerian Naira" : "US Dollar"}
        </div>
      </div>

      {error && (
        <div
          className="p-4 rounded-lg mb-4"
          style={{
            background: "rgba(220,38,38,0.1)",
            border: "1px solid rgba(220,38,38,0.3)",
            color: "rgba(252,165,165,1)",
          }}
        >
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-3">
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full btn-base btn-gold py-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? "Processing..." : "Proceed to Payment"}
        </button>

        <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
          You will be redirected to complete your payment securely via Paystack.
        </p>
      </div>
    </div>
  );
}
