import React, { createContext, useContext, useState, useCallback } from "react";

export interface AuthContextType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  userRole: string;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

// ── helpers ───────────────────────────────────────────────────────────────────
function loadAuth() {
  try {
    const raw = localStorage.getItem("te_auth");
    if (!raw) return { isLoggedIn: false, user: null };
    return JSON.parse(raw) as { isLoggedIn: boolean; user: any };
  } catch {
    return { isLoggedIn: false, user: null };
  }
}

function saveAuth(isLoggedIn: boolean, user: any) {
  try {
    localStorage.setItem("te_auth", JSON.stringify({ isLoggedIn, user }));
  } catch {}
}

function clearAuth() {
  try {
    localStorage.removeItem("te_auth");
  } catch {}
}

// ── provider ──────────────────────────────────────────────────────────────────
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const saved = loadAuth();
  const [user, setUserState] = useState<any>(saved.user);
  const [isLoggedIn, setIsLoggedInState] = useState<boolean>(saved.isLoggedIn);

  const userRole = user?.role ?? "";

  const setUser: React.Dispatch<React.SetStateAction<any>> = (value) => {
    setUserState((prev: any) => {
      const next = typeof value === "function" ? value(prev) : value;
      // persist whenever user changes (isLoggedIn state is source of truth for that)
      saveAuth(isLoggedIn, next);
      return next;
    });
  };

  const setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>> = (value) => {
    setIsLoggedInState((prev) => {
      const next = typeof value === "function" ? value(prev) : value;
      saveAuth(next, user);
      return next;
    });
  };

  const handleLogout = useCallback(() => {
    setIsLoggedInState(false);
    setUserState(null);
    clearAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn, userRole, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
