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
    <Sidebar className="z-40 max-w-73.75 flex flex-col gap-9">
        <SidebarHeader className="text-white">
            <div className="flex items-center gap-1 p-2">
                <img src={GbeseIcon} alt="Gbese Logo" className="w-8.5 h-auto"/>
                <h2 className="text-lg">Gbese</h2>
            </div>
        </SidebarHeader>

        <SidebarContent className="hide-scrollbar overflow-y-auto flex-1">
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu className="gap-2">
                        {protectedRoutes
                            .filter(r => r.showInSidebar)
                            .map(item => (
                                <SidebarMenuItem 
                                    key={item.path}
                                    className="hover:bg-white hover:rounded-md max-w-11/12"
                                >
                                    <NavLink to={`/${item.path}`}>
                                        {({ isActive }) => (
                                            <SidebarMenuButton
                                                asChild
                                                isActive={isActive}
                                                className="text-gbese-neutrals-100 px-6 py-2.5 flex gap-3 leading-6.75 h-fit"
                                                onClick={() => setOpenMobile(false)}
                                            >
                                                <span className="flex items-center gap-2">
                                                    {item.icon && <item.icon />}
                                                    <span>{item.label}</span>
                                                </span>
                                            </SidebarMenuButton>
                                        )}
                                    </NavLink>
                                </SidebarMenuItem>
                            ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        
        <SidebarFooter className="mt-auto pt-4">
            <button 
                title="Log out" 
                className="flex items-center gap-2 text-gbese-white px-3.5 pb-4 text-sm"
                onClick={signOut}
            >
                <LogOutIcon className="text-gbese-white" size={20}/>
                Log out
            </button>
        </SidebarFooter>
    </Sidebar>
  );
}
