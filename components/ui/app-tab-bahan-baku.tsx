import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import type { Bahan_Baku, Entitas, Header } from "@prisma/client";
import { DialogClose } from "./dialog";
import { formatCurrency } from "@/utils/currency";
import { useState, useEffect } from "react";



const TabsBahanBaku = ({ posts }: { posts: Header | Entitas | Bahan_Baku }) => {
    // console.log(posts)
    const [postsBahanBaku, setPostsBahanBaku] = useState<any[]>([]);
    const filterBarang = (value: string) => {
        if ('bahan_baku' in posts) {
            if (Array.isArray(posts.bahan_baku)) {
                setPostsBahanBaku((posts.bahan_baku.filter(e => (e.uraian.toUpperCase().includes(value.toUpperCase()) || e.kode_barang.toUpperCase().includes(value.toUpperCase()) || e.tipe.toUpperCase().includes(value.toUpperCase())))));
            }
        }
    }

    useEffect(() => {
        if ('bahan_baku' in posts) {
            // setPostsBahanBaku(posts.bahan_baku as any[]);
            const bahanBakuArray = posts.bahan_baku as Bahan_Baku[];
            const ascBahanBaku = bahanBakuArray.sort((a, b) => {
                if (a.seri_barang !== b.seri_barang) {
                    return Number(a.seri_barang) - Number(b.seri_barang);
                }
                return Number(a.seri_bahan_baku) - Number(b.seri_bahan_baku);
            });
            setPostsBahanBaku(ascBahanBaku as any[]);
        }

    }, [posts])

    return (
        <Card className=' overflow-y-auto w-full h-[75vh]'>
            <CardHeader className="bg-slate-200 h-10 p-2 px-10">
                <div className="font-semibold">Barang</div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm my-1 ">
                <div className="p-3">
                    <div>
                        <input type="text"
                            placeholder="Search.."
                            className="border border-gray-300 rounded-md px-2 py-1 text-sm placeholder:text-gray-400"
                            onChange={(e) => filterBarang(e.target.value)}
                        />
                    </div>
                    <div className="overflow-y-auto h-[55vh] w-auto my-3">
                        <table className="table-auto">
                            <thead className="border border-slate-300 bg-slate-200 sticky -top-1">
                                <tr>
                                    <td className="p-2">Seri Barang</td>
                                    <td className="p-2">Seri Bahan Baku</td>
                                    <td className="p-2">HS Code</td>
                                    <td className="p-2">Kode Barang</td>
                                    <td className="p-2">Uraian</td>
                                    <td className="p-2">Type</td>
                                    <td className="p-2">Jumlah</td>
                                    <td className="p-2">Satuan</td>
                                    {/* <td className="p-2">FOB</td> */}
                                    <td className="p-2">CIF</td>
                                    <td className="p-2">Penyerahan</td>
                                </tr>
                            </thead>
                            <tbody>
                                {postsBahanBaku.map((bahanBaku: Bahan_Baku & { valuta: string, header: Header }) => (
                                    <tr key={bahanBaku.id} className="border-x border-b">
                                        <td className="p-2">{bahanBaku.seri_barang}</td>
                                        <td className="p-2">{bahanBaku.seri_bahan_baku}</td>
                                        <td className="p-2">{bahanBaku.hs}</td>
                                        <td className="p-2">{bahanBaku.kode_barang}</td>
                                        <td className="p-2">{bahanBaku.uraian}</td>
                                        <td className="p-2">{bahanBaku.tipe}</td>
                                        <td className="p-2">{bahanBaku.jumlah_satuan ? bahanBaku.jumlah_satuan.toString() : 0}</td>
                                        <td className="p-2">{bahanBaku.kode_satuan}</td>
                                        {/* <td className="p-2">{formatCurrency(Number(bahanBaku.) || 0, bahanBaku.header.kode_valuta || 'IDR')}</td> */}
                                        <td className="p-2">{formatCurrency(Number(bahanBaku.cif) || 0, bahanBaku.header.kode_valuta || 'IDR')}</td>
                                        <td className="p-2">{formatCurrency(Number(bahanBaku.harga_penyerahan) || 0, 'IDR')}</td>
                                    </tr>
                                ))}
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
    )
}
export default TabsBahanBaku;