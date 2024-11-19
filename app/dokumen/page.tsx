// import Pagination from '@/components/elements/Pagination/page';
// import Table from '@/components/elements/Table/page';
import { Suspense } from "react";
// import { retriveData } from "@/lib/prisma/service";
// import Link from 'next/link';



type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
export default async function Dokumen(props: {
	searchParams: SearchParams
}) {
	// const { page } = await props.searchParams;
	// const currenPage = Number(page) || 1;
	// const limit = 10;
	// const skip = (currenPage - 1) * limit;

	// const resultData = await retriveData(limit, skip);
	// console.log(resultData)

	// const dataEntry = resultData.headerCount;
	// const totalPage = Math.round(dataEntry / 10)

	return (
		<>
			{/* <Pagination dataEntry={10}> */}
			<Suspense>
				{/* <Table posts={resultData.posts} page={currenPage} /> */}
			</Suspense >

			{/* </Pagination> */}
			{/* <div className='flex justify-center mx-auto bg-slate-800 min-w-full py-2'>
				<div className="relative flex items-center justify-between max-w-md mx-auto text-slate-100 px-2">
					<Link href={currenPage == 1 ? '/dokumen' : `/dokumen?page=${(currenPage - 1)}`} className={`p-2 rounded-md border-2 ${currenPage == 1 ? 'hover:border-gray-700 hover:text-gray-700 text-gray-700 border-gray-500' : 'hover:border-blue-500  hover:text-blue-500'}`}>Prev</Link>
					<div className='mx-2'>Page : {page || 1}	 to {totalPage} of	{dataEntry} data entris </div>
					<Link href={`/dokumen?page=${currenPage == totalPage ? currenPage : (currenPage + 1)}`} className={`p-2 rounded-md border-2 ${currenPage == totalPage ? 'hover:border-gray-700 hover:text-gray-700 text-gray-700 border-gray-500' : 'hover:border-blue-500  hover:text-blue-500'}`}>Next</Link>
				</div>
			</div > */}
		</>
	)
}


