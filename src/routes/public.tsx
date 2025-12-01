import KycGuard from "@/layouts/kyc-layout/KycGuard";
import IdentityDocument from "@/pages/auth/kyc/identity-document";
import PersonalInfo from "@/pages/auth/kyc/personal-info";
import SignInPage from "@/pages/auth/sign-in";
import SignUpPage from "@/pages/auth/sign-up";

export const authRoutes = [
    { path: "/sign-in", element: <SignInPage /> },
    { path: "/sign-up", element: <SignUpPage /> },
]

export const kycRoutes = [
    { 
        path: "/kyc/personal-info", 
        element: (
            <KycGuard requiredStep={1}>
                <PersonalInfo />
            </KycGuard>
    )},
    { 
        path: "/kyc/upload-document", 
        element: (
            <KycGuard requiredStep={2}>
                <IdentityDocument />
            </KycGuard>
        )
    }
]