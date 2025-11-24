import { Outlet } from "react-router"
import { SidebarProvider} from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/layouts/main-layout/DashboardSidebar"
import Header from "@/layouts/main-layout/Header"

export default function MainLayout() {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main className="w-full bg-gbese-background p-8 overscroll-auto hide-scrollbar">
                <Header/>
                <div className="pt-14">
                    <Outlet/>
                </div>
                
            </main>
        </SidebarProvider>
  )
}