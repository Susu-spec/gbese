import { protectedRoutes } from "@/routes/protected";
import {NavLink} from "react-router";
import GbeseIcon from "/icons/gbese-logo.svg"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function DashboardSidebar() {

  return (
    <Sidebar className="z-40">
        <SidebarHeader className="mb-4 text-white ">
            <div className=" flex items-center gap-4 p-2">
                <img src={GbeseIcon} alt="Gbese Logo" />
                <h2 className="text-lg">Gbese</h2>
            </div>
        </SidebarHeader>
        <SidebarContent className="max-w-62 hide-scrollbar overflow-y-auto ">
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu className="gap-2">
                    {protectedRoutes
                        .filter(
                        (item) =>
                            item.path !== "profile" && item.path !== "notifications"
                        )
                        .map((item) => (
                        <SidebarMenuItem
                            key={item.path}
                            className="text-white hover:bg-white hover:rounded-md"
                        >
                            <NavLink to={`/${item.path}`} end>
                            {({ isActive }) => (
                                <SidebarMenuButton
                                asChild
                                isActive={isActive}
                                className="px-6 py-4 h-14"
                                >
                                <div>
                                    <item.icon />
                                    <span>{item.label}</span>
                                </div>
                                </SidebarMenuButton>
                            )}
                            </NavLink>
                        </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    </Sidebar>
  );
}
