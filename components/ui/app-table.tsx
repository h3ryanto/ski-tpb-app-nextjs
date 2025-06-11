
import AppCopyText from '@/components/ui/app-copy-text';
import DatePickerWithRange from '@/components/ui/app-date';
import { AppDetailDokumen } from '@/components/ui/app-detail-dokumen';
import AppTooltip from '@/components/ui/app-tool-tip';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import Filter from '@/components/ui/filter';
import { FilterDokumen } from '@/components/ui/filter-dokumen';
import { PaginationWithLinks } from '@/components/ui/pagination-with-links';
import SortBy from '@/components/ui/sortBy';
import FileUpload from '@/components/ui/uploadCloudinary';
import { useToast } from "@/hooks/use-toast";
// import downloadExcelFile from '@/utils/downloadExcel';
import Entitas from '@/utils/entitas';
import kodeDokumen from '@/utils/kodeDokumen';
import { format } from "date-fns";
import { Circle, CircleCheckBigIcon, FileText, InboxIcon } from "lucide-react";
// import { redirect } from 'next/navigation';
import React from 'react';
// import SheetJSReactAoO from './app-xlsx-import';

export default function AppTable({ posts, page, limit, dataEntry, children }: { posts: any, page: number, limit: number, dataEntry: number, children?: React.ReactNode }) {
	const countData = posts.length;
	const { toast } = useToast()
	const [flag, setFlag] = React.useState<string>("")
	// console.log(Object.keys(posts[0]), 'posts')
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
			// window.location.href = '/pdf';
			window.open(`/pdf/${year}/${kode_dokumen}/${q}`)
			// redirect('/pdf');
			// window.open(`${result.url}`)
		}
	}
	return (
		<div className="mx-auto justify-center rounded-md font-sans text-sm p-6 pt-2 hidden md:block">

			<Card>
				<CardHeader className='pb-2'>
					{children}
					{/* {SheetJSReactAoO()} */}
				</CardHeader>
				<CardContent className='overflow-y-auto h-[calc(100vh-240px)]'>
					<table className="table-auto hidden md:table w-full ">
						<thead className='top-10 '>
							<tr className="border-b-2 border-y-slate-400 sticky -top-1 bg-slate-100">
								<th scope="col" className='align-top p-2'><div className='pt-2'>No.</div></th>
								<th scope="col" className='p-2'>
									<FilterDokumen>
										<SortBy sortBy='kode_dokumen'>
											<div>Dok</div>
										</SortBy>
									</FilterDokumen>
								</th>
								<th scope="col" className='p-2'>
									<Filter id="nomorAju">
										<SortBy sortBy='nomor_aju'>
											<div>Nomor Aju</div>
										</SortBy>
									</Filter>
								</th>
								<th scope="col" className='p-2'>

									<Filter id="suplier">
										<SortBy sortBy='nama_entitas'>
											<div>Supplier / Customers</div>
										</SortBy>
									</Filter>
								</th>
								<th scope="col" className='p-2'>
									<Filter id="nomorDaftar">
										<div className='mb-3'>Nomor Daftar</div>
									</Filter>
								</th>
								<th scope="col" className='p-2'>
									<div className='flex flex-col gap-1'>
										<SortBy sortBy='tanggal_daftar'>
											<div>Tanggal Daftar</div>
										</SortBy>
										<DatePickerWithRange />
									</div>
								</th>
								<th scope="col" className='p-2 '>
									<Filter id="dokumen">
										<div className='mb-3'>Dokumen</div>
									</Filter>
								</th>
								<th scope="col" className='p-2 sticky right-0'></th>
							</tr>
						</thead>
						<tbody >

							{countData && posts.map((post: any, index: number) => (
								<tr key={post.nomor_aju} className={`align-top ${flag === post.nomor_aju ? "bg-sky-400 hover:bg-sky-500" : " hover:bg-slate-100/65"}`}>
									<td className='p-2'>{((page * 10) - 10) + index + 1}.</td>
									<td className='p-2'>
										<div className='flex flex-col gap-2'>
											{post.kode_dokumen}
											<div onClick={() => { return flag && flag === post.nomor_aju ? setFlag('') : setFlag(post.nomor_aju); }}>
												{flag === post.nomor_aju
													?
													<CircleCheckBigIcon size={16} strokeWidth={3} className='cursor-pointer stroke-red-600' />
													:
													<AppTooltip title='Tandai Baris' sideAlign='top'>
														<Circle size={16} className='cursor-pointer' />
													</AppTooltip>
												}
											</div>

										</div>
									</td>
									<td className='p-2'><AppCopyText textToCopy={post.nomor_aju}>{post.nomor_aju}</AppCopyText></td>
									<td className='p-2'>
										<div className='flex flex-col gap-2'>
											<div className="font-semibold"><Entitas getEntitas={post.entitas} /></div>
										</div>
									</td>
									<td className='p-2'><AppCopyText textToCopy={post.nomor_daftar}>{post.nomor_daftar}</AppCopyText></td>
									<td className='p-2'>{format(post.tanggal_daftar, "yyyy-MM-dd")}</td>
									<td className='p-2'>{
										post.dokumen.map((dok: any) => (
											<div key={dok.id} className='flex flex-row gap-1'>
												{kodeDokumen(dok.kode_dokumen)} :<AppCopyText textToCopy={dok.nomor_dokumen}>{dok.nomor_dokumen}</AppCopyText>
											</div>
										))
									}</td>

									<td className='p-2'>
										<div className='flex flex-col gap-2 w-auto gap-x-2 items-center mx-2'>
											<AppTooltip title='Upload Dokumen' sideAlign='left'>
												<FileUpload
													file_name={post.nomor_daftar} folder={`Documens/${format(post.tanggal_daftar, "yyyy")}/${post.kode_dokumen}`} />
											</AppTooltip>

											<AppTooltip title='Lihat Dokumen' sideAlign='left'>
												<FileText size={16} className='hover:stroke-red-600 cursor-pointer' onClick={() => pdfUrl(post.nomor_daftar, format(post.tanggal_daftar, "yyyy"), post.kode_dokumen)} />
											</AppTooltip>
											<AppTooltip title='Detail Dokumen' sideAlign='left'>
												<AppDetailDokumen posts={post} />
											</AppTooltip>
											{/* <AppTooltip title='Download Excel' sideAlign='left'>
												<DownloadCloud size={16} className='hover:stroke-green-600 cursor-pointer' onClick={() => downloadExcelFile(post.nomor_aju)} />
											</AppTooltip> */}


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

