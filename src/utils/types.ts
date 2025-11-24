export interface User {
  id: string;
  email: string;
  fullName?: string;
  kycStatus?: string;
  twoFactorRequired?: boolean;
  verificationRequired?: boolean;
  verificationMethods?: string[];
}

export interface DashboardCardProps{
  icon: string;
  title: string;
  amount: string;
  href: string;
}