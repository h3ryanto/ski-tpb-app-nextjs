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
import { formatCurrency } from "@/utils/currency"
import React from "react"
import {
    Label,
    PolarGrid,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
} from "recharts"


const chartConfig = {
    jumlah: {
        label: "Jumlah",
    },
    23: {
        label: "23",
        color: "hsl(var(--chart-1))",
    },
    27: {
        label: "27",
        color: "hsl(var(--chart-2))",
    },
    40: {
        label: "40",
        color: "hsl(var(--chart-3))",
    },
    30: {
        label: "30",
        color: "hsl(var(--chart-4))",
    },
    25: {
        label: "25",
        color: "hsl(var(--chart-5))",
    },
    41: {
        label: "41",
        color: "hsl(var(--chart-6))",
    },
    262: {
        label: "262",
        color: "hsl(var(--chart-7))",
    },
    261: {
        label: "261",
        color: "hsl(var(--chart-8))",
    },
    33: {
        label: "33",
        color: "hsl(var(--chart-9))",
    },
} satisfies ChartConfig

const AppChartRadial = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { data?: any, periode?: string }
>(({ className, data = [], periode, ...props }, ref) => {

    const chartData = [
        { kode_dokumen: data.kode_dokumen, jumlah: Number(data.jumlah), fill: "var(--color-" + data.kode_dokumen + ")" },
    ]
    return (
        <Card
            ref={ref}
            className={cn(
                "flex flex-col",
                className
            )}

            {...props}>
            <CardHeader className="items-center pb-0" >
                <CardTitle>Dokumen BC {data.kode_dokumen} {data.kode_valuta}</CardTitle>
                < CardDescription > {periode} </CardDescription>
            </CardHeader>
            < CardContent className="flex-1 pb-0" >
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <RadialBarChart
                        data={chartData}
                        startAngle={0}
                        endAngle={Number(data.jumlah)}
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
                                                        Jumlah Dokumen
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
                    {(data.kode_dokumen == '23' && (
                        <div>
                            <div>Bahan baku :</div>
                            <div className="leading-none text-muted-foreground font-normal">
                                <div>CIF : {formatCurrency(data.cif_bahan_baku, data.kode_valuta)}</div>
                                <div>CIF Rupiah : {formatCurrency(data.cif_idr_bahan_baku, 'IDR')}</div>
                            </div>
                            <div>Barang Lainnya :</div>
                            <div className="leading-none text-muted-foreground font-normal">
                                <div>CIF : {formatCurrency(data.cif_lainnya, data.kode_valuta)}</div>
                                <div>CIF Rupiah : {formatCurrency(data.cif_idr_lainnya, 'IDR')}</div>
                            </div>
                        </div>
                    )) ||
                        (data.kode_dokumen == '30' && (
                            <div>
                                <div>FOB : {formatCurrency(data.fob, 'USD')}</div>
                                <div>FOB Rupiah : {formatCurrency(data.fob_rupiah, 'IDR')}</div>
                            </div>
                        )) ||
                        (data.kode_dokumen == '40' && (
                            <div>
                                <div>Bahan baku :</div>
                                <div className="leading-none text-muted-foreground font-normal">
                                    <div>Harga Penyeragan : {formatCurrency(data.penyerahan_bahan_baku, "IDR")}</div>
                                </div>
                                <div>Barang Lainnya :</div>
                                <div className="leading-none text-muted-foreground font-normal">
                                    <div>Harga Penyerahan : {formatCurrency(data.penyerahan_lainnya, "IDR")}</div>
                                </div>
                            </div>
                        )) ||
                        (data.kode_dokumen == '261' && (
                            <div>
                                <div>CIF : {formatCurrency(data.cif, 'USD')}</div>
                                <div>CIF Rupiah : {formatCurrency(data.cif_rupiah, 'IDR')}</div>

                            </div>
                        ))
                        ||
                        (data.kode_dokumen == '262' && (
                            <div>
                                <div>CIF : {formatCurrency(data.cif, 'USD')}</div>
                                <div>CIF Rupiah : {formatCurrency(data.cif_rupiah, 'IDR')}</div>

                            </div>
                        ))
                        ||
                        (data.kode_dokumen == '27' && (
                            <div>
                                <div>Bahan baku :</div>
                                <div className="leading-none text-muted-foreground font-normal">
                                    <div>CIF : {formatCurrency(data.cif_bahan_baku, data.kode_valuta)}</div>
                                    <div>CIF Rupiah : {formatCurrency(data.cif_idr_bahan_baku, 'IDR')}</div>
                                </div>
                                <div>Barang Lainnya :</div>
                                <div className="leading-none text-muted-foreground font-normal">
                                    <div>CIF : {formatCurrency(data.cif_lainnya, data.kode_valuta)}</div>
                                    <div>CIF Rupiah : {formatCurrency(data.cif_idr_lainnya, 'IDR')}</div>
                                </div>
                            </div>
                        ))

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

AppChartRadial.displayName = "AppChartRadial"
export default AppChartRadial 