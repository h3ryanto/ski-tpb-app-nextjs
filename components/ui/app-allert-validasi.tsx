'use client';

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./button";
import React, { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

interface AlertValidasiProps {
    result: any;
    triggerOpenValidasi: boolean;
    onClose?: () => void;
}

const AlertValidasi: React.FC<AlertValidasiProps> = ({
    result,
    triggerOpenValidasi,
    onClose,
}) => {
    const [open, setOpen] = useState(false);
    // console.log(result, 'result di alert validasi');
    // Akan men-trigger dialog ketika prop triggerOpenValidasi berubah
    useEffect(() => {
        if (triggerOpenValidasi) {
            setOpen(true);
        }
    }, [triggerOpenValidasi]);

    // Tutup dialog ketika user klik tombol "Close"
    const handleClose = () => {
        setOpen(false);
        if (onClose) onClose(); // opsional: memberi tahu parent bahwa dialog ditutup
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-md mx-auto top-52 bg-slate-50 text-sm z-[9999]">
                <DialogHeader className="items-center">
                    {result.status == 200 ? (
                        <div className="text-green-500 text-center justify-items-center">
                            <Check size={44} className="border border-green-500 rounded-full mr-2 mb-2 animate-pulse" />
                            <DialogTitle className="text">Success</DialogTitle>
                        </div>
                    ) : (
                        <div className="text-red-500 text-center justify-items-center">
                            <X size={44} className="border border-red-500 rounded-full mr-2 mb-2 animate-bounce" />
                            <DialogTitle>Error</DialogTitle>
                        </div>
                    )
                    }


                </DialogHeader>

                <div className="my-4 text-center">

                    {result.status == 200 ? (
                        <div className="text-green-500">
                            {result.message}
                        </div>
                    ) : (
                        <div className="text-red-500">
                            {result.message}
                        </div>
                    )
                    }


                </div>

                <DialogFooter className="sm:justify-end text-sm justify-items-center">
                    <DialogClose asChild>
                        <Button size={"sm"} onClick={handleClose}>
                            OK
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AlertValidasi;
