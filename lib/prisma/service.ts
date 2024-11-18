import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export async function retriveData(limit: number = 10, skip: number = 0){
  
  const posts = await prisma.header.findMany({
    skip: skip,
    take: limit,
  })
//   const posts = header.map(async (x) =>{
// return {...x}
//   })

  const headerCount = await prisma.header.count()
  return {posts,headerCount};
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



    export async function getHeaderPost(limit: number = 10, skip: number = 0){
  
      const posts = await prisma.$queryRaw`SELECT header.id,header.kode_dokumen,header.nomor_aju,header.nomor_daftar, 
                                          header.tanggal_daftar,entitas.nama_entitas FROM header 
                                          LEFT JOIN entitas 
                                          ON entitas.nomor_aju = header.nomor_aju 
                                          WHERE entitas.kode_entitas = 
                                          (CASE
                                              WHEN header.kode_dokumen ='23' THEN '3'
                                              WHEN header.kode_dokumen ='40' THEN '5'
                                              WHEN header.kode_dokumen ='27' THEN '3'
                                              WHEN header.kode_dokumen ='30' THEN '6'
                                              WHEN header.kode_dokumen ='262' THEN '9'
                                              WHEN header.kode_dokumen ='261' THEN '8'
                                              WHEN header.kode_dokumen ='41' THEN '8'
                                              WHEN header.kode_dokumen ='25' THEN '8'
                                              WHEN header.kode_dokumen ='33' THEN '8'
                                          END)
                                          LIMIT ${limit} OFFSET ${skip}`
    
       const headerCount = await prisma.header.count()
  return {posts,headerCount};
    }
    getHeaderPost()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })    