'use client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PaginationWithLinks } from '@/components/ui/pagination-with-links';
import { usePathname, useRouter } from 'next/navigation'

const Pagination = (props: {
    children: React.ReactNode,
    page: number,
    dataEntry: number,
    pageSize: number
}
) => {

    const { children, page, dataEntry, pageSize } = props
    const pathname = usePathname();
    const router = useRouter()

    const handleStringToInt = (value: string) => {
        router.push(pathname + `?page=${page}&size=${value}`)
    }
    return (
        <div>
            {children}
            <div className='container flex justify-between mx-auto mt-4 '>
                <div className='flex flex-row items-center'>
                    <div className='mr-3 font-sans'>Show:</div>
                    < Select onValueChange={handleStringToInt} >
                        <SelectTrigger className="w-auto">
                            <SelectValue placeholder="10/Page" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10/Page</SelectItem>
                            <SelectItem value="20">20/Page</SelectItem>
                            <SelectItem value="50">50/Page</SelectItem>
                            <SelectItem value="100">100/Page</SelectItem>
                        </SelectContent>
                    </Select >
                </div>
                <div className=" ">
                    <PaginationWithLinks page={page} pageSize={pageSize} totalCount={dataEntry} pageSizeSelectOptions={{ pageSizeOptions: [10, 20, 50, 100] }} />
                </div>
            </div >

        </div>
    )
}

export default Pagination;