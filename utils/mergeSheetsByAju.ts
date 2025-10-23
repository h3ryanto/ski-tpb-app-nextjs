type SheetData = Record<string, any>;

interface Sheet {
  sheetName: string;
  data: SheetData[];
}

interface MergedResult {
  result: {
    [sheetName: string]: SheetData[];
  };
}

/**
 * Menggabungkan semua sheet berdasarkan field 'NOMOR AJU'.
 * HEADER akan menjadi sheet utama, sheet lain (ENTITAS, DOKUMEN, dsb)
 * akan dimasukkan sebagai array di dalam setiap record HEADER yang memiliki NOMOR AJU sama.
 */
function mergeSheetsByAju(
  resultArray: Sheet[],
  headerSheetName: string = 'HEADER'
): MergedResult {
  // buat map: sheetName -> data[]
  const sheetMap: Record<string, SheetData[]> = resultArray.reduce(
    (acc, s) => {
      acc[s.sheetName] = s.data || [];
      return acc;
    },
    {} as Record<string, SheetData[]>
  );

  const headers = sheetMap[headerSheetName] || [];

  // sheet selain HEADER dianggap sebagai "anak"
  const childSheetNames = Object.keys(sheetMap).filter(
    (n) => n !== headerSheetName
  );

  // gabungkan berdasarkan NOMOR AJU
  const mergedHeaders = headers.map((header) => {
    const copy = { ...header };
    const aju = String(header['NOMOR AJU'] ?? '').trim();

    childSheetNames.forEach((childName) => {
      const childData = sheetMap[childName] || [];
      copy[childName] = childData.filter(
        (row) => String(row['NOMOR AJU'] ?? '').trim() === aju
      );
    });

    return copy;
  });

  return { result: { [headerSheetName]: mergedHeaders } };
}

export default mergeSheetsByAju;
