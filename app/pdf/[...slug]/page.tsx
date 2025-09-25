
import path from "path";

export default async function PdfView({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
          const filePath = path.join(process.cwd(), `repository/${slug[0]}/${slug[1]}`, `${slug[2]}.pdf`);
          console.log("File Path:", filePath);

  return (
    <div className="w-screen h-svh mx-auto flex flex-col items-center">
      <iframe src={filePath} className='aspect-square w-full h-full'></iframe>
      {/* <iframe src={`${process.env.URL}/api/getPdf/${slug[0]}/${slug[1]}/${slug[2]}`} className='aspect-square w-full h-full'></iframe> */}
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
