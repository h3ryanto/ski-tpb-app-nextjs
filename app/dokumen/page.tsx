'use client'
import Table from '@/components/ui/app-table';
import List from '@/components/ui/list';
import { countData, getData } from "@/lib/database/neon_postgresSql/posts";
import { Suspense, use, useCallback, useEffect, useMemo, useState } from "react";
import { useToast } from "@/hooks/use-toast"
import AppLoading from '@/components/ui/app-loading';
import { Button } from '@/components/ui/button';
import { RefreshCcwIcon } from 'lucide-react';


type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
export default function Dokumen(props: {
	searchParams: SearchParams
}) {
	const { toast } = useToast()
	const searchParams = use(props.searchParams)
	const search = searchParams?.query?.toString() || '';
	const kode_dokumen = searchParams?.kodeDokumen?.toString() || '';
	const nomor_aju = searchParams?.nomorAju?.toString() || '';
	const entitas = searchParams?.suplier?.toString() || '';
	const nomor_daftar = searchParams?.nomorDaftar?.toString() || '';
	const nomor_dokumen = searchParams?.dokumen?.toString() || '';
	const date_from = searchParams?.date_from?.toString() || '';
	const date_to = searchParams?.date_to?.toString() || '';
	const sortBy = searchParams?.sortBy?.toString() || '';
	const asc = searchParams?.asc?.toString() || '';
	const filter = useMemo(() => ({ kode_dokumen, nomor_aju, entitas, nomor_daftar, nomor_dokumen, date_from, date_to, sortBy, asc }), [kode_dokumen, nomor_aju, entitas, nomor_daftar, nomor_dokumen, date_from, date_to, sortBy, asc])
	const currenPage = Number(searchParams?.page) || 1;
	const limit = Number(searchParams?.pageSize) || 10;
	const skip = (currenPage - 1) * limit;
	const [posts, setPosts] = useState<any[]>([]);
	const [dataEntry, setDataEntry] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const getDokumen = useCallback(async (limit: number, skip: number, search: any, filter: any) => {
		try {
			// const result = await getData(limit, skip, search, filter)
			// console.log(result);
			setIsLoading(true);
			// const posts = await retriveData(limit, skip, search, filter)
			const posts = await getData(limit, skip, search, filter)
			// console.log(posts)
			if (posts) {
				setIsLoading(false);
			}
			setPosts(posts);
			// console.log(posts.leng);
			const count = await countData(search, filter)
			setDataEntry(count.length || 1);

		} catch (error) {
			console.error(error)
			toast({
				variant: 'destructive',
				title: "Error Conecting Server Database",
				description: `${error}`,
			})
		}

	}, [toast])

	useEffect(() => {
		getDokumen(limit, skip, search, filter)
	}, [limit, skip, search, filter, getDokumen])

	// console.log(posts)
	return (

		<Suspense>
			<List posts={posts} page={currenPage} limit={limit} dataEntry={dataEntry} />
			<Table posts={posts} page={currenPage} limit={limit} dataEntry={dataEntry}>
				<Button className='flex flex-row w-fit' onClick={() => getDokumen(limit, skip, search, filter)}><RefreshCcwIcon className={isLoading ? 'animate-spin' : ''} />Muat Ulang</Button>
			</Table>
			<AppLoading isLoading={isLoading} />
		</Suspense >



	)
}


