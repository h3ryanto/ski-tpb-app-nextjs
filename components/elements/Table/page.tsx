import kodeDokumen from '@/utils/kodeDokumen';
import { AppDetailDokumen } from '@/components/ui/app-detail-dokumen';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import Filter from '@/components/ui/filter';
import { PaginationWithLinks } from '@/components/ui/pagination-with-links';
import Search from '@/components/ui/search';
import { FileText, InboxIcon } from "lucide-react";
import style from './styles.module.css';
import { FilterDokumen } from '@/components/ui/filter-dokumen';
import { useToast } from "@/hooks/use-toast"
import DatePickerWithRange from '@/components/ui/app-date';


export default function Table({ posts, page, limit, dataEntry }: { posts: any, page: number, limit: number, dataEntry: number }) {
	const countData = posts.length;
	const { toast } = useToast()

	const pdfUrl = async (q: string, year: string, kode_dokumen: string) => {
		const data = await fetch(`/api/getPdf?q=${q}&path=Documens/${year}/${kode_dokumen}`)
		const result = await data.json()
		// console.log(result)
		if (data.status === 404) {
			toast({
				variant: "destructive",
				title: result.title,
				description: result.message,
			})
		}
		if ((result.url) && (data.status === 200)) {
			window.open(result.url)
			// redirect(posts);
		}
	}
	return (
		<div className="mx-auto justify-center rounded-md font-sans text-sm p-6 pt-2 hidden md:block">

			<Card>
				<CardHeader className='pb-2'>
					<Search><></></Search>
				</CardHeader>
				<CardContent className='overflow-y-auto h-[calc(100vh-252px)]'>
					<table id={style.table} className="table-auto hidden md:table ">
						<thead className='top-10'>
							<tr className="border-b-2 border-y-slate-400 sticky -top-1 bg-slate-100">
								<th scope="col">No.</th>
								<th scope="col">
									<FilterDokumen>
										<div>Dok</div>
									</FilterDokumen>
								</th>
								<th scope="col">
									<Filter id="nomorAju">
										<div>Nomor Aju</div>
									</Filter>
								</th>
								<th scope="col">

									<Filter id="suplier">
										<div>Supllier / Customers</div>
									</Filter>
								</th>
								<th scope="col">
									<Filter id="nomorDaftar">
										<div>Nomor Daftar</div>
									</Filter>
								</th>
								<th scope="col">
									<div className='flex flex-col gap-4'>
										Tanggal Daftar
										<DatePickerWithRange />
									</div>
								</th>
								<th scope="col">
									<Filter id="dokumen">
										<div>Dokumen</div>
									</Filter>
								</th>
								<th scope="col"></th>
							</tr>
						</thead>
						<tbody >

							{countData && posts.map((post: any, index: number) => (
								<tr key={post.nomor_aju} className='align-top'>
									<td>{((page * 10) - 10) + index + 1}.</td>
									<td>{post.kode_dokumen}</td>
									<td>{post.nomor_aju}</td>
									<td>{post.nama_entitas}</td>
									<td>{post.nomor_daftar}</td>
									<td>{post.ftanggal_daftar}</td>
									<td>{
										post.dokumens.map((dok: any) => (
											<div key={dok.id}>
												{kodeDokumen(dok.kode_dokumen)} : {dok.nomor_dokumen}
											</div>
										))
									}</td>

									<td>
										<div className='flex w-auto gap-x-2 items-center mx-2'>
											<FileText size={16} className='hover:stroke-red-600' onClick={() => pdfUrl(post.nomor_daftar, post.tahun, post.kode_dokumen)} />
											{/* <ActionMenu post={posts}><Button variant="ghost" className='group w-5 h-10 hover:bg-inherit'><EllipsisVertical size={16} className='group-hover:stroke-cyan-500' /></Button></ActionMenu> */}
											<AppDetailDokumen posts={post} />
										</div>

									</td>
								</tr>
							)) || <tr><td colSpan={7} className="text-center text-slate-700"><span className='flex flex-col items-center'><InboxIcon />Data tidak ditemukan</span></td></tr>}
						</tbody>
					</table>
				</CardContent>
				<CardFooter>
					<div className="container flex justify-center mx-auto py-3 border-t-2 border-slate-400 md:border-t-0 text-slate-100 bg-slate-700 md:bg-inherit md:text-inherit">
						<PaginationWithLinks page={page} pageSize={limit} totalCount={dataEntry} pageSizeSelectOptions={{ pageSizeOptions: [10, 20, 50, 100] }} />

					</div>
				</CardFooter>
			</Card >


		</div >




	)
}

