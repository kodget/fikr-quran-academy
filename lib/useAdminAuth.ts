/**
 * Admin Authentication Hook
 * Client-side hook for managing admin authentication state
 */

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AdminUser {
  id: string;
  email: string;
  name: string;
}

interface UseAdminAuthReturn {
  admin: AdminUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export function useAdminAuth(redirectIfNotAuth = false): UseAdminAuthReturn {
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        setAdmin(null);
        setIsLoading(false);
        if (redirectIfNotAuth) {
          router.push("/admin/login");
        }
        return;
      }

      // Verify token with backend
      const response = await fetch("/api/admin/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        // Token is invalid or expired
        localStorage.removeItem("adminToken");
        setAdmin(null);
        setIsLoading(false);
        if (redirectIfNotAuth) {
          router.push("/admin/login");
        }
        return;
      }

      const data = await response.json();

      if (data.success && data.data.admin) {
        setAdmin(data.data.admin);
      } else {
        setAdmin(null);
        localStorage.removeItem("adminToken");
        if (redirectIfNotAuth) {
          router.push("/admin/login");
        }
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setAdmin(null);
      localStorage.removeItem("adminToken");
      if (redirectIfNotAuth) {
        router.push("/admin/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setAdmin(null);
    router.push("/admin/login");
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    admin,
    isLoading,
    isAuthenticated: admin !== null,
    logout,
    checkAuth,
  };
}

/**
 * Get admin token from localStorage
 */
export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("adminToken");
}

/**
 * Create authorized fetch headers with admin token
 */
export function getAuthHeaders(): HeadersInit {
  const token = getAdminToken();
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

/**
 * Authorized fetch wrapper for admin API calls
 */
export async function authFetch(url: string, options: RequestInit = {}) {
  const token = getAdminToken();

  if (!token) {
    throw new Error("No authentication token found");
  }

  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
}
