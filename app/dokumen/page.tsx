
import { retriveData } from "../../lib/firebase/firestore/service";
// import DataTable from 'react-data-table-component';


// const columns = [
//   {
//     name: 'Title'
//   },
//   {
//     name: 'Year'
//   },
// ];

// const data = [
//   {
//     id: 1,
//     title: 'Beetlejuice',
//     year: '1988',
//   },
//   {
//     id: 2,
//     title: 'Ghostbusters',
//     year: '1984',
//   },
// ]


export default async function Dokumen() {
  const users = await retriveData('user');
  return (

    <ul>
      {users && users.map((post: any) => (
        <li key={post.id}>{post.user}</li>
      ))}
    </ul>


  )
}
