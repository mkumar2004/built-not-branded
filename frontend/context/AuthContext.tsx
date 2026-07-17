"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { AuthSession, AuthRole } from "../lib/api/auth";

type AuthUser = Record<string, unknown> | null;

type AuthContextValue = {
  user: AuthUser;
  session: AuthSession | null;
  role: AuthRole | null;
  setSession: (session: AuthSession, user: AuthUser, role: AuthRole) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function setCookie(name: string, value: string, days = 7) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; samesite=lax`;
}

function clearCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser>(null);
  const [session, setCurrentSession] = useState<AuthSession | null>(null);
  const [role, setRole] = useState<AuthRole | null>(null);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      role,
      setSession: (nextSession, nextUser, nextRole) => {
        setCurrentSession(nextSession);
        setUser(nextUser);
        setRole(nextRole);
        setCookie("sf_token", nextSession.access_token);
        setCookie("sf_role", nextRole);
      },
      logout: () => {
        setCurrentSession(null);
        setUser(null);
        setRole(null);
        clearCookie("sf_token");
        clearCookie("sf_role");
      },
    }),
    [role, session, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider.");
  return context;
}