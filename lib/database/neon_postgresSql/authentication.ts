import { prisma } from '@/lib/prisma/init'
import bcrypt from 'bcryptjs'

export const SignIn = async (email: string, password: string) => {
    try {
        const users = await prisma.user.findFirst({
            where: {
                email: email,
                isActive: true,
            }
        })

        if (users) {
            const isPassword = bcrypt.compareSync(password, users.password)
            if (isPassword) {
                return users
            }
        }


    } catch (error) {
        console.error(error)
        throw new Error("Invalid credentials.")
    }
}


export const forgotPassword = async (email: string) => {
    try {
        const users = await prisma.user.findFirst({
            where: {
                email: email,
                isActive: true,
            }
        })

        if (users) {
            return { status: true, message: "Email Found", id: users.id, name: users.name, email: users.email }
        } else {
            return { status: false, message: "Email not found" }
        }


    } catch (error) {
        console.error(error)
        throw new Error(error as string)
    }

}