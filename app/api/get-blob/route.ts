import { list } from '@vercel/blob';

export async function GET(request: Request) {
    const {
        folders: [firstFolder],
        blobs: rootBlobs,
    } = await list({ mode: 'folded' });

    const { folders, blobs } = await list({ mode: 'folded', prefix: firstFolder });

    return Response.json(folders);
}