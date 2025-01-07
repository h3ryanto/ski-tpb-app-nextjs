import { useSidebar } from "@/components/ui/sidebar"
import { Menu } from "lucide-react"

export function CloseTrigger() {
    const { toggleSidebar } = useSidebar()

    return <button onClick={toggleSidebar}><Menu /></button>
}
