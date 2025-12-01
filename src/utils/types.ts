import type { ElementType } from "react";

export interface User {
  id: string;
  email: string;
  full_name?: string;
  kyc_status?: string;
  twoFactorRequired?: boolean;
  verificationRequired?: boolean;
  verificationMethods?: string[];
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  reputation_score?: string;
  account_status?: string;
  two_factor_enabled?: boolean;
  created_at?: string;
  last_login?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  date_of_birth?: string;
  occupation?: string;
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

export interface Country {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
  numeric_code: string;
  phone_code: string;
  capital: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  native: string;
  region: string;
  subregion: string;
  emoji: string;
  emojiU: string;
  tld: string;
  latitude: string;
  longitude: string;
  hasStates: boolean;
}

export interface State {
  id: number;
  name: string;
  state_code: string;
  latitude: string;
  longitude: string;
  hasCities: boolean;
}

export interface City {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
}