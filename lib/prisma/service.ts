import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
//----------------------------------------------------------------------------------------------------------//
// export async function retriveData(limit: number = 10, skip: number = 0){
  
//   const posts = await prisma.header.findMany({
//     skip: skip,
//     take: limit,
//   })
//   const headerCount = await prisma.header.count()
//   return {posts,headerCount};
// }
// retriveData()
//     .then(async () => {
//         await prisma.$disconnect()
//     })
//     .catch(async (e) => {
//         console.error(e)
//         await prisma.$disconnect()
//         process.exit(1)
//     })




    // export async function create(){
    //   await prisma.user.create({
    //     data: {
    //       email:"herry@sankyo.co.id",
    //       name:"Hery"
    //     }
    //   })
    // }
    

