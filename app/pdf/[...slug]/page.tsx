
export default async function PdfView({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return (
    <div className="w-screen h-svh mx-auto flex flex-col items-center">
      <iframe src={`${process.env.URL}/api/getPdf/${slug[0]}/${slug[1]}/${slug[2]}`} className='aspect-square w-full h-full'></iframe>
    </div>
  )
}
