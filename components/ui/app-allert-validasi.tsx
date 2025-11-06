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
            <DialogContent className="max-w-md mx-auto top-52 bg-slate-50 text-sm">
                <DialogHeader>
                    <DialogTitle className="text-lg">Validasi</DialogTitle>
                </DialogHeader>

                <div className="max-w-md mx-auto bg-white p-6 rounded border border-gray-300">

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

                <DialogFooter className="sm:justify-end text-sm">
                    <DialogClose asChild>
                        <Button size={"sm"} onClick={handleClose}>
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AlertValidasi;
