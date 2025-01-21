import { useSidebar } from "@/components/ui/sidebar"
import { PanelLeftClose } from "lucide-react"

export function CloseTrigger() {
    const { toggleSidebar } = useSidebar()

    return <button onClick={toggleSidebar}><PanelLeftClose /></button>
}
