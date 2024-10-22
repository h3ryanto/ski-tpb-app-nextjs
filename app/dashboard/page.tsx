import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react"

export default async function About() {

  let data = await fetch('https://api.vercel.app/blog')
  let posts = await data.json()

  return (
    <ul>
      {posts.map((post: { id: Key | null | undefined; title: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined }) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}