import { useSidebar } from "@/components/ui/sidebar"
import { Menu } from "lucide-react"

export function OpenTrigger() {
    const { toggleSidebar } = useSidebar()

    return <button onClick={toggleSidebar} className='md:hidden'><Menu size={32} /></button>
}
