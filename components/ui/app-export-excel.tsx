"use client";

import React from "react";
import { exportToExcel } from "@/utils/exportExcel";
import AppTooltip from "@/components/ui/app-tool-tip";
import { DownloadCloud } from "lucide-react";
import { TransformData } from "@/utils/trasfornData";

export default function AppExportExcel({ data, file_name }: { data: any, file_name: string }) {
    const handleExport = () => {
        // Gunakan fungsi dari utils
        const result = TransformData(data);

        console.log("Data hasil transformasi:", result);

        // Ekspor ke Excel
        exportToExcel(result, file_name);
    };

    return (
        <AppTooltip title="Export Excel Dokumen" sideAlign="left">
            <DownloadCloud
                size={16}
                className="hover:stroke-blue-600 cursor-pointer"
                onClick={handleExport}
            />
        </AppTooltip>
    );
}