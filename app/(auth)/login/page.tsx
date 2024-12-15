/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import Link from 'next/link'
import Image from 'next/image'
import React, { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from "next-auth/react"
import login_sm from "@/public/svg/login_sm.svg"
import login_md from "@/public/svg/login_md.svg"



export default function Login() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(event.currentTarget)
      const res = await signIn('credentials', {
        redirect: false,
        email: formData.get('email'),
        password: formData.get('password'),
        callbackUrl: '/dashboard',
      });

      if (!res?.error) {
        router.replace('/dashboard')
      } else {
        console.log(res.error)
        setError("Email atau Password salah!")
      }
    } catch (error: any) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container h-svh mx-auto flex flex-col items-center md:justify-center">


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
          <div className="flex justify-center items-center ">
            <h2 className="font-sans text-blue-600 dark:text-white text-center text-xl font-bold leading-9 tracking-tight">
              Sign<span className="text-slate-500"> In</span>
            </h2>
          </div>
          <div className="mt-5 mx-auto ">
            <form onSubmit={onSubmit}>
              <div>
                <label className="block">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Email"
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 
                      placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 
                      text-sm sm:leading-6 text-slate-800 focus:invalid:border-red-500 focus:invalid:ring-red-500 
                            "/>
                </label>
              </div>

              <div>
                <label className="block mt-2">
                  <div >
                    <input
                      id="password"
                      type="password"
                      name="password"
                      required
                      placeholder="Password"
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 
                      placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 
                      text-sm sm:leading-6 text-slate-800 focus:invalid:border-red-500 focus:invalid:ring-red-500"
                    />
                    <div className="text-sm mt-2">
                      <Link href="/forgot_password" className='font-semibold text-sky-600 hover:text-sky-500'>Forgot password?</Link>

                    </div>
                  </div>
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex mt-5 mb-5 w-full mx-auto justify-center rounded-xl bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Login'}
                </button>
                {error && <div style={{ color: 'red' }}><small>{error}</small></div>}
              </div>
            </form>
          </div>
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
