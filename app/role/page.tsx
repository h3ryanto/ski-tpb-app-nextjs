"use client";
import PageGuard from "@/components/guards/PageGuard";
import AppLoading from "@/components/ui/app-loading";
import AppRoleActionMenus from "@/components/ui/app-role-action-menu";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { requirePermission } from "@/lib/auth/server-permission";
import Color from "@/utils/color";
import { useRouter } from "next/navigation";
import * as React from "react";

type Roles = {
  role_id: number;
  Role_name: string;
  permissions: [];
};

type Menus = {
  menu_id: number;
  nama_menu: string;
  action: any[];
  // tambahkan properti lain sesuai kebutuhan
};


export default function RolePage() {
  const [roles, setRoles] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const menuAsc = (data: any[]) => {
    const menusActionsArray = data as Menus[];
    const ascMenusActions = menusActionsArray.sort(
      (a, b) => Number(a.menu_id) - Number(b.menu_id)
    );
    return ascMenusActions;
  }

  const loadData = () => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetch("/api/get-roles", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data) {
        const posts = await data.json();

        if (posts.data) {
          const roleArray = posts.data as Roles[];
          const ascRoles = roleArray.sort(
            (a, b) => Number(a.role_id) - Number(b.role_id)
          );
          setRoles(ascRoles);
          setIsLoading(false);
        }
      }
    };
    fetchData();
  };

  React.useEffect(() => {
    requirePermission("/role").then((result) => {
      if (!result.allowed) {
        router.push("/forbidden");
      }
    });
    loadData();
  }, [router]);
  console.log("🚀 ~ file: page.tsx:62 ~ RolePage ~ roles:", roles);

  return (
    <PageGuard>
      <div className="mx-auto justify-center rounded-md font-sans text-sm p-6 pt-2 hidden md:block">
        <Card>
          <CardHeader className="pb-2">
            <h2 className="font-semibold text-lg">Role List</h2>
          </CardHeader>
          <CardContent className="overflow-y-auto h-[calc(100vh-240px)]">
            <table className="table-auto hidden md:table w-full col-span-2">
              <thead className="top-10 ">
                <tr className="border-b-2 border-y-slate-400 sticky -top-1 bg-slate-100  text-left">
                  <th scope="col" className="p-1">
                    ID
                  </th>
                  <th scope="col" className="p-1">
                    Role Name
                  </th>
                  <th scope="col" className="p-1">
                    Menu
                  </th>
                  <th scope="col" className="p-1">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role) => (
                  <tr
                    key={role.role_id}
                    className="border-b-2 border-y-slate-400"
                  >
                    <td className="p-1">{role.role_id}</td>
                    <td className="p-1">{role.role_name}</td>
                    <td className="p-1 flex flex-wrap gap-2">
                      {menuAsc(role.permissions) &&
                        menuAsc(role.permissions).length > 0 &&
                        menuAsc(role.permissions).map((item: any) => {
                          // cek apakah ada action yang aktif
                          const hasActive = item.action?.some((a: any) => a.action_id === 1 && a.is_active === true);

                          if (!hasActive) return null; // kalau tidak aktif, jangan tampilkan
                          return (
                            <span
                              key={item.menu_id}
                              className={`
              inline-flex items-center rounded-md
              bg-${Color(item.menu_id)}-50
              px-2 py-1 text-xs font-medium
              text-${Color(item.menu_id)}-700
              inset-ring inset-ring-${Color(item.menu_id)}-600/10
            `}
                            >
                              {item.nama_menu}
                            </span>
                          );
                        })}
                    </td>

                    <td className="p-1">
                      <AppRoleActionMenus
                        menusActions={role.permissions}
                        user={role.role_name}
                        refreshData={loadData}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
          <CardFooter>
            <div className="container flex justify-center mx-auto py-3 border-t-2 border-slate-400 md:border-t-0 text-slate-100 bg-slate-700 md:bg-inherit md:text-inherit">
              {/* <PaginationWithLinks page={page} pageSize={size} totalCount={totalRecord} pageSizeSelectOptions={{ pageSizeOptions: [10, 20, 50, 100] }} /> */}
            </div>
          </CardFooter>
        </Card>
      </div>
      <AppLoading isLoading={isLoading} />
    </PageGuard>
  );
}
