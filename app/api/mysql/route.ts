
import { neon } from "@neondatabase/serverless";

/**
 * Returns all prisma migrations from the database.
 *
 * @param {Request} request
 * @returns {Promise<Object[]>}
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const data = await sql`SELECT * FROM _prisma_migrations`;
    return Response.json({ data, status: true }, { status: 200 })
}