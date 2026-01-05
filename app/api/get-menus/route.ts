import { getToken } from "next-auth/jwt";
import axios from "axios";
import { auth } from "@/auth";

export async function GET(req: Request) {
  const session = await auth();
  if (!session) {
    return Response.json(
      { message: "Unauthorized" },
      {
        status: 401,
        statusText: "Unauthorized",
        headers: { "content-type": "application/json" },
      }
    );
  }

  const jwt =
    (await getToken({
      req,
      secret: process.env.AUTH_SECRET,
      cookieName: "__Secure-authjs.session-token",
    })) ||
    (await getToken({
      req,
      secret: process.env.AUTH_SECRET,
      cookieName: "authjs.session-token",
    }));
  const token = jwt?.accessToken;
  const roleId = jwt?.roleId;
  //   console.log("🚀 ~ file: route.ts:26 ~ GET ~ roleId:", roleId);
  const res = await axios.get(`${process.env.API_URL}/menu-actions/${roleId}`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return Response.json(res.data);
}
