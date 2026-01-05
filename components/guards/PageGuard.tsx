"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useMenu } from "@/contexts/MenuContext";
import { findMenuByPath } from "@/lib/menu-utils";

export default function PageGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { menus, loading } = useMenu();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const menu = findMenuByPath(menus, pathname);

    // ❌ tidak ada menu → forbidden
    if (!menu) {
      router.replace("/forbidden");
      return;
    }

    // ❌ tidak punya view action
    if (!menu.actions?.includes("view")) {
      router.replace("/forbidden");
      return;
    }
  }, [loading, menus, pathname, router]);

  if (loading) {
    return <div className="p-4 text-sm text-muted-foreground">Checking access...</div>;
  }

  return <>{children}</>;
}
