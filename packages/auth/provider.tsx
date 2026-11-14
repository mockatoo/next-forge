import type { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
  helpUrl?: string;
  privacyUrl?: string;
  termsUrl?: string;
}

export const AuthProvider = ({ children }: AuthProviderProps) => children;
