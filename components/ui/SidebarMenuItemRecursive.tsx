"use client";

import { Menu } from "@/contexts/MenuContext";
import { clsx } from "clsx";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { iconMap } from "@/utils/icon-map";

function isActive(pathname: string, menu: Menu): boolean {
  if (menu.path && pathname === menu.path) return true;

  if (menu.children) {
    return menu.children.some((child) => isActive(pathname, child));
  }

  return false;
}

export function SidebarMenuItemRecursive({ menu }: { menu: Menu }) {
  const Icon = iconMap[menu.icon] || null;
  const pathname = usePathname();
  const active = isActive(pathname, menu);
  const hasChildren = menu.children && menu.children.length > 0;

  // ❌ tidak boleh render menu tanpa view permission
  if (!menu.actions?.includes("view")) return null;

  // ✅ MENU DENGAN SUBMENU
  if (hasChildren) {
    return (
      <Collapsible defaultOpen={active}>
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton className={active ? "bg-muted" : ""}>
              {Icon && <Icon className="mr-2 h-4 w-4" />}
              <span>{menu.name}</span>
              <ChevronDown
                className={`ml-auto transition-transform ${
                  active ? "rotate-180" : ""
                }`}
              />
            </SidebarMenuButton>
          </CollapsibleTrigger>

          <CollapsibleContent>
            {/* 🔥 PENTING: SUBMENU HARUS <SidebarMenu> */}
            <SidebarMenu className="ml-4 border-l pl-2">
              {menu.children!.map((child) => (
                <SidebarMenuItemRecursive key={child.menu_id} menu={child} />
              ))}
            </SidebarMenu>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }

  // ✅ MENU TANPA SUBMENU
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link
          href={menu.path}
          className={clsx(
            active && "bg-gray-900 text-white",
            "rounded-md px-3 py-2 text-sm font-medium"
          )}
        >
          {Icon && <Icon className="mr-2 h-4 w-4" />}
          <span>{menu.name}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
