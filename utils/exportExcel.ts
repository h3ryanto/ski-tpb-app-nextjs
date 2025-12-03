import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function exportToExcel(sheets: Record<string, any[]>, fileName: string) {
    // Buat workbook baru
    const wb = XLSX.utils.book_new();

    // Loop setiap sheet
    Object.entries(sheets).forEach(([sheetName, data]) => {
        // Convert array of object ke worksheet
        const ws = XLSX.utils.json_to_sheet(data);
        // Tambahkan worksheet ke workbook
        XLSX.utils.book_append_sheet(wb, ws, sheetName);
    });

    // Generate buffer
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    // Simpan file
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), `${fileName}.xlsx`);
}