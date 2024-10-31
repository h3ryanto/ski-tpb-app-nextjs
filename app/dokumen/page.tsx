"use client"
import DataTable from 'react-data-table-component';


const columns = [
	{
		name: 'Title'
	},
	{
		name: 'Year',
	},
];

const data = [
  	{
		id: 1,
		title: 'Beetlejuice',
		year: '1988',
	},
	{
		id: 2,
		title: 'Ghostbusters',
		year: '1984',
	},
]


export default function Dokumen() {
  return (

      <DataTable
			columns={columns}
			data={data}
		/>
     

   


  )
}
