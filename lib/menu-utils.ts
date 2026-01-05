import { Menu } from "@/contexts/MenuContext";

export function findMenuByPath(
  menus: Menu[],
  pathname: string
): Menu | null {
  for (const menu of menus) {
    if (menu.path === pathname) {
      return menu;
    }

    if (menu.children?.length) {
      const found = findMenuByPath(menu.children, pathname);
      if (found) return found;
    }
  }

  return null;
}
