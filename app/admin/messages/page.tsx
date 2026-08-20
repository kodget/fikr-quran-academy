"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { authFetch } from "@/lib/useAdminAuth";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  status: string;
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

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null,
  );

  useEffect(() => {
    fetchMessages();
  }, [statusFilter, currentPage]);

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "20",
        ...(statusFilter !== "all" && { status: statusFilter }),
        ...(searchQuery && { search: searchQuery }),
      });

      const response = await authFetch(`/api/admin/messages?${params}`);
      const data = await response.json();

      if (data.success) {
        setMessages(data.data.messages);
        setPagination(data.data.pagination);
      } else {
        setError(data.message || "Failed to load messages");
      }
    } catch (err) {
      console.error("Failed to fetch messages:", err);
      setError("Failed to load messages");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchMessages();
  };

  const handleMessageClick = async (message: ContactMessage) => {
    setSelectedMessage(message);

    // Mark as read if unread
    if (message.status === "UNREAD") {
      try {
        await authFetch(`/api/admin/messages/${message.id}`);
        // Update local state
        setMessages((prev) =>
          prev.map((m) => (m.id === message.id ? { ...m, status: "READ" } : m)),
        );
      } catch (err) {
        console.error("Failed to mark as read:", err);
      }
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const response = await authFetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (data.success) {
        // Update local state
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m)),
        );
        if (selectedMessage?.id === id) {
          setSelectedMessage({ ...selectedMessage, status: newStatus });
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update message status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const response = await authFetch(`/api/admin/messages/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (selectedMessage?.id === id) {
          setSelectedMessage(null);
        }
      }
    } catch (err) {
      console.error("Failed to delete message:", err);
      alert("Failed to delete message");
    }
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
            Contact Messages
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            View and manage user inquiries
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
            <option value="all">All Messages</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="archived">Archived</option>
          </select>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            style={{ flex: 1, display: "flex", gap: "0.5rem" }}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or message..."
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

        {/* Messages List */}
        {!isLoading && messages.length === 0 && (
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
              No messages found
            </p>
          </div>
        )}

        {!isLoading && messages.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.5fr",
              gap: "2rem",
            }}
          >
            {/* Messages List */}
            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "1rem",
                overflow: "hidden",
                maxHeight: "70vh",
                overflowY: "auto",
              }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => handleMessageClick(msg)}
                  style={{
                    padding: "1rem",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    cursor: "pointer",
                    background:
                      selectedMessage?.id === msg.id
                        ? "rgba(255,255,255,0.08)"
                        : "transparent",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (selectedMessage?.id !== msg.id) {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.03)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedMessage?.id !== msg.id) {
                      e.currentTarget.style.background = "transparent";
                    }
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
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
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
                      <StatusBadge status={msg.status} />
                    </div>
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

            {/* Message Detail */}
            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "1rem",
                padding: "2rem",
              }}
            >
              {selectedMessage ? (
                <>
                  <div style={{ marginBottom: "2rem" }}>
                    <h2
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.5rem",
                        fontWeight: "300",
                        color: "rgba(255,255,255,0.95)",
                        marginBottom: "1rem",
                      }}
                    >
                      {selectedMessage.name}
                    </h2>
                    <div
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.875rem",
                        color: "rgba(255,255,255,0.7)",
                        marginBottom: "0.5rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      Email: {selectedMessage.email}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.75rem",
                        color: "rgba(255,255,255,0.5)",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      Date:{" "}
                      {new Date(selectedMessage.createdAt).toLocaleString()}
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "1.5rem",
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: "0.5rem",
                      marginBottom: "2rem",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.9375rem",
                        color: "rgba(255,255,255,0.9)",
                        lineHeight: 1.6,
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {selectedMessage.message}
                    </p>
                  </div>

                  {/* Actions */}
                  <div
                    style={{
                      display: "flex",
                      gap: "0.75rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      onClick={() =>
                        handleStatusUpdate(selectedMessage.id, "ARCHIVED")
                      }
                      disabled={selectedMessage.status === "ARCHIVED"}
                      style={{
                        padding: "0.75rem 1.5rem",
                        background: "rgba(156,163,175,0.2)",
                        border: "1px solid rgba(156,163,175,0.3)",
                        borderRadius: "0.5rem",
                        color: "rgba(209,213,219,1)",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        cursor:
                          selectedMessage.status === "ARCHIVED"
                            ? "not-allowed"
                            : "pointer",
                        opacity:
                          selectedMessage.status === "ARCHIVED" ? 0.5 : 1,
                      }}
                    >
                      Archive
                    </button>
                    <button
                      onClick={() =>
                        handleStatusUpdate(selectedMessage.id, "UNREAD")
                      }
                      disabled={selectedMessage.status === "UNREAD"}
                      style={{
                        padding: "0.75rem 1.5rem",
                        background: "rgba(59,130,246,0.2)",
                        border: "1px solid rgba(59,130,246,0.3)",
                        borderRadius: "0.5rem",
                        color: "rgba(147,197,253,1)",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        cursor:
                          selectedMessage.status === "UNREAD"
                            ? "not-allowed"
                            : "pointer",
                        opacity: selectedMessage.status === "UNREAD" ? 0.5 : 1,
                      }}
                    >
                      Mark Unread
                    </button>
                    <button
                      onClick={() => handleDelete(selectedMessage.id)}
                      style={{
                        padding: "0.75rem 1.5rem",
                        background: "rgba(220,38,38,0.2)",
                        border: "1px solid rgba(220,38,38,0.3)",
                        borderRadius: "0.5rem",
                        color: "rgba(252,165,165,1)",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </>
              ) : (
                <div style={{ textAlign: "center", padding: "3rem" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "1rem",
                      color: "rgba(255,255,255,0.6)",
                    }}
                  >
                    Select a message to view details
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

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

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    UNREAD: { bg: "rgba(59,130,246,0.2)", text: "rgba(147,197,253,1)" },
    READ: { bg: "rgba(90,155,74,0.2)", text: "rgba(134,239,172,1)" },
    ARCHIVED: { bg: "rgba(156,163,175,0.2)", text: "rgba(209,213,219,1)" },
  };

  const color = colors[status] || colors.UNREAD;

  return (
    <span
      style={{
        padding: "0.125rem 0.5rem",
        background: color.bg,
        color: color.text,
        borderRadius: "9999px",
        fontFamily: "var(--font-sans)",
        fontSize: "0.6875rem",
        fontWeight: "600",
        display: "inline-block",
        textTransform: "uppercase",
      }}
    >
      {status}
    </span>
  );
}
