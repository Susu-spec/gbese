import type { User } from "@/utils/types";

export interface AuthHeaderProps {
  title: string;
  subtitle?: string;
  linkText: string;
  linkTo: string;
}

export interface SignUpPayload {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    phone_number: string
}

export interface SignUpResponse {
  user: User;
  token: string;
}

export interface SignInResponse {
  success: boolean;
  data: {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
    user: {
      id: string;
      email: string;
      full_name: string;
      kyc_status: string;
      two_factor_required: boolean;
    };
  };
}

export interface SignInPayload {
  email: string;
  password: string;
}