'use client'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
// import { use } from 'react'

// type Params = Promise<{ slug: string }>
const Pagination = (props: {
    children: React.ReactNode
    dataEntry: number
}
) => {
    const pathname = usePathname();
    const router = useRouter()
    const { children } = props
    const searchParams = useSearchParams()
    const currentPage = searchParams.get('page')
    const dataEntry = props.dataEntry
    // console.log(pathname)

    const nextPage = () => {
        if (Number(currentPage) > 1) {
            const page = Number(currentPage) + 1
            router.push(pathname + `?page=${page}`)
        }
    }
    const prevPage = () => {
        if (Number(currentPage) > 1) {
            const page = Number(currentPage) - 1
            router.push(pathname + `?page=${page}`)
        }

    }

    return (
        <>
            {children}
            <div className='flex justify-center mx-auto bg-slate-800 min-w-full py-2'>
                <div className="relative flex items-center justify-between max-w-md mx-auto text-slate-100 px-2">
                    <button className=" hover:border-blue-500  hover:text-blue-500 p-2 rounded-md border-2" onClick={prevPage}>Previous</button>
                    <div className='mx-2'>Page : {currentPage}	 to {Math.round(dataEntry / 10)} of	{dataEntry} data entris </div>
                    <button className="hover:border-blue-500 hover:text-blue-500 p-2 rounded-md border-2" onClick={nextPage}>Next</button>
                </div>
            </div>
        </>

    )
}
export default Pagination;

