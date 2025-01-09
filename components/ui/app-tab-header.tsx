import kodeDokumen from "@/app/utils/kodeDokumen";
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import type { Header, Entitas, Dokumen } from "@prisma/client";
import { DialogClose } from "./dialog";
import { Button } from "./button";


const TabsHeader = ({ posts }: { posts: Header | Entitas }) => {
    // console.log(posts)
    return (
        <Card className=' overflow-y-auto w-full h-[75vh]'>

            <CardContent className="space-y-2 text-sm my-1 ">
                <div className="p-3">
                    <div className="font-semibold">Pengirim/Pembeli :</div>
                    <table className="table-auto ml-4 ">
                        <tbody>
                            <tr>
                                <td className="w-32">NPWP</td>
                                <td className="px-1">:</td>
                                <td>{'nomor_identitas' in posts ? posts.nomor_identitas : '-'}</td>
                            </tr>
                            <tr>
                                <td>Suplier / Customer</td>
                                <td className="px-1">:</td>
                                <td>{'nama_entitas' in posts ? posts.nama_entitas : '-'}</td>
                            </tr>
                            <tr>
                                <td>Alamat</td>
                                <td className="px-1">:</td>
                                <td>{'alamat_entitas' in posts ? posts.alamat_entitas : '-'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="p-3">
                    <div className="font-semibold">Dokumen :</div>
                    <div className="overflow-y-auto h-40 w-auto">
                        <table className="table-auto ml-4">
                            <thead className="border border-slate-300 bg-slate-200 sticky top-0">
                                <tr>
                                    <td className="p-2">#</td>
                                    <td className="p-2">Jenis Dokumen</td>
                                    <td className="p-2">Nomor Dokumen</td>
                                    <td className="p-2">Tanggal</td>
                                </tr>
                            </thead>
                            <tbody>
                                {'dokumens' in posts && Array.isArray(posts.dokumens) && posts.dokumens.map((dokumen: Dokumen, index) => (
                                    <tr key={dokumen.id} className="border-x border-b">
                                        <td className="p-2">{index + 1}.</td>
                                        <td className="p-2">{kodeDokumen(dokumen.kode_dokumen)}</td>
                                        <td className="p-2">{dokumen.nomor_dokumen}</td>
                                        <td className="p-2">{dokumen.tanggal_dokumen ? dokumen.tanggal_dokumen.toString() : '-'}</td>
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
export default TabsHeader;