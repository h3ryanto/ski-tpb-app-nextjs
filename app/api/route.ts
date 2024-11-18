// import { type NextRequest } from 'next/server'
import { tambahData } from '@/lib/firebase/firestore/service'
 
export async function POST(req: Request) {
    try {

    const data = await req.json()
    await tambahData(data)
        // return new Response(JSON.stringify(result))
  
//   const requestHeaders = new Headers(request.headers)
  return new Response(JSON.stringify({ status: 'Success' }), {
    status: 200})
  
} catch (error: any) {
    console.error(error)    
  }

}


