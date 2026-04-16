"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type AuthUser = {
  id: number;
  username: string;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
};

type AuthContextValue = AuthState & {
  isAuthenticated: boolean;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
};

const STORAGE_KEY_TOKEN = "sapuk_auth_token";
const STORAGE_KEY_USER = "sapuk_auth_user";

const AuthContext = createContext<AuthContextValue | null>(null);

function readStored(): { user: AuthUser | null; token: string | null } {
  if (typeof window === "undefined") return { user: null, token: null };
  try {
    const token = localStorage.getItem(STORAGE_KEY_TOKEN);
    const userRaw = localStorage.getItem(STORAGE_KEY_USER);
    const user = userRaw ? (JSON.parse(userRaw) as AuthUser) : null;
    return { token, user };
  } catch {
    return { user: null, token: null };
  }
}

function clearStored() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    localStorage.removeItem(STORAGE_KEY_USER);
  } catch {
    // ignore
  }
}

function writeStored(user: AuthUser, token: string) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_TOKEN, token);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
  } catch {
    // ignore
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
  });

  useEffect(() => {
    const { user, token } = readStored();
    setState((prev) => ({
      ...prev,
      user,
      token,
      isLoading: false,
    }));
  }, []);

  const login = useCallback((user: AuthUser, token: string) => {
    writeStored(user, token);
    setState({ user, token, isLoading: false });
  }, []);

  const logout = useCallback(() => {
    clearStored();
    setState({ user: null, token: null, isLoading: false });
  }, []);

  const value: AuthContextValue = {
    ...state,
    isAuthenticated: !!state.user && !!state.token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (ctx == null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
