import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { LoaderCircle } from "lucide-react"


const AppLoading = ({ isLoading = false }: { isLoading: boolean }) => {
    return (
        <AlertDialog open={isLoading}>
            <AlertDialogContent className="bg-transparent border-none w-auto">
                <AlertDialogTitle><></></AlertDialogTitle>
                <AlertDialogDescription>
                    <button type="button" className="flex bg-slate-400 p-3 rounded-md text-white" disabled>
                        <LoaderCircle className="animate-spin stroke-white mx-3" />
                        <span>Processing...</span>
                    </button>
                </AlertDialogDescription>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default AppLoading