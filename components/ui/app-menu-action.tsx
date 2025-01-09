import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Eye, FileText } from "lucide-react"
import { ReactNode } from "react"



export function ActionMenu({ children, post }: { children: ReactNode, post: any }) {
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    {children}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Action</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            View Detail
                            <DropdownMenuShortcut><Eye size={16} /></DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <a href={`https://xjmmjizaw0muiipq.public.blob.vercel-storage.com/pdf/${post.tahun}/${post.kode_dokumen}/${post.nomor_daftar}.pdf`} target="_blank" rel="noopener noreferrer">View PDF File</a>
                            <DropdownMenuShortcut><FileText size={16} /></DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

        </>
    )
}
