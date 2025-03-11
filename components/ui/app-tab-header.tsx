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
                                <td className="w-53">Nomor Aju</td>
                                <td className="px-1">:</td>
                                <td>{posts ? posts.nomor_aju : '-'}</td>
                            </tr>
                            <tr>
                                <td className="w-53">Kantor Pabean</td>
                            </tr>
                            {posts.kode_kantor &&
                                <tr>
                                    <td className="w-53 pl-4">Kantor Asal</td>
                                    <td className="px-1">:</td>
                                    <td>{posts ? posts.kode_kantor : '-'}</td>
                                </tr>
                            }
                            {posts.kode_kantor_tujuan &&
                                <tr>
                                    <td className="w-53 pl-4">Kantor Tujuan</td>
                                    <td className="px-1">:</td>
                                    <td>{posts ? posts.kode_kantor_tujuan : '-'}</td>
                                </tr>
                            }
                            {posts.kode_kantor_bongkar &&
                                <tr>
                                    <td className="w-53 pl-4">Kantor Pabean Pemuatan</td>
                                    <td className="px-1">:</td>
                                    <td>{posts ? posts.kode_kantor_bongkar : '-'}</td>
                                </tr>
                            }
                            {posts.kode_kantor_ekspor &&
                                <tr>
                                    <td className="w-53 pl-4">Kantor Pabean Ekspor</td>
                                    <td className="px-1">:</td>
                                    <td>{posts ? posts.kode_kantor_ekspor : '-'}</td>
                                </tr>
                            }
                            <tr>
                                <td className="w-53">Jenis TPB Asal</td>
                                <td className="px-1">:</td>
                                <td>{posts ? posts.kode_jenis_tpb : '-'}</td>
                            </tr>
                            <tr className="align-top">
                                <td>Jenis TPB Tujuan</td>
                                <td className="px-1">:</td>
                                <td>{posts ? posts.kode_tujuan_tpb : '-'}</td>
                            </tr>
                            {posts.kode_tujuan_pemasukan &&
                                <tr>
                                    <td>Tujuan Pengiriman</td>
                                    <td className="px-1">:</td>
                                    <td>{posts.kode_tujuan_pemasukan}</td>
                                </tr>
                            }
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