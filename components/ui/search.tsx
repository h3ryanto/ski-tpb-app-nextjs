'use client'
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { useDebouncedCallback } from 'use-debounce';

type Props = { children: ReactNode }

export default function Search({ children }: Props) {

    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();
    const onSearch = useDebouncedCallback((term: any) => {

        const params = new URLSearchParams(searchParams.toString())
        if (term) {
            params.set("query", term)
        } else {
            params.delete("query")
        }
        replace(`${pathName}?${params.toString()}`)
    }, 300);
    return (
        <>
            <div className='container mx-auto bg-slate-700 px-2 py-2 md:bg-inherit border-b-2 border-slate-400'>
                <label className="flex flex-row-reverse w-full ">
                    <input
                        id="search"
                        type="text"
                        name="search"
                        placeholder="Search.."
                        autoComplete="current-search"
                        onChange={(e) => onSearch(e.target.value)}
                        defaultValue={searchParams.get("query")?.toString()}
                        className="w-auto rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300
                placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300
                text-sm px-2 focus:w-full"
                    />
                </label>
            </div>
            {children}
        </>
    )
}
