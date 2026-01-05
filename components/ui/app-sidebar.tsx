"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";

import { useMenu } from "@/contexts/MenuContext";
import { CloseTrigger } from "./close-trigger-sidebar";
import { NavUser } from "./nav-user";
import { SidebarMenuItemRecursive } from "./SidebarMenuItemRecursive";

export function AppSidebar() {
  const router = useRouter();
  const session = useSession();
  const { menus, loading } = useMenu();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/login");
    }
  }, [session.status, router]);

  if (!session.data) return null;
  // console.log("Menus in Sidebar:", menus)
  if (loading) return <div>Loading menu...</div>;
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />

      <SidebarContent>
        <div className="grid items-center justify-end px-4 md:hidden">
          <CloseTrigger />
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menus.map((menu) => (
                <SidebarMenuItemRecursive key={menu.menu_id} menu={menu} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={{
            name: session.data.user?.name || "",
            email: session.data.user?.email || "",
            avatar: session.data.user?.image || "",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
