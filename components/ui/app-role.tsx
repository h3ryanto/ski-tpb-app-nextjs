"use client"

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



export function AppRoleSelect({ roleId, onChange }: { roleId?: number, onChange?: (roleId: number) => void }) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(0)
    const [roles, setRoles] = React.useState<any[]>([])

    const loadData = () => {
        const fetchData = async () => {
            const data = await fetch("/api/get-roles", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (data) {
                const posts = await data.json();

                if (posts.data) {
                    setRoles(posts.data);
                }
            }
        };
        fetchData();
    };

    React.useEffect(() => {
        loadData();
        if (roleId) {
            setValue(roleId)
        }
    }, [roleId])

    // console.log("🚀 ~ file: app-role.tsx:63 ~ fetchData ~ posts:", roles);
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? roles.find((role) => role.role_id === value)?.role_name
                        : "Select role..."}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search Role..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No role found.</CommandEmpty>
                        <CommandGroup>
                            {roles.map((role) => (
                                <CommandItem
                                    key={role.role_id}
                                    value={role.role_id.toString()}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value.toString() ? 0 : parseInt(currentValue))
                                        setOpen(false)
                                        if (onChange) {
                                            onChange(parseInt(currentValue))
                                        }
                                    }}
                                >
                                    {role.role_name}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === role.role_id ? "opacity-100" : "opacity-0"
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
