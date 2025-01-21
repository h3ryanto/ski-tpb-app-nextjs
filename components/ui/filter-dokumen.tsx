"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { ReactNode } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useEffect } from "react";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import kodeDokumen from "@/utils/kodeDokumen";

const dokumens = [
    {
        value: "%",
        label: "All",
    },
    {
        value: "23",
        label: "BC 2.3",
    },
    {
        value: "40",
        label: "BC 4.0",
    },
    {
        value: "262",
        label: "BC 2.6.2",
    },
    {
        value: "27",
        label: "BC 2.7",
    },
    {
        value: "30",
        label: "BC 3.0",
    },
    {
        value: "33",
        label: "BC 3.3",
    },
    {
        value: "41",
        label: "BC 4.1",
    },
    {
        value: "25",
        label: "BC 2.5",
    },
    {
        value: "261",
        label: "BC 2.6.1",
    },
]

export function FilterDokumen({ children }: { children: ReactNode }) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams)

    useEffect(() => {
        // alert(value)
        if ((searchParams.get('kodeDokumen')?.toString()) && (!value)) {
            setValue(searchParams.get('kodeDokumen')?.toString() || "")
        }
        if (value != "") {
            params.delete("page")
            params.set('kodeDokumen', value)
        } else if ((value === "") || (searchParams.get('kodeDokumen')?.toString() === "all")) {
            params.delete('kodeDokumen')
            setValue("")
        }
        replace(`${pathName}?${params.toString()}`)
    }, [value])
    return (
        <>
            {children}

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-auto justify-between"
                    >
                        {value
                            ? dokumens.find((dokumen) => dokumen.value === value)?.label
                            : ""}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search" className="h-9" />
                        <CommandList>
                            <CommandEmpty>No dokumen found.</CommandEmpty>
                            <CommandGroup>
                                {dokumens.map((dokumen) => (
                                    <CommandItem
                                        key={dokumen.value}
                                        value={dokumen.value}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue)
                                            setOpen(false)
                                        }}
                                    >
                                        {dokumen.label}
                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                value === dokumen.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </>
    )
}
