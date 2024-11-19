'use server'
import { prisma } from '@/lib/prisma/service'



export async function create(){
    const dataUser = {
         email:"herry@sankyo.co.id",
          name:"Hery"
    }
      await prisma.user.create({
        data: {...dataUser
         
        }
      })
    }

    create()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

    