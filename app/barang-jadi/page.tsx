"use client"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { PaginationWithLinks } from '@/components/ui/pagination-with-links'
import { InboxIcon, Trash2Icon } from "lucide-react";
import React, { use } from 'react';
import Search from "@/components/ui/search";
import { useToast } from "@/hooks/use-toast";
import AppTooltip from "@/components/ui/app-tool-tip";
import AppLoading from "@/components/ui/app-loading";
import UpdateBarangJadi from "@/components/ui/app-update-barang-jadi";
import AddBarangJadi from "@/components/ui/app-add-barang-jadi";
import { AppBom } from "@/components/ui/app-bom";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
const Archive = (props: {
    searchParams: SearchParams
}) => {
    const searchParams = use(props.searchParams)
    const search = searchParams?.query?.toString() || '';
    const limit = Number(searchParams?.pageSize) || 10;
    const currenPage = Number(searchParams?.page) || 1;
    // const skip = (currenPage - 1) * limit;
    const [data, setData] = React.useState<any[]>([]);
    const [page, setPage] = React.useState<number>(1);
    const [totalRecord, setTotalRecord] = React.useState<number>(1);
    const [size, setSize] = React.useState<number>(10);
    const [isLoading, setIsLoading] = React.useState(false);
    const { toast } = useToast()

    const deleteData = async (id: number) => {
        const confirmDelete = window.confirm("Apakah kamu yakin ingin menghapus data ini?");
        if (!confirmDelete) return;
        const result = await fetch('/api/delete-barang-jadi', {
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
            loadData(search, limit, currenPage);
            toast({
                title: "Delete Data Berhasil",
                description: "Data berhasil dihapus",
            })
            loadData(search, limit, currenPage);
        } else {
            toast({
                variant: "destructive",
                title: "Gagal Tambah User",
                description: res.message,
            })
        }
    }

    const loadData = async (search: any, limit: number, currenPage: number) => {
        setIsLoading(true);
        const data = await fetch(`/api/get-barang-jadi?page=${currenPage}&size=${limit}&search=${search}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (data) {
            const posts = await data?.json()
            if (posts.posts.data) {
                setData(posts.posts.data)
                setPage(posts.posts.meta.page)
                setTotalRecord(posts.posts.meta.total)
                setSize(posts.posts.meta.size)
            }
        };
        setIsLoading(false);
    }

    React.useEffect(() => {
        loadData(search, limit, currenPage);
    }, [search, limit, currenPage]);

    return (
        <>
            <div className="mx-auto justify-center rounded-md font-sans text-sm p-6 pt-2 hidden md:block">
                <Card>
                    <CardHeader className='flex flex-row place-items-center gap-2'>
                        <AppTooltip title="Tambah Barang Jadi" sideAlign="left">
                            <AddBarangJadi onAddDataSuccess={async () => await loadData(search, limit, currenPage)} />
                        </AppTooltip>
                        <Search ><></></Search>
                    </CardHeader>
                    <CardContent className='overflow-y-auto h-[calc(100vh-240px)]'>
                        <table className="table-auto hidden md:table w-full text-left">
                            <thead className='top-10 '>
                                <tr className="border-b-2 border-y-slate-400 sticky -top-1 bg-slate-100">
                                    <th scope="col" className='align-top p-2'><div className='pt-2'>No.</div></th>
                                    <th scope="col" className='p-2'>
                                        <div>Kode barang</div>
                                    </th>
                                    <th scope="col" className='p-2'>
                                        <div>Uraian</div>
                                    </th>
                                    <th scope="col" className='p-2'>
                                        <div className='mb-3'>Type</div>
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

                                {data.length > 0 && data.map((post: any, index: number) => (
                                    <tr key={index} className=" hover:bg-slate-100/65">
                                        <td className='p-2'>{((currenPage * 10) - 10) + index + 1}.</td>
                                        <td className='p-2'>{post.kode_barang}</td>
                                        <td className='p-2'>{post.nama_barang}</td>
                                        <td className='p-2'>{post.type}</td>
                                        <td className='p-2'>{post.satuan}</td>
                                        <td className='p-2 flex gap-2'>
                                            <AppTooltip title='Lihat BOM / Formula Barang Jadi' sideAlign='left'>
                                                <AppBom post={post} reload={async () => await loadData(search, limit, currenPage)} />
                                            </AppTooltip>
                                            <AppTooltip title='Update Barang Jadi' sideAlign='left'>
                                                <UpdateBarangJadi onUpdateDataSuccess={async () => await loadData(search, limit, currenPage)} data={post} />

                                            </AppTooltip>
                                            <AppTooltip title='Hapus Barang Jadi' sideAlign='left'>
                                                <Trash2Icon size={16} className='cursor-pointer stroke-slate-500 hover:stroke-red-500' onClick={() => deleteData(post.id)} />
                                            </AppTooltip>
                                        </td>
                                    </tr>
                                )) || <tr><td colSpan={7} className="text-center text-slate-700"><span className='flex flex-col items-center'><InboxIcon />Data tidak ditemukan</span></td></tr>}
                            </tbody>
                        </table>
                    </CardContent>
                    <CardFooter>
                        <div className="container flex justify-center mx-auto py-3 border-t-2 border-slate-400 md:border-t-0 text-slate-100 bg-slate-700 md:bg-inherit md:text-inherit">
                            <PaginationWithLinks page={page} pageSize={size} totalCount={totalRecord} pageSizeSelectOptions={{ pageSizeOptions: [10, 20, 50, 100] }} />

                        </div>
                    </CardFooter>
                </Card >
            </div >
            <AppLoading isLoading={isLoading} />
        </>
    )


}

export default Archive