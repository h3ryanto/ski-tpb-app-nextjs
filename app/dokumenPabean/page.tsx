import { getData } from "@/database/postgresSql/posts";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
export default async function DokumenPabean(props: {
	searchParams: SearchParams
}) {
	const { query, page, pageSize } = await props.searchParams;
	const currenPage = Number(page) || 1;
	const limit = Number(pageSize) || 10;
	const skip = (currenPage - 1) * limit;

	const resultData = await getData(limit, skip, query?.toString() || "");
	console.log(resultData)


	// const totalPage = Math.round(dataEntry / limit)
	let i = 1;


	return (

		<div>
			<table className="table-auto hidden md:table">
				<thead>
					<tr className="border-b-2 border-y-slate-400 ">
						<th scope="col">No.</th>
						<th scope="col">
							<div>Dok</div>
							<input
								id="dokumen"
								type="text"
								name="dokumen"
								autoComplete="current-dokumen"
								className="w-10 font-normal rounded-md border-0 py-1 px-1 shadow-sm ring-1 ring-inset ring-blue-300 focus:ring-1 focus:ring-inset focus:ring-blue-400 my-1"
							/>
						</th>
						<th scope="col">
							<div>Nomor Aju</div>
							<input
								id="nomorAju"
								type="text"
								name="nomorAju"
								autoComplete="current-dokumen"
								className="w-auto font-normal rounded-md border-0 py-1 px-1 shadow-sm ring-1 ring-inset ring-blue-300 focus:ring-1 focus:ring-inset focus:ring-blue-400 my-1"
							/>
						</th>
						<th scope="col">
							<div>Supllier / Customers</div>
							<input
								id="supllier"
								type="text"
								name="supllier"
								autoComplete="current-dokumen"
								className="w-auto font-normal rounded-md border-0 py-1 px-1 shadow-sm ring-1 ring-inset ring-blue-300 focus:ring-1 focus:ring-inset focus:ring-blue-400 my-1"
							/>
						</th>
						<th scope="col">
							<div>Nomor Daftar</div>
							<input
								id="nomorDaftar"
								type="text"
								name="nomorDaftar"
								autoComplete="current-dokumen"
								className="w-24 rounded-md border-0 py-1 px-1 shadow-sm ring-1 ring-inset ring-blue-300 focus:ring-1 focus:ring-inset focus:ring-blue-400 my-1"
							/>
						</th>
						<th scope="col">Tanggal Daftar</th>
					</tr>
				</thead>
				<tbody >
					{resultData.posts && resultData.posts.map((post: any) => (
						<tr key={post.nomor_aju}>
							<td>{((currenPage * 10) - 10) + i++}.</td>
							<td>{post.kode_dokumen}</td>
							<td>{post.nomor_aju}</td>
							<td>{ }</td>
							<td>{post.nomor_daftar}</td>
							<td>{post.tanggal_daftar.toLocaleDateString("id-ID")}</td>
						</tr>
					))}
				</tbody>
			</table>



		</div>

	)
}


