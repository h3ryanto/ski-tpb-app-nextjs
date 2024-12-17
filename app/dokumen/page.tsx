import Table from '@/components/elements/Table/page';
import { Suspense } from "react";
import { getData } from "@/database/postgresSql/posts";
import { PaginationWithLinks } from '@/components/ui/pagination-with-links';
import Search from '@/components/ui/search';




type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
export default async function Dokumen(props: {
	searchParams: SearchParams
}) {
	const { query, page, pageSize } = await props.searchParams;
	const currenPage = Number(page) || 1;
	const limit = Number(pageSize) || 10;
	const skip = (currenPage - 1) * limit;

	const resultData = await getData(limit, skip, query?.toString());
	console.log(resultData)

	const dataEntry = resultData.headerCount || 1;
	// const totalPage = Math.round(dataEntry / limit)



	return (

		<div>
			<Suspense>
				<Search>
					<Table posts={resultData.posts} page={currenPage} />
				</Search>
			</Suspense >

			{/* <div className='flex justify-center mx-auto bg-slate-800 min-w-full py-2 md:hidden'>
				<div className="relative flex items-center justify-between max-w-md mx-auto text-slate-100 px-2">
					<Link href={currenPage == 1 ? `/dokumen` : `/dokumen?page=${(currenPage - 1)}`} className={`p-2 rounded-md border-2 ${currenPage == 1 ? 'hover:border-gray-700 hover:text-gray-700 text-gray-700 border-gray-500' : 'hover:border-blue-500  hover:text-blue-500'}`}>Prev</Link>
					<div className='mx-2'>Page : {page || 1}	 to {totalPage} of	{dataEntry} data entris </div>
					<Link href={`/dokumen?page=${currenPage == totalPage ? currenPage : (currenPage + 1)}`} className={`p-2 rounded-md border-2 ${currenPage == totalPage ? 'hover:border-gray-700 hover:text-gray-700 text-gray-700 border-gray-500' : 'hover:border-blue-500  hover:text-blue-500'}`}>Next</Link>
				</div>
			</div > */}
			<div className="container flex justify-center mx-auto py-3 border-t-2 border-slate-400 md:border-t-0 text-slate-100 bg-slate-700 md:bg-inherit md:text-inherit">
				<PaginationWithLinks page={currenPage} pageSize={limit} totalCount={dataEntry} pageSizeSelectOptions={{ pageSizeOptions: [10, 20, 50, 100] }} />
			</div>

		</div>

	)
}


