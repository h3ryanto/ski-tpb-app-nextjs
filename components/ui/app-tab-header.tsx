import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import type { Entitas, Header } from "@prisma/client";
import { DialogClose } from "./dialog";

const TabsHeader = ({ posts }: { posts: Header & Entitas & { ftanggal_daftar: string } }) => {
    // console.log(posts)
    return (
        <Card className=' overflow-y-auto w-full h-[75vh]'>

            <CardContent className="space-y-2 text-sm my-1 ">
                <div className="p-3">
                    <table className="table-auto ml-4 align-top">
                        <tbody>
                            <tr>
                                <td className="w-53">Kantor</td>
                                <td className="px-1">:</td>
                                <td>{posts ? posts.kode_kantor : '-'}</td>
                            </tr>
                            <tr>
                                <td className="w-53">Nomor Aju</td>
                                <td className="px-1">:</td>
                                <td>{posts ? posts.nomor_aju : '-'}</td>
                            </tr>
                            <tr className="align-top">
                                <td>Nomor / Tanggal Daftar</td>
                                <td className="px-1">:</td>
                                <td>{posts ? posts.nomor_daftar : '-'} / {posts.ftanggal_daftar}</td>
                            </tr>
                            <tr>
                                <td>Tujuan Pengiriman</td>
                                <td className="px-1">:</td>
                                <td>{'alamat_entitas' in posts ? posts.kode_tujuan_pemasukan : '-'}</td>
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
export default TabsHeader;