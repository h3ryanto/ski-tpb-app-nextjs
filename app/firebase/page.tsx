"use client"
import style from './styles.module.css'
import React, { useState, useEffect } from 'react';
import { getNextsPaginatedData, getFirstsPaginatedData, retriveData } from '@/lib/firebase/firestore/service';
import { Suspense } from "react";


export default function PaginationComponent() {
  const [data, setData] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [firstVisible, setFirstVisible] = useState(null);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setPageTotal] = useState<number>(1);
  let i: number = 1

  const load = async () => {
    const data: any = await retriveData('header');
    // console.log(data)
    const newLastVisible = data.newLastVisible;
    setData(data.data);
    setLastVisible(newLastVisible);
    setPageTotal(data.totalPage >= 10 ? Math.round(data.totalPage / 10) : 1);
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
    // console.log(newFirstVisible._document.data.value.mapValue.fields.nomor_aju)
  };

  const loadPrev = async () => {
    const data: any = await getFirstsPaginatedData(firstVisible);
    const newFirstVisible = data.newFirstVisible;
    const newLastVisible = data.newLastVisible;
    setData(data.data);
    setFirstVisible(newFirstVisible);
    setLastVisible(newLastVisible);
    setPage(prev => prev - 1);
  };


  const borderColor = (kode_dokumen: string) => {
    if (kode_dokumen == '30') {
      return 'border-yellow-400';
    } else if (kode_dokumen == '23') {
      return 'border-red-400';
    } else if (kode_dokumen == '27') {
      return 'border-blue-400';
    } else if (kode_dokumen == '40') {
      return 'border-green-400';
    } else if (kode_dokumen == '262') {
      return 'border-pink-400';
    } else if (kode_dokumen == '41') {
      return 'border-cyan-400';
    } else if (kode_dokumen == '33') {
      return 'border-orange-400';
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (

    <div className="container flex flex-col mx-auto justify-center rounded-md font-sans text-sm relative">
      <Suspense fallback={<p>Loading feed...</p>}>
        <div className='columns-1 bg-slate-700 divide-y-2 divide-slate-400 text-slate-100  px-3 md:hidden'>
          {data && data.map((post: any) => (
            <div key={post.id} className='flex items-center hover:bg-blue-400/50'>
              <div className={`flex justify-center items-center border-2 ${borderColor(post.kode_dokumen)} w-12 h-12 rounded-full mr-3`}>{post.kode_dokumen}</div>
              <div>
                <p>{post.nomor_aju}</p>
                <p>{post.nomor_daftar} / {post.tanggal_daftar}</p>
                <p>{ }</p>
              </div>
            </div>
          ))}
        </div>

        <table id={style.table} className="table-auto hidden md:table">
          <thead>
            <tr className="border-b-2 border-y-slate-400 ">
              <th scope="col">No</th>
              <th scope="col">Dok</th>
              <th scope="col">Nomor Aju</th>
              <th scope="col">Nomor Daftar</th>
              <th scope="col">Tanggal Daftar</th>
            </tr>
          </thead>
          <tbody >
            {data && data.map((post: any) => (

              <tr key={post.id}>
                <td>{(i++ + ((10 * page) - 10))}.</td>
                <td>{post.kode_dokumen}</td>
                <td>{post.nomor_aju}</td>
                <td>{post.nomor_daftar}</td>
                <td>{post.tanggal_daftar}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Suspense>
      <div className='flex justify-center mx-auto bg-slate-800 min-w-full py-2'>
        <div className="relative flex items-center justify-between max-w-sm mx-auto text-slate-100">
          <button onClick={loadPrev} disabled={page === 1 ? true : false} className={page === 1 ? "text-gray-700 p-2 rounded-md border" : " hover:border-blue-500  hover:text-blue-500 p-2 rounded-md border-2"}>Previous</button>
          <div className='mx-2'>Page : {page} to {totalPage} of {totalPage} data entris </div>
          <button onClick={loadNext} className={page === totalPage ? "text-gray-700 hover:border-blue-500 p-2 rounded-md border-2 border-grey-400" : "hover:border-blue-500 hover:text-blue-500 p-2 rounded-md border-2"}>Next</button>
        </div>
      </div>

    </div >

  );
}
