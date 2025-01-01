import Table from '@/components/elements/Table/page';
import { Suspense } from "react";
import { countData, retriveData } from "@/database/postgresSql/posts";
import { PaginationWithLinks } from '@/components/ui/pagination-with-links';
import List from '@/components/ui/list';



type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
export default async function Dokumen(props: {
	searchParams: SearchParams
}) {
	const { query, page, pageSize, kodeDokumen, nomorAju, suplier, nomorDaftar, dokumen } = await props.searchParams;
	const search = query?.toString() || '';
	const kode_dokumen = kodeDokumen?.toString() || '';
	const nomor_aju = nomorAju?.toString() || '';
	const entitas = suplier?.toString() || false;
	const nomor_daftar = nomorDaftar?.toString() || '';
	const nomor_dokumen = dokumen?.toString() || '';
	const filter = { kode_dokumen, nomor_aju, entitas, nomor_daftar, nomor_dokumen }
	const currenPage = Number(page) || 1;
	const limit = Number(pageSize) || 10;
	const skip = (currenPage - 1) * limit;

	const posts = await retriveData(limit, skip, search, filter)
	// console.log(posts)
	const count = await countData(search)
	const dataEntry = count.length || 1;

	return (
		<div>
			<Suspense>

				<List posts={posts} />
				<Table posts={posts} page={currenPage} />

			</Suspense >
			<div className="container flex justify-center mx-auto py-3 border-t-2 border-slate-400 md:border-t-0 text-slate-100 bg-slate-700 md:bg-inherit md:text-inherit">
				<PaginationWithLinks page={currenPage} pageSize={limit} totalCount={dataEntry} pageSizeSelectOptions={{ pageSizeOptions: [10, 20, 50, 100] }} />
			</div>
		</div>

	)
}


