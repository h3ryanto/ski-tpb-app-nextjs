import { sql } from "@vercel/postgres";
import Pagination from '@/components/elements/Pagination/page';
import Table from '@/components/elements/Table/page';
import { Suspense } from "react";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
export default async function Dokumen(props: {
	searchParams: SearchParams
}) {
	const { page } = await props.searchParams;

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
								LIMIT 10 offset ${Number(page) * 10 - 10}`;
	const count: any = await sql`SELECT COUNT(*) FROM headers`;
	const countrResults: any = count.rows[0].count;
	console.log(countrResults);


	return (
		<Pagination dataEntry={countrResults}>
			<Suspense >
				<Table posts={rows} />
			</Suspense >

		</Pagination>
	)
}


