// import { headers } from "next/headers"

export async function GET() {
    const respons = Response.json(
      { 
        data:[
              {message: 'Hello World' },
              {message: 'Selamat pagi Dunia' }
        ]
      },
      { status: 200 , statusText: 'OK',
      headers:{'content-type': 'application/json'}}
            )

           
    return respons
  }

  