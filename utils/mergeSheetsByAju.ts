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
 * Ubah key dari object jadi snake_case lowercase
 */
function toSnakeCaseKeys(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};
  for (const key in obj) {
    const snakeKey = key
      .toLowerCase()
      .replace(/\s+/g, '_') // ubah spasi jadi underscore
      .replace(/[^\w_]/g, ''); // hilangkan karakter non-alfanumerik
    result[snakeKey] = obj[key];
  }
  return result;
}

/**
 * Gabungkan sheet berdasarkan 'nomor_aju' dan ubah key menjadi lowercase snake_case.
 */
function mergeSheetsByAju(
  resultArray: Sheet[],
  headerSheetName: string = 'HEADER'
): MergedResult {
  // buat map: sheetName -> data[]
  const sheetMap: Record<string, SheetData[]> = resultArray.reduce(
    (acc, s) => {
      acc[s.sheetName] = s.data.map(toSnakeCaseKeys) || [];
      return acc;
    },
    {} as Record<string, SheetData[]>
  );

  const headers = sheetMap[headerSheetName] || [];

  // sheet selain HEADER dianggap anak
  const childSheetNames = Object.keys(sheetMap).filter(
    (n) => n !== headerSheetName
  );

  // gabungkan berdasarkan nomor_aju
  const mergedHeaders = headers.map((header) => {
    const copy = { ...header };
    const aju = String(header['nomor_aju'] ?? '').trim();

    childSheetNames.forEach((childName) => {
      const childKey = childName.toLowerCase(); // biar entitas, dokumen, dst.
      const childData = sheetMap[childName] || [];
      copy[childKey] = childData.filter(
        (row) => String(row['nomor_aju'] ?? '').trim() === aju
      );
    });

    return copy;
  });

  return { result: { [headerSheetName.toLowerCase()]: mergedHeaders } };
}

export default mergeSheetsByAju;
