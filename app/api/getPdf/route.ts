import cloudinary from '@/lib/cloudinary/config';
export async function GET(request: Request) {
    // const searchParams = new URL(request.url).searchParams;
    const url = new URL(request.url);
    const query = url.searchParams.get('q');
    const path = url.searchParams.get('path');
    try {
        const results = await cloudinary.search
            .expression(`${query} AND asset_folder:${path}`)
            .execute();

        return Response.json({ url: results.resources[0].url }, { status: 200 });
    } catch (error) {
        return Response.json({ title: "File PDF tidak ditemukan", message: "Silahkan Upload File PDF terlebihdaulu" }, { status: 404 });
    }

}