import style from './styles.module.css'
import { retriveData } from '@/lib/firebase/firestore/service'
export default async function Dokumen() {
	const posts = await retriveData('header')
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
					{posts && posts.map((post: any) => (
						<tr key={post.id}>
							<td>{post.kode_dokumen}</td>
							<td>{post.nomor_aju}</td>
							<td>{post.nomor_daftar}</td>
							<td>{post.tanggal_daftar}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>




	)
}
