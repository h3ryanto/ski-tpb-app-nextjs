/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import Image from 'next/image'
import React, { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from "next-auth/react"
import login from "@/public/svg/login.svg"
import { Span } from 'next/dist/trace'



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
      }
    } catch (error: any) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container h-svh mx-auto flex flex-col md:items-end items-center">
      <div className="container mx-auto flex flex-col justify-center px-12 py-10 lg:px-8 z-20 
                      md:max-w-sm md:justify-end">
        <div className="rounded-xl px-1 py-5">
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
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500
                              disabled:border-slate-200 disabled:shadow-none focus:invalid:border-pink-500 focus:invalid:ring-pink-500 sm:text-sm sm:leading-6 text-slate-800
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
                      text-sm sm:text-sm sm:leading-6 text-slate-800 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                    />
                    <div className="text-sm">
                      <a href="#" className="font-semibold text-sky-600 hover:text-sky-500">
                        Forgot password?
                      </a>
                    </div>
                  </div>
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex mt-5 mb-5 w-24 mx-auto justify-center rounded-xl bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
        src={login} 
        alt="Login" 
        width={500}
        height={500}
        className='bg-transparent z-10 max-w-56 fixed bottom-0 -right-10 
        transition sm:-translate-x-96 md:hidden'
        />
        <div className='bg-blue-400 w-[900] h-[900] rounded-full fixed -bottom-[600] -right-[500]
        md:-left-[450] md:-bottom-20'></div>
    </div >

  )
}
