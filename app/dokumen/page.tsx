import { sql } from "@vercel/postgres";
import style from './styles.module.css';




export default async function Dokumen() {

	const { rows } = await sql`SELECT headers.id,headers.kode_dokumen,headers.nomor_aju,headers.nomor_daftar, 
								TO_CHAR(headers.tanggal_daftar, 'DD/MM/YYYY') AS ftanggal_daftar,entitas.nama_entitas
								FROM headers 
								INNER JOIN entitas ON entitas.nomor_aju = headers.nomor_aju 
								WHERE entitas.kode_entitas = 
								(CASE
									WHEN headers.kode_dokumen ='23' THEN '3'
									WHEN headers.kode_dokumen ='40' THEN '5'
									WHEN headers.kode_dokumen ='27' THEN '3'
									WHEN headers.kode_dokumen ='30' THEN '6'
									WHEN headers.kode_dokumen ='262' THEN '9'
									WHEN headers.kode_dokumen ='261' THEN '8'
									WHEN headers.kode_dokumen ='41' THEN '8'
									WHEN headers.kode_dokumen ='25' THEN '8'
									WHEN headers.kode_dokumen ='33' THEN '8'
								END)
								ORDER BY headers.created_at DESC
								LIMIT 10`;
	// const count: any = await sql`SELECT COUNT(*) FROM headers`;
	// setData(rows);
	// const countEntry = count.rows[0];
	// console.log(rows);


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
			<div className='columns-1 bg-slate-700 divide-y-2 divide-slate-400 text-slate-100  px-3 md:hidden'>
				{rows && rows.map((post: any) => (
					<div key={post.id} className='flex items-center hover:bg-blue-400/50'>
						<div className={`flex justify-center items-center border-2 ${borderColor(post.kode_dokumen)} w-12 h-12 rounded-full mr-3`}>{post.kode_dokumen}</div>
						<div>
							<p>{post.nomor_aju}</p>
							<p>{post.nomor_daftar} / {post.ftanggal_daftar}</p>
							<p>{post.kode_dokumen}</p>
						</div>
					</div>
				))}
			</div>
			<table id={style.table} className="table-auto hidden md:table">
				<thead>
					<tr className="border-b-2 border-y-slate-400 ">

						<th scope="col">Dok</th>
						<th scope="col">Nomor Aju</th>
						<th scope="col">Nomor Daftar</th>
						<th scope="col">Tanggal Daftar</th>
					</tr>
				</thead>
				<tbody >
					{rows && rows.map((post: any) => (

						<tr key={post.id}>

							<td>{post.kode_dokumen}</td>
							<td>{post.nomor_aju}</td>
							<td>{post.nomor_daftar}</td>
							<td>{post.ftanggal_daftar}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className='flex justify-center mx-auto bg-slate-800 min-w-full py-2'>

				<div className="relative flex items-center justify-between max-w-sm mx-auto text-slate-100">
					<button className=" hover:border-blue-500  hover:text-blue-500 p-2 rounded-md border-2">Previous</button>
					<div className='mx-2'>Page : 	 to 	 of 	data entris </div>
					<button className="hover:border-blue-500 hover:text-blue-500 p-2 rounded-md border-2">Next</button>
				</div>
			</div>

		</div >




	)
}


