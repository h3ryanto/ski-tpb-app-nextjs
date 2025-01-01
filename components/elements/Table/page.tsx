import kodeDokumen from '@/app/utils/kodeDokumen';
import style from './styles.module.css';
import Filter from '@/components/ui/filter';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Search from '@/components/ui/search';



export default function Table({ posts, page }: { posts: any, page: number }) {
	let i = 1;

	return (
		<div className="container flex flex-col mx-auto justify-center rounded-md font-sans text-sm p-6">
			<Card>
				<CardHeader>
					<CardTitle>Dokumen Pabean</CardTitle>

				</CardHeader>
				<CardContent>
					<Search>
						<table id={style.table} className="table-auto hidden md:table">
							<thead>
								<tr className="border-b-2 border-y-slate-400 ">
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
								</tr>
							</thead>
							<tbody >
								{posts && posts.map((post: any) => (
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
									</tr>
								))}
							</tbody>
						</table>
					</Search>
				</CardContent>
				<CardFooter>
					<p>Card Footer</p>
				</CardFooter>
			</Card>


		</div >




	)
}


