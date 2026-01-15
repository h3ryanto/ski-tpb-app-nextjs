"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./button";
import Color from "@/utils/color";
import { Label } from "@radix-ui/react-label";
import { Switch } from "@/components/ui/switch";


type Menus = {
  menu_id: number;
  nama_menu: string;
  sort_order: number;
  is_active: boolean;
  action: any[];
  // tambahkan properti lain sesuai kebutuhan
};

type ActionsType = {
  id: number;
  role_id: number;
  description: string;
  is_active: boolean;

};



const AppRoleActionMenus = ({
  menusActions,
  user,
  refreshData
}: {
  menusActions: any[];
  user: string;
  refreshData?: () => void
}) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = React.useState<any[]>([]);

  const loadData = (menusActions: any) => {
    const menusActionsArray = menusActions as Menus[];
    const ascMenusActions = menusActionsArray.sort(
      (a, b) => Number(a.sort_order) - Number(b.sort_order)
    );
    setData(ascMenusActions)

  }


  const updateData = async (
    id: number,
    atribut: string,
    value: boolean
  ) => {
    const result = await fetch("/api/update-role-aciton", {
      method: "PUT",
      body: JSON.stringify({
        is_active: value,
        id: id,
        atribut: atribut,
        value: value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await result.json();
    if (res.data.data) {
      loadData(menusActions);
      toast({
        title: "Update Berhasil",
        description: "Data berhasil diupdate",
      });
      refreshData?.()
    }
  };


  const actionAsc = (data: any[]) => {
    const actionsArray = data as ActionsType[];
    const ascActions = actionsArray.sort(
      (a, b) => Number(a.id) - Number(b.id)
    );
    return ascActions;
  }


  React.useEffect(() => {

    loadData(menusActions);
  }, [menusActions]);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size={"sm"} onClick={() => setOpen(true)}>
            <Pencil />
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-md mx-auto top-96 bg-slate-50 text-sm">
          <DialogHeader>
            <DialogTitle className="text-lg">Role {user}</DialogTitle>
            <DialogDescription>
              Atur hak akses menu untuk role ini
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2 max-h-[60vh] overflow-y-auto">
            {data &&
              data.length > 0 &&
              data.map((menus: any, index: number) => (
                <div
                  key={index}
                  className="space-x-2 border-b border-slate-300 pb-2"
                >
                  <div className="flex flex-col">
                    <div className="flex flex-row justify-between items-center">
                      <Label htmlFor={menus.permission_id}>
                        <span
                          className={`
                        inline-flex items-center rounded-md
                        bg-${Color(index + 1)}-50
                        px-2 py-1  font-medium
                        text-sm
                        text-${Color(index + 1)}-700
                        inset-ring inset-ring-${Color(index + 1)}-600/10
                      `}
                        >
                          {menus.nama_menu}
                        </span>
                      </Label>
                      <Switch
                        id={menus.permission_id}
                        size="sm"
                        checked={menus.is_active}
                        onClick={() =>
                          updateData(menus.permission_id, "is_active", !menus.is_active)
                        }

                      />

                    </div>
                    <div className="ml-2 pl-2 gap-1 flex flex-col border-l border-slate-300">
                      {

                        actionAsc(menus.action) &&
                        actionAsc(menus.action).length > 0 &&
                        actionAsc(menus.action).map((action: any) => {
                          if (action.action_id === 1) return null; // kalau tidak aktif, jangan tampilkan
                          return (
                            <div className="flex flex-row justify-between items-center" key={action.id}>
                              <Label htmlFor={action.id} className=" text-sm">
                                <span>
                                  {action.description}
                                </span>
                              </Label>
                              <Switch
                                id={action.id}
                                size="sm"
                                checked={action.is_active}
                                onClick={() =>
                                  updateData(action.id, "is_active", !action.is_active)
                                }
                              />

                            </div>
                          )
                        })}
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <DialogFooter className="justify-end text-sm pt-3">
            <DialogClose asChild>
              <Button size={"sm"} onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppRoleActionMenus;
