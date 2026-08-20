"use client";

import { useEffect, useState } from "react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string | null;
  author: string;
  publishedAt: string;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/blog?page=${currentPage}&limit=9`);
      const data = await response.json();

      if (data.success) {
        setPosts(data.data.posts);
        setPagination(data.data.pagination);
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

  return (
    <div style={{ minHeight: "100vh", background: "var(--primary)" }}>
      {/* Header */}
      <header
        style={{
          padding: "2rem",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <a
            href="/"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: "300",
              color: "rgba(255,255,255,0.95)",
              textDecoration: "none",
            }}
          >
            ← Fikr Quran Academy
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "3rem",
              fontWeight: "300",
              color: "rgba(255,255,255,0.95)",
              marginBottom: "1rem",
            }}
          >
            Our Blog
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "1.125rem",
              color: "rgba(255,255,255,0.7)",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Insights, tips, and guidance on Quranic studies and Islamic education
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div
            style={{
              padding: "1.5rem",
              background: "rgba(220,38,38,0.1)",
              border: "1px solid rgba(220,38,38,0.3)",
              borderRadius: "1rem",
              color: "rgba(252,165,165,1)",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            {error}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div style={{ textAlign: "center", padding: "4rem" }}>
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

        {/* Empty State */}
        {!isLoading && posts.length === 0 && (
          <div
            style={{
              padding: "4rem",
              textAlign: "center",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "1rem",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1.125rem",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              No blog posts available yet. Check back soon!
            </p>
          </div>
        )}

        {/* Blog Posts Grid */}
        {!isLoading && posts.length > 0 && (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
                gap: "2rem",
                marginBottom: "3rem",
              }}
            >
              {posts.map((post) => (
                <article
                  key={post.id}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "1rem",
                    overflow: "hidden",
                    transition: "all 0.2s",
                    cursor: "pointer",
                  }}
                  onClick={() => (window.location.href = `/blog/${post.slug}`)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  }}
                >
                  {post.coverImage && (
                    <div
                      style={{
                        width: "100%",
                        height: "200px",
                        background: `url(${post.coverImage}) center/cover`,
                        backgroundColor: "rgba(255,255,255,0.1)",
                      }}
                    />
                  )}
                  <div style={{ padding: "1.5rem" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.875rem",
                          color: "rgba(255,255,255,0.6)",
                        }}
                      >
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span style={{ color: "rgba(255,255,255,0.3)" }}>•</span>
                      <span
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.875rem",
                          color: "rgba(255,255,255,0.6)",
                        }}
                      >
                        {post.author}
                      </span>
                    </div>
                    <h2
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.5rem",
                        fontWeight: "400",
                        color: "rgba(255,255,255,0.95)",
                        marginBottom: "0.75rem",
                        lineHeight: 1.3,
                      }}
                    >
                      {post.title}
                    </h2>
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.9375rem",
                        color: "rgba(255,255,255,0.7)",
                        lineHeight: 1.6,
                        marginBottom: "1rem",
                      }}
                    >
                      {post.excerpt}
                    </p>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.875rem",
                        color: "var(--accent)",
                        fontWeight: "500",
                      }}
                    >
                      Read more →
                    </span>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: "0.75rem 1.5rem",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "0.5rem",
                    color: "rgba(255,255,255,0.9)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    opacity: currentPage === 1 ? 0.5 : 1,
                  }}
                >
                  ← Previous
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
                    padding: "0.75rem 1.5rem",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "0.5rem",
                    color: "rgba(255,255,255,0.9)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: !pagination.hasMore ? "not-allowed" : "pointer",
                    opacity: !pagination.hasMore ? 0.5 : 1,
                  }}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </main>

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
