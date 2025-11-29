import { Outlet } from "react-router";
import KYCSidebar from "./Sidebar";

export default function KYCLayout() {
    return (
        <div className="flex min-h-screen overflow-y-auto">
            <KYCSidebar />
            <main className="w-full flex-1">
                <div className="mx-6 md:mx-auto md:max-w-142 py-15.75">
                    <div className="bg-gbese-white py-10 px-15 rounded-4xl">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    )
}