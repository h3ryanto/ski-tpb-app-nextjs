import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast"
import React from "react";
import AppTooltip from "./app-tool-tip";

const AppCopyText = ({ textToCopy, children }: { textToCopy: string, children?: React.ReactNode }) => {
    const { toast } = useToast()
    const handleCopy = async (textToCopy: string) => {
        try {
            // Copy text to clipboard
            await navigator.clipboard.writeText(textToCopy);
            toast({
                variant: 'default',
                title: "Copy Success",
                description: `Text ${textToCopy} Berhasil dicopy`,
            })
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Text Gagal dicopy",
                description: error,
            })
        }
    }

    return (
        <div className='flex flex-row items-center gap-2'>

            {children}
            <AppTooltip title='Copy' >
                <Copy size={12} className='hover:stroke-blue-600 cursor-pointer' onClick={() => handleCopy(textToCopy)} />
            </AppTooltip>
        </div>

    )
}

export default AppCopyText