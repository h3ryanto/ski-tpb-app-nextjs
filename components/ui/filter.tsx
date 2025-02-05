'use client'
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { useDebouncedCallback } from 'use-debounce';

type Props = { children: ReactNode, id: string }

export default function Filter({ children, id }: Props) {

    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams)
    const onSearch = useDebouncedCallback((term: any, id: string) => {
        // console.log(term);
        if (term) {
            // params.delete("page")
            params.set(id, term)
        } else {
            params.delete(id)
        }
        replace(`${pathName}?${params.toString()}`)
    }, 200);


    return (
        <div className='flex flex-col gap-4'>
            {children}
            <div className=''>
                <label className="flex flex-row-reverse w-full">
                    <input
                        id={id}
                        type="text"
                        name={id}
                        autoComplete="current-search"
                        onChange={(e) => { onSearch(e.target.value, id); params.delete("page") }}
                        defaultValue={searchParams.get(id)?.toString() || ""}

                        className="w-full rounded-md border-0 py-1.5 font-normal shadow-sm ring-1 ring-inset ring-gray-300
                placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300
                text-sm px-2"
                    />
                </label>
            </div>
        </div>
    )
}
