import { NextRequest, NextResponse } from "next/server";
import { retriveData} from "../../lib/firebase/firestore/service";



// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {

  const user = await retriveData('user');
  return NextResponse.json({ status: 200, message: "succes", data: user, request: request })
}


