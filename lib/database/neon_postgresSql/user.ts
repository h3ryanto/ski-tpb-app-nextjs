"use server";
import { neon } from "@neondatabase/serverless";
import { prisma } from '@/lib/prisma/init';

export async function getUser() {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const data = await sql`SELECT * FROM "User" ORDER BY id`;

    return data;

}

export async function updateUser(id: number, email: string, name: string, isAdmin: boolean, isActive: boolean) {
    try {
        await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                email: email,
                name: name,
                isAdmin: isAdmin,
                isActive: isActive,
            },
        });
        return ({ message: "success" });
    } catch (error) {
        return error;
    }

}

export async function createUser(email: string, name: string, password: string) {
    try {
        await prisma.user.create({
            data: {
                email: email,
                name: name,
                password: password,
                isAdmin: false,
                isActive: true,
            },
        })
        return ({ message: "success" });
    } catch (error) {
        return error;
    }

}

export async function resetPassword(password: string, id: number) {
    try {
        await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                password: password,
            },
        });
        return ({ status: true, message: "success" });
    } catch (error) {
        return error;
    }

}