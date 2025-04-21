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
import { PaginationWithLinks } from '@/components/ui/pagination-with-links';
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { getUser, updateUser } from "@/lib/database/neon_postgresSql/user";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Label } from "@radix-ui/react-label";
import { ImagePlus, InboxIcon, Trash2 } from "lucide-react";
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react';

const User = () => {
    const [data, setData] = React.useState<any[]>([]);
    const session = useSession();
    const { toast } = useToast()

    const updateData = async (id: number, nama: string, email: string, isAdmin: boolean, isActive: boolean) => {
        const res = await updateUser(id, email, nama, isAdmin, isActive) as { message: string };
        console.log(res)
        if (res.message === "success") {
            loadData()
            toast({
                title: "Update Berhasil",
                description: "Data berhasil diupdate",
            })
        }
    }

    const loadData = () => {
        const fetchData = async () => {
            const res = await getUser();
            setData(res);
        };
        fetchData();
    }

    React.useEffect(() => {
        loadData()
    }, []);

    if (session.data?.user.isAdmin) {
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
                                                <Switch id="airplane-mode" checked={item.isAdmin} onClick={() => updateData(item.id, item.name, item.email, !item.isAdmin, item.isActive)} />
                                                <Label htmlFor="airplane-mode">{item.isAdmin && 'Admin'}</Label>
                                            </div>
                                        </td>
                                        <td className='p-1'>
                                            <div className="flex items-center space-x-2">
                                                <Switch id="airplane-mode" checked={item.isActive} onClick={() => updateData(item.id, item.name, item.email, item.isAdmin, !item.isActive)} />
                                                <Label htmlFor="airplane-mode">{item.isActive && 'Active'}</Label>
                                            </div>
                                        </td>
                                        <td className='p-1'><Trash2 size={16} className='cursor-pointer stroke-slate-500 hover:stroke-red-500' /></td>
                                    </tr>
                                )) ||
                                    <tr><td colSpan={7} className="text-center text-slate-700"><span className='flex flex-col items-center'><InboxIcon />Data tidak ditemukan</span></td></tr>
                                }
                            </tbody>
                        </table>
                    </CardContent>
                    <CardFooter>
                        <div className="container flex justify-center mx-auto py-3 border-t-2 border-slate-400 md:border-t-0 text-slate-100 bg-slate-700 md:bg-inherit md:text-inherit">
                            <PaginationWithLinks page={1} pageSize={10} totalCount={data.length} pageSizeSelectOptions={{ pageSizeOptions: [10, 20, 50, 100] }} />

                        </div>
                    </CardFooter>
                </Card >
            </div >
        )
    } else {
        redirect('/forbidden')
    }

}

export default User