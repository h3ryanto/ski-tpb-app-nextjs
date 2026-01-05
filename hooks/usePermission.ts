"use client";

import { usePathname } from "next/navigation";
import { useMenu } from "@/contexts/MenuContext";
import { findMenuByPath } from "@/lib/menu-utils";

export function usePermission() {
  const { menus, loading } = useMenu();
  const pathname = usePathname();

  const can = (action: string): boolean => {
    if (loading) return false;

    const menu = findMenuByPath(menus, pathname);
    if (!menu) return false;

    return menu.actions?.includes(action) ?? false;
  };

  return {
    can,
    loading,
  };
}
