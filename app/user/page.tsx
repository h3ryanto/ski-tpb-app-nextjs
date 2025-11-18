"use client"

import { AppAddUsers } from '@/components/ui/app-add-users';
import AppTooltip from '@/components/ui/app-tool-tip';
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
// import { PaginationWithLinks } from '@/components/ui/pagination-with-links';
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Label } from "@radix-ui/react-label";
import { ImagePlus, InboxIcon, Trash2 } from "lucide-react";
// import { PaginationWithLinks } from '@/components/ui/pagination-with-links';

import React from 'react';

const User = () => {
    const [data, setData] = React.useState<any[]>([]);
    // const [metaData, setMetaData] = React.useState<any>({});
    const { toast } = useToast()

    const updateData = async (email: string, atribut: string, value: string | boolean) => {
        const result = await fetch('/api/update-users', {
            method: 'PUT',
            body: JSON.stringify({
                email: email,
                atribut: atribut,
                value: value
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const res = await result.json()
        if (res.data.data) {
            loadData()
            toast({
                title: "Update Berhasil",
                description: "Data berhasil diupdate",
            })
            loadData()
        }
    }

    const deleteData = async (id: number) => {
        const confirmDelete = window.confirm("Apakah kamu yakin ingin menghapus data ini?");
        if (!confirmDelete) return;
        const result = await fetch('/api/delete-users', {
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
            loadData()
            toast({
                title: "Delete Data Berhasil",
                description: "Data berhasil dihapus",
            })
            loadData()
        } else {
            toast({
                variant: "destructive",
                title: "Gagal Tambah User",
                description: res.message,
            })
        }
    }

    const loadData = () => {
        const fetchData = async () => {
            const data = await fetch('/api/get-users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (data) {
                const posts = await data.json()
                if (posts.posts.data) {
                    setData(posts.posts.data);
                }
            }
        };
        fetchData();
    }

    React.useEffect(() => {
        loadData()
    }, []);


    return (
        <div className="mx-auto justify-center rounded-md font-sans text-sm p-6 pt-2 hidden md:block">
            <Card>
                <CardHeader className='pb-2'>
                    <AppAddUsers onUserAdded={loadData} />
                </CardHeader>
                <CardContent className='overflow-y-auto h-[calc(100vh-240px)]'>
                    <table className="table-auto hidden md:table w-full col-span-2">
                        <thead className='top-10 '>
                            <tr className="border-b-2 border-y-slate-400 sticky -top-1 bg-slate-100  text-left">
                                <th scope="col" className='align-top p-2'><div className='pt-2'>Photo</div></th>
                                <th scope="col" className='p-1'>
                                    <div>ID</div>
                                </th>
                                <th scope="col" className='p-1'>
                                    <div>User Name</div>
                                </th>
                                <th scope="col" className='p-1'>
                                    <div>Email</div>
                                </th>
                                <th scope="col" className='p-1'>
                                    <div className='mb-3'>isAdmin</div>
                                </th>
                                <th scope="col" className='p-1'>
                                    <div className='mb-3'>isActive</div>
                                </th>
                                <th scope="col" className='p-1'>

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map((item: any, index: number) => (
                                <tr key={index} className="border-b-2 border-y-slate-400">
                                    <td className='p-1'>
                                        <AppTooltip title='Change Photo' sideAlign='left'>
                                            <Avatar className="h-8 w-8 rounded-lg  cursor-pointer">
                                                <AvatarImage src={item.photo} alt={item.name} />
                                                <AvatarFallback className="rounded-lg"><ImagePlus /></AvatarFallback>
                                            </Avatar>
                                        </AppTooltip>
                                    </td>
                                    <td className='p-1'>{item.id}</td>
                                    <td className='p-1'>{item.name}</td>
                                    <td className='p-1'>{item.email}</td>
                                    <td className='p-1'>
                                        <div className="flex items-center space-x-2">
                                            <Switch id="airplane-mode" checked={item.isAdmin} onClick={() => updateData(item.email, "isAdmin", !item.isAdmin)} />
                                            <Label htmlFor="airplane-mode">{item.isAdmin && 'Admin'}</Label>
                                        </div>
                                    </td>
                                    <td className='p-1'>
                                        <div className="flex items-center space-x-2">
                                            <Switch id="airplane-mode" checked={item.isActive} onClick={() => updateData(item.email, "isActive", !item.isActive)} />
                                            <Label htmlFor="airplane-mode">{item.isActive && 'Active'}</Label>
                                        </div>
                                    </td>
                                    <td className='p-1'><Trash2 size={16} className='cursor-pointer stroke-slate-500 hover:stroke-red-500' onClick={() => deleteData(item.id)} /></td>
                                </tr>
                            )) ||
                                <tr><td colSpan={7} className="text-center text-slate-700"><span className='flex flex-col items-center'><InboxIcon />Data tidak ditemukan</span></td></tr>
                            }
                        </tbody>
                    </table>
                </CardContent>
                <CardFooter>
                    <div className="container flex justify-center mx-auto py-3 border-t-2 border-slate-400 md:border-t-0 text-slate-100 bg-slate-700 md:bg-inherit md:text-inherit">
                        {/* <PaginationWithLinks page={Number(metaData.page | 1)} pageSize={Number(metaData.size || 10)} totalCount={Number(metaData.total | 10)} pageSizeSelectOptions={{ pageSizeOptions: [10, 20, 50, 100] }} /> */}
                    </div>
                </CardFooter>
            </Card >
        </div >
    )


}

export default User