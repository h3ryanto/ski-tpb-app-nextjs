import { prisma } from '@/lib/prisma/db'


export async function retriveData(limit: number = 10, skip: number = 0) {

    const posts = await prisma.header.findMany({
        skip: skip,
        take: limit,
    })
    const headerCount = await prisma.header.count()
    return { posts, headerCount };
}
retriveData()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })