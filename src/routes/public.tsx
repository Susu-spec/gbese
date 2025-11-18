import KYCPage from "@/pages/auth/kyc";
import SignInPage from "@/pages/auth/sign-in";
import SignUpPage from "@/pages/auth/sign-up";

export const authRoutes = [
    { path: "/sign-in", element: <SignInPage /> },
    { path: "/sign-up", element: <SignUpPage /> },
]

export const kycRoutes = [
    { path: "/kyc", element: <KYCPage /> }
]