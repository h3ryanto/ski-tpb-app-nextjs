/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import Link from 'next/link'
import Image from 'next/image'
import React, { useState, FormEvent, useEffect } from 'react'
import login_sm from "@/public/svg/login_sm.svg"
import login_md from "@/public/svg/login_md.svg"
import { z } from 'zod'
import bcrypt from 'bcryptjs';
import { useToast } from "@/hooks/use-toast";

export default function ResetPassword() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [noMatch, setNoMatch] = useState<string | undefined>(undefined)
    const { toast } = useToast()
    const formRef = React.useRef<HTMLFormElement>(null); // Tambahkan ref untuk form

    const schema = z.object({
        password: z.string().min(6),
        password_confirmation: z.string().min(6),
    });

    const formAction = async (formData: FormData) => {
        // const message = formData.get('nama') as string
        setIsLoading(true)
        const validatedFields = schema.safeParse({
            password: formData.get('password'),
            password_confirmation: formData.get('password_confirmation'),
        })

        if (!validatedFields.success) {
            displayValidationErrors(validatedFields.error);
            setIsLoading(false)
        } else {
            const searchParams = new URLSearchParams(window.location.search);
            const token = searchParams.get('token');

            if (!token) {
                setIsLoading(false)
                toast({
                    variant: "destructive",
                    title: "Tautan tidak valid",
                    description: "Tautan reset password tidak valid.",
                })
                setError("Tautan reset password tidak valid. Silahkan melakukan request untuk reset password.");
                return;
            }

            const res = await fetch('/api/reset-password', {
                method: 'POST',
                body: JSON.stringify({
                    password: bcrypt.hashSync(validatedFields.data.password),
                }),

                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (res.status === 200) {

                setIsSuccess(true)
                toast({
                    title: "Reset Password Berhasil",
                    description: "Password berhsil berhasil diubah.",
                })
            }
            if (res.status === 403) {
                toast({
                    variant: "destructive",
                    title: "Tautan Expiered",
                    description: "Tautan reset password anda sudah kadaluarsa, silahkan melakukan request ulang",
                })
                setError("Tautan reset password anda sudah kadaluarsa, silahkan melakukan request ulang.")
            }
            if (res.status === 400) {
                toast({
                    variant: "destructive",
                    title: "Reset Password gagal",
                    description: "Gagal mereset password, silahkan coba lagi.",
                })
                setError("Tautan reset password anda sudah kadaluarsa, silahkan melakukan request ulang.")
            }
            if (res.status) {
                setIsLoading(false)
            }
        }

    }

    const displayValidationErrors = (errors: z.ZodError) => {
        errors.errors.forEach((error) => {
            const field = document.getElementById(String(error.path[0])) as HTMLInputElement | null;
            if (field) {
                const errorSpan = document.createElement("span");
                errorSpan.className = "text-sm italic text-red-500";
                errorSpan.textContent = error.message;

                // Remove existing error message if present
                const existingError = field.parentElement?.querySelector(".text-red-500");
                if (existingError) {
                    existingError.remove();
                }

                // Append the error message
                field.parentElement?.appendChild(errorSpan);
            }
        });
    };

    const clearValidationError = (fieldId: string) => {
        const field = document.getElementById(fieldId) as HTMLInputElement | null;
        if (field) {
            const existingError = field.parentElement?.querySelector(".text-red-500");
            if (existingError) {
                existingError.remove();
            }
        }
    };


    async function passwordMatch(password: string, passwordConfirm: string) {
        clearValidationError('password_confirmation')
        clearValidationError('password')
        if ((password !== passwordConfirm) && passwordConfirm.length > 0) {
            setNoMatch("Password tidak sama!")
        } else {
            setNoMatch(undefined)
        }


    }


    return (
        <div className="w-screen h-svh mx-auto flex flex-col items-center md:justify-center bg-white">


            <div className="container mx-auto flex flex-col items-center py-10 z-20
                      md:flex-row md:justify-between md:items-center md:max-w-[100vw]:">
                <div className="hidden md:block md:basis-1/2">
                    <Image
                        src={login_md}
                        alt="Login"
                        width={500}
                        height={500}
                        className='bg-transparent z-10 max-w-[50vh]]' />
                </div>

                <div className="rounded-xl py-5 mb-10 w-full px-14
                        sm:max-w-md md:basis-1/2 ">

                    {!isSuccess &&
                        <div>
                            <div className="flex justify-center items-center ">
                                <h1 className="font-sans text-slate-400 dark:text-white text-justify">
                                    Silahkan masukan password baru anda untuk mereset password.
                                </h1>
                            </div>
                            <div className="mt-5 mx-auto ">
                                <form ref={formRef}
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        formAction(new FormData(e.currentTarget));
                                    }} className="flex flex-col gap-4">
                                    <div>
                                        <label className="block">
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                required
                                                onKeyUp={(e) => passwordMatch(e.currentTarget.value, (document.getElementById('password-confirm') as HTMLInputElement)?.value || '')}
                                                autoComplete="password"
                                                placeholder="Password Baru"
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 
                      placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 
                      text-sm sm:leading-6 text-slate-800 focus:invalid:border-red-500 focus:invalid:ring-red-500 pl-2
                            "/>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="block">
                                            <input
                                                id="password_confirmation"
                                                name="password_confirmation"
                                                type="password"
                                                onKeyUp={(e) => passwordMatch(e.currentTarget.value, (document.getElementById('password') as HTMLInputElement)?.value || '')}
                                                required
                                                autoComplete="password_confirmation"
                                                placeholder="Password Konfirmasi"
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 
                      placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 
                      text-sm sm:leading-6 text-slate-800 focus:invalid:border-red-500 focus:invalid:ring-red-500 pl-2
                            "/>
                                        </label>
                                    </div>
                                    {noMatch && <div style={{ color: 'red' }}><small>{noMatch}</small></div>}

                                    <div>
                                        <button
                                            type="submit"
                                            className="flex mt-5 mb-5 w-full mx-auto justify-center rounded-xl bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            disabled={isLoading || noMatch !== undefined}>
                                            {isLoading ? 'Reset password sedang di proses..' : 'Reset Password'}
                                        </button>

                                        {error &&
                                            <div style={{ color: 'red' }}>
                                                <small>{error}</small>
                                                <Link href="/forgot_password" className='text-sm mt-2 ml-2 font-semibold text-sky-600 hover:text-sky-500'>Forgot password</Link>
                                            </div>}
                                    </div>
                                </form>
                            </div>
                        </div>
                        ||
                        <div>
                            <div className="flex flex-col">
                                <h1 className="font-sans text-slate-400 dark:text-white text-justify">
                                    Password berhasil diperbaharui. Silahkan login untuk melanjutkan.
                                </h1>
                                <Link href="/login" className='text-sm mt-2 font-semibold text-sky-600 hover:text-sky-500'>Login</Link>
                            </div>
                        </div>
                    }
                </div>

            </div >
            <Image
                src={login_sm}
                alt="Login"
                width={500}
                height={500}
                className='bg-transparent z-10 max-w-56 fixed bottom-0 md:hidden' />
            <div className='bg-blue-400 w-[110vw] h-[110vw] rounded-r-full rounded-l-full fixed -bottom-[50vw] z-0
                      md:-left-[65vw] md:w-[110vw] md:h-[110vw] md:-bottom-[25vw]'></div>

        </div >

    )
}
