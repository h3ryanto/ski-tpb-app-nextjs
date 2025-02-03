'use client'
import Table from '@/components/elements/Table/page';
import List from '@/components/ui/list';
import { countData, retriveData } from "@/lib/database/neon_postgresSql/posts";
import { Suspense, use, useEffect, useMemo, useState } from "react";


type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
export default function Dokumen(props: {
	searchParams: SearchParams
}) {
	const searchParams = use(props.searchParams)
	const search = searchParams?.query?.toString() || '';
	const kode_dokumen = searchParams?.kodeDokumen?.toString() || '';
	const nomor_aju = searchParams?.nomorAju?.toString() || '';
	const entitas = searchParams?.suplier?.toString() || '';
	const nomor_daftar = searchParams?.nomorDaftar?.toString() || '';
	const nomor_dokumen = searchParams?.dokumen?.toString() || '';
	const date_from = searchParams?.date_from?.toString() || '';
	const date_to = searchParams?.date_to?.toString() || '';
	const filter = useMemo(() => ({ kode_dokumen, nomor_aju, entitas, nomor_daftar, nomor_dokumen, date_from, date_to }), [kode_dokumen, nomor_aju, entitas, nomor_daftar, nomor_dokumen, date_from, date_to])
	const currenPage = Number(searchParams?.page) || 1;
	const limit = Number(searchParams?.pageSize) || 10;
	const skip = (currenPage - 1) * limit;

	const [posts, setPosts] = useState<any[]>([]);
	const [dataEntry, setDataEntry] = useState<number>(1);

	const getDokumen = async (limit: number, skip: number, search: any, filter: any) => {
		const posts = await retriveData(limit, skip, search, filter)
		setPosts(posts);
		const count = await countData(search, filter)
		setDataEntry(count.length || 1);
	}

	useEffect(() => {
		getDokumen(limit, skip, search, filter)
	}, [limit, skip, search, filter])

	// console.log(posts)
	return (
		<div>
			<Suspense>
				<List posts={posts} page={currenPage} limit={limit} dataEntry={dataEntry} />
				<Table posts={posts} page={currenPage} limit={limit} dataEntry={dataEntry} />
			</Suspense >

		</div>

	)
}


