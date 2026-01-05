import AppTooltip from "@/components/ui/app-tool-tip";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Description } from "@radix-ui/react-dialog";
import {
  DownloadCloud,
  FlaskConical,
  InboxIcon,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import AddBom from "./app-add-bom";
import { ImportDataExcell } from "./app-import-excel";
import UpdateBom from "./app-update-bom";
import { usePermission } from "@/hooks/usePermission";

export function AppBom({
  post,
  reload,
}: {
  post: any;
  reload: () => Promise<void>;
}) {
  const [bom, setBom] = useState<any[]>([]);
  const { toast } = useToast();
  const { can } = usePermission();

  const filterBarang = (value: any) => {
    if (post && "bom" in post) {
      if (Array.isArray(post.bom)) {
        setBom(
          post.bom.filter(
            (e: { nama_barang: string; kode_barang: string; type: string }) =>
              e.nama_barang.toUpperCase().includes(value.toUpperCase()) ||
              e.kode_barang.toUpperCase().includes(value.toUpperCase()) ||
              e.type.toUpperCase().includes(value.toUpperCase())
          )
        );
      }
    }
  };
  const deleteData = async (id: number) => {
    const confirmDelete = window.confirm(
      "Apakah kamu yakin ingin menghapus data ini?"
    );
    if (!confirmDelete) return;
    const result = await fetch("/api/delete-bom", {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await result.json();
    if (res.message === "success") {
      toast({
        title: "Delete Data Berhasil",
        description: "Data berhasil dihapus",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Gagal Tambah User",
        description: res.message,
      });
    }
    await reload();
  };

  useEffect(() => {
    if (post && "bom" in post) {
      const barangArray = post.bom as any[];
      const ascbarang = barangArray.sort(
        (a, b) => Number(a.kode_barang) - Number(b.kode_barang)
      );
      setBom(ascbarang as any[]);
    }
  }, [post]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <FlaskConical
          size={18}
          className="cursor-pointer stroke-slate-500 hover:stroke-blue-500"
        />
      </DialogTrigger>
      <Description></Description>
      <DialogContent className="max-w-screen-lg bg-slate-50">
        <DialogHeader className="flex flex-col gap-5">
          <DialogTitle>
            BOM: {post.type} - {post.nama_barang} - {post.kode_barang}
          </DialogTitle>
          <div className="flex flex-row justify-items-center justify-between">
            <div className="flex flex-row gap-3">
              {can("create") && (
                <AddBom
                  onAddDataSuccess={reload}
                  kode_barang_jadi={post.kode_barang}
                />
              )}
              <input
                type="text"
                placeholder="Search.."
                className="border border-gray-300 rounded-md px-2 py-1 text-sm placeholder:text-gray-400"
                onChange={(e) => filterBarang(e.target.value)}
              />
            </div>
            {can("import_excel") && (
              <div className="flex flex-row gap-2">
                <Link
                  href={"/draf-excel/draf.xlsx"}
                  className="flex flex-row gap-2 border border-black rounded-md items-center p-2 bg-inherit hover:bg-black hover:text-white"
                >
                  <DownloadCloud size={16} />
                  Download Draf Excel
                </Link>
                <ImportDataExcell saveUrl="/api/save-bom" reload={reload} />
              </div>
            )}
          </div>
        </DialogHeader>
        <div className="w-auto h-[70vh] overflow-auto">
          <table className="table-auto hidden md:table w-full text-left">
            <thead className="top-10 ">
              <tr className="border-b-2 border-y-slate-400 sticky -top-1 bg-slate-100">
                <th scope="col" className="align-top p-2">
                  <div className="pt-2">No.</div>
                </th>
                <th scope="col" className="p-2">
                  <div>Kode barang</div>
                </th>
                <th scope="col" className="p-2">
                  <div>Kode Barang Jadi</div>
                </th>
                <th scope="col" className="p-2">
                  <div>Uraian</div>
                </th>
                <th scope="col" className="p-2">
                  <div className="mb-3">Type</div>
                </th>
                <th scope="col" className="p-2">
                  <div className="mb-3">Jumlah</div>
                </th>
                <th scope="col" className="p-2">
                  <div className="mb-3">Satuan</div>
                </th>
                <th scope="col" className="p-2">
                  <div className="mb-3"></div>
                </th>
              </tr>
            </thead>
            <tbody>
              {(bom.length > 0 &&
                bom.map((post: any, index: number) => (
                  <tr key={index} className=" hover:bg-slate-100/65">
                    <td className="p-2">{index + 1}.</td>
                    <td className="p-2">{post.kode_barang}</td>
                    <td className="p-2">{post.kode_barang_jadi}</td>
                    <td className="p-2">{post.nama_barang}</td>
                    <td className="p-2">{post.type}</td>
                    <td className="p-2">{post.qty}</td>
                    <td className="p-2">{post.satuan}</td>
                    <td className="p-2 flex gap-2">
                      {can("update") && (
                        <AppTooltip title="Update BOM" sideAlign="left">
                          <UpdateBom onUpdateDataSuccess={reload} data={post} />
                        </AppTooltip>
                      )}

                      {can("delete") && (
                        <AppTooltip title="Hapus BOM" sideAlign="left">
                          <Trash2Icon
                            size={16}
                            className="cursor-pointer stroke-slate-500 hover:stroke-red-500"
                            onClick={() => deleteData(post.id)}
                          />
                        </AppTooltip>
                      )}
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
        </div>
        <DialogFooter className="justify-end text-sm pt-3">
          <DialogClose asChild>
            <Button size={"sm"}>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
