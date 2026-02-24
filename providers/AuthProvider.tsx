"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getToken, removeToken } from "@/lib/auth";
import * as authApi from "@/api/endpoints/auth";
import type { CurrentUserDTO } from "@/api/types";

interface AuthContextValue {
  user: CurrentUserDTO | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  companyId: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CurrentUserDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refetchUser = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const currentUser = await authApi.getCurrentUser();
      setUser(currentUser);
    } catch {
      removeToken();
      setUser(null);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    const token = getToken();
    if (!token) {
      setIsLoading(false);
      return;
    }
    authApi
      .getCurrentUser()
      .then((currentUser) => {
        if (!cancelled) setUser(currentUser);
      })
      .catch(() => {
        if (!cancelled) {
          removeToken();
          setUser(null);
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      await authApi.login({ email, password });
      await refetchUser();
    },
    [refetchUser]
  );

  const logout = useCallback(() => {
    removeToken();
    setUser(null);
  }, []);

  const value: AuthContextValue = {
    user,
    isLoading,
    isAuthenticated: !!user,
    companyId: user?.company_id ?? null,
    login,
    logout,
    refetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
