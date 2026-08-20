"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { authFetch } from "@/lib/useAdminAuth";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  author: string;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    author: "",
    published: false,
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await authFetch("/api/admin/blog");
      const data = await response.json();

      if (data.success) {
        setPosts(data.data.posts);
      } else {
        setError(data.message || "Failed to load blog posts");
      }
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      setError("Failed to load blog posts");
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: editingId ? formData.slug : generateSlug(title),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingId ? `/api/admin/blog/${editingId}` : "/api/admin/blog";
      const method = editingId ? "PATCH" : "POST";

      const response = await authFetch(url, {
        method,
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        await fetchPosts();
        resetForm();
        alert(editingId ? "Blog post updated!" : "Blog post created!");
      } else {
        alert(data.message || "Failed to save blog post");
      }
    } catch (err) {
      console.error("Failed to save post:", err);
      alert("Failed to save blog post");
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage || "",
      author: post.author,
      published: post.published,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const response = await authFetch(`/api/admin/blog/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        await fetchPosts();
        alert("Blog post deleted!");
      } else {
        alert(data.message || "Failed to delete blog post");
      }
    } catch (err) {
      console.error("Failed to delete post:", err);
      alert("Failed to delete blog post");
    }
  };

  const togglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const response = await authFetch(`/api/admin/blog/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ published: !currentStatus }),
      });

      const data = await response.json();

      if (data.success) {
        setPosts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, published: !currentStatus } : p))
        );
      }
    } catch (err) {
      console.error("Failed to toggle published:", err);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      coverImage: "",
      author: "",
      published: false,
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <AdminLayout>
      <div style={{ padding: "2rem" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
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
              Blog Posts
            </h1>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1rem",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              Create and manage blog content
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
            {showForm ? "Cancel" : "+ New Post"}
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
              {editingId ? "Edit Post" : "New Post"}
            </h2>
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
            >
              <input
                type="text"
                placeholder="Post Title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                required
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="Slug (URL-friendly)"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
                style={inputStyle}
              />
              <textarea
                placeholder="Excerpt (short summary)"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                required
                rows={3}
                style={{ ...inputStyle, resize: "vertical" }}
              />
              <textarea
                placeholder="Content (HTML supported)"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
                rows={12}
                style={{ ...inputStyle, resize: "vertical", fontFamily: "monospace" }}
              />
              <input
                type="url"
                placeholder="Cover Image URL (optional)"
                value={formData.coverImage}
                onChange={(e) =>
                  setFormData({ ...formData, coverImage: e.target.value })
                }
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="Author Name"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                required
                style={inputStyle}
              />
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) =>
                    setFormData({ ...formData, published: e.target.checked })
                  }
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
                  {editingId ? "Update" : "Create"} Post
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

        {/* Posts List */}
        {!isLoading && posts.length === 0 && (
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
              No blog posts yet. Create your first one!
            </p>
          </div>
        )}

        {!isLoading && posts.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {posts.map((post) => (
              <div
                key={post.id}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "1rem",
                  padding: "1.5rem",
                  display: "flex",
                  gap: "1.5rem",
                }}
              >
                {post.coverImage && (
                  <div
                    style={{
                      width: "200px",
                      height: "120px",
                      flexShrink: 0,
                      background: `url(${post.coverImage}) center/cover`,
                      backgroundColor: "rgba(255,255,255,0.1)",
                      borderRadius: "0.5rem",
                    }}
                  />
                )}
                <div style={{ flex: 1 }}>
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
                        fontFamily: "var(--font-display)",
                        fontSize: "1.5rem",
                        fontWeight: "400",
                        color: "rgba(255,255,255,0.95)",
                      }}
                    >
                      {post.title}
                    </h3>
                    <button
                      onClick={() => togglePublished(post.id, post.published)}
                      style={{
                        padding: "0.25rem 0.75rem",
                        background: post.published
                          ? "rgba(90,155,74,0.2)"
                          : "rgba(156,163,175,0.2)",
                        color: post.published
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
                      {post.published ? "Published" : "Draft"}
                    </button>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.875rem",
                      color: "rgba(255,255,255,0.7)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {post.excerpt}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.8125rem",
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      By {post.author}
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.3)" }}>•</span>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.8125rem",
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.3)" }}>•</span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: "0.75rem",
                        color: "rgba(255,255,255,0.4)",
                      }}
                    >
                      /{post.slug}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      onClick={() => handleEdit(post)}
                      style={{
                        padding: "0.5rem 1rem",
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
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: "0.5rem 1rem",
                        background: "rgba(90,155,74,0.2)",
                        border: "1px solid rgba(90,155,74,0.3)",
                        borderRadius: "0.5rem",
                        color: "rgba(134,239,172,1)",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.875rem",
                        textDecoration: "none",
                        display: "inline-block",
                      }}
                    >
                      View
                    </a>
                    <button
                      onClick={() => handleDelete(post.id)}
                      style={{
                        padding: "0.5rem 1rem",
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
