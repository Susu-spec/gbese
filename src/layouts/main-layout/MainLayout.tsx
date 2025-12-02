import { Outlet } from "react-router"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/layouts/main-layout/DashboardSidebar"
import Header from "@/layouts/main-layout/Header"
import { useAccountBalance } from "@/features/main/account/hooks"
import ScrollToTop from "./ScrollToTop"

export default function MainLayout() {
    // Warm and sync account balance globally for protected area
    useAccountBalance();
    return (
        <SidebarProvider defaultOpen={true}>
            <DashboardSidebar />
            <main className="w-full bg-gbese-main-background overscroll-auto hide-scrollbar">
                <ScrollToTop />
                <Header />
                <div className="mx-auto max-w-7xl mt-30 md:mt-32 mb-10 px-6">
                    <Outlet />
                </div>
            </main>
        </SidebarProvider>
  )
}