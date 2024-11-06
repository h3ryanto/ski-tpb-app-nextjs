import { sql } from "@vercel/postgres";
import style from './styles.module.css';
import formatDate from '@/lib/date/date';




export default async function Dokumen() {
	const { rows } = await sql`SELECT * FROM headers LIMIT 10`;

	return (
		<div className="container mx-auto px-4">
			<table id={style.table} className="table table-striped">
				<thead>
					<tr>
						<th scope="col">Dok</th>
						<th scope="col">Nomor Aju</th>
						<th scope="col">Nomor Daftar</th>
						<th scope="col">Tanggal Daftar</th>
					</tr>
				</thead>
				<tbody>
					{rows && rows.map((post: any) => (
						<tr key={post.id}>
							<td>{post.kode_dokumen}</td>
							<td>{post.nomor_aju}</td>
							<td>{post.nomor_daftar}</td>
							<td>{formatDate(post.nomor_daftar)}</td>

						</tr>
					))}
				</tbody>
			</table>
		</div>




	)
}


