
import style from './styles.module.css';
import { CalendarDaysIcon, PaperAirplaneIcon, PencilSquareIcon, UserGroupIcon } from '@heroicons/react/24/outline'

export default async function Table({ posts, page }: { posts: any, page: number }) {
	let i = 1;
	const borderColor = (kode_dokumen: string) => {
		if (kode_dokumen == '30') {
			return 'border-yellow-400';
		} else if (kode_dokumen == '23') {
			return 'border-red-400';
		} else if (kode_dokumen == '27') {
			return 'border-blue-400';
		} else if (kode_dokumen == '40') {
			return 'border-green-400';
		} else if (kode_dokumen == '262') {
			return 'border-pink-400';
		} else if (kode_dokumen == '41') {
			return 'border-cyan-400';
		} else if (kode_dokumen == '33') {
			return 'border-orange-400';
		}
	}


	return (
		<div className="container flex flex-col mx-auto justify-center rounded-md font-sans text-sm relative">
			<div className=' bg-slate-700 px-2 py-2 md:bg-inherit border-b-2 border-slate-400'>
				<label className="flex flex-row-reverse w-full ">
					<input
						id="search"
						type="text"
						name="search"
						placeholder="Search.."
						autoComplete="current-search"
						className="w-auto rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 
                      placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 
                      text-sm px-2 focus:w-full"
					/>
				</label>
			</div>
			<div className='columns-1 bg-slate-700 divide-y-2 divide-slate-400 text-slate-100  px-3 md:hidden'>
				{posts && posts.map((post: any) => (
					<div key={post.nomor_aju} className='flex items-center hover:bg-blue-400/50'>
						<div className={`flex justify-center items-center border-2 ${borderColor(post.kode_dokumen)} w-12 h-12 rounded-full mr-3`}>{post.kode_dokumen}</div>
						<div >
							<p className='flex items-center'>
								<PaperAirplaneIcon aria-hidden="true" className="h-3 w-3 marker:mr-1 stroke-red-400" />
								{post.nomor_aju}
							</p>
							<p className='flex items-center'>
								<UserGroupIcon aria-hidden="true" className="h-3 w-3 mr-1 stroke-orange-400" />
								{post.nama_entitas}
							</p>
							<p className='flex items-center'>
								<PencilSquareIcon aria-hidden="true" className="h-3 w-3 mr-1 stroke-cyan-500" />
								{post.nomor_daftar} /
								<CalendarDaysIcon aria-hidden="true" className="h-3 w-3 mr-1 ml-1 stroke-blue-400" />
								{post.ftanggal_daftar}
							</p>
						</div>
					</div>
				))}
			</div>

			<table id={style.table} className="table-auto hidden md:table">
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
					{posts && posts.map((post: any) => (
						<tr key={post.nomor_aju}>
							<td>{((page * 10) - 10) + i++}.</td>
							<td>{post.kode_dokumen}</td>
							<td>{post.nomor_aju}</td>
							<td>{post.nama_entitas}</td>
							<td>{post.nomor_daftar}</td>
							<td>{post.ftanggal_daftar}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div >




	)
}


