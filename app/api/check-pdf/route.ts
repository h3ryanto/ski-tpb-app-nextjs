import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const filename = searchParams.get("file");
  const kode_dokumen = searchParams.get("document");
  const tahun = searchParams.get("year");

  if (!filename) {
    return NextResponse.json({ error: "File parameter is required" }, { status: 400 });
  }

  if (!kode_dokumen) {
    return NextResponse.json({ error: "Document parameter is required" }, { status: 400 });
  }

  if (!tahun) {
    return NextResponse.json({ error: "Year parameter is required" }, { status: 400 });
  }

  // path ke folder public
  const filePath = path.join(process.cwd(), "public", `repository/${tahun}/${kode_dokumen}`, `${filename}.pdf`);

  if (fs.existsSync(filePath)) {
    return NextResponse.json({ exists: true });
  } else {
    return NextResponse.json({ exists: false });
  }
}
