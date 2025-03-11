import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import type { Kemasan, Kontainer } from "@prisma/client";
import { DialogClose } from "./dialog";
import { JenisKontainer, TipeKontainer } from "@/utils/kontainer";
import { Inbox } from "lucide-react";


const TabsKemasan = ({ posts }: { posts: { kemasan: Kemasan[], kontainer: Kontainer[] } }) => {
    // console.log(posts)
    return (
        <Card className='overflow-y-auto w-full h-[75vh]'>
            <CardHeader className="bg-slate-200 h-10 p-2 px-10">
                <div className="font-semibold">Keamsan</div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm my-1 ">
                <div className="grid grid-cols-2 gap-4 p-3">
                    {/* Kemasan */}
                    <div className="overflow-y-auto h-[55vh] w-auto my-3">
                        <div className="flex justify-between font-semibold">Kemasan</div>
                        <table className="table-auto">
                            <thead className="border border-slate-300 bg-slate-200 sticky -top-1">
                                <tr>
                                    <td className="p-2">#</td>
                                    <td className="p-2">Jumlah</td>
                                    <td className="p-2">Jenis Kemasan</td>
                                    <td className="p-2">Merk</td>
                                </tr>
                            </thead>
                            <tbody>
                                {'kemasan' in posts && Array.isArray(posts.kemasan) && posts.kemasan.map((kemasan: Kemasan, index) => (
                                    <tr key={kemasan.id} className="border-x border-b">
                                        <td className="p-2">{index + 1}.</td>
                                        <td className="p-2">{kemasan.jumlah_kemasan}</td>
                                        <td className="p-2">{kemasan.kode_kemasan}</td>
                                        <td className="p-2">{kemasan.merek}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Kontainer */}
                    <div className="overflow-y-auto h-[55vh] w-auto my-3">
                        <div className="flex justify-between font-semibold">Kontainer</div>
                        <table className="table-auto">
                            <thead className="border border-slate-300 bg-slate-200 sticky -top-1">
                                <tr>
                                    <td className="p-2">#</td>
                                    <td className="p-2">Nomor Kontainer</td>
                                    <td className="p-2">Ukuran Kontain</td>
                                    <td className="p-2">Jenis Kontainer</td>
                                    <td className="p-2">Tipe Kontainer</td>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.kontainer.length > 0 ? posts.kontainer.map((kontainer: Kontainer, index) => (
                                    <tr key={kontainer.id} className="border-x border-b">
                                        <td className="p-2">{index + 1}.</td>
                                        <td className="p-2">{kontainer.nomor_kontiner}</td>
                                        <td className="p-2">{kontainer.kode_ukuran_kontainer}</td>
                                        <td className="p-2">{JenisKontainer(kontainer.kode_jenis_kontainer?.toString() || '')}</td>
                                        <td className="p-2">{TipeKontainer(kontainer.kode_tipe_kontainer?.toString() || '')}</td>
                                    </tr>
                                )) :
                                    <tr className="border-x border-b">
                                        <td colSpan={5} className="p-2 text-center">
                                            <span className='flex flex-col items-center'>
                                                <Inbox />
                                                Data tidak ditemukan
                                            </span>
                                        </td>
                                    </tr>
                                }
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
        </Card >
    )
}
export default TabsKemasan;