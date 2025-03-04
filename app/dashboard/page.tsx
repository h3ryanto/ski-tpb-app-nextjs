'use client'
import AppCardDekstop from '@/components/ui/app-card-dekstop'
import AppChartPie from '@/components/ui/app-chart-pie'
import AppChartRadial from '@/components/ui/app-chart-radial'
import DatePickerWithRange from '@/components/ui/app-date'
import { CardHeader } from '@/components/ui/card'
import { retriveDataChart } from '@/lib/database/neon_postgresSql/chart'
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import React from 'react'
import { format } from "date-fns";

const Dashboard = () => {
    const [dataChart, setDataChart] = useState<any[]>([]);
    const [dateFrom, setDateFrom] = useState<string>(format(`${format(new Date().toISOString(), "yyyy")}-01-01`, "yyyy-MM-dd"));
    const [dateTo, setDateTo] = useState<string>(format(new Date().toISOString(), "yyyy-MM-dd"));
    const searchParams = useSearchParams();
    const params = React.useMemo(() => new URLSearchParams(searchParams), [searchParams]);
    const getData = async (date_from: string, date_to: string) => {
        const result = await retriveDataChart({ date_from, date_to })
        setDataChart(result)
    }
    useEffect(() => {
        if (params.has("date_from") && params.has("date_to")) {
            setDateFrom(`${params.get("date_from")}`)
            setDateTo(`${params.get("date_to")}`)
            getData(params.get("date_from") || "", params.get("date_to") || "")
        } else {
            setDataChart([])
            getData("2025-01-01", "2025-03-04")
        }

    }, [params])
    return (
        <div>
            <AppCardDekstop >
                <CardHeader className='font-semibold text-gray-600 text-lg'>
                    <div className='flex justify-between'>
                        <div>Dashboard</div>
                        <div className='flex flex-row'>Periode :<DatePickerWithRange className='mx-2' /></div>
                    </div>

                </CardHeader>
                <div className='flex flex-wrap gap-3'>

                    <AppChartPie className='w-65 h-85' />
                    {dataChart.map((data: any, index) => {
                        return <AppChartRadial className='w-60 h-85' data={data} periode={`${format(dateFrom, 'dd MMM yyyy')} - ${format(dateTo, 'dd MMM yyyy')}`} key={index} />
                    })}

                </div>
            </AppCardDekstop>
        </div >
    )
}

export default Dashboard