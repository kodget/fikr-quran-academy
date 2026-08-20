"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentCallbackPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"verifying" | "success" | "failed">("verifying");
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const reference = searchParams.get("reference");

    if (!reference) {
      setStatus("failed");
      setError("No payment reference provided");
      return;
    }

    // Verify payment with backend
    verifyPayment(reference);
  }, [searchParams]);

  const verifyPayment = async (reference: string) => {
    try {
      const response = await fetch(`/api/payment/verify?reference=${reference}`);
      const data = await response.json();

      if (data.success && data.data.status === "success") {
        setStatus("success");
        setApplicationId(data.data.applicationId);
      } else {
        setStatus("failed");
        setError(data.message || "Payment verification failed");
      }
    } catch (err) {
      setStatus("failed");
      setError(err instanceof Error ? err.message : "Failed to verify payment");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "1rem",
          padding: "3rem",
          textAlign: "center",
        }}
      >
        {status === "verifying" && (
          <>
            <div
              style={{
                width: "64px",
                height: "64px",
                margin: "0 auto 2rem",
                border: "4px solid rgba(232,116,68,0.3)",
                borderTopColor: "var(--accent)",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2rem",
                fontWeight: "300",
                color: "rgba(255,255,255,0.95)",
                marginBottom: "1rem",
              }}
            >
              Verifying Payment...
            </h1>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1rem",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              Please wait while we confirm your payment.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div
              style={{
                width: "64px",
                height: "64px",
                margin: "0 auto 2rem",
                background: "rgba(232,116,68,0.2)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--accent)",
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2rem",
                fontWeight: "300",
                color: "rgba(255,255,255,0.95)",
                marginBottom: "1rem",
              }}
            >
              Payment Successful!
            </h1>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1rem",
                color: "rgba(255,255,255,0.6)",
                marginBottom: "2rem",
              }}
            >
              Your payment has been confirmed. Welcome to Fikr Quran Academy!
            </p>
            {applicationId && (
              <div
                style={{
                  background: "rgba(232,116,68,0.1)",
                  border: "1px solid rgba(232,116,68,0.3)",
                  borderRadius: "0.5rem",
                  padding: "1.5rem",
                  marginBottom: "2rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "rgba(255,255,255,0.5)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Application ID
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    fontWeight: "500",
                    color: "var(--accent)",
                  }}
                >
                  {applicationId}
                </div>
              </div>
            )}
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.875rem",
                color: "rgba(255,255,255,0.6)",
                marginBottom: "2rem",
              }}
            >
              You will receive a confirmation email shortly with details about
              your enrolment and next steps.
            </p>
            <a
              href="/"
              style={{
                display: "inline-block",
                padding: "1rem 2rem",
                background: "var(--accent)",
                color: "#1A1A18",
                fontFamily: "var(--font-sans)",
                fontSize: "0.875rem",
                fontWeight: "500",
                textDecoration: "none",
                borderRadius: "9999px",
                transition: "all 0.2s",
              }}
            >
              Return to Homepage
            </a>
          </>
        )}

        {status === "failed" && (
          <>
            <div
              style={{
                width: "64px",
                height: "64px",
                margin: "0 auto 2rem",
                background: "rgba(220,38,38,0.2)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(252,165,165,1)",
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2rem",
                fontWeight: "300",
                color: "rgba(255,255,255,0.95)",
                marginBottom: "1rem",
              }}
            >
              Payment Failed
            </h1>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1rem",
                color: "rgba(255,255,255,0.6)",
                marginBottom: "2rem",
              }}
            >
              {error || "We could not process your payment. Please try again."}
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <a
                href="/#register"
                style={{
                  display: "inline-block",
                  padding: "1rem 2rem",
                  background: "var(--accent)",
                  color: "#1A1A18",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  textDecoration: "none",
                  borderRadius: "9999px",
                  transition: "all 0.2s",
                }}
              >
                Try Again
              </a>
              <a
                href="/"
                style={{
                  display: "inline-block",
                  padding: "1rem 2rem",
                  background: "rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.9)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  textDecoration: "none",
                  borderRadius: "9999px",
                  border: "1px solid rgba(255,255,255,0.2)",
                  transition: "all 0.2s",
                }}
              >
                Return Home
              </a>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
