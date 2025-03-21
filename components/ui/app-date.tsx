"use client"
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as React from "react";
import { DateRange } from "react-day-picker";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function DatePickerWithRange({
    className,
}: React.HTMLAttributes<HTMLDivElement>) {
    const [date, setDate] = React.useState<DateRange | undefined>(undefined)
    const [isOpen, setIsOpen] = React.useState<boolean>(false)
    const { toast } = useToast()
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();
    const params = React.useMemo(() => new URLSearchParams(searchParams), [searchParams]);

    const onReset = () => {
        setDate(undefined)
        if (params.has("date_from") || params.has("date_to")) {
            params.delete("date_from")
            params.delete("date_to")
            params.delete("page")
            replace(`${pathName}?${params.toString()}`)
        }
    }
    const onSetDate = ({ date_from, date_to }: { date_from: any, date_to: any }) => {

        if ((date_from) && (date_to)) {
            params.delete("page")
            params.set("date_from", format(date_from, "yyyy-MM-dd"))
            params.set("date_to", format(date_to, "yyyy-MM-dd"))

        } else {
            toast({
                variant: "destructive",
                title: "Set Date Gagal",
                description: "Silahkan pilih tanggal terlebih dahulu!",
            })
        }
        replace(`${pathName}?${params.toString()}`)
    }


    useEffect(() => {
        if (params.has("date_from") && params.has("date_to")) {
            const date_from = new Date(params.get("date_from") as string)
            const date_to = new Date(params.get("date_to") as string)
            setDate({ from: date_from, to: date_to })
        }
    }, [params])

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover open={isOpen}>
                <PopoverTrigger asChild >
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[230px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <CalendarIcon />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span></span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-2 justify-items-center" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                    <div className="flex justify-center gap-6">
                        <Button variant={"outline"} size={"sm"} onClick={() => { onSetDate({ date_from: date?.from, date_to: date?.to }); setIsOpen(!isOpen) }} className="hover:bg-black hover:text-white">Set</Button>
                        <Button variant={"outline"} size={"sm"} onClick={() => { onReset(); setIsOpen(!isOpen) }} className="hover:bg-black hover:text-white">Reset</Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div >
    )
}
