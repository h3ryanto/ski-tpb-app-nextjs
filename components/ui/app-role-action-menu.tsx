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
import { Shield } from "lucide-react";
import { useState } from "react";
import { Button } from "./button";

type Menus = {
  menu_id: number;
  nama_menu: string;
  action: any[];
  // tambahkan properti lain sesuai kebutuhan
};
const AppRoleActionMenus = ({
  menusActions,
  user,
}: {
  menusActions: any;
  user: string;
}) => {
  const [open, setOpen] = useState(false);
  // const [userRole, setUserRole] = useState<string>("");
  // setUserRole(user);
  const menusActionsArray = menusActions as Menus[];
  const ascMenusActions = menusActionsArray.sort(
    (a, b) => Number(a.menu_id) - Number(b.menu_id)
  );
  console.log(user);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size={"sm"} onClick={() => setOpen(true)}>
            <Shield />
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
            {ascMenusActions &&
              ascMenusActions.length > 0 &&
              ascMenusActions.map((menus: any, index: number) => (
                <div
                  key={index}
                  className="space-x-2 border-b border-slate-300 pb-2"
                >
                  <div className="flex flex-col">
                    <div>
                      <span className="font-medium">{menus.nama_menu}</span>
                    </div>
                    <div className="pl-2">
                      {menus.action.map((action: any, index: number) => (
                        <label
                          key={index}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            id={action.id}
                            type="checkbox"
                            checked={action.is_active}
                            readOnly
                            // onChange={() => handleToggle(menus.menu_id, action.id)}
                          />
                          <span>{action.description}</span>
                        </label>
                      ))}
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
