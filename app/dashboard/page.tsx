'use client'
import AppCardDekstop from '@/components/ui/app-card-dekstop'
import AppChartPie from '@/components/ui/app-chart-pie'
import AppChartRadial from '@/components/ui/app-chart-radial'
import DatePickerWithRange from '@/components/ui/app-date'
import { CardHeader } from '@/components/ui/card'
import { retriveDataChart, retriveDataStatikChart, countData, retriveDataKontainer } from '@/lib/database/neon_postgresSql/chart'
import { use, useEffect, useState } from "react";

import React from 'react'
import { format } from "date-fns";
import AppChartRadialKontainer from '@/components/ui/app-chart-radial-kontainer'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
const Dashboard = (props: {
    searchParams: SearchParams
}) => {
    const [dataCount, setDataCount] = useState<number>(0);
    const [dataChart, setDataChart] = useState<any[]>([]);
    const [dataChartContainer, setDataChartContainer] = useState<any[]>([]);
    const [dataChartStatistic, setDataChartStatistic] = useState<any[]>([]);
    const [dateFrom, setDateFrom] = useState<string>(format(`${format(new Date().toISOString(), "yyyy")}-01-01`, "yyyy-MM-dd"));
    const [dateTo, setDateTo] = useState<string>(format(new Date().toISOString(), "yyyy-MM-dd"));
    const searchParams = use(props.searchParams)
    const getData = async (date_from: string, date_to: string) => {
        const result = await retriveDataChart({ date_from, date_to })
        const Statistic = await retriveDataStatikChart({ date_from, date_to })
        const count = await countData({ date_from, date_to });
        const jlmContainer = await retriveDataKontainer({ date_from, date_to });
        // console.log(jlmContainer)
        setDataCount(count[0].jumlah);
        setDataChartStatistic(Statistic)
        setDataChartContainer(jlmContainer)
        setDataChart(result)
        // setCountData(count)
        // console.log(count[0].jumlah)
    }
    // console.log(dataCount)
    useEffect(() => {
        if (searchParams?.date_from && searchParams?.date_to) {
            setDateFrom(`${searchParams?.date_from?.toString() || ''}`)
            setDateTo(`${searchParams?.date_to?.toString() || ''}`)
            getData(searchParams?.date_from?.toString() || '', searchParams?.date_to?.toString() || '')
        } else {
            setDataChart([])
            getData(dateFrom, dateTo)
        }

    }, [searchParams, dateFrom, dateTo])
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
                        return <AppChartRadial className='w-60 h-85' data={data} dateFrom={dateFrom} dateTo={dateTo}
                            jumlahDok={dataCount} key={index} />
                    })}
                    {dataChartContainer.map((data: any, index) => {
                        return <AppChartRadialKontainer className='w-60 h-85 bg-sky-100' data={data} dateFrom={dateFrom} dateTo={dateTo}
                            jumlahDok={dataCount} key={index} />
                    })}
                </div>

            </AppCardDekstop>
        </div >
    )
}

export default Dashboard