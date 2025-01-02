import Table from '@/components/elements/Table/page';
import { Suspense } from "react";
import { countData, retriveData } from "@/database/postgresSql/posts";
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

				<List posts={posts} page={currenPage} limit={limit} dataEntry={dataEntry} />
				<Table posts={posts} page={currenPage} limit={limit} dataEntry={dataEntry} />

			</Suspense >

		</div>

	)
}


