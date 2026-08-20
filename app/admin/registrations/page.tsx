"use client";

import { useEffect, useState } from "react";
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

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchRegistrations();
  }, [statusFilter, currentPage]);

  const fetchRegistrations = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "20",
        ...(statusFilter !== "all" && { status: statusFilter }),
        ...(searchQuery && { search: searchQuery }),
      });

      const response = await authFetch(`/api/admin/registrations?${params}`);
      const data = await response.json();

      if (data.success) {
        setRegistrations(data.data.registrations);
        setPagination(data.data.pagination);
      } else {
        setError(data.message || "Failed to load registrations");
      }
    } catch (err) {
      console.error("Failed to fetch registrations:", err);
      setError("Failed to load registrations");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchRegistrations();
  };

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
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.5rem",
              fontWeight: "300",
              color: "rgba(255,255,255,0.95)",
              marginBottom: "0.5rem",
            }}
          >
            Registrations
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            Manage student registrations and payments
          </p>
        </div>

        {/* Filters and Search */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "2rem",
            flexWrap: "wrap",
          }}
        >
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              padding: "0.75rem 1rem",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "0.5rem",
              color: "rgba(255,255,255,0.9)",
              fontFamily: "var(--font-sans)",
              fontSize: "0.875rem",
              cursor: "pointer",
            }}
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="failed">Failed</option>
          </select>

          {/* Search */}
          <form onSubmit={handleSearch} style={{ flex: 1, display: "flex", gap: "0.5rem" }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or application ID..."
              style={{
                flex: 1,
                padding: "0.75rem 1rem",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "0.5rem",
                color: "rgba(255,255,255,0.9)",
                fontFamily: "var(--font-sans)",
                fontSize: "0.875rem",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "0.75rem 1.5rem",
                background: "var(--accent)",
                border: "none",
                borderRadius: "0.5rem",
                color: "#1A1A18",
                fontFamily: "var(--font-sans)",
                fontSize: "0.875rem",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Search
            </button>
          </form>
        </div>

        {/* Error State */}
        {error && (
          <div
            style={{
              padding: "1rem",
              background: "rgba(220,38,38,0.1)",
              border: "1px solid rgba(220,38,38,0.3)",
              borderRadius: "0.5rem",
              color: "rgba(252,165,165,1)",
              marginBottom: "1rem",
            }}
          >
            {error}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div style={{ textAlign: "center", padding: "3rem" }}>
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
        )}

        {/* Registrations Table */}
        {!isLoading && registrations.length === 0 && (
          <div
            style={{
              padding: "3rem",
              textAlign: "center",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "1rem",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1rem",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              No registrations found
            </p>
          </div>
        )}

        {!isLoading && registrations.length > 0 && (
          <>
            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "1rem",
                overflow: "hidden",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <th style={tableHeaderStyle}>Application ID</th>
                    <th style={tableHeaderStyle}>Name</th>
                    <th style={tableHeaderStyle}>Email</th>
                    <th style={tableHeaderStyle}>Country</th>
                    <th style={tableHeaderStyle}>Programme</th>
                    <th style={tableHeaderStyle}>Amount</th>
                    <th style={tableHeaderStyle}>Status</th>
                    <th style={tableHeaderStyle}>Date</th>
                    <th style={tableHeaderStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((reg) => (
                    <tr
                      key={reg.id}
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <td style={tableCellStyle}>
                        <span
                          style={{
                            fontFamily: "var(--font-mono, monospace)",
                            fontSize: "0.8125rem",
                            color: "var(--accent)",
                          }}
                        >
                          {reg.applicationId}
                        </span>
                      </td>
                      <td style={tableCellStyle}>{reg.fullName}</td>
                      <td style={tableCellStyle}>{reg.email}</td>
                      <td style={tableCellStyle}>{reg.country}</td>
                      <td style={tableCellStyle}>{reg.programme}</td>
                      <td style={tableCellStyle}>
                        {formatAmount(reg.amount, reg.currency)}
                      </td>
                      <td style={tableCellStyle}>
                        <StatusBadge status={reg.paymentStatus} />
                      </td>
                      <td style={tableCellStyle}>
                        {new Date(reg.createdAt).toLocaleDateString()}
                      </td>
                      <td style={tableCellStyle}>
                        <a
                          href={`/admin/registrations/${reg.id}`}
                          style={{
                            color: "var(--accent)",
                            textDecoration: "none",
                            fontSize: "0.875rem",
                          }}
                        >
                          View →
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                  marginTop: "2rem",
                }}
              >
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: "0.5rem 1rem",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "0.5rem",
                    color: "rgba(255,255,255,0.9)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.875rem",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    opacity: currentPage === 1 ? 0.5 : 1,
                  }}
                >
                  Previous
                </button>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => p + 1)}
                  disabled={!pagination.hasMore}
                  style={{
                    padding: "0.5rem 1rem",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "0.5rem",
                    color: "rgba(255,255,255,0.9)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.875rem",
                    cursor: !pagination.hasMore ? "not-allowed" : "pointer",
                    opacity: !pagination.hasMore ? 0.5 : 1,
                  }}
                >
                  Next
                </button>
              </div>
            )}
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
    </AdminLayout>
  );
}

const tableHeaderStyle: React.CSSProperties = {
  padding: "1rem",
  textAlign: "left",
  fontFamily: "var(--font-sans)",
  fontSize: "0.8125rem",
  fontWeight: "600",
  color: "rgba(255,255,255,0.7)",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

const tableCellStyle: React.CSSProperties = {
  padding: "1rem",
  fontFamily: "var(--font-sans)",
  fontSize: "0.875rem",
  color: "rgba(255,255,255,0.9)",
};

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
