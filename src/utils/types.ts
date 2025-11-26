import type { ElementType } from "react";

export interface User {
  id: string;
  email: string;
  fullName?: string;
  kycStatus?: string;
  twoFactorRequired?: boolean;
  verificationRequired?: boolean;
  verificationMethods?: string[];
}

export interface AuthState {
  user: User | null;
  accessToken: string;
  refreshToken: string;
  isAuthenticated: boolean;
}

export interface DashboardCardProps{
  icon: string;
  title: string;
  amount: string;
  href: string;
}

export interface AppRoute {
  path: string;
  label?: string;
  icon?: ElementType;
  showInSidebar?: boolean;
  lazy?: () => Promise<{ Component: React.ComponentType<any> }>;
  children?: AppRoute[];
}