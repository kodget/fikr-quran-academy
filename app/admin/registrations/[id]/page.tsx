"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import { authFetch } from "@/lib/useAdminAuth";

interface Registration {
  id: string;
  applicationId: string;
  fullName: string;
  parentName: string | null;
  email: string;
  phone: string;
  country: string;
  state: string | null;
  gender: string;
  dateOfBirth: string | null;
  experience: string;
  programme: string;
  frequency: string;
  sessionsPerMonth: number;
  days: string;
  time: string;
  timezone: string | null;
  currency: string;
  amount: number;
  paymentStatus: string;
  paymentReference: string | null;
  paymentVerifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function RegistrationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchRegistration();
    }
  }, [params.id]);

  const fetchRegistration = async () => {
    try {
      setIsLoading(true);
      const response = await authFetch(`/api/admin/registrations/${params.id}`);
      const data = await response.json();

      if (data.success) {
        setRegistration(data.data);
      } else {
        setError(data.message || "Failed to load registration");
      }
    } catch (err) {
      console.error("Failed to fetch registration:", err);
      setError("Failed to load registration");
    } finally {
      setIsLoading(false);
    }
  };

  const updatePaymentStatus = async (newStatus: string) => {
    if (!registration) return;

    try {
      setIsUpdating(true);
      const response = await authFetch(`/api/admin/registrations/${params.id}`, {
        method: "PATCH",
        body: JSON.stringify({ paymentStatus: newStatus }),
      });

      const data = await response.json();

      if (data.success) {
        setRegistration(data.data);
        alert("Payment status updated successfully");
      } else {
        alert(data.message || "Failed to update status");
      }
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update payment status");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              border: "4px solid rgba(232,116,68,0.3)",
              borderTopColor: "var(--accent)",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto",
            }}
          />
        </div>
      </AdminLayout>
    );
  }

  if (error || !registration) {
    return (
      <AdminLayout>
        <div style={{ padding: "2rem" }}>
          <div
            style={{
              padding: "1rem",
              background: "rgba(220,38,38,0.1)",
              border: "1px solid rgba(220,38,38,0.3)",
              borderRadius: "0.5rem",
              color: "rgba(252,165,165,1)",
            }}
          >
            {error || "Registration not found"}
          </div>
        </div>
      </AdminLayout>
    );
  }

  const formatAmount = (amount: number, currency: string) => {
    const displayAmount = amount / 100;
    return currency === "NGN"
      ? `₦${displayAmount.toLocaleString()}`
      : `$${displayAmount.toLocaleString()}`;
  };

  return (
    <AdminLayout>
      <div style={{ padding: "2rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <button
            onClick={() => router.push("/admin/registrations")}
            style={{
              padding: "0.5rem 1rem",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "0.5rem",
              color: "rgba(255,255,255,0.9)",
              fontFamily: "var(--font-sans)",
              fontSize: "0.875rem",
              cursor: "pointer",
              marginBottom: "1rem",
            }}
          >
            ← Back to Registrations
          </button>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.5rem",
              fontWeight: "300",
              color: "rgba(255,255,255,0.95)",
              marginBottom: "0.5rem",
            }}
          >
            Registration Details
          </h1>
          <p
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "1rem",
              color: "var(--accent)",
            }}
          >
            {registration.applicationId}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}>
          {/* Main Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Student Information */}
            <Section title="Student Information">
              <DetailRow label="Full Name" value={registration.fullName} />
              {registration.parentName && (
                <DetailRow label="Parent Name" value={registration.parentName} />
              )}
              <DetailRow label="Email" value={registration.email} />
              <DetailRow label="Phone" value={registration.phone} />
              <DetailRow label="Gender" value={registration.gender} />
              {registration.dateOfBirth && (
                <DetailRow
                  label="Date of Birth"
                  value={new Date(registration.dateOfBirth).toLocaleDateString()}
                />
              )}
            </Section>

            {/* Location */}
            <Section title="Location">
              <DetailRow label="Country" value={registration.country} />
              {registration.state && (
                <DetailRow label="State/Region" value={registration.state} />
              )}
              {registration.timezone && (
                <DetailRow label="Timezone" value={registration.timezone} />
              )}
            </Section>

            {/* Programme Details */}
            <Section title="Programme Details">
              <DetailRow label="Experience Level" value={registration.experience} />
              <DetailRow label="Programme" value={registration.programme} />
              <DetailRow label="Frequency" value={registration.frequency} />
              <DetailRow
                label="Sessions per Month"
                value={registration.sessionsPerMonth.toString()}
              />
              <DetailRow
                label="Preferred Days"
                value={JSON.parse(registration.days).join(", ")}
              />
              <DetailRow label="Preferred Time" value={registration.time} />
            </Section>
          </div>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Payment Info */}
            <Section title="Payment Information">
              <DetailRow
                label="Amount"
                value={formatAmount(registration.amount, registration.currency)}
              />
              <DetailRow label="Currency" value={registration.currency} />
              <DetailRow
                label="Status"
                value={<StatusBadge status={registration.paymentStatus} />}
              />
              {registration.paymentReference && (
                <DetailRow label="Reference" value={registration.paymentReference} />
              )}
              {registration.paymentVerifiedAt && (
                <DetailRow
                  label="Verified At"
                  value={new Date(registration.paymentVerifiedAt).toLocaleString()}
                />
              )}
            </Section>

            {/* Update Status */}
            <div
              style={{
                padding: "1.5rem",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "1rem",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "rgba(255,255,255,0.8)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "1rem",
                }}
              >
                Update Payment Status
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {["PAID", "PENDING", "FAILED", "CANCELLED"].map((status) => (
                  <button
                    key={status}
                    onClick={() => updatePaymentStatus(status)}
                    disabled={isUpdating || registration.paymentStatus === status}
                    style={{
                      padding: "0.75rem",
                      background:
                        registration.paymentStatus === status
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "0.5rem",
                      color: "rgba(255,255,255,0.9)",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.875rem",
                      cursor:
                        isUpdating || registration.paymentStatus === status
                          ? "not-allowed"
                          : "pointer",
                      opacity:
                        isUpdating || registration.paymentStatus === status ? 0.5 : 1,
                      textAlign: "left",
                    }}
                  >
                    {registration.paymentStatus === status && "✓ "}
                    Mark as {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Metadata */}
            <Section title="Metadata">
              <DetailRow
                label="Registered"
                value={new Date(registration.createdAt).toLocaleString()}
              />
              <DetailRow
                label="Last Updated"
                value={new Date(registration.updatedAt).toLocaleString()}
              />
            </Section>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </AdminLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: "1.5rem",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "1rem",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.875rem",
          fontWeight: "600",
          color: "rgba(255,255,255,0.8)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: "1rem",
        }}
      >
        {title}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {children}
      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string | React.ReactNode;
}) {
  return (
    <div>
      <div
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.75rem",
          color: "rgba(255,255,255,0.5)",
          marginBottom: "0.25rem",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.875rem",
          color: "rgba(255,255,255,0.9)",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    PAID: { bg: "rgba(90,155,74,0.2)", text: "rgba(134,239,172,1)" },
    PENDING: { bg: "rgba(251,191,36,0.2)", text: "rgba(253,224,71,1)" },
    PROCESSING: { bg: "rgba(59,130,246,0.2)", text: "rgba(147,197,253,1)" },
    FAILED: { bg: "rgba(220,38,38,0.2)", text: "rgba(252,165,165,1)" },
    CANCELLED: { bg: "rgba(156,163,175,0.2)", text: "rgba(209,213,219,1)" },
  };

  const color = colors[status] || colors.PENDING;

  return (
    <span
      style={{
        padding: "0.25rem 0.75rem",
        background: color.bg,
        color: color.text,
        borderRadius: "9999px",
        fontFamily: "var(--font-sans)",
        fontSize: "0.75rem",
        fontWeight: "600",
        display: "inline-block",
      }}
    >
      {status}
    </span>
  );
}
