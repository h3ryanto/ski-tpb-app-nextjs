import { neon } from "@neondatabase/serverless";
export async function POST(request: Request) {
    const formData = await request.formData()
    const file = formData.get('file_data')
    const fileName = formData.get('file_name')
    if (!file) {
        throw new Error('File data is missing');
    }
    const fileBuffer = Buffer.from(file.toString(), 'base64');
    console.log(formData)
    const name = fileName
    const file_pdf = fileBuffer
    const sql = neon(`${process.env.DATABASE_URL}`);
    try {
        await sql`INSERT INTO Files ('file_name','file_data') VALUE (${name},${file_pdf})`
        return Response.json({ message: "File Berhasil disimpan", status: true }, { status: 201 })
    } catch (error) {
        return Response.json({ message: error, data: file_pdf, status: false }, { status: 400 })
    }

}