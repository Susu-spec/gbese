import { Outlet } from "react-router"
import { SidebarProvider} from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/layouts/main-layout/DashboardSidebar"
import Header from "@/layouts/main-layout/Header"

export default function MainLayout() {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main className="w-full bg-gbese-background overscroll-auto hide-scrollbar">
                <Header />
                <div className="md:mx-auto max-w-360 mt-26 mb-10 px-6">
                    <Outlet />
                </div>
            </main>
        </SidebarProvider>
  )
}