/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import CompanyProfile from '../../elements/Navbar/CompanyProfile/page'
import UserProfil from '../../elements/Navbar/UserProfil/page'
import { useSession } from 'next-auth/react';


function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const session = useSession();
  const router = useRouter()
  const pathname = usePathname();
  const navigation = [
    { name: 'Home', href: '/', current: pathname === '/' ? true : false },
    { name: 'Dashboard', href: 'dashboard', current: pathname === '/dashboard' ? true : false },
    { name: 'Dokumen', href: '/dokumen?page=1', current: pathname === '/dokumen' ? true : false },
  ]

  const publicRoutes = ['/login']
  const isLoginRoute = publicRoutes.includes(pathname)

  if (!isLoginRoute) {
    return (
      <div className='card'>
        <Disclosure as="nav" className="bg-gray-800">
          <div className="mx-auto max-w-full px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <CompanyProfile />
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (

                      <Link
                        key={item.name}
                        href={item.href} replace
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium',
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="h-6 w-6" />
                </button>
                <div className="hidden sm:ml-6 sm:block rounded-md px-3 py-2 text-sm font-medium text-white">{session.data?.user?.name}</div>
                {/* Profile dropdown */}
                <UserProfil />
              </div>
            </div>
          </div>

          <DisclosurePanel className="absolute  bg-gray-800 p-1 text-gray-400 z-10 sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}

                  onClick={() => router.push(item.href)}

                  aria-current={item.current ? 'page' : undefined}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </Disclosure>

      </div>
    )
  }
}