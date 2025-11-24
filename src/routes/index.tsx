import AuthLayout from "@/layouts/auth-layout/AuthLayout";
import { createBrowserRouter, Navigate } from "react-router";
import { authRoutes, kycRoutes } from "./public";
import MainLayout from "@/layouts/main-layout/MainLayout";
import { protectedRoutes } from "./protected";
import KYCLayout from "@/layouts/kyc-layout/KYCLayout";
import ProtectedRoute from "./ProtectedRoute";
import LandingPage from "@/pages/landing";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />
    },
    {
        element: <AuthLayout />,
        children: authRoutes
    },
    {
        element: <KYCLayout />,
        children: kycRoutes
    },
    {
        element: (
            <ProtectedRoute>
                <MainLayout />
            </ProtectedRoute>
        ),
        children: protectedRoutes
    },
    {
        path: "*",
        element: <Navigate to="/" replace />,
    },
])