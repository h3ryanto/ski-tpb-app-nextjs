"use client"

import * as React from "react"
import { CircleXIcon, SearchIcon } from "lucide-react"
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useEffect } from "react";
import { useDebouncedCallback } from 'use-debounce';
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { searchData } from "@/lib/database/neon_postgresSql/posts";



export function Search() {
    const [open, setOpen] = React.useState(false)
    const [term, setTerm] = React.useState<string>("")
    const [result, setResult] = React.useState<{ result: string }[]>([])
    const [value, setValue] = React.useState("")
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
                console.log(data)
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
    }, [params, pathName, replace]);


    useEffect(() => {
        // alert(value)
        if ((searchParams.get('query')?.toString()) && (!value)) {
            setValue(searchParams.get('query')?.toString() || "")
        }
        if (value != "") {
            params.set('query', value)
            // params.set('sortBy', 'tanggal_daftar')
        } else if (value === "") {
            clear()
        }
        replace(`${pathName}?${params.toString()}`)
    }, [value, params, pathName, replace, searchParams, clear])
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <div className="flex items-center gap-1 border border-slate-400 p-1 rounded-full px-3 bg-white hover:bg-slate-100">
                <DialogTrigger asChild>
                    <div className=" flex items-center justify-center gap-1 cursor-pointer">
                        <SearchIcon />
                        {!value && <div>Search</div>}
                    </div>
                </DialogTrigger>
                {value &&
                    <div className="flex items-center justify-center gap-1 hover:bg-gray-400 px-1 rounded-full">
                        {value}
                        < CircleXIcon size={16} className="cursor-pointer hover:stroke-red-500" onClick={() => { setValue(""); clear() }} />
                    </div>
                }
            </div>

            <DialogContent className="max-w-screen-lg h-[55%] bg-slate-50 mx-auto top-[30%]">
                <DialogHeader>
                    <DialogTitle>Search</DialogTitle>
                </DialogHeader>
                <div>
                    <div className="flex items-center bg-red-500 mb-2">
                        <input type="text"
                            placeholder="Silahakn ketik yang ada cari disini dan tekan enter atau pilih suggestion dibawah"
                            onKeyUp={(e) => search(e.currentTarget.value, e)}
                            defaultValue={value}
                            className="border border-gray-300 px-2 py-1 text-sm placeholder:text-gray-400 w-full" />
                    </div>
                    <Command className="h-[320]">
                        {/* <CommandInput
                            placeholder="Silahakn ketik yang ada cari disini dan tekan enter tau pilih suggestion dibawah"
                            className="h-9"
                            onKeyUp={(e) => search(e.currentTarget.value)}
                            defaultValue={value}
                        /> */}
                        <CommandList>
                            {term != "" &&
                                < CommandEmpty className="flex items-center justify-center h-full">Dokumen  tidak ditemukan</CommandEmpty>
                            }
                            <CommandGroup className="h-full">
                                {result.length > 0 && result.map((data, index) => (
                                    <CommandItem
                                        key={index}
                                        value={data.result}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue)
                                            setOpen(false)
                                            params.delete("page")
                                        }}
                                        className="cursor-pointer"
                                    >
                                        {data.result}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </div>
                <DialogFooter className="sm:justify-end text-sm">
                    <DialogClose asChild>
                        <Button>
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent >

        </Dialog >

    )
}
