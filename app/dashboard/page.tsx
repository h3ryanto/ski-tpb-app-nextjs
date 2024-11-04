/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useState, useEffect } from 'react';
import { getNextsPaginatedData, getFirstsPaginatedData, retriveData } from '@/lib/firebase/firestore/service';

export default function PaginationComponent() {
  const [data, setData] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [firstVisible, setFirstVisible] = useState(null);

  const load = async () => {
    const data: any = await retriveData('header');
    const newLastVisible = data.newLastVisible;
    setData(data.data);
    setLastVisible(newLastVisible);
  }
  const loadNext = async () => {
    const data: any = await getNextsPaginatedData(lastVisible);
    const newLastVisible = data.newLastVisible;
    const newFirstVisible = data.newFirstVisible;
    setData(data.data);
    setLastVisible(newLastVisible);
    setFirstVisible(newFirstVisible);
    console.log(data.newFirstVisible);
  };

  const loadPrev = async () => {
    console.log(firstVisible);
    const data: any = await getFirstsPaginatedData(firstVisible);
    const newFirstVisible = data.newfirstVisible;
    const newLastVisible = data.newLastVisible;
    setData(data.data);
    setFirstVisible(newFirstVisible);
    setLastVisible(newLastVisible);

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
        <button onClick={loadPrev}>Prev</button>
        <button onClick={loadNext}>Next</button>
      </div>

    </div>
  );
}
