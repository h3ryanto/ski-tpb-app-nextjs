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
import { FileText, InboxIcon, UploadCloud } from "lucide-react";
import style from './styles.module.css';
import { FilterDokumen } from '@/components/ui/filter-dokumen';
import { useToast } from "@/hooks/use-toast"
import DatePickerWithRange from '@/components/ui/app-date';
import AppTooltip from '@/components/ui/app-tool-tip';
import WidgetCloudinary from '@/components/ui/widget-cloudinary';
import SortBy from '@/components/ui/sortBy';
import AppCopyText from '@/components/ui/app-copy-text';


export default function Table({ posts, page, limit, dataEntry }: { posts: any, page: number, limit: number, dataEntry: number }) {
	const countData = posts.length;
	const { toast } = useToast()
	// console.log(posts)
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
								<th scope="col" className='align-top'><div className='pt-2'>No.</div></th>
								<th scope="col">
									<FilterDokumen>
										<SortBy sortBy='kode_dokumen'>
											<div>Dok</div>
										</SortBy>
									</FilterDokumen>
								</th>
								<th scope="col">
									<Filter id="nomorAju">
										<SortBy sortBy='nomor_aju'>
											<div>Nomor Aju</div>
										</SortBy>
									</Filter>
								</th>
								<th scope="col">

									<Filter id="suplier">
										<SortBy sortBy='nama_entitas'>
											<div>Supllier / Customers</div>
										</SortBy>
									</Filter>
								</th>
								<th scope="col">
									<Filter id="nomorDaftar">
										<div className='mb-3'>Nomor Daftar</div>
									</Filter>
								</th>
								<th scope="col">
									<div className='flex flex-col gap-4'>
										<SortBy sortBy='tanggal_daftar'>
											<div>Tanggal Daftar</div>
										</SortBy>
										<DatePickerWithRange />
									</div>
								</th>
								<th scope="col">
									<Filter id="dokumen">
										<div className='mb-3'>Dokumen</div>
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
									<td><AppCopyText textToCopy={post.nomor_aju}>{post.nomor_aju}</AppCopyText></td>
									<td>
										<div className='flex flex-col gap-2'>
											<div className="font-semibold">{post.nama_entitas}</div>
											{post.nomor_identitas &&
												<div className='text-xs'>
													{((post.nomor_identitas).length === 15) ?
														(<div>
															<p>NPWP 15 DIGIT : {post.nomor_identitas}</p>
															<p>NPWP 16 DIGIT : {'0' + post.nomor_identitas}</p>
															<p className='flex flex-row'>
																NITKU :
																<AppCopyText textToCopy={'0' + post.nomor_identitas + '000000'}>
																	{'0' + post.nomor_identitas + '000000'}
																</AppCopyText>
															</p>
														</div>)
														:
														(<div>
															<p className='flex flex-row'>
																NITKU :
																<AppCopyText textToCopy={post.nomor_identitas}>
																	{post.nomor_identitas}
																</AppCopyText>
															</p>
														</div>)
													}

													{post.nib_entitas &&
														<div>
															<p className='flex flex-row'>
																NIB :
																<AppCopyText textToCopy={post.nib_entitas}>
																	{post.nib_entitas}
																</AppCopyText>
															</p>
														</div>
													}
												</div>
											}
										</div>
									</td>
									<td><AppCopyText textToCopy={post.nomor_daftar}>{post.nomor_daftar}</AppCopyText></td>
									<td>{post.ftanggal_daftar}</td>
									<td>{
										post.dokumens.map((dok: any) => (
											<div key={dok.id} className='flex flex-row gap-1'>
												{kodeDokumen(dok.kode_dokumen)} :<AppCopyText textToCopy={dok.nomor_dokumen}>{dok.nomor_dokumen}</AppCopyText>
											</div>
										))
									}</td>

									<td>
										<div className='flex flex-col gap-2 w-auto gap-x-2 items-center mx-2'>
											<AppTooltip title='Upload Dokumen' sideAlign='left'>
												<WidgetCloudinary fileName={post.nomor_daftar} folderName={`Documens/${post.tahun}/${post.kode_dokumen}`}>
													<UploadCloud size={16} className='hover:stroke-blue-600' />
												</WidgetCloudinary>
											</AppTooltip>

											<AppTooltip title='Lihat Dokumen' sideAlign='left'>
												<FileText size={16} className='hover:stroke-red-600 cursor-pointer' onClick={() => pdfUrl(post.nomor_daftar, post.tahun, post.kode_dokumen)} />
											</AppTooltip>
											<AppTooltip title='Detail Dokumen' sideAlign='left'>
												<AppDetailDokumen posts={post} />
											</AppTooltip>

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

