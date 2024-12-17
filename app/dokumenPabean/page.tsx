import Table from '@/components/elements/Table/page';
import { Suspense } from "react";
import { getData } from "@/database/postgresSql/posts";





type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
export default async function DokumenPabean(props: {
	searchParams: SearchParams
}) {
	const { query, page, pageSize } = await props.searchParams;
	const currenPage = Number(page) || 1;
	const limit = Number(pageSize) || 10;
	const skip = (currenPage - 1) * limit;

	const resultData = await getData(limit, skip, query?.toString() || "");
	console.log(resultData)


	// const totalPage = Math.round(dataEntry / limit)



	return (

		<div>
			<Suspense>
				<Table posts={resultData.posts} page={currenPage} />
			</Suspense >



		</div>

	)
}


