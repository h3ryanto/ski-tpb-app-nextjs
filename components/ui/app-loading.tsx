import { LoaderCircle } from "lucide-react"


const AppLoading = ({ isLoading = false }: { isLoading: boolean }) => {
    return (
        <>
            {isLoading &&
                (<div className="flex justify-center items-center w-screen h-screen bg-black bg-opacity-40 fixed top-0 left-0 z-50">
                    <button type="button" className="flex bg-white p-3 rounded-md" disabled>
                        <LoaderCircle className="animate-spin stroke-red-500 mx-3" />
                        <span className="animate-pulse">Processing...</span>
                    </button>
                </div>)
            }
        </>
    )
}

export default AppLoading