import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Description } from "@radix-ui/react-dialog"
import { Button } from "./button"
import { CircleCheckBig, UploadCloudIcon } from "lucide-react"
import React, { useState, useRef, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

export function ImportDataExcell() {
    const inputFile = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setSuccess] = useState<boolean>(false);
    const [data, setData] = useState<any[]>([]);
    const [tab, setTab] = useState<any[]>([]);

    const handleSave = async (data: any) => {
        const result = await fetch('/api/save-data', {
            method: 'POST',
            body: JSON.stringify({
                result: data,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const getResult = await result.json()
        console.log(getResult)
    }

    const handleFileChange = () => {
        setSuccess(false);
        if (inputFile.current?.files) {
            setFile(inputFile.current.files[0]);
            setError(null);
        }

    };

    const handleUpload = React.useCallback(async () => {
        if (!file) {
            setError('Please select a file to upload.');
            return;
        }

        setUploading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await fetch('/api/import-excel', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            // console.log(Object.keys(data.data))
            if (response.ok) {
                toast({
                    title: "Import Success",
                    description: "Data Berhasil diimport",
                })
                setData(result.data);
                setTab(Object.keys(result.data))
                setFile(null);
                setSuccess(true);
                setFile(null);
                console.log(tab, 'data')
            } else {
                toast({
                    variant: "destructive",
                    title: "Import Failed",
                    description: result.message,
                })
                setError(result.message || 'Import failed');
            }
        } catch (error) {
            console.error('Import error:', error);
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setUploading(false);
        }
    }, [file, setData, setTab, setFile, setSuccess, setError, setUploading, tab]);

    useEffect(() => {
        if (file) {
            handleUpload();
        }
    }, [file, handleUpload]);

    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button><UploadCloudIcon />Impor Data</Button>
            </DialogTrigger>
            <Description></Description>
            <DialogContent className="max-w-[80vw] bg-slate-50">
                <DialogHeader>
                    <DialogTitle>Impor Data Excel</DialogTitle>
                </DialogHeader>
                <div className="p-3 rounded border border-gray-300 font-sans text-sm">
                    <div className="flex flex-row items-center justify-start gap-1">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="small_size">Silakan pilih file Excel yang ingin diimpor. Pastikan file tersebut sesuai dengan format yang telah ditentukan.</label>
                            <input
                                ref={inputFile}
                                className="hidden w-full mb-5 text-xs text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                id="small_size"
                                type="file"
                                onChange={handleFileChange}
                                disabled={uploading}
                                accept=".xlsx, .xls"
                            ></input>
                            <div className="flex items-center gap-2">
                                <Button
                                    onClick={() => inputFile.current?.click()}
                                >
                                    <UploadCloudIcon />
                                </Button>
                                {error && <p className="text-red-500">{error}</p>}
                                {isSuccess && <p className="flex items-center gap-2 text-green-500 "><CircleCheckBig size={16} /> Data Berhasil diimport</p>}
                                {uploading && <p className="animate-pulse text-gray-500 ">Import file...</p>}
                            </div>
                        </div>
                    </div>

                </div>
                <Tabs defaultValue="Header" className="w-auto h-[50vh] overflow-x-auto">
                    <TabsList className="w-auto bg-white p-3 sticky top-0" >
                        {tab && tab.map((item, index) => (
                            <TabsTrigger key={index} value={item} className="w-full">
                                {item}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {tab && tab.map((item, index) => (

                        <TabsContent key={index} value={item}>
                            <table className="table-auto w-full border-collapse border border-slate-300 font-sans text-sm m-2 p-2">
                                <thead className="border border-slate-300 bg-slate-200 sticky top-9">
                                    <tr>
                                        {data[item] && data[item][0] && Object.keys(data[item][0]).map((key, index) => (
                                            <td className="p-2" key={index}>{key}</td>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="border border-slate-300">
                                    {data[item] && data[item].map((items: any, index: number) => (
                                        <tr key={index} className="border-x border-b">
                                            {data[item] && data[item][0] && Object.keys(data[item][0]).map((key, index) => (
                                                <td className="p-2" key={index}>{items[key]}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </TabsContent>

                    ))}
                </Tabs>
                <DialogFooter>
                    {/* <Button onClick={() => setFile(null)} variant="outline" className="w-full">Batal</Button> */}
                    <Button onClick={() => handleSave(data)} variant="destructive" className="w-auto" disabled={data.length === 0}>Simpan</Button>
                </DialogFooter>
            </DialogContent >
        </Dialog >
    )
}
