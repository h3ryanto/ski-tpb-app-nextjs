import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import type { Entitas, Header } from "@prisma/client";
import AppTabEntitaPengusahTp from "@/components/ui/app-tab-card-entitas";

const TabsEntitas = ({ posts }: { posts: Entitas | Header }) => {
    return (
        <div>
            <Card className='overflow-y-auto w-full h-[75vh]'>
                <CardHeader className="bg-slate-200 h-10 p-2 px-10">
                    <div className="font-semibold">Entitas</div>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4 p-4">
                    {'entitas' in posts && Array.isArray(posts.entitas) && posts.entitas.map((post: Entitas, index: number) => (
                        <div key={index} >
                            <AppTabEntitaPengusahTp post={post} />
                        </div>
                    ))}

                </CardContent>
            </Card >
        </div >
    )
}
export default TabsEntitas;