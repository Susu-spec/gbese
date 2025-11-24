import Sidebar from "@/layouts/auth-layout/Sidebar";
import { Outlet } from "react-router";

export default function AuthLayout() {
    return (
        <div className="flex min-h-screen overflow-y-auto">
            <Sidebar />
            <main className="w-full flex-1">
                <div className="mx-6 md:mx-auto md:max-w-142 py-15.75">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}