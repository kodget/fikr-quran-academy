"use client";

import { useAdminAuth } from "@/lib/useAdminAuth";
import { ReactNode } from "react";
import {
  ChartIcon,
  DocumentIcon,
  MailIcon,
  UserIcon,
} from "@/components/AdminIcons";
interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { admin, isLoading, logout } = useAdminAuth(true);

  // Show loading state
  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "var(--primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "64px",
            height: "64px",
            border: "4px solid rgba(232,116,68,0.3)",
            borderTopColor: "var(--accent)",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
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

  // If not authenticated, useAdminAuth will redirect to login
  if (!admin) {
    return null;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--primary)",
        display: "flex",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: "280px",
          background: "rgba(255,255,255,0.05)",
          borderRight: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Logo / Header */}
        <div
          style={{
            padding: "2rem",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: "300",
              color: "rgba(255,255,255,0.95)",
              marginBottom: "0.5rem",
            }}
          >
            Fikr Admin
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            {admin.name}
          </p>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: "1.5rem" }}>
          <NavLink href="/admin/dashboard" icon={<ChartIcon />}>
            Dashboard
          </NavLink>
          <NavLink href="/admin/registrations" icon={<DocumentIcon />}>
            Registrations
          </NavLink>
          <NavLink href="/admin/messages" icon={<MailIcon />}>
            Messages
          </NavLink>
          <NavLink href="/admin/testimonials" icon={<UserIcon />}>
            Testimonials
          </NavLink>
          <NavLink href="/admin/blog" icon={<DocumentIcon />}>
            Blog
          </NavLink>
          <NavLink href="/admin/email" icon={<MailIcon />}>
            Email System
          </NavLink>
        </nav>

        {/* Logout Button */}
        <div
          style={{
            padding: "1.5rem",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <button
            onClick={logout}
            style={{
              width: "100%",
              padding: "0.75rem",
              background: "rgba(220,38,38,0.1)",
              border: "1px solid rgba(220,38,38,0.3)",
              borderRadius: "0.5rem",
              color: "rgba(252,165,165,1)",
              fontFamily: "var(--font-sans)",
              fontSize: "0.875rem",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(220,38,38,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(220,38,38,0.1)";
            }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, overflow: "auto" }}>{children}</main>
    </div>
  );
}

function NavLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  const isActive =
    typeof window !== "undefined" && window.location.pathname === href;

  return (
    <a
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0.75rem 1rem",
        marginBottom: "0.5rem",
        background: isActive
          ? "rgba(232,116,68,0.1)"
          : "rgba(255,255,255,0.03)",
        border: `1px solid ${isActive ? "rgba(232,116,68,0.3)" : "transparent"}`,
        borderRadius: "0.5rem",
        color: isActive ? "var(--accent)" : "rgba(255,255,255,0.7)",
        fontFamily: "var(--font-sans)",
        fontSize: "0.875rem",
        fontWeight: isActive ? "600" : "500",
        textDecoration: "none",
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = "rgba(255,255,255,0.07)";
          e.currentTarget.style.color = "rgba(255,255,255,0.9)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = "rgba(255,255,255,0.03)";
          e.currentTarget.style.color = "rgba(255,255,255,0.7)";
        }
      }}
    >
      <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>
      <span>{children}</span>
    </a>
  );
}
