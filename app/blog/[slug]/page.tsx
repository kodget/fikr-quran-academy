"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  author: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.slug) {
      fetchPost();
    }
  }, [params.slug]);

  const fetchPost = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/blog/${params.slug}`);
      const data = await response.json();

      if (data.success) {
        setPost(data.data.post);
      } else {
        setError(data.message || "Blog post not found");
      }
    } catch (err) {
      console.error("Failed to fetch post:", err);
      setError("Failed to load blog post");
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
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <a
            href="/blog"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.9375rem",
              color: "rgba(255,255,255,0.7)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.7)")
            }
          >
            ← Back to Blog
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "4rem 2rem" }}>
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

        {/* Error State */}
        {error && (
          <div
            style={{
              padding: "2rem",
              background: "rgba(220,38,38,0.1)",
              border: "1px solid rgba(220,38,38,0.3)",
              borderRadius: "1rem",
              color: "rgba(252,165,165,1)",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.5rem",
                marginBottom: "0.5rem",
              }}
            >
              {error}
            </h2>
            <a
              href="/blog"
              style={{
                color: "rgba(252,165,165,1)",
                textDecoration: "underline",
              }}
            >
              Return to blog
            </a>
          </div>
        )}

        {/* Article */}
        {!isLoading && !error && post && (
          <article>
            {/* Cover Image */}
            {post.coverImage && (
              <div
                style={{
                  width: "100%",
                  height: "400px",
                  background: `url(${post.coverImage}) center/cover`,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: "1rem",
                  marginBottom: "2rem",
                }}
              />
            )}

            {/* Article Header */}
            <header style={{ marginBottom: "3rem" }}>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "3rem",
                  fontWeight: "300",
                  color: "rgba(255,255,255,0.95)",
                  marginBottom: "1rem",
                  lineHeight: 1.2,
                }}
              >
                {post.title}
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "1.125rem",
                  color: "rgba(255,255,255,0.7)",
                  marginBottom: "1.5rem",
                  lineHeight: 1.6,
                }}
              >
                {post.excerpt}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.9375rem",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  By {post.author}
                </span>
                <span style={{ color: "rgba(255,255,255,0.3)" }}>•</span>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.9375rem",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </header>

            {/* Article Content */}
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1.0625rem",
                color: "rgba(255,255,255,0.85)",
                lineHeight: 1.8,
              }}
            >
              {/* Render content as HTML with basic styling */}
              <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                style={{
                  maxWidth: "100%",
                }}
              />
            </div>

            {/* Article Footer */}
            <footer
              style={{
                marginTop: "4rem",
                paddingTop: "2rem",
                borderTop: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <a
                href="/blog"
                style={{
                  display: "inline-block",
                  padding: "0.875rem 1.75rem",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "0.5rem",
                  color: "rgba(255,255,255,0.9)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.9375rem",
                  fontWeight: "500",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.transform = "translateX(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                ← Back to all posts
              </a>
            </footer>
          </article>
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
