import { getToken } from "next-auth/jwt";

export async function POST(req: Request) {
    try {
        const body = await req.json()
        console.log(JSON.stringify(body, null, 2));
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
        const array = body.result[0].data
        const data = { data: array };

        console.log(JSON.stringify(data, null, 2));



        // console.log(golangForm)
        const response = await fetch(`${process.env.API_URL}/bom`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token ?? ''}`,
            },
            body: JSON.stringify(data),
        });
        console.log(response, "respons dari golang")

        if (!response.ok) {
            const text = await response.json();
            return Response.json({ error: text.data.message }, { status: response.status });
        }


        if (response.ok) {
            const result = await response.json(); // atau .json() kalau Golang kirim JSON
            console.log(result.data.message, "respons Berhasil dari golang")
            return Response.json({ message: result.data.message, status: 200 }, { status: 200 });
        }

    } catch (err: any) {
        console.error(err);
        return Response.json({ error: err?.message ?? 'Unknown error' }, { status: 500 });
    }
}
