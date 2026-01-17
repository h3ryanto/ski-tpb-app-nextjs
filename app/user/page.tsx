"use client";

import PageGuard from "@/components/guards/PageGuard";
import AppSwalDelete from "@/components/ui/allert-swal-delete";
import { AppAddUsers } from "@/components/ui/app-add-users";
import AppLoading from "@/components/ui/app-loading";
import { AppRoleSelect } from "@/components/ui/app-role";
import AppTooltip from "@/components/ui/app-tool-tip";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { requirePermission } from "@/lib/auth/server-permission";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Label } from "@radix-ui/react-label";
import { ImagePlus, InboxIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const User = () => {
  const [data, setData] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const updateData = async (
    email: string,
    atribut: string,
    value: string | boolean | number
  ) => {
    const result = await fetch("/api/update-users", {
      method: "PUT",
      body: JSON.stringify({
        email: email,
        atribut: atribut,
        value: value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await result.json();
    if (res.data.data) {
      loadData();
      toast({
        title: "Update Berhasil",
        description: "Data berhasil diupdate",
      });
      loadData();
    }
  };

  const loadData = () => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetch("/api/get-users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data) {
        const posts = await data.json();
        if (posts.posts.data) {
          setData(posts.posts.data);
        }
      }
      setIsLoading(false);
    };
    fetchData();
  };

  React.useEffect(() => {
    requirePermission("/user").then((result) => {
      if (!result.allowed) {
        router.push("/forbidden");
      }
    });
    loadData();
  }, [router]);

  return (
    <PageGuard>
      <div className="mx-auto justify-center rounded-md font-sans text-sm p-6 pt-2 hidden md:block">
        <Card>
          <CardHeader className="pb-2">
            <AppAddUsers onUserAdded={loadData} />
          </CardHeader>
          <CardContent className="overflow-y-auto h-[calc(100vh-240px)]">
            <table className="table-auto hidden md:table w-full col-span-2">
              <thead className="top-10 ">
                <tr className="border-b-2 border-y-slate-400 sticky -top-1 bg-slate-100  text-left">
                  <th scope="col" className="align-top p-2">
                    <div className="pt-2">Photo</div>
                  </th>
                  <th scope="col" className="p-1">
                    <div>ID</div>
                  </th>
                  <th scope="col" className="p-1">
                    <div>User Name</div>
                  </th>
                  <th scope="col" className="p-1">
                    <div>Email</div>
                  </th>
                  <th scope="col" className="p-1">
                    <div>Role</div>
                  </th>
                  <th scope="col" className="p-1">
                    <div className="mb-3">isActive</div>
                  </th>
                  <th scope="col" className="p-1"></th>
                </tr>
              </thead>
              <tbody>
                {(data &&
                  data.map((item: any, index: number) => (
                    <tr key={index} className="border-b-2 border-y-slate-400">
                      <td className="p-1">
                        <AppTooltip title="Change Photo" sideAlign="left">
                          <Avatar className="h-8 w-8 rounded-lg  cursor-pointer">
                            <AvatarImage src={item.photo} alt={item.name} />
                            <AvatarFallback className="rounded-lg">
                              <ImagePlus />
                            </AvatarFallback>
                          </Avatar>
                        </AppTooltip>
                      </td>
                      <td className="p-1">{item.id}</td>
                      <td className="p-1">{item.name}</td>
                      <td className="p-1">{item.email}</td>
                      <td className="p-1">
                        <AppRoleSelect
                          roleId={item.roleId}
                          onChange={(roleId) =>
                            updateData(item.email, "roleId", roleId)
                          }
                        />
                      </td>

                      <td className="p-1">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="airplane-mode"
                            size={"sm"}
                            checked={item.isActive}
                            onClick={() =>
                              updateData(item.email, "isActive", !item.isActive)
                            }
                          />
                          <Label htmlFor="airplane-mode">
                            {(item.isActive && "Active") || "No Active"}
                          </Label>
                        </div>
                      </td>
                      <td className="p-1">
                        <AppTooltip title="Delete User" sideAlign="left">
                          <AppSwalDelete
                            id={item.id}
                            url={`/api/delete-users`}
                            realoadTrigger={async () => await loadData()}
                          />
                        </AppTooltip>
                      </td>
                    </tr>
                  ))) || (
                  <tr>
                    <td colSpan={7} className="text-center text-slate-700">
                      <span className="flex flex-col items-center">
                        <InboxIcon />
                        Data tidak ditemukan
                      </span>
                    </td>
                  </tr>
                )}
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
};

export default User;
