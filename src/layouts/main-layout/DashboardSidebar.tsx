import { protectedRoutes } from "@/routes/protected";
import {NavLink} from "react-router";
import GbeseIcon from "@/assets/icons/gbese-logo.svg"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { LogOutIcon } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function DashboardSidebar() {
    const { signOut } = useAuth();
    const { setOpenMobile } = useSidebar();

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
                        .filter(item => item.showInSidebar)
                        .map((item) => (
                        <SidebarMenuItem
                            key={item.path}
                            className="text-white hover:bg-white hover:rounded-md"
                        >
                            <NavLink to={`/${item.path}`}>
                            {({ isActive }) => (
                                <SidebarMenuButton
                                asChild
                                isActive={isActive}
                                className="px-6 py-4 h-14"
                                onClick={() => setOpenMobile(false)}
                                >
                                <div>
                                    {item.icon && <item.icon />}
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
    
        <SidebarFooter>
            <button 
                title="Log out" 
                className="flex flex-row items-center gap-2 text-gbese-white px-6 pb-4 text-sm"
                onClick={signOut}
            >
                <LogOutIcon className="text-gbese-white" size={20}/>
                Log out
            </button>
        </SidebarFooter>
    </Sidebar>
  );
}
