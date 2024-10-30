import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import Image from 'next/image'
import { SignOut } from '@/lib/firebase/authentication/service'


const UserProfil = () => {
    return (

        <Menu as="div" className="relative ml-3">
            <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <Image
                        alt="Your Company"
                        src="https://tailwindui.com/plus/img/logos/mark.svg"
                        width={30}
                        height={30}
                        className="block h-8 w-auto"

                    />
                </MenuButton>
            </div>
            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <MenuItem>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                        Your Profile
                    </a>
                </MenuItem>
                <MenuItem>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                        Settings
                    </a>
                </MenuItem>
                <MenuItem>
                    <button type="button" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100" onClick={SignOut}>
                        Sign out
                    </button>
                </MenuItem>
            </MenuItems>
        </Menu >
    )
}
export default UserProfil;