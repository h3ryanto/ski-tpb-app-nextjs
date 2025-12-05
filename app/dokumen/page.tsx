'use client'
import Table from '@/components/ui/app-table';
import List from '@/components/ui/list';
import { Suspense, use, useCallback, useEffect, useMemo, useState } from "react";
import { useToast } from "@/hooks/use-toast"
import AppLoading from '@/components/ui/app-loading';
import { Button } from '@/components/ui/button';
import { RefreshCcwIcon } from 'lucide-react';
import { Search } from '@/components/ui/app-search';
import { ImportDataExcell } from '@/components/ui/app-import-excel';
import { useSession } from 'next-auth/react';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
export default function Dokumen(props: {
	searchParams: SearchParams
}) {
	const session = useSession();
	const { toast } = useToast()
	const searchParams = use(props.searchParams)
	const search = searchParams?.query?.toString() || '';
	const kode_dokumen = searchParams?.kodeDokumen?.toString() || '';
	const nomor_aju = searchParams?.nomorAju?.toString() || '';
	const entitas = searchParams?.suplier?.toString() || '';
	const nomor_daftar = searchParams?.nomorDaftar?.toString() || '';
	const no_dokumen = searchParams?.dokumen?.toString() || '';
	const date_from = searchParams?.date_from?.toString() || '';
	const date_to = searchParams?.date_to?.toString() || '';
	const sortBy = searchParams?.sortBy?.toString() || '';
	const asc = searchParams?.asc?.toString() || '';
	const kode_valuta = searchParams?.kodeValuta?.toString() || '';
	const filter = useMemo(() => ({ kode_dokumen, nomor_aju, entitas, nomor_daftar, no_dokumen, date_from, date_to, sortBy, asc, kode_valuta }), [kode_dokumen, nomor_aju, entitas, nomor_daftar, no_dokumen, date_from, date_to, sortBy, asc, kode_valuta])
	const currenPage = Number(searchParams?.page) || 1;
	const page_size = Number(searchParams?.pageSize) || 10;
	const limit = Number(searchParams?.pageSize) || 10;
	const skip = (currenPage - 1) * limit;
	const [posts, setPosts] = useState<any[]>([]);
	const [dataEntry, setDataEntry] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

	const reloadTriggerHandler = () => {
		// Naikkan angka → trigger useEffect di AppPdfLinkIcon
		setRefreshTrigger(prev => prev + 1);
	};



	const getDokumen = useCallback(async (limit: number, skip: number, search: any, filter: any) => {
		try {
			setIsLoading(true);
			const data = await fetch('/api/get', {
				method: 'POST',
				body: JSON.stringify({
					query: search,
					skip: skip,
					limit: limit,
					filter: filter,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			})
			if (data) {
				const posts = await data.json()

				if (posts.posts) {
					setIsLoading(false);
					setPosts(posts.posts);
					setDataEntry(posts.count.count || 1);
				}
			}
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
			<Table posts={posts} page={currenPage} page_size={page_size} limit={limit} dataEntry={dataEntry} reloadTriggerHandler={reloadTriggerHandler} refreshTrigger={refreshTrigger} >
				<div className='flex flex-row gap-3'>
					<Button className='flex flex-row w-fit' onClick={() => { getDokumen(limit, skip, search, filter); reloadTriggerHandler(); }}><RefreshCcwIcon className={isLoading ? 'animate-spin' : ''} />Muat Ulang</Button>
					{session.data?.user?.isAdmin && (
						<div className='flex items-center'>
							<ImportDataExcell saveUrl='/api/save-data' reload={async () => { reloadTriggerHandler(); }} />
						</div>
					)}
					<div className='flex items-center'>
						<Search />
					</div>
				</div>
			</Table>
			<AppLoading isLoading={isLoading} />
		</Suspense >



	)
}


