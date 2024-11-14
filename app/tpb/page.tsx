
import Table from '@/components/elements/Table/page';
import { retriveData } from '@/lib/postgres/service';


export default async function Tpb() {
    const rows = await retriveData();

    return (
        <div>
            <Table posts={rows} />

            <div className='flex justify-center mx-auto bg-slate-800 min-w-full py-2'>
                <div className="relative flex items-center justify-between max-w-md mx-auto text-slate-100 px-2">
                    <button className=" hover:border-blue-500  hover:text-blue-500 p-2 rounded-md border-2" >Previous</button>
                    <div className='mx-2'>Page : 	 to  of	 data entris </div>
                    <button className="hover:border-blue-500 hover:text-blue-500 p-2 rounded-md border-2" >Next</button>
                </div>
            </div>
        </div>
    )
}


