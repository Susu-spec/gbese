import AuthLayout from "@/layouts/AuthLayout";
import { createBrowserRouter, Navigate } from "react-router";
import { authRoutes, kycRoutes } from "./public";
import MainLayout from "@/layouts/MainLayout";
import { protectedRoutes } from "./protected";
import KYCLayout from "@/layouts/KYCLayout";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthLayout />,
        children: authRoutes
    },
    {
        path: "/",
        element: <KYCLayout />,
        children: kycRoutes
    },
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <MainLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="/dashboard" replace />,
            },
            ...protectedRoutes
        ]
    }
])