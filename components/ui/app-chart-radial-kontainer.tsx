"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
// import Link from "next/link"
import React from "react"
import {
    Label,
    PolarGrid,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
} from "recharts"
import { useEffect, useState } from "react";


const chartConfig = {
    jumlah: {
        label: "Jumlah",
    },
    '23': {
        label: "Import",
        color: "hsl(var(--chart-1))",
    },
    '33': {
        label: "Eksport BC 33",
        color: "hsl(var(--chart-9))",
    },
    '30': {
        label: "Eksport BC 30",
        color: "hsl(var(--chart-4))",
    },

} satisfies ChartConfig

const AppChartRadialKontainer = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { data?: any, dateFrom?: string, dateTo?: string, jumlahDok?: number }
>(({ className, data = [], dateFrom, dateTo, jumlahDok, ...props }, ref) => {

    const [totalKontainer, setTotalKontainer] = useState<number>(0);
    const chartData = [
        { kode_dokumen: data.kontainer, jumlah: Number(data.jumlah), fill: "var(--color-" + data.kode_dokumen + ")" },
    ]

    useEffect(() => {
        setTotalKontainer(data.total_kontainer);
    }, [data]);

    return (
        <Card
            ref={ref}
            className={cn(
                "flex flex-col",
                className
            )}

            {...props}>
            <CardHeader className="items-center pb-0" >
                <CardTitle>Kontainer {data.kontainer}</CardTitle>
                < CardDescription > {`${format(dateFrom || new Date(), 'dd MMM yyyy')} - ${format(dateTo || new Date(), 'dd MMM yyyy')}`} </CardDescription>
            </CardHeader>
            < CardContent className="flex-1 pb-0" >

                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <RadialBarChart
                        data={chartData}
                        startAngle={0}
                        endAngle={(360 / (totalKontainer || 1)) * Number(data.jumlah)}
                        innerRadius={80}
                        outerRadius={110}
                    >
                        <PolarGrid
                            gridType="circle"
                            radialLines={false}
                            stroke="none"
                            className="first:fill-muted last:fill-background"
                            polarRadius={[86, 74]}
                        />
                        <RadialBar dataKey="jumlah" background cornerRadius={10} />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false} >

                            <Label
                                content={
                                    ({ viewBox }) => {
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
                                                        className="fill-foreground text-4xl font-bold"
                                                    >
                                                        {chartData[0].jumlah.toLocaleString()}

                                                    </tspan>
                                                    < tspan
                                                        x={viewBox.cx}
                                                        y={(viewBox.cy || 0) + 24
                                                        }
                                                        className="fill-muted-foreground"
                                                    >
                                                        Jumlah Kontainer
                                                    </tspan>
                                                </text>

                                            )
                                        }
                                    }
                                }
                            />
                        </PolarRadiusAxis>
                    </RadialBarChart>
                </ChartContainer>

            </CardContent>
            < CardFooter className="flex-col gap-2 text-sm" >
                <div className="flex items-center gap-2 font-medium leading-none" >
                    {(data.kontainer === 'Import' ?
                        <div>
                            <div>Kontainer :</div>
                            <div className="leading-none text-muted-foreground font-normal">
                                <div>20 Feet : {data.import_20}</div>
                                <div>40 Feet : {data.import_40}</div>
                            </div>
                        </div>
                        :
                        <div>
                            <div>Kontainer :</div>
                            <div className="leading-none text-muted-foreground font-normal">
                                <div>20 Feet : {data.export_20}</div>
                                <div>40 Feet : {data.export_40}</div>
                            </div>
                        </div>
                    )
                    }
                </div>
                {/* < div className="leading-none text-muted-foreground" >
                    Showing total visitors for the last 6 months
                </div> */}
            </CardFooter>
        </Card>
    )
}
)

AppChartRadialKontainer.displayName = "AppChartRadialKontainer"
export default AppChartRadialKontainer 