"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { authFetch } from "@/lib/useAdminAuth";
import { MailIcon, MoneyIcon, MegaphoneIcon } from "@/components/AdminIcons";

interface EmailLog {
  id: string;
  sender: string;
  recipientType: string;
  recipient: string;
  subject: string;
  body: string;
  status: string;
  errorMessage: string | null;
  sentAt: string | null;
  createdAt: string;
}

export default function AdminEmailPage() {
  const [logs, setLogs] = useState<EmailLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    recipientType: "all-registered" as
      | "all-registered"
      | "all-paid"
      | "individual",
    recipient: "",
    subject: "",
    body: "",
  });

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setIsLoading(true);
      const response = await authFetch("/api/admin/email?limit=50");
      const data = await response.json();

      if (data.success) {
        setLogs(data.data.logs);
      } else {
        setError(data.message || "Failed to load email logs");
      }
    } catch (err) {
      console.error("Failed to fetch logs:", err);
      setError("Failed to load email logs");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setError(null);

    try {
      const response = await authFetch("/api/admin/email", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert(
          `Email sent successfully!\n\nSent: ${data.data.sent}\nFailed: ${data.data.failed}`,
        );
        // Reset form
        setFormData({
          recipientType: "all-registered",
          recipient: "",
          subject: "",
          body: "",
        });
        // Refresh logs
        await fetchLogs();
      } else {
        setError(data.message || "Failed to send email");
      }
    } catch (err) {
      console.error("Failed to send email:", err);
      setError("Failed to send email");
    } finally {
      setIsSending(false);
    }
  };

  const loadTemplate = (
    template: "welcome" | "payment-reminder" | "announcement",
  ) => {
    const templates = {
      welcome: {
        subject: "Welcome to Fikr Quran Academy!",
        body: `Dear Student,

Assalamu Alaikum wa Rahmatullahi wa Barakatuh!

Welcome to Fikr Quran Academy. We are delighted to have you join our learning community.

Your journey to mastering the Quran begins now. Our dedicated instructors are committed to providing you with the highest quality education in Quranic studies.

If you have any questions, please don't hesitate to reach out to us.

May Allah bless your learning journey.

Best regards,
Fikr Quran Academy Team`,
      },
      "payment-reminder": {
        subject: "Payment Reminder - Fikr Quran Academy",
        body: `Dear Student,

Assalamu Alaikum,

This is a friendly reminder regarding your pending payment for your enrollment at Fikr Quran Academy.

To continue your classes without interruption, please complete your payment at your earliest convenience.

If you've already made the payment, please disregard this message.

For any questions or assistance, feel free to contact us.

JazakAllahu Khairan,
Fikr Quran Academy Team`,
      },
      announcement: {
        subject: "Important Announcement from Fikr Quran Academy",
        body: `Dear Students,

Assalamu Alaikum wa Rahmatullahi wa Barakatuh!

We have an important announcement to share with you.

[Please add your announcement details here]

Thank you for your attention.

Best regards,
Fikr Quran Academy Team`,
      },
    };

    const selectedTemplate = templates[template];
    setFormData({
      ...formData,
      subject: selectedTemplate.subject,
      body: selectedTemplate.body,
    });
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
            Email Communication
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            Send emails to students and view email history
          </p>
        </div>

        {/* Email Form */}
        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "1rem",
            padding: "2rem",
            marginBottom: "2rem",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: "300",
              color: "rgba(255,255,255,0.95)",
              marginBottom: "1.5rem",
            }}
          >
            Compose Email
          </h2>

          {/* Template Buttons */}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              marginBottom: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={() => loadTemplate("welcome")}
              style={templateButtonStyle}
              className="flex items-center gap-2"
            >
              <MailIcon className="w-4 h-4" /> Welcome Email
            </button>
            <button
              type="button"
              onClick={() => loadTemplate("payment-reminder")}
              style={templateButtonStyle}
              className="flex items-center gap-2"
            >
              <MoneyIcon className="w-4 h-4" /> Payment Reminder
            </button>
            <button
              type="button"
              onClick={() => loadTemplate("announcement")}
              style={templateButtonStyle}
              className="flex items-center gap-2"
            >
              <MegaphoneIcon className="w-4 h-4" /> Announcement
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {/* Recipient Type */}
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "rgba(255,255,255,0.9)",
                  marginBottom: "0.5rem",
                }}
              >
                Recipients
              </label>
              <select
                value={formData.recipientType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    recipientType: e.target.value as any,
                    recipient: "",
                  })
                }
                style={inputStyle}
              >
                <option value="all-registered">All Registered Students</option>
                <option value="all-paid">All Paid Students</option>
                <option value="individual">Individual Student</option>
              </select>
            </div>

            {/* Individual Recipient Email */}
            {formData.recipientType === "individual" && (
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "rgba(255,255,255,0.9)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Recipient Email
                </label>
                <input
                  type="email"
                  placeholder="student@example.com"
                  value={formData.recipient}
                  onChange={(e) =>
                    setFormData({ ...formData, recipient: e.target.value })
                  }
                  required={formData.recipientType === "individual"}
                  style={inputStyle}
                />
              </div>
            )}

            {/* Subject */}
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "rgba(255,255,255,0.9)",
                  marginBottom: "0.5rem",
                }}
              >
                Subject
              </label>
              <input
                type="text"
                placeholder="Email subject"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                required
                style={inputStyle}
              />
            </div>

            {/* Body */}
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "rgba(255,255,255,0.9)",
                  marginBottom: "0.5rem",
                }}
              >
                Message
              </label>
              <textarea
                placeholder="Email body"
                value={formData.body}
                onChange={(e) =>
                  setFormData({ ...formData, body: e.target.value })
                }
                required
                rows={12}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>

            {/* Error Display */}
            {error && (
              <div
                style={{
                  padding: "1rem",
                  background: "rgba(220,38,38,0.1)",
                  border: "1px solid rgba(220,38,38,0.3)",
                  borderRadius: "0.5rem",
                  color: "rgba(252,165,165,1)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.875rem",
                }}
              >
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSending}
              style={{
                padding: "0.875rem 1.5rem",
                background: isSending
                  ? "rgba(232,116,68,0.5)"
                  : "var(--accent)",
                border: "none",
                borderRadius: "0.5rem",
                color: "#1A1A18",
                fontFamily: "var(--font-sans)",
                fontSize: "0.875rem",
                fontWeight: "600",
                cursor: isSending ? "not-allowed" : "pointer",
                alignSelf: "flex-start",
              }}
            >
              {isSending ? "Sending..." : "Send Email"}
            </button>
          </form>
        </div>

        {/* Email Logs */}
        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "1rem",
            padding: "2rem",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: "300",
              color: "rgba(255,255,255,0.95)",
              marginBottom: "1.5rem",
            }}
          >
            Recent Email History
          </h2>

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

          {!isLoading && logs.length === 0 && (
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.875rem",
                color: "rgba(255,255,255,0.6)",
                textAlign: "center",
                padding: "2rem",
              }}
            >
              No emails sent yet
            </p>
          )}

          {!isLoading && logs.length > 0 && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {logs.map((log) => (
                <div
                  key={log.id}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "0.75rem",
                    padding: "1.25rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "start",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "1rem",
                        fontWeight: "600",
                        color: "rgba(255,255,255,0.95)",
                      }}
                    >
                      {log.subject}
                    </h3>
                    <span
                      style={{
                        padding: "0.25rem 0.75rem",
                        background:
                          log.status === "SENT"
                            ? "rgba(90,155,74,0.2)"
                            : "rgba(220,38,38,0.2)",
                        color:
                          log.status === "SENT"
                            ? "rgba(134,239,172,1)"
                            : "rgba(252,165,165,1)",
                        border: "none",
                        borderRadius: "9999px",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.75rem",
                        fontWeight: "600",
                      }}
                    >
                      {log.status}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "1rem",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.8125rem",
                        color: "rgba(255,255,255,0.6)",
                      }}
                    >
                      To: <strong>{log.recipient}</strong>
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.3)" }}>•</span>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.8125rem",
                        color: "rgba(255,255,255,0.6)",
                      }}
                    >
                      Type: {log.recipientType.replace("-", " ")}
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.3)" }}>•</span>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.8125rem",
                        color: "rgba(255,255,255,0.6)",
                      }}
                    >
                      {new Date(log.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.875rem",
                      color: "rgba(255,255,255,0.7)",
                      whiteSpace: "pre-wrap",
                      maxHeight: "100px",
                      overflow: "hidden",
                    }}
                  >
                    {log.body.substring(0, 200)}
                    {log.body.length > 200 && "..."}
                  </p>
                  {log.errorMessage && (
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.8125rem",
                        color: "rgba(252,165,165,1)",
                        marginTop: "0.5rem",
                      }}
                    >
                      Error: {log.errorMessage}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
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

const inputStyle: React.CSSProperties = {
  padding: "0.75rem 1rem",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: "0.5rem",
  color: "rgba(255,255,255,0.9)",
  fontFamily: "var(--font-sans)",
  fontSize: "0.875rem",
  width: "100%",
};

const templateButtonStyle: React.CSSProperties = {
  padding: "0.5rem 1rem",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: "0.5rem",
  color: "rgba(255,255,255,0.8)",
  fontFamily: "var(--font-sans)",
  fontSize: "0.8125rem",
  cursor: "pointer",
};
