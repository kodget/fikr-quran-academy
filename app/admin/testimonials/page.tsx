"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { authFetch } from "@/lib/useAdminAuth";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  country: string;
  text: string;
  rating: number;
  image: string | null;
  published: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    country: "",
    text: "",
    rating: 5,
    image: "",
    published: false,
    order: 0,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setIsLoading(true);
      const response = await authFetch("/api/admin/testimonials");
      const data = await response.json();

      if (data.success) {
        setTestimonials(data.data.testimonials);
      } else {
        setError(data.message || "Failed to load testimonials");
      }
    } catch (err) {
      console.error("Failed to fetch testimonials:", err);
      setError("Failed to load testimonials");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingId
        ? `/api/admin/testimonials/${editingId}`
        : "/api/admin/testimonials";
      const method = editingId ? "PATCH" : "POST";

      const response = await authFetch(url, {
        method,
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        await fetchTestimonials();
        resetForm();
        alert(editingId ? "Testimonial updated!" : "Testimonial created!");
      } else {
        alert(data.message || "Failed to save testimonial");
      }
    } catch (err) {
      console.error("Failed to save testimonial:", err);
      alert("Failed to save testimonial");
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      country: testimonial.country,
      text: testimonial.text,
      rating: testimonial.rating,
      image: testimonial.image || "",
      published: testimonial.published,
      order: testimonial.order,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const response = await authFetch(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        await fetchTestimonials();
        alert("Testimonial deleted!");
      } else {
        alert(data.message || "Failed to delete testimonial");
      }
    } catch (err) {
      console.error("Failed to delete testimonial:", err);
      alert("Failed to delete testimonial");
    }
  };

  const togglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const response = await authFetch(`/api/admin/testimonials/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ published: !currentStatus }),
      });

      const data = await response.json();

      if (data.success) {
        setTestimonials((prev) =>
          prev.map((t) =>
            t.id === id ? { ...t, published: !currentStatus } : t
          )
        );
      }
    } catch (err) {
      console.error("Failed to toggle published:", err);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      country: "",
      text: "",
      rating: 5,
      image: "",
      published: false,
      order: 0,
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <AdminLayout>
      <div style={{ padding: "2rem" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2.5rem",
                fontWeight: "300",
                color: "rgba(255,255,255,0.95)",
                marginBottom: "0.5rem",
              }}
            >
              Testimonials
            </h1>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1rem",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              Manage student testimonials
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              padding: "0.875rem 1.5rem",
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
            {showForm ? "Cancel" : "+ Add Testimonial"}
          </button>
        </div>

        {/* Form */}
        {showForm && (
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
              {editingId ? "Edit Testimonial" : "New Testimonial"}
            </h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  style={inputStyle}
                />
                <input
                  type="text"
                  placeholder="Role (e.g., Student, Parent)"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                  style={inputStyle}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                <input
                  type="text"
                  placeholder="Country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  required
                  style={inputStyle}
                />
                <input
                  type="number"
                  placeholder="Rating (1-5)"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                  required
                  style={inputStyle}
                />
                <input
                  type="number"
                  placeholder="Display Order"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  style={inputStyle}
                />
              </div>
              <textarea
                placeholder="Testimonial text"
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                required
                rows={4}
                style={{ ...inputStyle, resize: "vertical" }}
              />
              <input
                type="url"
                placeholder="Image URL (optional)"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                style={inputStyle}
              />
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.9)" }}>
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  style={{ width: "20px", height: "20px" }}
                />
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem" }}>
                  Publish immediately
                </span>
              </label>
              <div style={{ display: "flex", gap: "1rem" }}>
                <button
                  type="submit"
                  style={{
                    padding: "0.875rem 1.5rem",
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
                  {editingId ? "Update" : "Create"} Testimonial
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    style={{
                      padding: "0.875rem 1.5rem",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "0.5rem",
                      color: "rgba(255,255,255,0.9)",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.875rem",
                      cursor: "pointer",
                    }}
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

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

        {/* Testimonials Grid */}
        {!isLoading && testimonials.length === 0 && (
          <div
            style={{
              padding: "3rem",
              textAlign: "center",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "1rem",
            }}
          >
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", color: "rgba(255,255,255,0.6)" }}>
              No testimonials yet. Create your first one!
            </p>
          </div>
        )}

        {!isLoading && testimonials.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "1rem",
                  padding: "1.5rem",
                  position: "relative",
                }}
              >
                {/* Published Badge */}
                <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
                  <button
                    onClick={() => togglePublished(testimonial.id, testimonial.published)}
                    style={{
                      padding: "0.25rem 0.75rem",
                      background: testimonial.published
                        ? "rgba(90,155,74,0.2)"
                        : "rgba(156,163,175,0.2)",
                      color: testimonial.published
                        ? "rgba(134,239,172,1)"
                        : "rgba(209,213,219,1)",
                      border: "none",
                      borderRadius: "9999px",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    {testimonial.published ? "Published" : "Draft"}
                  </button>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.25rem",
                      fontWeight: "500",
                      color: "rgba(255,255,255,0.95)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {testimonial.name}
                  </h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "rgba(255,255,255,0.6)" }}>
                    {testimonial.role} • {testimonial.country}
                  </p>
                  <div style={{ marginTop: "0.5rem" }}>
                    {"⭐".repeat(testimonial.rating)}
                  </div>
                </div>

                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.8)",
                    lineHeight: 1.6,
                    marginBottom: "1.5rem",
                  }}
                >
                  {testimonial.text}
                </p>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    onClick={() => handleEdit(testimonial)}
                    style={{
                      flex: 1,
                      padding: "0.5rem",
                      background: "rgba(59,130,246,0.2)",
                      border: "1px solid rgba(59,130,246,0.3)",
                      borderRadius: "0.5rem",
                      color: "rgba(147,197,253,1)",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.875rem",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial.id)}
                    style={{
                      flex: 1,
                      padding: "0.5rem",
                      background: "rgba(220,38,38,0.2)",
                      border: "1px solid rgba(220,38,38,0.3)",
                      borderRadius: "0.5rem",
                      color: "rgba(252,165,165,1)",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.875rem",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
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
