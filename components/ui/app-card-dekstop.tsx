import {
    Card,
    CardContent,
} from "@/components/ui/card";

interface AppCardDekstopProps {
    children: React.ReactNode;
}

const AppCardDekstop = ({ children }: AppCardDekstopProps) => {
    return (
        <Card className="mx-auto justify-center rounded-md font-sans text-sm m-2 mr-6 hidden md:block h-[calc(100vh-65px)] ">
            <CardContent className='overflow-y-auto h-[calc(100vh-90px)]'>
                {children}
            </CardContent>
        </Card >
    )
}

export default AppCardDekstop