
import { retriveData } from "../lib/firebase/service";

 
export default async function Page() {
  const users = await retriveData('user');
  return (
    <ul>
      {users && users.map((post: any)  => (
        <li key={post.id}>{post.user}</li>
      ))}
    </ul>
  )
}
