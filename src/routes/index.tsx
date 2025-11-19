import AuthLayout from "@/layouts/AuthLayout";
import { createBrowserRouter, Navigate } from "react-router";
import { authRoutes, kycRoutes } from "./public";
import MainLayout from "@/layouts/MainLayout";
import { protectedRoutes } from "./protected";
import KYCLayout from "@/layouts/KYCLayout";
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