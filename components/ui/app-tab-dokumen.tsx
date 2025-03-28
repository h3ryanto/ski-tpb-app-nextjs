import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import type { Dokumen } from "@prisma/client";
import { DialogClose } from "./dialog";
import kodeDokumen from "@/utils/kodeDokumen";
import { format } from "date-fns";

const TabsDokumen = ({ posts }: { posts: Dokumen }) => {
    // console.log(posts)
    return (
        <Card className='overflow-y-auto w-full h-[75vh]'>
            <CardHeader className="bg-slate-200 h-10 p-2 px-10">
                <div className="font-semibold">Dokumen</div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm my-1 ">
                <div className="p-3">

                    <div className="overflow-y-auto h-[55vh] w-auto my-3">
                        <table className="table-auto">
                            <thead className="border border-slate-300 bg-slate-200 sticky -top-1">
                                <tr>
                                    <td className="p-2">#</td>
                                    <td className="p-2">Jenis Dokumen</td>
                                    <td className="p-2">Nomor Dokumen</td>
                                    <td className="p-2">Tanggal</td>
                                </tr>
                            </thead>
                            <tbody>
                                {'dokumen' in posts && Array.isArray(posts.dokumen) && posts.dokumen.map((dokumen: Dokumen, index) => (
                                    <tr key={dokumen.id} className="border-x border-b">
                                        <td className="p-2">{index + 1}.</td>
                                        <td className="p-2">{kodeDokumen(dokumen.kode_dokumen)}</td>
                                        <td className="p-2">{dokumen.nomor_dokumen}</td>
                                        <td className="p-2">{dokumen.tanggal_dokumen ? format(dokumen.tanggal_dokumen, "yyyy-MM-dd") : '-'}</td>
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
export default TabsDokumen;