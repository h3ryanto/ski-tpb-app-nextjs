import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Description } from "@radix-ui/react-dialog"
import { Eye } from "lucide-react"
import TabsHeader from "./app-tab-header"
import TabsBarang from "./app-tab-barang"
import TabsDokumen from "./app-tab-dokumen"
import TabsTransaksi from "./app-tab-transaksi"
import TabsEntitas from "./app-tab-entitas"
import TabsKemasan from "./app-tab-kemasan"
import TabsBahanBaku from "./app-tab-bahan-baku"


export function AppDetailDokumen(posts: any) {
    return (
        <Dialog >
            <DialogTrigger asChild>
                <Eye size={18} className="cursor-pointer hover:stroke-blue-600" />
            </DialogTrigger>
            <Description></Description>
            <DialogContent className="max-w-screen-lg bg-slate-50">
                <DialogHeader>
                    <DialogTitle>Detail Dokumen BC {posts.posts.kode_dokumen} - {posts.posts.nomor_aju}</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="header" className="w-auto h-[80vh]">
                    <TabsList className="w-full bg-white p-3 " >
                        {/* <TabsTrigger value="header" className="w-full">Header</TabsTrigger> */}
                        <TabsTrigger value="entitas" className="w-full">Entitas</TabsTrigger>
                        <TabsTrigger value="dokumen" className="w-full">Dokumen</TabsTrigger>
                        <TabsTrigger value="kemasan" className="w-full">Kemasan</TabsTrigger>
                        <TabsTrigger value="transaksi" className="w-full">Transaksi</TabsTrigger>
                        <TabsTrigger value="barang" className="w-full">Barang</TabsTrigger>
                        <TabsTrigger value="bahan_baku" className="w-full">Bahan Baku</TabsTrigger>
                    </TabsList>
                    <TabsContent value="header">
                        <TabsHeader posts={posts.posts} />
                    </TabsContent>
                    <TabsContent value="entitas">
                        <TabsEntitas posts={posts.posts} />
                    </TabsContent>
                    <TabsContent value="dokumen">
                        <TabsDokumen posts={posts.posts} />
                    </TabsContent>
                    <TabsContent value="kemasan">
                        <TabsKemasan posts={posts.posts} />
                    </TabsContent>
                    <TabsContent value="transaksi">
                        <TabsTransaksi posts={posts.posts} />
                    </TabsContent>
                    <TabsContent value="barang">
                        <TabsBarang posts={posts.posts} />
                    </TabsContent>
                    <TabsContent value="bahan_baku">
                        <TabsBahanBaku posts={posts.posts} />
                    </TabsContent>

                </Tabs>
            </DialogContent >
        </Dialog >
    )
}
