'use client'
import Link from 'next/link'

function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
type linkNavigation = {
  navigation: {
    name: string;
    href: string;
    current: boolean;
  }[];
}

const Navlink = (nav: linkNavigation) => {
  const { navigation }: linkNavigation = nav;
  return (
    <div className="hidden sm:ml-6 sm:block">
      <div className="flex space-x-4">
        {navigation.map((item) => (

          <Link
            key={item.name}
            href={item.href}
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
  )
}
export default Navlink;


