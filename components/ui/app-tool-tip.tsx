import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export default function AppTooltip({ children, title }: { children: any, title: string }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div>
                        {children}
                    </div>
                </TooltipTrigger>
                <TooltipContent side="left">
                    <p>{title}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
