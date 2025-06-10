
export default async function PdfView({
  params,
}: {
  params: Promise<{ slug: string }>
}){
        const { slug } = await params
        const data = await fetch(`${process.env.URL}/api/getPdf?q=${slug[2]}&path=Documens/${slug[0]}/${slug[1]}`)
        const result = await data.json()

        if ((result.url) && (data.status === 200)) {
            console.log(result.url)
      return (
        <div className="w-screen h-svh mx-auto flex flex-col items-center">
            <iframe src={result?.url} className='aspect-square w-full h-full'></iframe>
        </div>
    )      
        }else {
      return (
        <div className="flex items-center justify-center w-screen h-svh">
            <div className="font-bold text-xl">Oops! File Not Found.</div>
        </div>
      )
    }
    
}
