import { Outlet } from "react-router"
import { SidebarProvider} from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/layouts/main-layout/DashboardSidebar"
import Header from "@/layouts/main-layout/Header"
import { useAccountBalance } from "@/features/main/account/hooks"

export default function MainLayout() {
    // Warm and sync account balance globally for protected area
    useAccountBalance();
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main className="w-full bg-gbese-main-background overscroll-auto hide-scrollbar">
                <Header />
                <div className="md:mx-auto max-w-360 mt-26 mb-10 px-6">
                    <Outlet />
                </div>
            </main>
        </SidebarProvider>
  )
}