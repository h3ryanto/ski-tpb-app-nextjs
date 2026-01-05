import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { Barang, Entitas, Header } from "@prisma/client";
import { DialogClose } from "./dialog";
import { formatCurrency } from "@/utils/currency";
import { useState, useEffect } from "react";

const TabsBarang = ({ posts }: { posts: Header | Entitas }) => {
  const [postsBarang, setPostsBarang] = useState<any[]>([]);
  const filterBarang = (value: string) => {
    if ("barang" in posts) {
      if (Array.isArray(posts.barang)) {
        setPostsBarang(
          posts.barang.filter(
            (e) =>
              e.uraian.toUpperCase().includes(value.toUpperCase()) ||
              e.kode_barang.toUpperCase().includes(value.toUpperCase()) ||
              e.tipe.toUpperCase().includes(value.toUpperCase())
          )
        );
      }
    }
  };

  useEffect(() => {
    if ("barang" in posts) {
      // setPostsBarang(posts.barang as any[]);
      const barangArray = posts.barang as Barang[];
      const ascbarang = barangArray.sort(
        (a, b) => Number(a.seri_barang) - Number(b.seri_barang)
      );
      setPostsBarang(ascbarang as any[]);
    }
  }, [posts]);
  return (
    <Card className=" overflow-y-auto w-full h-[75vh]">
      <CardHeader className="bg-slate-200 h-10 p-2 px-10">
        <div className="font-semibold">Barang</div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm my-1 ">
        <div className="p-3">
          <div>
            <input
              type="text"
              placeholder="Search.."
              className="border border-gray-300 rounded-md px-2 py-1 text-sm placeholder:text-gray-400"
              onChange={(e) => filterBarang(e.target.value)}
            />
          </div>
          <div className="overflow-y-auto h-[55vh] w-auto my-3">
            <table className="table-auto">
              <thead className="border border-slate-300 bg-slate-200 sticky -top-1">
                <tr>
                  <td className="p-2">#</td>
                  <td className="p-2">HS Code</td>
                  <td className="p-2">Kode Barang</td>
                  <td className="p-2">Uraian</td>
                  <td className="p-2">Type</td>
                  <td className="p-2">Jumlah</td>
                  <td className="p-2">Satuan</td>
                  <td className="p-2">FOB</td>
                  <td className="p-2">CIF</td>
                  <td className="p-2">Penyerahan</td>
                </tr>
              </thead>
              <tbody>
                {postsBarang.map(
                  (barang: any & { valuta: string; header: Header }, index) => (
                    <tr key={barang.id} className="border-x border-b">
                      <td className="p-2">{index + 1}.</td>
                      <td className="p-2">{barang.hs}</td>
                      <td className="p-2">{barang.kode_barang}</td>
                      <td className="p-2">{barang.uraian}</td>
                      <td className="p-2">{barang.tipe}</td>
                      <td className="p-2">
                        {barang.jumlah_satuan
                          ? barang.jumlah_satuan.toString()
                          : 0}
                      </td>
                      <td className="p-2">{barang.kode_satuan}</td>
                      <td className="p-2">
                        {formatCurrency(
                          Number(barang.fob) || 0,
                          ("header" in barang
                            ? barang.header.kode_valuta
                            : barang.kode_valuta) || "IDR"
                        )}
                      </td>
                      <td className="p-2">
                        {formatCurrency(
                          Number(barang.cif) || 0,
                          ("header" in barang
                            ? barang.header.kode_valuta
                            : barang.kode_valuta) || "IDR"
                        )}
                      </td>
                      <td className="p-2">
                        {formatCurrency(
                          Number(barang.harga_penyerahan) || 0,
                          "IDR"
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <DialogClose asChild>
          {/* <Button variant="outline">Cancel</Button> */}
        </DialogClose>
      </CardFooter>
    </Card>
  );
};
export default TabsBarang;
