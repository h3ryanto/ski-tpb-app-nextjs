'use client'
import { filterDokumen, filterEntitas, filterNomorAju, filterNomorDaftar } from '@/lib/database/neon_postgresSql/posts';
import { X } from 'lucide-react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { ReactNode, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

type Props = { children: ReactNode, id: string }

export default function Filter({ children, id }: Props) {
    const ref = useRef<HTMLInputElement>(null);
    const [activeId, setActiveId] = useState<string>("")
    const [result, setResult] = useState<{ result: any }[]>([])
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams)

    const onChange = (id: string, term: string) => {
        params.delete("page")
        params.set(id, term)
        replace(`${pathName}?${params.toString()}`)
        setResult([])
        if (ref.current) {
            ref.current.value = term;
        }
    }

    const onSearch = useDebouncedCallback(async (term: any, id: string, e?: any) => {
        
        if (term) {
            setActiveId(id)
            const result = await fetch('/api/filter', {
                    method: 'POST',
                    body: JSON.stringify({
                        query: term,
                        dokumen: id,                        
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
			    })
                const data = await result.json()
                const filterResult = data.result.map((item: Record<string, any>) => ({
                    result: item.result
                }));
                setResult(filterResult)

        } else {
            setActiveId("")
            setResult([])
            params.delete(id)
            replace(`${pathName}?${params.toString()}`)
        }


        if (e.key === 'Enter') {
            setResult([])
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
                                onClick={() => { params.delete(id); replace(`${pathName}?${params.toString()}`); if (ref.current) ref.current.value = ""; setResult([]) }}

                            />
                        }
                        <input
                            id={id}
                            autoComplete="off"
                            type="text"
                            name={id}
                            ref={ref}
                            onFocus={() => setActiveId(id)}
                            onBlur={() => { if (result.length === 0) setActiveId(""); }}
                            // autoComplete="current-search"
                            // onChange={(e) => { onSearch(e.target.value, id); params.delete("page"); }}
                            onKeyUp={(e) => { onSearch(e.currentTarget.value, id, e); params.delete("page"); }}
                            defaultValue={searchParams.get(id)?.toString() || ""}
                            className="w-full rounded-md border-0 py-1.5 font-normal shadow-sm ring-1 ring-inset ring-gray-300
                placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300
                text-sm px-2"
                        />
                        {(activeId === id && result.length > 0) &&
                            <div className='absolute bg-white rounded-sm shadow-md p-1 mt-1 top-7 left-0 w-full max-h-40 overflow-y-auto'>
                                <ul className="divide-y divide-gray-100">
                                    {activeId === id && result && result.map((item, index) => (
                                        <li
                                            key={index}
                                            className="flex justify-between py-1.5 cursor-pointer hover:bg-slate-200/30  bg-white px-3 font-semibold"
                                            onClick={() => onChange(id, item.result)}
                                        > {item.result}</li>

                                    ))}
                                </ul>
                            </div>
                        }
                    </div>
                </label>
            </div >
        </div >
    )
}
