
export default async function PdfView({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  // const data = await fetch(`${process.env.URL}/api/getPdf?q=${slug[2]}&path=Documens/${slug[0]}/${slug[1]}`)
  // const result = await data.json()

  // if ((result.url) && (data.status === 200)) {
  //   // const url = `https://${result.url.split('//')[1]}`
  return (
    <div className="w-screen h-svh mx-auto flex flex-col items-center">
      <iframe src={`${process.env.URL}/api/getPdf/${slug[0]}/${slug[1]}/${slug[2]}`} className='aspect-square w-full h-full'></iframe>
      {/* <embed
        src={`${process.env.URL}/api/getPdf/${slug[0]}/${slug[1]}/${slug[2]}`}
        type="application/pdf"
        width="100%"
        height="100%"
      /> */}
    </div>
  )
  // } else {
  //   return (
  //     <div className="flex items-center justify-center w-screen h-svh">
  //       <div className="font-bold text-xl">Oops! File Not Found.</div>
  //     </div>
  //   )
  // }

}
