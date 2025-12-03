
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
import FileUpload from '@/components/ui/uploadCloudinary';
import Entitas from '@/utils/entitas';
import kodeDokumen from '@/utils/kodeDokumen';
import { format } from "date-fns";
import { Circle, CircleCheckBigIcon, FileTextIcon, InboxIcon, Trash } from "lucide-react";
import React from 'react';
import { useToast } from "@/hooks/use-toast";

export default function AppTableList({ posts, page, page_size, limit, dataEntry, children, refreshTriggerHandler, refreshTrigger }: { posts: any, page: number, page_size: number, limit: number, dataEntry: number, children?: React.ReactNode, refreshTriggerHandler: () => void, refreshTrigger: number }) {
	const countData = posts.length;
	const [flag, setFlag] = React.useState<string>("")
	const { toast } = useToast()
	const handleDelete = async (id: number) => {
		const confirmDelete = window.confirm("Apakah kamu yakin ingin menghapus data ini?");
		if (!confirmDelete) return;
		try {
			const response = await fetch(`/api/delete-dokumen`, {
				method: 'DELETE',
				body: JSON.stringify({
					id: id
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (response.ok) {
				toast({
					title: "Delete Data Berhasil",
					description: "Data berhasil dihapus",
				})
				refreshTriggerHandler();
			} else {
				toast({
					variant: "destructive",
					title: "Gagal Tambah User",
					description: 'Failed to delete dokumen',
				})
			}
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Gagal Tambah User",
				description: error instanceof Error ? error.message : 'An unknown error occurred',
			})
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
								<th scope="col" className='p-3'>
									<FilterDokumen>
										<div className='mb-3'>Dok</div>
									</FilterDokumen>
								</th>
								<th scope="col" className='p-3'>
									<Filter id="nomorAju">
										<div className='mb-3'>Nomor Aju</div>
									</Filter>
								</th>
								<th scope="col" className='p-3'>
									<Filter id="suplier">
										<div className='mb-3'>Supplier / Customers</div>
									</Filter>
								</th>
								<th scope="col" className='p-3'>
									<Filter id="nomorDaftar">
										<div className='mb-3'>Nomor Daftar</div>
									</Filter>
								</th>
								<th scope="col" className='p-2'>
									<div className='flex flex-col gap-1'>

										<div className='mb-3'>Tanggal Daftar</div>

										<DatePickerWithRange />
									</div>
								</th>
								<th scope="col" className='p-2'>
									<Filter id="dokumen">
										<div className='mb-3'>Dokumen</div>
									</Filter>
								</th>
								<th scope="col" className='p-3 sticky right-0'></th>
							</tr>
						</thead>
						<tbody >

							{countData && posts.map((post: any, index: number) => (
								<tr key={post.nomor_aju} className={`align-top ${flag === post.nomor_aju ? "bg-sky-400 hover:bg-sky-500" : " hover:bg-slate-100/65"}`}>
									<td className='p-2'>{((page * page_size) - page_size) + index + 1}.</td>
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
											<div className="font-semibold"><Entitas getEntitas={post.entitas} kode_dokumen={post.kode_dokumen} /></div>
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
													file_name={post.nomor_daftar} tahun={format(post.tanggal_daftar, "yyyy")} kode_dokumen={post.kode_dokumen} onUploadSuccess={refreshTriggerHandler} />
											</AppTooltip>

											<AppTooltip title='Lihat Dokumen' sideAlign='left'>
												{post.pdf_exists ? (
													<FileTextIcon
														size={16}
														className="hover:stroke-red-500 cursor-pointer stroke-red-700"
														onClick={() => {
															const pdfUrl = `/api/pdf/${format(post.tanggal_daftar, "yyyy")}/${post.kode_dokumen}/${post.nomor_daftar}.pdf`;
															window.open(pdfUrl, '_blank');
														}}
													/>
												) : (
													<FileTextIcon
														size={16}
														className="cursor-not-allowed stroke-gray-400 hover:stroke-gray-600"
													/>
												)}

											</AppTooltip>
											<AppTooltip title='Detail Dokumen' sideAlign='left'>
												<AppDetailDokumen posts={post} />
											</AppTooltip>
											<AppTooltip title='Delete Dokumen' sideAlign='left'>
												<Trash size={16} className='hover:stroke-red-600 cursor-pointer' onClick={() => handleDelete(post.id)} />
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

