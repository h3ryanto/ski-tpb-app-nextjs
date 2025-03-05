'use client'
import AppCardDekstop from '@/components/ui/app-card-dekstop'
import AppChartPie from '@/components/ui/app-chart-pie'
import AppChartRadial from '@/components/ui/app-chart-radial'
import DatePickerWithRange from '@/components/ui/app-date'
import { CardHeader } from '@/components/ui/card'
import { retriveDataChart, retriveDataStatikChart } from '@/lib/database/neon_postgresSql/chart'
import { use, useEffect, useState } from "react";

import React from 'react'
import { format } from "date-fns";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
const Dashboard = (props: {
    searchParams: SearchParams
}) => {
    const [dataChart, setDataChart] = useState<any[]>([]);
    const [dataChartStatistic, setDataChartStatistic] = useState<any[]>([]);
    const [dateFrom, setDateFrom] = useState<string>(format(`${format(new Date().toISOString(), "yyyy")}-01-01`, "yyyy-MM-dd"));
    const [dateTo, setDateTo] = useState<string>(format(new Date().toISOString(), "yyyy-MM-dd"));
    const searchParams = use(props.searchParams)
    const getData = async (date_from: string, date_to: string) => {
        const result = await retriveDataChart({ date_from, date_to })
        const Statistic = await retriveDataStatikChart({ date_from, date_to })
        setDataChartStatistic(Statistic)
        setDataChart(result)
    }

    useEffect(() => {
        if (searchParams?.date_from && searchParams?.date_to) {
            setDateFrom(`${searchParams?.date_from?.toString() || ''}`)
            setDateTo(`${searchParams?.date_to?.toString() || ''}`)
            getData(searchParams?.date_from?.toString() || '', searchParams?.date_to?.toString() || '')
        } else {
            setDataChart([])
            getData("2025-01-01", "2025-03-04")
        }

    }, [searchParams])
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

                    <AppChartPie className='w-65 h-85' data={dataChartStatistic} periode={`${format(dateFrom, 'dd MMM yyyy')} - ${format(dateTo, 'dd MMM yyyy')}`} />
                    {dataChart.map((data: any, index) => {
                        return <AppChartRadial className='w-60 h-85' data={data} periode={`${format(dateFrom, 'dd MMM yyyy')} - ${format(dateTo, 'dd MMM yyyy')}`} key={index} />
                    })}

                </div>
            </AppCardDekstop>
        </div >
    )
}

export default Dashboard