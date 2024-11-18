
// import Table from '@/components/elements/Table/page';
import Link from 'next/link'
import { retriveData } from "@/lib/prisma/service";



export default async function Tpb() {

    const posts = await retriveData(10, 0)
    console.log(posts)


    return (
        <div>
            {/* <Table posts={posts.posts} page={1} /> */}

            <div className='flex justify-center mx-auto bg-slate-800 min-w-full py-2'>
                <div className="relative flex items-center justify-between max-w-md mx-auto text-slate-100 px-2">
                    <Link href="/dashboard">Dashboard</Link>
                    <button className=" hover:border-blue-500  hover:text-blue-500 p-2 rounded-md border-2" >Previous</button>
                    <div className='mx-2'>Page : 	 to  of	 data entris </div>
                    <button className="hover:border-blue-500 hover:text-blue-500 p-2 rounded-md border-2" >Next</button>
                </div>
            </div>
        </div>
    )
}




