import { retriveHeader } from "@/lib/database/neon_postgresSql/posts";
import { utils, writeFile } from "xlsx";

async function generateExcelData(aju: string) {
    const header: any = await retriveHeader(aju);
    if (!header) {
        throw new Error("Failed to retrieve header data");
    }
    const workSheeteHeader = utils.json_to_sheet(header);
    const workSheeteBarang = utils.json_to_sheet(header);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, workSheeteHeader, "HEADER");
    utils.book_append_sheet(workbook, workSheeteBarang, "BARANG");
    const excelData = writeFile(workbook, `${aju}.xlsx`, {
        compression: true,
    });
    return excelData;
}

export default generateExcelData;
