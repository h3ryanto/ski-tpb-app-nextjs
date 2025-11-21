import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { Description } from "@radix-ui/react-dialog"
import { FlaskConical, InboxIcon, Trash2Icon } from "lucide-react"
import AppTooltip from "@/components/ui/app-tool-tip";
import { Button } from './button';
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import UpdateBom from "./app-update-bom";
import AddBom from "./app-add-bom";

export function AppBom(posts: any, reload: () => Promise<void>) {
    const [bom, setBom] = useState<any[]>([]);
    const { toast } = useToast()

    const filterBarang = (value: any) => {
        if ('bom' in posts.post) {
            if (Array.isArray(posts.post.bom)) {
                setBom((posts.post.bom.filter((e: { nama_barang: string; kode_barang: string; type: string; }) => (e.nama_barang.toUpperCase().includes(value.toUpperCase()) || e.kode_barang.toUpperCase().includes(value.toUpperCase()) || e.type.toUpperCase().includes(value.toUpperCase())))));
            }
        }
    }
    const deleteData = async (id: number) => {
        const confirmDelete = window.confirm("Apakah kamu yakin ingin menghapus data ini?");
        if (!confirmDelete) return;
        const result = await fetch('/api/delete-bom', {
            method: 'DELETE',
            body: JSON.stringify({
                id: id
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const res = await result.json()
        if (res.message === "success") {
            toast({
                title: "Delete Data Berhasil",
                description: "Data berhasil dihapus",
            })
        } else {
            toast({
                variant: "destructive",
                title: "Gagal Tambah User",
                description: res.message,
            })
        }
        reload()
    }


    useEffect(() => {
        if ('bom' in posts.post) {
            const barangArray = posts.post.bom as any[];
            const ascbarang = barangArray.sort((a, b) => Number(a.kode_barang) - Number(b.kode_barang));
            setBom(ascbarang as any[]);
        }
    }, [posts])
    return (
        <Dialog >
            <DialogTrigger asChild>
                <FlaskConical size={18} className='cursor-pointer stroke-slate-500 hover:stroke-blue-500' />
            </DialogTrigger>
            <Description></Description>
            <DialogContent className="max-w-screen-lg bg-slate-50">
                <DialogHeader className="flex flex-col gap-5">
                    <DialogTitle>BOM: {posts.post.type} - {posts.post.nama_barang} - {posts.post.kode_barang}</DialogTitle>
                    <div className="flex flex-row gap-3">
                        <AddBom onAddDataSuccess={async () => await reload()} />
                        <input type="text"
                            placeholder="Search.."
                            className="border border-gray-300 rounded-md px-2 py-1 text-sm placeholder:text-gray-400"
                            onChange={(e) => filterBarang(e.target.value)}
                        />
                    </div>
                </DialogHeader>
                <div className="w-auto h-[80vh] overflow-auto">

                    <table className="table-auto hidden md:table w-full text-left">
                        <thead className='top-10 '>
                            <tr className="border-b-2 border-y-slate-400 sticky -top-1 bg-slate-100">
                                <th scope="col" className='align-top p-2'><div className='pt-2'>No.</div></th>
                                <th scope="col" className='p-2'>
                                    <div>Kode barang</div>
                                </th>
                                <th scope="col" className='p-2'>
                                    <div>Kode Barang Jadi</div>
                                </th>
                                <th scope="col" className='p-2'>
                                    <div>Uraian</div>
                                </th>
                                <th scope="col" className='p-2'>
                                    <div className='mb-3'>Type</div>
                                </th>
                                <th scope="col" className='p-2'>
                                    <div className='mb-3'>Jumlah</div>
                                </th>
                                <th scope="col" className='p-2'>
                                    <div className='mb-3'>Satuan</div>
                                </th>
                                <th scope="col" className='p-2'>
                                    <div className='mb-3'></div>
                                </th>
                            </tr>
                        </thead>
                        <tbody >

                            {bom.length > 0 && bom.map((post: any, index: number) => (
                                <tr key={index} className=" hover:bg-slate-100/65">
                                    <td className='p-2'>{index + 1}.</td>
                                    <td className='p-2'>{post.kode_barang}</td>
                                    <td className='p-2'>{post.kode_barang_jadi}</td>
                                    <td className='p-2'>{post.nama_barang}</td>
                                    <td className='p-2'>{post.type}</td>
                                    <td className='p-2'>{post.qty}</td>
                                    <td className='p-2'>{post.satuan}</td>
                                    <td className='p-2 flex gap-2'>

                                        <AppTooltip title='Update BOM' sideAlign='left'>
                                            <UpdateBom onUpdateDataSuccess={async () => await reload()} data={post} />
                                        </AppTooltip>
                                        <AppTooltip title='Hapus BOM' sideAlign='left'>
                                            <Trash2Icon size={16} className='cursor-pointer stroke-slate-500 hover:stroke-red-500' onClick={() => deleteData(post.id)} />
                                        </AppTooltip>
                                    </td>
                                </tr>
                            )) || <tr><td colSpan={7} className="text-center text-slate-700"><span className='flex flex-col items-center'><InboxIcon />Data tidak ditemukan</span></td></tr>}
                        </tbody>
                    </table>
                </div>
                <DialogFooter className="justify-end text-sm pt-3">
                    <DialogClose asChild>
                        <Button size={"sm"} >Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent >
        </Dialog >
    )
}
