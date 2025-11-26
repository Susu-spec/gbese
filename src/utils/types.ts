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