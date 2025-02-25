import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import type { Entitas, Header } from "@prisma/client";
import { DialogClose } from "./dialog";
import { formatCurrency } from "@/utils/currency";

const TabsTransaksi = ({ posts }: { posts: Header & Entitas & { ftanggal_daftar: string } }) => {
    // console.log(posts)
    return (
        <Card className=' overflow-y-auto w-full h-[75vh]'>
            <CardHeader className="bg-slate-200 h-10 p-2 px-10">
                <div className="font-semibold">Transaksi</div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm my-1 ">
                <div className="p-3">
                    <table className="table-auto ml-4 ">
                        <tbody>
                            <tr>
                                <td className="w-auto">Inconterm</td>
                                <td className="px-1">:</td>
                                <td>{posts.kode_incoterm ? posts.kode_incoterm : '-'}</td>
                            </tr>
                            <tr>
                                <td>Valuta</td>
                                <td className="px-1">:</td>
                                <td>{posts.kode_valuta ? posts.kode_valuta : '-'}</td>
                            </tr>
                            <tr>
                                <td>NDPBM</td>
                                <td className="px-1">:</td>
                                <td>{formatCurrency(Number(posts.ndpbm) || 0, 'IDR')}</td>
                            </tr>
                            <tr>
                                <td>FOB</td>
                                <td className="px-1">:</td>
                                <td>{formatCurrency(Number(posts.ndpbm) || 0, posts.kode_valuta || 'IDR')}</td>
                            </tr>
                            <tr>
                                <td>Asuransi</td>
                                <td className="px-1">:</td>
                                <td>{formatCurrency(Number(posts.asuransi) || 0, posts.kode_valuta || 'IDR')}</td>
                            </tr>
                            <tr>
                                <td>Freight</td>
                                <td className="px-1">:</td>
                                <td>{formatCurrency(Number(posts.freight) || 0, posts.kode_valuta || 'IDR')}</td>
                            </tr>
                            <tr>
                                <td>CIF</td>
                                <td className="px-1">:</td>
                                <td>{formatCurrency(Number(posts.cif) || 0, posts.kode_valuta || 'IDR')}</td>
                            </tr>
                            <tr>
                                <td>Harga Penyerahan</td>
                                <td className="px-1">:</td>
                                <td>{formatCurrency(Number(posts.harga_penyerahan) || 0, 'IDR')}</td>
                            </tr>
                            <tr>
                                <td>Harga Pengurangan / Diskon</td>
                                <td className="px-1">:</td>
                                <td>{formatCurrency(Number(posts.biaya_pengurang) || 0, 'IDR')}</td>
                            </tr>
                            <tr>
                                <td>Harga Tambahan</td>
                                <td className="px-1">:</td>
                                <td>{formatCurrency(Number(posts.biaya_tambahan) || 0, 'IDR')}</td>
                            </tr>
                        </tbody>
                    </table>
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
export default TabsTransaksi;