import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import type { Entitas } from "@prisma/client";
import AppCopyText from './app-copy-text';

const AppTabCardEntitas = ({ post }: { post: Entitas }) => {
    return (
        <Card className='w-[460] bg-white'>
            <CardHeader className='bg-slate-200 font-semibold m-2 p-3'>
                {post.kode_entitas === '3' ?
                    'TPB Asal Barang / Pengusaha Kena Pajak'
                    : (post.kode_entitas === '5') || (post.kode_entitas === '9') ?
                        'Pemasok / Pengirim barang'
                        : post.kode_entitas === '7' ?
                            'Pemilik Barang'
                            : post.kode_entitas === '8' ?
                                'Penerima Barang'
                                : post.kode_entitas === '2' ?
                                    'Eksportir'
                                    : post.kode_entitas === '6' ?
                                        'Pembeli'
                                        : post.kode_entitas === '4' ?
                                            'PPJK'
                                            : ''
                }

            </CardHeader>
            <CardContent className="space-y-2 text-sm my-1 ">
                <table>
                    <tbody>
                        {post.nomor_identitas &&
                            < tr >
                                <td className='w-20'>{post.nomor_identitas.length === 15 ? "NPWP" : "NITKU"}</td>
                                <td>:</td>
                                <td> <AppCopyText textToCopy={post.nomor_identitas}>{post.nomor_identitas}</AppCopyText></td>
                            </tr>
                        }
                        <tr>
                            <td className='w-20'>Nama</td>
                            <td>:</td>
                            <td><AppCopyText textToCopy={post.nama_entitas || ''}>{post.nama_entitas}</AppCopyText></td>
                        </tr>
                        <tr>
                            <td className='w-20 align-top'>Alamat</td>
                            <td className='align-top'>:</td>
                            <td><AppCopyText textToCopy={post.alamat_entitas || ''}>{post.alamat_entitas}</AppCopyText></td>
                        </tr>
                        {post.nomor_ijin_entitas &&
                            <tr>
                                <td className='w-20 align-top'>SKEP KB</td>
                                <td className='align-top'>:</td>
                                <td className='align-top'><AppCopyText textToCopy={post.nomor_ijin_entitas || ''}>{post.nomor_ijin_entitas}</AppCopyText></td>
                            </tr>
                        }
                        {post.nib_entitas &&
                            <tr>
                                <td className='w-20 align-top'>NIB</td>
                                <td className='align-top'>:</td>
                                <td><AppCopyText textToCopy={post.nib_entitas || ''}>{post.nib_entitas}</AppCopyText></td>
                            </tr>
                        }
                    </tbody>
                </table>
            </CardContent>
        </Card >
    )
}
export default AppTabCardEntitas