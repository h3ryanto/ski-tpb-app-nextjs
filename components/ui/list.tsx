import kodeDokumen from '@/app/utils/kodeDokumen';
import { CalendarDaysIcon, PaperAirplaneIcon, PencilSquareIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { formatCurrency } from '@/app/utils/currency';
import Search from './search';
import { PaginationWithLinks } from '@/components/ui/pagination-with-links';
import { InboxIcon } from "lucide-react"


const List = ({ posts, page, limit, dataEntry }: { posts: any, page: number, limit: number, dataEntry: number }) => {
    const countData = posts.length;
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
    return (
        <div className='columns-1 bg-slate-700 divide-y-2 divide-slate-400 text-slate-100 w-screen px-3 md:hidden'>
            <Search>
                <Accordion type="single" collapsible>
                    {countData && posts.map((post: any) => (
                        <AccordionItem value={post.nomor_aju} key={post.nomor_aju}>
                            <AccordionTrigger>
                                <div className='flex items-center hover:bg-blue-400/50'>
                                    <div className={`flex justify-center items-center border-2 ${borderColor(post.kode_dokumen)} w-12 h-12 rounded-full mr-3`}>{post.kode_dokumen}</div>
                                    <div >
                                        <p className='flex items-center'>
                                            <PaperAirplaneIcon aria-hidden="true" className="h-3 w-3 marker:mr-1 stroke-red-400" />
                                            {post.nomor_aju}
                                        </p>
                                        <p className='flex items-center'>
                                            <UserGroupIcon aria-hidden="true" className="h-3 w-3 mr-1 stroke-orange-400" />
                                            {/* {entitas(post)} */}
                                            {post.nama_entitas}
                                        </p>
                                        <p className='flex items-center'>
                                            <PencilSquareIcon aria-hidden="true" className="h-3 w-3 mr-1 stroke-cyan-500" />
                                            {post.nomor_daftar} /
                                            <CalendarDaysIcon aria-hidden="true" className="h-3 w-3 mr-1 ml-1 stroke-blue-400" />
                                            {/* {post.tanggal_daftar.toLocaleDateString("id-ID")} */}
                                            {post.ftanggal_daftar}
                                        </p>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className='bg-slate-600 w-full p-3'>
                                    <div className='underline'>Dokumen:</div>
                                    {post.dokumens.map((dok: any) => (
                                        <div key={dok.id} className='mx-3'>
                                            {kodeDokumen(dok.kode_dokumen)} : {dok.nomor}
                                        </div>
                                    ))}
                                    <br></br>
                                    <div className='underline'>Barang:</div>
                                    <div className='divide-y-2 divide-slate-400'>
                                        {post.barang.map((barang: any) => (
                                            <div className='flex flex-col items-start mx-3' key={barang.id}>

                                                <p className='flex items-center'>
                                                    HS Code : {barang.hs_code}
                                                </p>
                                                <p className='flex items-center'>
                                                    Kode Barang : {barang.kode_barang}
                                                </p>
                                                <p className='flex items-center'>
                                                    Uraian : {barang.uraian}
                                                </p>
                                                <p className='flex items-center'>
                                                    Jumlah : {barang.satuan} {barang.kode_satuan}
                                                </p>
                                                <p className='flex items-center'>
                                                    CIF : {formatCurrency(barang.cif, 'en-US', barang.valuta || 'IDR')}
                                                </p>
                                                <p className='flex items-center'>
                                                    Harga Penyerahan : {formatCurrency(barang.harga_penyerahan, 'id-ID', 'IDR')}
                                                </p>
                                                <p className='flex items-center'>
                                                    FOB : {formatCurrency(barang.fob, 'en-US', barang.valuta || 'IDR')}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    )) || (<span className='flex flex-col items-center py-3'><InboxIcon className='my-2' />Data tidak ditemukan</span>)}
                </Accordion>
            </Search>
            <div className="container flex justify-center mx-auto py-3 border-t-2 border-slate-400 md:border-t-0 text-slate-100 bg-slate-700 md:bg-inherit md:text-inherit">
                <PaginationWithLinks page={page} pageSize={limit} totalCount={dataEntry} pageSizeSelectOptions={{ pageSizeOptions: [10, 20, 50, 100] }} />
            </div>
        </div >
    )
};
export default List;