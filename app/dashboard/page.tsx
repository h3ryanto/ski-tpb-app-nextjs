/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useState, useEffect } from 'react';
import { getNextsPaginatedData, getFirstsPaginatedData, retriveData } from '@/lib/firebase/firestore/service';


export default function PaginationComponent() {
  const [data, setData] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [firstVisible, setFirstVisible] = useState(null);
  const [page, setPage] = useState<number>(1);

  const load = async () => {
    const data: any = await retriveData('header');
    const newLastVisible = data.newLastVisible;    
    setData(data.data);
    setLastVisible(newLastVisible);    
  }

  const loadNext = async () => {
    const data: any = await getNextsPaginatedData(lastVisible,page);
    const newLastVisible = data.newLastVisible;
    const newFirstVisible = data.newFirstVisible;
    const pageNow = data.pageNow;
    setData(data.data);
    setLastVisible(newLastVisible);
    setFirstVisible(newFirstVisible);
    // console.log(data.newFirstVisible);
    setPage(pageNow);
    console.log(newFirstVisible._document.data.value.mapValue.fields.nomor_aju)
  };

  const loadPrev = async () => {
    // console.log(firstVisible._document.data.value.mapValue.fields.nomor_aju)
    const data: any = await getFirstsPaginatedData(firstVisible,page);
    const newFirstVisible = data.newfirstVisible;
    const newLastVisible = data.newLastVisible;
    const pageNow = data.pageNow;
    setData(data.data);
    setFirstVisible(newFirstVisible);
    setLastVisible(newLastVisible);
    setPage(pageNow);
    console.log(newLastVisible._document.data.value.mapValue.fields.nomor_aju)
  };

  useEffect(() => {
    load();
  }, []);

  return (
    // <div>test</div>
    <div className="max-w-sm">
      {data.map((item: any) => (
        <div key={item.id}>{item.nomor_aju}</div>
      ))}
      <div className="relative flex h-16 items-center justify-between max-w-sm">
        <button onClick={loadPrev} disabled={page===1?true:false}>Prev</button>
        <div>{page}</div>
        <button onClick={loadNext}>Next</button>
      </div>

    </div>
  );
}
