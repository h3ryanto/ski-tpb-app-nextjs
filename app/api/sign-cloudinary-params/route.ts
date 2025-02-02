
import cloudinary from "@/lib/cloudinary/config"

export async function POST(request: Request) {
    const body = await request.json();
    const { paramsToSign } = body;

    if (!process.env.CLOUDINARY_API_SECRET) {
        throw new Error("CLOUDINARY_API_SECRET is not defined");
    }
    const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET);

    return Response.json({ signature });
}