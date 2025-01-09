import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import type { Header, Entitas, Barang } from "@prisma/client";
import { DialogClose } from "./dialog";
import { Button } from "./button";


const TabsBarang = ({ posts }: { posts: Header | Entitas }) => {
    // console.log(posts)
    return (
        <Card className=' overflow-y-auto w-full h-[75vh]'>

            <CardContent className="space-y-2 text-sm my-1 ">
                <div className="p-3">
                    <div className="font-semibold">Dokumen :</div>
                    <div className="overflow-y-auto h-40 w-auto">
                        <table className="table-auto ml-4">
                            <thead className="border border-slate-300 bg-slate-200 sticky top-0">
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
                                {'barang' in posts && Array.isArray(posts.barang) && posts.barang.map((barang: Barang, index) => (
                                    <tr key={barang.id} className="border-x border-b">
                                        <td className="p-2">{index + 1}.</td>
                                        <td className="p-2">{barang.hs}</td>
                                        <td className="p-2">{barang.kode_barang}</td>
                                        <td className="p-2">{barang.uraian}</td>
                                        <td className="p-2">{barang.jumlah_satuan?.toString()}</td>
                                        <td className="p-2">{barang.kode_satuan}</td>
                                        <td className="p-2">{barang.fob}</td>
                                        <td className="p-2">{barang.cif}</td>
                                        <td className="p-2">{barang.harga_penyerahan}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </CardContent>
            <CardFooter>
                <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
            </CardFooter>
        </Card>
    )
}
export default TabsBarang;