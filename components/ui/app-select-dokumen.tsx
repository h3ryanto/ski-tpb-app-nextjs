

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
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

const dokumens = [
    { value: "23", label: "BC 2.3" },
    { value: "40", label: "BC 4.0" },
    { value: "262", label: "BC 2.6.2" },
    { value: "27", label: "BC 2.7" },
    { value: "30", label: "BC 3.0" },
    { value: "33", label: "BC 3.3" },
    { value: "41", label: "BC 4.1" },
    { value: "25", label: "BC 2.5" },
    { value: "261", label: "BC 2.6.1" },
]

export function AppSelectDokumen({ setDokumen }: { setDokumen: (val: string) => void }) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")


    return (
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
                        : "Pilih dokumen"}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 z-[7778]">
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
                                        const newVal = currentValue === value ? "" : currentValue
                                        setValue(newVal)
                                        setDokumen(newVal) // kirim ke react-hook-form
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
    )
}