"use client"; // jika pakai App Router

import React from "react";
import { exportToExcel } from "@/utils/exportExcel";

export default function HomePage() {
    const handleExport = () => {
        const dataSheet1 = [
            { id: 1, name: "Hery", role: "Backend Developer" },
            { id: 2, name: "Budi", role: "Frontend Developer" },
        ];

        const dataSheet2 = [
            { product: "Laptop", price: 15000000 },
            { product: "Monitor", price: 3000000 },
        ];

        // Multiple sheet
        const sheets = {
            "Team": dataSheet1,
            "Inventory": dataSheet2,
        };

        exportToExcel(sheets, "ProjectData");
    };

    return (
        <div style={{ padding: 20 }
        }>
            <h1>Export Excel Multiple Sheet </h1>
            < button
                onClick={handleExport}
                style={{ padding: "10px 20px", background: "green", color: "white" }}
            >
                Export Excel
            </button>
        </div>
    );
}