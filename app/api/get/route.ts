import { list } from '@vercel/blob';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
    // const searchParams = new URL(request.url).searchParams;
    const { blobs } = await list();

    return Response.json(blobs);
}