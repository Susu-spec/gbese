import { protectedRoutes } from "@/routes/protected"
import { Link, useLocation } from "react-router"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


export function DashboardSidebar() {
    const location = useLocation();

    return (
        <Sidebar className="z-40">
            <SidebarHeader className="mb-4 text-white">Gbese</SidebarHeader>
            <SidebarContent className="max-w-62 hide-scrollbar overflow-y-auto ">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu  className="gap-2" >
                            {protectedRoutes
                                .filter(item => item.path !== "profile" && item.path !== "notifications")
                                .map((item) => {
                                    const active = location.pathname === `/${item.path}`;
                                    return(
                                        <SidebarMenuItem key={item.path} className="text-white hover:bg-white hover:rounded-md  ">
                                                <SidebarMenuButton asChild isActive={active} className="px-6 py-4 h-14 ">
                                                    <Link to={`/${item.path}`}>
                                                        <item.icon />
                                                        <span >{item.label}</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                }
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}