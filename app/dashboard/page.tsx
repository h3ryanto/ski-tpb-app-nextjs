"use client"
import style from './styles.module.css'
import React, { useState, useEffect } from 'react';
import { getNextsPaginatedData, getFirstsPaginatedData, retriveData } from '@/lib/firebase/firestore/service';


export default function PaginationComponent() {
  const [data, setData] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [firstVisible, setFirstVisible] = useState(null);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setPageTotal] = useState<number>(1);

  const load = async () => {
    const data: any = await retriveData('header');
    const newLastVisible = data.newLastVisible;
    setData(data.data);
    setLastVisible(newLastVisible);
    setPageTotal(data.totalPage);
  }

  const loadNext = async () => {
    const data: any = await getNextsPaginatedData(lastVisible);
    const newLastVisible = data.newLastVisible;
    const newFirstVisible = data.newFirstVisible;
    setData(data.data);
    setLastVisible(newLastVisible);
    setFirstVisible(newFirstVisible);
    // console.log(data.newFirstVisible);
    setPage(prev => prev + 1);
    console.log(newFirstVisible._document.data.value.mapValue.fields.nomor_aju)
  };

  const loadPrev = async () => {
    // console.log(firstVisible._document.data.value.mapValue.fields.nomor_aju)
    const data: any = await getFirstsPaginatedData(firstVisible);
    const newFirstVisible = data.newFirstVisible;
    const newLastVisible = data.newLastVisible;
    console.log("next ", newLastVisible._document.data.value.mapValue.fields.nomor_aju)
    console.log("prev ", data.newFirstVisible)
    setData(data.data);
    setFirstVisible(newFirstVisible);
    setLastVisible(newLastVisible);
    setPage(prev => prev - 1);

  };

  useEffect(() => {
    load();
  }, []);

  return (

    <div className="container mx-auto px-4">
      <table id={style.table} className="table-auto border-collapse">
        <thead>
          <tr>
            <th scope="col">Dok</th>
            <th scope="col">Nomor Aju</th>
            <th scope="col">Nomor Daftar</th>
            <th scope="col">Tanggal Daftar</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((post: any) => (
            <tr key={post.id}>
              <td>{post.kode_dokumen}</td>
              <td>{post.nomor_aju}</td>
              <td>{post.nomor_daftar}</td>
              <td>{post.tanggal_daftar}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="relative flex h-16 items-center justify-between max-w-sm">
        <button onClick={loadPrev} disabled={page === 1 ? true : false}>Prev</button>
        <div>Page : {page} / {totalPage}</div>
        <button onClick={loadNext}>Next</button>
      </div>
    </div>
  );
}
