import generateExcelData from "@/utils/ExcelDataGenerator";

function downloadExcelFile(data: any) {
    generateExcelData(data);
    // const blob = new Blob([excelData], { type: "application/octet-stream" });
    // const url = URL.createObjectURL(blob);
    // const link = document.createElement("a");
    // link.href = url;
    // link.setAttribute("download", "data.xlsx");
    // document.body.appendChild(link);
    // link.click();
}

export default downloadExcelFile;
