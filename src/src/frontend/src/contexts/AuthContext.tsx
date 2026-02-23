import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useActor } from "../hooks/useActor";
import { UserRole } from "../backend";

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { identity, isInitializing } = useInternetIdentity();
  const { actor, isFetching } = useActor();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const checkAuth = useCallback(async () => {
    if (!actor || !identity) {
      setIsAdmin(false);
      return;
    }

    try {
      setIsChecking(true);
      const role = await actor.getCallerUserRole();
      setIsAdmin(role === UserRole.admin);
    } catch (error) {
      console.error("Failed to check auth:", error);
      setIsAdmin(false);
    } finally {
      setIsChecking(false);
    }
  }, [actor, identity]);

  useEffect(() => {
    void checkAuth();
  }, [checkAuth]);

  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();
  const isLoading = isInitializing || isFetching || isChecking;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdmin,
        isLoading,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
