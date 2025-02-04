import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export default function AppTooltip({ children, title, sideAlign }: { children: any, title: string, sideAlign?: "top" | "right" | "bottom" | "left" | undefined }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div>
                        {children}
                    </div>
                </TooltipTrigger>
                <TooltipContent side={sideAlign}>
                    <p>{title}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
