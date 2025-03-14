'use client'
import { X } from 'lucide-react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { ReactNode, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';

type Props = { children: ReactNode, id: string }

export default function Filter({ children, id }: Props) {
    const ref = useRef<HTMLInputElement>(null);
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams)

    const onSearch = useDebouncedCallback((term: any, id: string, e?: any) => {
        if (e.key === 'Enter') {
            // console.log(term);
            if (term) {
                // params.delete("page")
                params.set(id, term)
            } else {
                params.delete(id)
            }
            replace(`${pathName}?${params.toString()}`)
        }
    }, 200);




    return (
        <div className='flex flex-col gap-1'>
            {children}
            <div className=''>
                <label className="w-full">
                    <div className='flex items-center relative'>
                        {searchParams.get(id)?.toString() &&
                            <X size={16} className='absolute  right-2 cursor-pointer hover:bg-slate-300 hover:p-0.5 hover:rounded-sm '
                                onClick={() => { params.delete(id); replace(`${pathName}?${params.toString()}`); if (ref.current) ref.current.value = "" }}

                            />
                        }
                        <input
                            id={id}
                            type="text"
                            name={id}
                            ref={ref}
                            autoComplete="current-search"
                            // onChange={(e) => { onSearch(e.target.value, id); params.delete("page"); }}
                            onKeyUp={(e) => { onSearch(e.currentTarget.value, id, e); params.delete("page"); }}
                            defaultValue={searchParams.get(id)?.toString() || ""}
                            className="w-full rounded-md border-0 py-1.5 font-normal shadow-sm ring-1 ring-inset ring-gray-300
                placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300
                text-sm px-2"
                        />
                    </div>
                </label>
            </div>
        </div>
    )
}
