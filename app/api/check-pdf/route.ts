import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const filename = searchParams.get("file");
  const document = searchParams.get("document");
  const year = searchParams.get("year");

  if (!filename) {
    return NextResponse.json({ error: "File parameter is required" }, { status: 400 });
  }

  if (!document) {
    return NextResponse.json({ error: "Document parameter is required" }, { status: 400 });
  }

  if (!year) {
    return NextResponse.json({ error: "Year parameter is required" }, { status: 400 });
  }

  // path ke folder public
  const filePath = path.join(process.cwd(), "public", "repository/2025/40", `${filename}.pdf`);

  if (fs.existsSync(filePath)) {
    return NextResponse.json({ exists: true });
  } else {
    return NextResponse.json({ exists: false });
  }
}
