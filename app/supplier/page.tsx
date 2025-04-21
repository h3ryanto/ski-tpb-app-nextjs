"use client"

import AppCopyText from "@/components/ui/app-copy-text";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { PaginationWithLinks } from '@/components/ui/pagination-with-links'
import { getSupllier } from "@/lib/database/neon_postgresSql/posts";
import { InboxIcon } from "lucide-react";
import React, { use } from 'react';

import Search from "@/components/ui/search";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
const Supplier = (props: {
    searchParams: SearchParams
}) => {
    const searchParams = use(props.searchParams)
    const search = searchParams?.query?.toString() || '';
    const limit = Number(searchParams?.pageSize) || 10;
    const currenPage = Number(searchParams?.page) || 1;
    const skip = (currenPage - 1) * limit;
    const [data, setData] = React.useState<any[]>([]);
    const [dataCount, setDataCount] = React.useState<number>(0);

    const loadData = async (search: any, limit: number, skip: number) => {
        const { data, count } = await getSupllier(search, limit, skip);
        setData(data)
        setDataCount(count)
    };

    React.useEffect(() => {
        loadData(search, limit, skip);
    }, [search, limit, skip]);

    return (
        <div className="mx-auto justify-center rounded-md font-sans text-sm p-6 pt-2 hidden md:block">
            <Card>
                <CardHeader className='pb-2'>
                    <Search ><></></Search>
                </CardHeader>
                <CardContent className='overflow-y-auto h-[calc(100vh-240px)]'>
                    <table className="table-auto hidden md:table w-full">
                        <thead className='top-10 '>
                            <tr className="border-b-2 border-y-slate-400 sticky -top-1 bg-slate-100">
                                <th scope="col" className='align-top p-2'><div className='pt-2'>No.</div></th>
                                <th scope="col" className='p-2'>
                                    <div>NITKU</div>
                                </th>
                                <th scope="col" className='p-2'>
                                    <div>Nama Entitas</div>
                                </th>
                                <th scope="col" className='p-2'>
                                    <div className='mb-3'>Alamat Entitas</div>
                                </th>
                                <th scope="col" className='p-2'>
                                    <div className='mb-3'>NIB</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody >

                            {data.length > 0 && data.map((post: any, index: number) => (
                                <tr key={index} className=" hover:bg-slate-100/65">
                                    <td className='p-2'>{((currenPage * 10) - 10) + index + 1}.</td>
                                    <td className='p-2'><AppCopyText textToCopy={post.nomor_identitas}>{post.nomor_identitas}</AppCopyText></td>
                                    <td className='p-2'><AppCopyText textToCopy={post.nama_entitas}>{post.nama_entitas}</AppCopyText></td>
                                    <td className='p-2'><AppCopyText textToCopy={post.alamat_entitas}>{post.alamat_entitas}</AppCopyText></td>
                                    <td className='p-2'><AppCopyText textToCopy={post.nib_entitas}>{post.nib_entitas}</AppCopyText></td>
                                </tr>
                            )) || <tr><td colSpan={7} className="text-center text-slate-700"><span className='flex flex-col items-center'><InboxIcon />Data tidak ditemukan</span></td></tr>}
                        </tbody>
                    </table>
                </CardContent>
                <CardFooter>
                    <div className="container flex justify-center mx-auto py-3 border-t-2 border-slate-400 md:border-t-0 text-slate-100 bg-slate-700 md:bg-inherit md:text-inherit">
                        <PaginationWithLinks page={currenPage} pageSize={limit} totalCount={dataCount} pageSizeSelectOptions={{ pageSizeOptions: [10, 20, 50, 100] }} />

                    </div>
                </CardFooter>
            </Card >
        </div >
    )


}

export default Supplier