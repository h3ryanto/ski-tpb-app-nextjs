"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/utils/currency"
import * as React from "react"
import { useEffect, useState } from "react"
import { Label, Pie, PieChart } from "recharts"
// const chartData = [
//     { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
//     { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
//     { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
//     { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
//     { browser: "other", visitors: 190, fill: "var(--color-other)" },
// ]


const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    23: {
        label: "23",
        color: "hsl(var(--chart-1))",
    },
    27: {
        label: "27",
        color: "hsl(var(--chart-2))",
    },
    30: {
        label: "30",
        color: "hsl(var(--chart-3))",
    },
    33: {
        label: "33",
        color: "hsl(var(--chart-4))",
    },
    other: {
        label: "Other",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig

const AppChartPie = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { data?: any, periode?: string, totalDokumen?: number }
>(({ className, data = [], periode, totalDokumen, ...props }, ref) => {
    const [dataBC23, setBC23] = useState<number>(0);
    const [dataBC27, setBC27] = useState<number>(0);
    const [dataBC33, setBC33] = useState<number>(0);
    const [dataBC30, setBC30] = useState<number>(0);

    // console.log(data)
    // Gunakan useEffect untuk memantau perubahan pada array data
    useEffect(() => {
        // Perbarui state berdasarkan data yang diambil dari array
        data.forEach((element: any) => {
            if (element.browser === '23') {
                setBC23(Number(element.visitors || 0));
            }
            if (element.browser === '27') {
                setBC27(Number(element.visitors || 0));
            }
            if (element.browser === '33') {
                setBC33(Number(element.visitors || 0));
            }
            if (element.browser === '30') {
                setBC30(Number(element.visitors || 0));
            }
        });

    }, [data]); // Jalankan efek ini setiap kali data berubah

    // console.log(dataBC23, dataBC27, dataBC30, dataBC33)
    const totalVisitors = React.useMemo(() => {
        return (((Number(dataBC30) || 0 + Number(dataBC33) || 0 - Number(dataBC27) || 0) / Number(dataBC23) || 0).toFixed(4));
    }, [dataBC23, dataBC30, dataBC33, dataBC27]);

    const pieData = React.useMemo(() => {
        const sum = data.reduce(
            (acc: number, d: any) => acc + Number(d?.visitors || 0),
            0
        )

        // kalau semua 0 → tampilkan dummy slice supaya pie tetap kelihatan
        if (sum === 0) {
            return [
                {
                    browser: "empty",
                    visitors: 1,
                    fill: "hsl(var(--muted))",
                },
            ]
        }

        return data
    }, [data])
    // console.log(data)
    return (
        <Card
            ref={ref}
            className={cn(
                "flex flex-col",
                className
            )}
            {...props}>
            <CardHeader className="items-center pb-0">
                <CardTitle>Keberhasilan Pemberian Fasilitas</CardTitle>
                <CardDescription>{periode}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">

                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel className='w-auto' />}
                        />
                        <Pie
                            data={pieData}
                            dataKey="visitors"
                            nameKey="browser"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalVisitors.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    %
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>

            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                {/* <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div> */}
                <div className="text-muted-foreground">
                    <p>Persentasi keberhasilan pemberian fasilitas minimum 1.75%</p>
                    <p>Persentasi = (nilai eksport-BC 2.7 IN)/nilai impor (Bahan Baku)</p>
                    <p>{(((dataBC30 || 0 + dataBC33 || 0) - dataBC27 || 0) / dataBC23 || 0).toFixed(4)} % = {formatCurrency(Number(dataBC30 + dataBC33), 'IDR')} - {formatCurrency(Number(dataBC27), 'IDR')} / {formatCurrency(Number(dataBC23), 'IDR')}</p>
                </div>
            </CardFooter>
        </Card>
    )
})

AppChartPie.displayName = "AppChartPie"

export default AppChartPie