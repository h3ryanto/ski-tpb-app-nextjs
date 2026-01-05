"use client";

import { useSession } from "next-auth/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Menu = {
  menu_id: number;
  name: string;
  path: string;
  icon: string;
  actions: string[];
  sort_order: number;
  children?: Menu[];
};

type MenuContextType = {
  menus: Menu[];
  loading: boolean;
  refresh: () => Promise<void>;
};

const MenuContext = createContext<MenuContextType>({
  menus: [],
  loading: true,
  refresh: async () => {},
});

export const useMenu = () => useContext(MenuContext);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);
  const session = useSession();

  const getMenus = useCallback(async () => {
    if (session.data) {
      try {
        setLoading(true);
        const res = await fetch("/api/get-menus", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // kalau pakai JWT:
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) {
          console.error("Failed to fetch menus:", res.status);
          setMenus([]);
          return;
        }

        const result = await res.json();

        const menusData = Array.isArray(result)
          ? result
          : Array.isArray(result.data)
            ? result.data
            : [];

        if (menusData.length === 0) {
          console.error("Menu API invalid shape:", result);
        }

        const menusArray = menusData as Menu[];
        const ascMenus = menusArray.sort(
          (a, b) => Number(a.sort_order) - Number(b.sort_order)
        );
        setMenus(ascMenus);
        // console.log("Fetched menus:", ascMenus);
      } catch (err) {
        console.error("Error fetching menus:", err);
        setMenus([]);
      } finally {
        setLoading(false);
      }
    }
  }, [session.data]);

  useEffect(() => {
    getMenus();
  }, [getMenus]);

  return (
    <MenuContext.Provider value={{ menus, loading, refresh: getMenus }}>
      {children}
    </MenuContext.Provider>
  );
}
