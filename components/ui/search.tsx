'use client'
import { X } from 'lucide-react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { ReactNode, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';

type Props = { children: ReactNode }

export default function Search({ children }: Props) {
    const ref = useRef<HTMLInputElement>(null);
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams)
    const onSearch = useDebouncedCallback((term: any) => {
        // console.log(term);
        // if (e.key === 'Enter') {
        if (term) {
            params.delete("page")
            params.set("query", term)
        } else {
            params.delete("query")
        }
        replace(`${pathName}?${params.toString()}`)
        // }
    }, 200);


    return (
        <>
            <div className='w-full mx-auto bg-slate-700 text-slate-600 md:bg-inherit'>
                <label className="flex flex-row-reverse w-full">
                    <div className='flex items-center relative w-full '>
                        <input
                            id="search"
                            ref={ref}
                            type="text"
                            name="search"
                            placeholder="Search.."
                            autoComplete="current-search"
                            // onChange={(e) => onSearch(e.target.value)}
                            onKeyUp={(e) => onSearch(e.currentTarget.value)}
                            defaultValue={searchParams.get('query')?.toString() || ""}

                            className="w-auto rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300
                        placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 pl-7                        text-sm px-2 focus:w-full peer"
                        />
                        {searchParams.get('query')?.toString() &&
                            <X size={16} className='absolute  left-2 cursor-pointer hover:bg-slate-300 hover:rounded-sm hover:p-0.5 '
                                onClick={() => { params.delete('query'); replace(`${pathName}?${params.toString()}`); if (ref.current) ref.current.value = "" }}
                            />
                        }
                    </div>
                </label>
            </div>
            {children}
        </>
    )
}
