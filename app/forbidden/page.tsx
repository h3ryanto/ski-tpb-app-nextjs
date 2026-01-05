import Link from "next/link";

export default function Forbidden() {
  return (
    <div className="container mx-auto text-center flex flex-col items-center justify-center h-screen">
      <div className="flex flex-row mb-4 font-semibold divide-x-2 divide-black gap-2">
        <h1>403</h1>
        <h2 className="px-2">Forbidden</h2>
      </div>
      <p>Anda tidak memiliki izin untuk mengakses halaman ini.</p>
      <Link href="/dashboard" className="text-blue-500">
        Return Dashboard
      </Link>
    </div>
  );
}
