'use client'
import Image from 'next/image'
import React, { useState, FormEvent } from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { redirect, useRouter } from 'next/navigation'
// import { Authentication, SignIn, GetSignInErrorMessage } from '../../lib/firebase/authentication/service'
import { signIn } from "next-auth/react"



export default function Login() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        router.push('/dashboard')
      } else {
        console.log(res.error)
      }

      // const formData = new FormData(event.currentTarget)
      // const password = formData.get('password')
      // const email = formData.get('email')
      // await SignIn(email, password)
      // await Authentication().onAuthStateChanged((user) => {
      //   if (user) {
      //     console.log(user)
      //     router.push('/dashboard')
      //   }
      // });
    } catch (error: any) {
      console.log(error)
      // await setError(GetSignInErrorMessage(error.code))
    } finally {
      setIsLoading(false)
    }
  }



  return (
    <>

      <div className="bg-white dark:bg-slate-800 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="block h-16 w-auto justify-items-center">
            <Image
              alt="Your Company"
              src="https://tailwindui.com/plus/img/logos/mark.svg"
              width={30}
              height={30}
              className="dark:invert block h-16 w-auto justify-items-center"

            />
          </div>

          <h2 className="text-slate-800 dark:text-white mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={onSubmit}>
            <div>
              <label htmlFor="email" className="text-slate-900 dark:text-white block text-sm font-medium leading-6">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="mt-5 flex items-center justify-between">
                <label htmlFor="password" className="text-slate-900 dark:text-white block text-sm font-medium leading-6">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  name="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="mt-10 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Login'}
              </button>
              {error && <div style={{ color: 'red' }}><small>{error}</small></div>}
            </div>
          </form>


        </div>
      </div>
    </>
  )
}
