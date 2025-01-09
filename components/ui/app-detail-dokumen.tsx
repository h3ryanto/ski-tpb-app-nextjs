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


export function AppDetailDokumen(posts: any) {
    return (
        <Dialog >
            <DialogTrigger asChild>
                <Eye size={18} className="cursor-pointer hover:stroke-blue-600" />
            </DialogTrigger>
            <Description></Description>
            <DialogContent className="max-w-screen-lg bg-slate-50">
                <DialogHeader>
                    <DialogTitle>Detail Dokumen</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="header" className="w-auto h-[80vh]">
                    <TabsList className="w-full bg-white p-3 " >
                        <TabsTrigger value="header" className="w-full">Header</TabsTrigger>
                        <TabsTrigger value="barang" className="w-full">Barang</TabsTrigger>
                    </TabsList>
                    <TabsContent value="header">
                        <TabsHeader posts={posts.posts} />
                    </TabsContent>
                    <TabsContent value="barang">
                        <TabsBarang posts={posts.posts} />
                    </TabsContent>
                </Tabs>
            </DialogContent >
        </Dialog >
    )
}
