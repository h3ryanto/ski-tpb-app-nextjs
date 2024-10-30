'use client'
import Image from 'next/image'
import React, { useState, FormEvent } from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useRouter } from 'next/navigation'
import { Authentication, SignIn, GetSignInErrorMessage } from '../../lib/firebase/authentication/service'


export default function Login() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    try {

      const formData = new FormData(event.currentTarget)
      const password = formData.get('password')
      const email = formData.get('email')
      await SignIn(email, password)
      Authentication().onAuthStateChanged((user) => {
        if (user) {
          router.replace('/')
        }
      });
      // console.log(res)
      // const response = await fetch('/api/auth', {
      //   method: 'POST',
      //   body: formData,
      // })

      // if (!response.ok) {
      //   switch (response.status) {
      //     case 400:
      //       throw new Error('Email atau password salah.')
      //     case 401:
      //     default:
      //       throw new Error('Email atau password tidak valid.')
      //   }
      // } else {
      //   console.log(Authentication())
      // }

      // Handle response if necessary
      // const data = await response.json()
      // console.log(data);
      // ...
    } catch (error: any) {
      setError(GetSignInErrorMessage(error.code))

    } finally {
      setIsLoading(false)
    }
  }



  return (
    <>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg"
            width={30}
            height={30}
            className="block h-8 w-auto"

          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={onSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
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
                  defaultValue="test"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
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
                  defaultValue="test"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
