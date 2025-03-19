"use client"

import { CircleXIcon, SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as React from "react";
import { useRef, useEffect } from "react";
import { useDebouncedCallback } from 'use-debounce';
import { searchData } from "@/lib/database/neon_postgresSql/posts";
import { Button } from "./button";



export function Search() {
    const [open, setOpen] = React.useState(false)
    const [term, setTerm] = React.useState<string>("")
    const [result, setResult] = React.useState<{ result: string }[]>([])
    const [value, setValue] = React.useState("")
    const inputRef = useRef<HTMLInputElement>(null);
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();
    const params = React.useMemo(() => new URLSearchParams(searchParams), [searchParams]);
    const search = useDebouncedCallback(async (term: string, e?: any) => {
        setTerm(term)
        if (term) {
            if (e.key === 'Enter') {
                params.delete("page")
                params.set("query", term)
                setValue(term)
                replace(`${pathName}?${params.toString()}`)
                setOpen(false)
            } else {
                const data = await searchData(term)
                const formattedResult = data.map((item: Record<string, any>) => ({
                    result: item.result
                }))
                setResult(formattedResult)
            }
        } else {
            setResult([])
        }

    }, 200);

    const clear = React.useCallback(() => {
        setValue("");
        setResult([]);
        setTerm("");
        params.delete("query");
        replace(`${pathName}?${params.toString()}`);
    }, [params, pathName, replace, setValue, setResult, setTerm]);

    useEffect(() => {
        setOpen(false)
        // if ((searchParams.get('query')?.toString()) && (!value)) {
        //     // const a = searchParams.get('query')?.toString()
        //     setValue(searchParams.get('query')?.toString() || "")
        //     alert(searchParams.get('query')?.toString())
        // }
        if (value != "") {
            params.set('query', value)
            replace(`${pathName}?${params.toString()}`)
            if (inputRef.current) inputRef.current.value = value;
        }
    }, [value, params, pathName, replace, searchParams, clear, inputRef])
    return (
        <>
            <div className="flex items-center gap-1 border border-slate-400 p-1 rounded-full px-3 bg-white hover:bg-slate-100">
                <div className=" flex items-center justify-center gap-1 cursor-pointer" onClick={() => { setOpen(!open); setTimeout(() => { if (inputRef.current) inputRef.current.focus(); }, 1); }}>
                    <SearchIcon />
                    {!value && <div>Search</div>}
                </div>
                {value &&
                    <div className="flex items-center justify-center gap-1 hover:bg-gray-400 px-1 rounded-full">
                        {value}
                        < CircleXIcon size={16} className="cursor-pointer hover:stroke-red-500" onClick={() => { setValue(""); clear() }} />
                    </div>
                }
            </div>
            <div className={` justify-center w-screen h-screen bg-black bg-opacity-40 fixed top-0 left-0 z-50 ${!open ? "hidden" : "flex"}`} >
                <div className="flex flex-col gap-2 bg-white rounded-md w-2/6 h-fit mt-[5%]">

                    <div className="flex items-center h-16 bg-white relative p-3 my-1 border-b border-gray-200">
                        <SearchIcon className='absolute pointer-events-none stroke-slate-500 m-1.5' />
                        <input type="text"
                            ref={inputRef}
                            placeholder="Silahakn ketik yang ada cari disini dan tekan enter atau pilih suggestion dibawah"
                            onKeyUp={(e) => search(e.currentTarget.value, e)}
                            defaultValue={value}
                            className="px-2 py-1 text-sm placeholder:text-gray-400 w-full pl-9 focus:outline-none" />
                    </div>

                    <div className="max-h-[400px] overflow-y-auto">
                        {term != "" && result.length === 0 &&
                            <div className="flex items-center justify-center font-semibold text-slate-400 text-md">Dokumen  tidak ditemukan</div>
                        }
                        {term === "" && result.length === 0 &&
                            <div className="flex items-center justify-center font-semibold text-slate-400 text-md h-10"></div>
                        }
                        <ul role="list" className="divide-y divide-gray-100">
                            {result.length > 0 && result.map((data, index) => (
                                <li
                                    className="flex justify-between gap-x-6 py-5 cursor-pointer hover:bg-slate-100  bg-white px-3 font-semibold text-slate-500"
                                    key={index}
                                    onClick={() => {
                                        setValue(data.result)
                                        setOpen(false)
                                        params.delete("page")
                                    }}
                                >
                                    {data.result}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex justify-end items-center h-10 bg-white relative p-3 my-1 border-t  border-gray-200">
                        <Button size={"sm"} onClick={() => { setOpen(!open) }}>Close</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
