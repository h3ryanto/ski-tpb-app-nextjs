import {
    Card,
    CardContent,
} from "@/components/ui/card";
import type { Entitas } from "@prisma/client";
import AppTabEntitaPengusahTp from "@/components/ui/app-tab-card-entitas";

const TabsEntitas = ({ posts }: { posts: Entitas }) => {
    return (
        <div>
            <Card className='overflow-y-auto w-full h-[75vh]'>
                <CardContent className="grid grid-cols-2 gap-4 p-4">
                    {'detailentitas' in posts && Array.isArray(posts.detailentitas) && posts.detailentitas.map((post: Entitas, index) => (
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