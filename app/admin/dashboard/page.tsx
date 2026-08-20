"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { authFetch } from "@/lib/useAdminAuth";
import {
  DocumentIcon,
  CheckIcon,
  ChatIcon,
  NewspaperIcon,
} from "@/components/AdminIcons";
import { ReactNode } from "react";

interface DashboardStats {
  registrations: {
    total: number;
    paid: number;
    pending: number;
    processing: number;
    failed: number;
    last7Days: number;
  };
  messages: {
    total: number;
    unread: number;
    read: number;
  };
  testimonials: {
    total: number;
    published: number;
    unpublished: number;
  };
  blog: {
    total: number;
    published: number;
    drafts: number;
  };
  revenue: Array<{
    currency: string;
    total: number;
    formatted: string;
  }>;
  recentActivity: {
    registrations: Array<{
      id: string;
      applicationId: string;
      fullName: string;
      email: string;
      country: string;
      paymentStatus: string;
      createdAt: string;
    }>;
    messages: Array<{
      id: string;
      name: string;
      email: string;
      message: string;
      status: string;
      createdAt: string;
    }>;
  };
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const response = await authFetch("/api/admin/stats");
      const data = await response.json();

      if (data.success) {
        setStats(data.data);
      } else {
        setError(data.message || "Failed to load statistics");
      }
    } catch (err) {
      console.error("Failed to fetch stats:", err);
      setError("Failed to load dashboard statistics");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div
          style={{
            padding: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "400px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              border: "4px solid rgba(232,116,68,0.3)",
              borderTopColor: "var(--accent)",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
        </div>
      </AdminLayout>
    );
  }

  if (error || !stats) {
    return (
      <AdminLayout>
        <div style={{ padding: "2rem" }}>
          <div
            style={{
              padding: "1.5rem",
              background: "rgba(220,38,38,0.1)",
              border: "1px solid rgba(220,38,38,0.3)",
              borderRadius: "0.5rem",
              color: "rgba(252,165,165,1)",
            }}
          >
            {error || "Failed to load dashboard"}
          </div>
        </div>
      </AdminLayout>
    );
  }

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
            Dashboard
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            Overview of Fikr Quran Academy
          </p>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          <StatCard
            title="Total Registrations"
            value={stats.registrations.total.toString()}
            subtitle={`${stats.registrations.last7Days} this week`}
            icon={<DocumentIcon className="w-6 h-6" />}
            color="rgba(232,116,68,0.2)"
            href="/admin/registrations"
          />
          <StatCard
            title="Paid Students"
            value={stats.registrations.paid.toString()}
            subtitle={`${stats.registrations.pending} pending payment`}
            icon={<CheckIcon className="w-6 h-6" />}
            color="rgba(90,155,74,0.2)"
            href="/admin/registrations?status=paid"
          />
          <StatCard
            title="Unread Messages"
            value={stats.messages.unread.toString()}
            subtitle={`${stats.messages.total} total messages`}
            icon={<ChatIcon className="w-6 h-6" />}
            color="rgba(59,130,246,0.2)"
            href="/admin/messages"
          />
          <StatCard
            title="Published Posts"
            value={stats.blog.published.toString()}
            subtitle={`${stats.blog.drafts} drafts`}
            icon={<NewspaperIcon className="w-6 h-6" />}
            color="rgba(168,85,247,0.2)"
            href="/admin/blog"
          />
        </div>

        {/* Revenue Section */}
        {stats.revenue.length > 0 && (
          <div
            style={{
              padding: "1.5rem",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "1rem",
              marginBottom: "2rem",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.25rem",
                fontWeight: "500",
                color: "rgba(255,255,255,0.95)",
                marginBottom: "1rem",
              }}
            >
              Total Revenue
            </h2>
            <div
              style={{
                display: "flex",
                gap: "2rem",
                flexWrap: "wrap",
              }}
            >
              {stats.revenue.map((rev) => (
                <div key={rev.currency}>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "2rem",
                      fontWeight: "600",
                      color: "var(--accent)",
                    }}
                  >
                    {rev.formatted}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.875rem",
                      color: "rgba(255,255,255,0.6)",
                    }}
                  >
                    {rev.currency === "NGN" ? "Nigerian Naira" : "US Dollar"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {/* Recent Registrations */}
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
                fontFamily: "var(--font-display)",
                fontSize: "1.25rem",
                fontWeight: "500",
                color: "rgba(255,255,255,0.95)",
                marginBottom: "1rem",
              }}
            >
              Recent Registrations
            </h2>
            {stats.recentActivity.registrations.length === 0 ? (
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                No registrations yet
              </p>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {stats.recentActivity.registrations.map((reg) => (
                  <div
                    key={reg.id}
                    style={{
                      padding: "1rem",
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: "0.5rem",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "start",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.875rem",
                            fontWeight: "600",
                            color: "rgba(255,255,255,0.9)",
                          }}
                        >
                          {reg.fullName}
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.75rem",
                            color: "rgba(255,255,255,0.6)",
                          }}
                        >
                          {reg.applicationId}
                        </div>
                      </div>
                      <StatusBadge status={reg.paymentStatus} />
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.75rem",
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      {new Date(reg.createdAt).toLocaleDateString()} •{" "}
                      {reg.country}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <a
              href="/admin/registrations"
              style={{
                display: "block",
                marginTop: "1rem",
                fontFamily: "var(--font-sans)",
                fontSize: "0.875rem",
                color: "var(--accent)",
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              View all registrations →
            </a>
          </div>

          {/* Recent Messages */}
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
                fontFamily: "var(--font-display)",
                fontSize: "1.25rem",
                fontWeight: "500",
                color: "rgba(255,255,255,0.95)",
                marginBottom: "1rem",
              }}
            >
              Recent Messages
            </h2>
            {stats.recentActivity.messages.length === 0 ? (
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                No messages yet
              </p>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {stats.recentActivity.messages.map((msg) => (
                  <div
                    key={msg.id}
                    style={{
                      padding: "1rem",
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: "0.5rem",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "start",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.875rem",
                          fontWeight: "600",
                          color: "rgba(255,255,255,0.9)",
                        }}
                      >
                        {msg.name}
                      </div>
                      {msg.status === "UNREAD" && (
                        <div
                          style={{
                            width: "8px",
                            height: "8px",
                            background: "var(--accent)",
                            borderRadius: "50%",
                          }}
                        />
                      )}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.8125rem",
                        color: "rgba(255,255,255,0.7)",
                        marginBottom: "0.5rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {msg.message}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.75rem",
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <a
              href="/admin/messages"
              style={{
                display: "block",
                marginTop: "1rem",
                fontFamily: "var(--font-sans)",
                fontSize: "0.875rem",
                color: "var(--accent)",
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              View all messages →
            </a>
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

function StatCard({
  title,
  value,
  subtitle,
  icon,
  color,
  href,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: ReactNode;
  color: string;
  href: string;
}) {
  return (
    <a
      href={href}
      style={{
        padding: "1.5rem",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "1rem",
        textDecoration: "none",
        transition: "all 0.2s",
        display: "block",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.08)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.05)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          background: color,
          borderRadius: "0.75rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1rem",
          color: "rgba(255,255,255,0.9)",
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "2rem",
          fontWeight: "600",
          color: "rgba(255,255,255,0.95)",
          marginBottom: "0.25rem",
        }}
      >
        {value}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.875rem",
          color: "rgba(255,255,255,0.8)",
          marginBottom: "0.25rem",
        }}
      >
        {title}
      </p>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.75rem",
          color: "rgba(255,255,255,0.5)",
        }}
      >
        {subtitle}
      </p>
    </a>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    PAID: { bg: "rgba(90,155,74,0.2)", text: "rgba(134,239,172,1)" },
    PENDING: { bg: "rgba(251,191,36,0.2)", text: "rgba(253,224,71,1)" },
    PROCESSING: { bg: "rgba(59,130,246,0.2)", text: "rgba(147,197,253,1)" },
    FAILED: { bg: "rgba(220,38,38,0.2)", text: "rgba(252,165,165,1)" },
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
      }}
    >
      {status}
    </span>
  );
}
