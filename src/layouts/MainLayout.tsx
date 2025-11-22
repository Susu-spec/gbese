import { Outlet } from "react-router"
import { SidebarProvider} from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/DashboardSidebar"
import Header from "@/components/header/Header"

export default function MainLayout() {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main className="w-full bg-primary-200">
                <Header/>
                <div className="pt-14">
                    <Outlet/>
                </div>
                
            </main>
        </SidebarProvider>
  )
}