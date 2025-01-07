import kodeDokumen from '@/app/utils/kodeDokumen';
import style from './styles.module.css'
import Filter from '@/components/ui/filter';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { FileText, InboxIcon } from "lucide-react"
import Search from '@/components/ui/search';
import { PaginationWithLinks } from '@/components/ui/pagination-with-links';




export default function Table({ posts, page, limit, dataEntry }: { posts: any, page: number, limit: number, dataEntry: number }) {
	let i = 1;
	const countData = posts.length;
	return (
		<div className="mx-auto justify-center rounded-md font-sans text-sm p-6 pt-2 hidden md:block">
			<Card>
				<CardHeader className='pb-2'>
					<Search><></></Search>
				</CardHeader>
				<CardContent className='overflow-y-auto h-[calc(100vh-252px)]'>


					<table id={style.table} className="table-auto hidden md:table ">
						<thead className='top-10'>
							<tr className="border-b-2 border-y-slate-400 sticky top-0 bg-slate-100">
								<th scope="col">No.</th>
								<th scope="col">
									<Filter id="kodeDokumen">
										<div>Dok</div>
									</Filter>
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
								<th scope="col">Tanggal Daftar</th>
								<th scope="col">
									<Filter id="dokumen">
										<div>Dokumen</div>
									</Filter>
								</th>
								<th scope="col"></th>
							</tr>
						</thead>

						<tbody >
							{countData && posts.map((post: any) => (
								<tr key={post.nomor_aju}>
									<td>{((page * 10) - 10) + i++}.</td>
									<td>{post.kode_dokumen}</td>
									<td>{post.nomor_aju}</td>
									<td>{post.nama_entitas}</td>
									<td>{post.nomor_daftar}</td>
									<td>{post.ftanggal_daftar}</td>
									<td>{
										post.dokumens.map((dok: any) => (
											<div key={dok.id}>
												{kodeDokumen(dok.kode_dokumen)} : {dok.nomor}
											</div>
										))
									}</td>

									<td><a href={`https://xjmmjizaw0muiipq.public.blob.vercel-storage.com/pdf/2024/${post.kode_dokumen}/${post.nomor_daftar}.pdf`} target="_blank" rel="noopener noreferrer"><FileText size={16} className='stroke-red-500' /></a></td>
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


