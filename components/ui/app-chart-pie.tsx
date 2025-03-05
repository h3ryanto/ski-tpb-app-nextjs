"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import { cn } from "@/lib/utils"
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
// import { useState } from "react";
const chartData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 190, fill: "var(--color-other)" },
]
const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    chrome: {
        label: "Chrome",
        color: "hsl(var(--chart-1))",
    },
    safari: {
        label: "Safari",
        color: "hsl(var(--chart-2))",
    },
    firefox: {
        label: "Firefox",
        color: "hsl(var(--chart-3))",
    },
    edge: {
        label: "Edge",
        color: "hsl(var(--chart-4))",
    },
    other: {
        label: "Other",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig

// const chartConfig = {
//     visitors: {
//         label: "Visitors",
//     },
//     23: {
//         label: "23",
//         color: "hsl(var(--chart-1))",
//     },
//     27: {
//         label: "27",
//         color: "hsl(var(--chart-2))",
//     },
//     30: {
//         label: "30",
//         color: "hsl(var(--chart-3))",
//     },
//     33: {
//         label: "33",
//         color: "hsl(var(--chart-4))",
//     },
//     other: {
//         label: "Other",
//         color: "hsl(var(--chart-5))",
//     },
// } satisfies ChartConfig

const AppChartPie = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { data?: any, periode?: string, totalDokumen?: number }
>(({ className, data = [], periode, totalDokumen, ...props }, ref) => {
    console.log(data)
    // const [dataBC23, setBC23] = useState<number>(0);
    // const [dataBC27, setBC27] = useState<number>(0);
    // const [dataBC33, setBC33] = useState<number>(0);
    // const [dataBC30, setBC30] = useState<number>(0);
    // if (dat.dokumen === '23') {
    //     setBC23(dat.harga)
    // }
    // if (dat.dokumen === '27') {
    //     setBC27(dat.harga)
    // }
    // if (dat.dokumen === '33') {
    //     setBC33(dat.harga)
    // }
    // if (dat.dokumen === '30') {
    //     setBC30(dat.harga)
    // }

    // const chartData = React.useMemo(() => {
    //     const mappedData = data.map((dat: any) => {
    //         return dat;
    //     });
    //     console.log(mappedData)
    //     return [
    //         ...mappedData[0]
    //     ];
    // }, [data]);

    // const totalVisitors = React.useMemo(() => {
    //     return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
    // }, [chartData]);
    const totalVisitors = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
    }, [])
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
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
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
                                                    Visitors
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
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                </div> */}
            </CardFooter>
        </Card>
    )
})

AppChartPie.displayName = "AppChartPie"

export default AppChartPie