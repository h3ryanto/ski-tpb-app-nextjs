import Table from '@/components/elements/Table/page';
import { Suspense } from "react";
import { countData, retriveData } from "@/database/postgresSql/posts";
import { PaginationWithLinks } from '@/components/ui/pagination-with-links';
import Search from '@/components/ui/search';




type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
export default async function Dokumen(props: {
	searchParams: SearchParams
}) {
	const { query, page, pageSize } = await props.searchParams;
	const search = query?.toString() || '';
	const currenPage = Number(page) || 1;
	const limit = Number(pageSize) || 10;
	const skip = (currenPage - 1) * limit;

	// const resultData = await getData(limit, skip, search);
	// const data = await fetch('https://api.vercel.app/blog')
	const posts = await retriveData(limit, skip, search)
	const count = await countData(search)
	console.log(posts);
	console.log(count.length);
	// const dataEntry = resultData.headerCount || 1;
	const dataEntry = count.length || 1;

	return (
		<div>
			<Suspense>
				<Search>
					<Table posts={posts} page={currenPage} />
				</Search>
			</Suspense >
			<div className="container flex justify-center mx-auto py-3 border-t-2 border-slate-400 md:border-t-0 text-slate-100 bg-slate-700 md:bg-inherit md:text-inherit">
				<PaginationWithLinks page={currenPage} pageSize={limit} totalCount={dataEntry} pageSizeSelectOptions={{ pageSizeOptions: [10, 20, 50, 100] }} />
			</div>
		</div>

	)
}


