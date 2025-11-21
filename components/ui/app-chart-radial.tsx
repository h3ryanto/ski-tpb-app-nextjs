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
import { format } from "date-fns"
import Link from "next/link"
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
        label: "23",
        color: "hsl(var(--chart-1))",
    },
    '27_IN': {
        label: "27_IN",
        color: "hsl(var(--chart-2))",
    },
    "27_OUT": {
        label: "27_OUT",
        color: "hsl(var(--chart-0))",
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
    React.HTMLAttributes<HTMLDivElement> & { data?: any, dateFrom?: string, dateTo?: string, jumlahDok?: number }
>(({ className, data = [], dateFrom, dateTo, jumlahDok, ...props }, ref) => {
    const [total_dok, setTotalDok] = useState<number>(0);


    const chartData = [
        { kode_dokumen: data.kode_dok, jumlah: Number(data.jumlah), fill: "var(--color-" + data.kode_dok + ")" },
    ]

    useEffect(() => {

        if (data.kode_dok === '27_OUT') {
            const total_dok = Number(data.total_dok_27_out || 1)
            setTotalDok(total_dok);
        } else if (data.kode_dok === '27_IN') {
            const total_dok = Number(data.total_dok_27_in || 1)
            setTotalDok(total_dok);
        } else if (data.kode_dok === '23') {
            const total_dok = Number(data.total_dok_23 || 1)
            setTotalDok(total_dok);
        } else if (data.kode_dok === '30') {
            const total_dok = Number(data.total_dok_30 || 1)
            setTotalDok(total_dok);
        } else if (data.kode_dok === '40') {
            const total_dok = Number(data.total_dok_40 || 1)
            setTotalDok(total_dok);
        } else if (data.kode_dok === '41') {
            const total_dok = Number(data.total_dok_41 || 1)
            setTotalDok(total_dok);
        } else if (data.kode_dok === '261') {
            const total_dok = Number(data.total_dok_261 || 1)
            setTotalDok(total_dok);
        } else if (data.kode_dok === '262') {
            const total_dok = Number(data.total_dok_262 || 1)
            setTotalDok(total_dok);
        } else if (data.kode_dok === '25') {
            const total_dok = Number(data.total_dok_25 || 1)
            setTotalDok(total_dok);
        }
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
                <CardTitle>Dokumen BC {data.kode_dok} {data.kurs}</CardTitle>
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
                        endAngle={(360 / (total_dok || 1)) * Number(data.jumlah)}
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
                                                <Link
                                                    href={`/dokumen?kodeValuta=${data.kurs}&date_from=${dateFrom}&date_to=${dateTo}&kodeDokumen=${data.kode_dok}`} className="cursor-pointer"
                                                >
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
                                                </Link>
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
                    {(data.kode_dok == '23' && (
                        <div>
                            <div>Bahan baku :</div>
                            <div className="leading-none text-muted-foreground font-normal">
                                <div>CIF : {formatCurrency(data.cif_bahan_baku_bc_23, data.kurs)}</div>
                                <div>CIF Rupiah : {formatCurrency(data.cif_idr_bahan_baku_bc_23, 'IDR')}</div>
                            </div>
                            <div>Barang Lainnya :</div>
                            <div className="leading-none text-muted-foreground font-normal">
                                <div>CIF : {formatCurrency(data.cif_lainnya_bc_23, data.kurs)}</div>
                                <div>CIF Rupiah : {formatCurrency(data.cif_idr_lainnya_bc_23, 'IDR')}</div>
                            </div>
                        </div>
                    )) ||
                        (data.kode_dok == '30' && (
                            <div>
                                <div>FOB : {formatCurrency(data.fob, 'USD')}</div>
                                <div>FOB Rupiah : {formatCurrency(data.fob_rupiah, 'IDR')}</div>
                            </div>
                        )) ||
                        (data.kode_dok == '33' && (
                            <div>
                                <div>FOB : {formatCurrency(data.fob, 'USD')}</div>
                                <div>FOB Rupiah : {formatCurrency(data.fob_rupiah, 'IDR')}</div>
                            </div>
                        )) ||
                        (data.kode_dok == '40' && (
                            <div>
                                <div>Bahan baku :</div>
                                <div className="leading-none text-muted-foreground font-normal">
                                    <div>Harga Penyerahan : {formatCurrency(data.penyerahan_bahan_baku, "IDR")}</div>
                                </div>
                                <div>Barang Lainnya :</div>
                                <div className="leading-none text-muted-foreground font-normal">
                                    <div>Harga Penyerahan : {formatCurrency(data.penyerahan_lainnya, "IDR")}</div>
                                </div>
                            </div>
                        )) ||
                        (data.kode_dok == '261' && (
                            <div>
                                <div>CIF : {formatCurrency(data.cif, data.kurs)}</div>
                                <div>CIF Rupiah : {formatCurrency(data.cif_idr, 'IDR')}</div>

                            </div>
                        ))
                        ||
                        (data.kode_dok == '262' && (
                            <div>
                                <div>CIF : {formatCurrency(data.cif, 'USD')}</div>
                                <div>CIF Rupiah : {formatCurrency(data.cif_rupiah, 'IDR')}</div>

                            </div>
                        ))
                        ||
                        ((data.kode_dok === '27_IN') && (
                            <div>
                                <div>Bahan baku :</div>
                                <div className="leading-none text-muted-foreground font-normal">
                                    <div>CIF : {formatCurrency(data.cif_bahan_baku_bc_27, data.kurs)}</div>
                                    <div>CIF Rupiah : {formatCurrency(data.cif_idr_bahan_baku_bc_27, 'IDR')}</div>
                                </div>
                                <div>Barang Lainnya :</div>
                                <div className="leading-none text-muted-foreground font-normal">
                                    <div>CIF : {formatCurrency(data.cif_lainnya_bc_27, data.kurs)}</div>
                                    <div>CIF Rupiah : {formatCurrency(data.cif_idr_lainnya_bc_27, 'IDR')}</div>
                                </div>
                            </div>
                        ))
                        ||
                        ((data.kode_dok === '27_OUT') && (
                            <div>
                                <div>Bahan baku :</div>
                                <div className="leading-none text-muted-foreground font-normal">
                                    <div>CIF : {formatCurrency(data.cif_bahan_baku_bc_27_out, data.kurs)}</div>
                                    <div>CIF Rupiah : {formatCurrency(data.cif_idr_bahan_baku_bc_27_out, 'IDR')}</div>
                                </div>
                                <div>Barang Lainnya :</div>
                                <div className="leading-none text-muted-foreground font-normal">
                                    <div>CIF : {formatCurrency(data.cif_lainnya_bc_27_out, data.kurs)}</div>
                                    <div>CIF Rupiah : {formatCurrency(data.cif_idr_lainnya_bc_27_out, 'IDR')}</div>
                                </div>
                            </div>
                        ))
                        ||
                        ((data.kode_dok === '25') && (
                            <div>
                                <div>Harga Penyerahan :</div>
                                <div className="leading-none text-muted-foreground font-normal">
                                    <div>Harga Penyerahan Rupiah : {formatCurrency(data.penyerahan_bahan_baku, 'IDR')}</div>
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