'use client'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
const Pagination = (props: {
    children: React.ReactNode
    dataEntry: number
}
) => {
    const totalPage = Math.round(props.dataEntry / 10)

    const pathname = usePathname();
    const router = useRouter()
    const { children } = props
    const searchParams = useSearchParams()
    const currentPage = searchParams.get('page')
    const dataEntry = props.dataEntry


    const nextPage = () => {
        if (Number(currentPage) != totalPage) {
            try {
                const page = Number(currentPage) + 1
                router.push(pathname + `?page=${page}`)
            } finally {

            }
        }
    }
    const prevPage = () => {
        if (Number(currentPage) > 1) {
            try {
                const page = Number(currentPage) - 1
                router.push(pathname + `?page=${page}`)
            } finally {

            }
        }
    }

    return (
        <>
            {children}
            <div className='flex justify-center mx-auto bg-slate-800 min-w-full py-2'>
                <div className="relative flex items-center justify-between max-w-md mx-auto text-slate-100 px-2">
                    <Link href={`dokumen?page=${(Number(currentPage) - 1).toString}`}>Prev</Link>

                    <button className=" hover:border-blue-500  hover:text-blue-500 p-2 rounded-md border-2 disabled:hover:border-gray-700 disabled:hover:text-gray-700 disabled:text-gray-700 disabled:border-gray-500" onClick={prevPage} disabled={currentPage === '1' ? true : false} >Previous</button>
                    <div className='mx-2'>Page : {currentPage}	 to {totalPage} of	{dataEntry} data entris </div>
                    <button className="hover:border-blue-500 hover:text-blue-500 p-2 rounded-md border-2  disabled:hover:border-gray-700 disabled:hover:text-gray-700 disabled:text-gray-700 disabled:border-gray-500" disabled={Number(currentPage) === totalPage ? true : false} onClick={nextPage}>Next</button>
                    <Link href={`dokumen?page=${(Number(currentPage) + 1)}`} className="hover:border-blue-500 hover:text-blue-500 p-2 rounded-md border-2  disabled:hover:border-gray-700 disabled:hover:text-gray-700 disabled:text-gray-700 disabled:border-gray-500">Next</Link>
                </div>
            </div >
        </>

    )
}
export default Pagination;

