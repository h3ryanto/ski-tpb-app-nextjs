import { Menu } from "@/contexts/MenuContext";

export function can(
  menus: Menu[],
  pathname: string,
  action: string
): boolean {
  const find = (items: Menu[]): Menu | null => {
    for (const m of items) {
      if (m.path === pathname) return m;
      if (m.children) {
        const f = find(m.children);
        if (f) return f;
      }
    }
    return null;
  };

  const menu = find(menus);
  return !!menu?.actions?.includes(action);
}
