import IdentityDocument from "@/pages/auth/kyc/identity-document";
import PersonalInfo from "@/pages/auth/kyc/personal-info";
import ReviewSubmit from "@/pages/auth/kyc/review-submit";
import SignInPage from "@/pages/auth/sign-in";
import SignUpPage from "@/pages/auth/sign-up";

export const authRoutes = [
    { path: "/sign-in", element: <SignInPage /> },
    { path: "/sign-up", element: <SignUpPage /> },
]

export const kycRoutes = [
    { path: "/personal-info", element: <PersonalInfo /> },
    { path: "/identity-document", element: <IdentityDocument /> },
    { path: "/review-submit", element: <ReviewSubmit /> }
]