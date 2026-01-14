"use client";
import AppCardDekstop from "@/components/ui/app-card-dekstop";
import AppChartPie from "@/components/ui/app-chart-pie";
import AppChartRadial from "@/components/ui/app-chart-radial";
import DatePickerWithRange from "@/components/ui/app-date";
import { CardHeader } from "@/components/ui/card";
import { use, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

import React from "react";
import { format } from "date-fns";
import AppChartRadialKontainer from "@/components/ui/app-chart-radial-kontainer";
import PageGuard from "@/components/guards/PageGuard";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
const Dashboard = (props: { searchParams: SearchParams }) => {
  const { toast } = useToast();
  const [dataCount, setDataCount] = useState<number>(0);
  const [dataChart, setDataChart] = useState<any[]>([]);
  const [dataChartContainer, setDataChartContainer] = useState<any[]>([]);
  const [dataChartStatistic, setDataChartStatistic] = useState<any[]>([]);
  const [dateFrom, setDateFrom] = useState<string>(
    format(`${format(new Date().toISOString(), "yyyy")}-01-01`, "yyyy-MM-dd")
  );
  const [dateTo, setDateTo] = useState<string>(
    format(new Date().toISOString(), "yyyy-MM-dd")
  );
  const searchParams = use(props.searchParams);
  const getData = React.useCallback(
    async (date_from: string, date_to: string) => {
      try {
        const data = await fetch("/api/get-chart", {
          method: "POST",
          body: JSON.stringify({
            date_from: date_from,
            date_to: date_to,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const posts = await data.json();
        if (posts.posts) {
          setDataCount(Number(posts.count || 0));
          setDataChartStatistic(posts.Statistic);
          setDataChartContainer(posts.jlmContainer);
          setDataChart(posts.posts);
        }
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Error Conecting Server Database",
          description: `${error}`,
        });
      }
    },
    [toast]
  );
  //   console.log(dataChart, "<-dataChartContainer");

  useEffect(() => {
    if (searchParams?.date_from && searchParams?.date_to) {
      setDateFrom(`${searchParams?.date_from?.toString() || ""}`);
      setDateTo(`${searchParams?.date_to?.toString() || ""}`);
      getData(
        searchParams?.date_from?.toString() || "",
        searchParams?.date_to?.toString() || ""
      );
    } else {
      setDataChart([]);
      getData(
        format(
          `${format(new Date().toISOString(), "yyyy")}-01-01`,
          "yyyy-MM-dd"
        ),
        format(new Date().toISOString(), "yyyy-MM-dd")
      );
    }
  }, [searchParams, dateFrom, dateTo, getData]);
  return (
    <PageGuard>
      <div>
        <AppCardDekstop>
          <CardHeader className="font-semibold text-gray-600 text-lg">
            <div className="flex justify-between">
              <div>Dashboard</div>
              <div className="flex flex-row">
                Periode :<DatePickerWithRange className="mx-2" />
              </div>
            </div>
          </CardHeader>
          {(dataChart.length > 0 && (
            <div className="flex flex-wrap gap-3">
              <AppChartPie
                className="w-65 h-85"
                data={dataChartStatistic}
                periode={`${format(dateFrom, "dd MMM yyyy")} - ${format(dateTo, "dd MMM yyyy")}`}
              />
              {dataChart.map((data: any, index) => {
                return (
                  <AppChartRadial
                    className="w-60 h-85"
                    data={data}
                    dateFrom={dateFrom}
                    dateTo={dateTo}
                    jumlahDok={dataCount}
                    key={index}
                  />
                );
              })}
              {dataChartContainer.map((data: any, index) => {
                return (
                  <AppChartRadialKontainer
                    className="w-60 h-85 bg-sky-100 dark:bg-slate-700"
                    data={data}
                    dateFrom={dateFrom}
                    dateTo={dateTo}
                    jumlahDok={dataCount}
                    key={index}
                  />
                );
              })}
            </div>
          )) || (
              <div className="flex flex-col justify-item-center item-center gap-10">
                <div className="flex flex-col justify-item-center item-center gap-2 font-semibold text-gray-600 text-lg">
                  <div className="flex justify-center justify-items-center">
                    Data tidak ditemukan untuk periode{" "}
                    {`${format(dateFrom, "dd MMM yyyy")} - ${format(dateTo, "dd MMM yyyy")}`}
                  </div>
                  <div className="flex justify-center justify-items-center">Silahkan pilih periode lain untuk melihat data sebelumnya.</div>
                </div>
                <div className="text-center p-10 bg-gray-800 rounded-xl shadow-2xl">
                  {/* Main Greeting */}
                  <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 mb-4 animate-pulse">
                    Happy New Year! 🎉
                  </h1>

                  {/* Subtitle/Year */}
                  <p className="text-white text-2xl md:text-3xl font-semibold mb-6">
                    Wishing you a wonderful {`${format(dateFrom, "yyyy")} !`}
                  </p>
                </div>
              </div>
            )}
        </AppCardDekstop>
      </div >
    </PageGuard >
  );
};

export default Dashboard;
