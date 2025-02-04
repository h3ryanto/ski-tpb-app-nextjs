"use client"
import * as React from "react";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { SortAsc, SortDesc } from "lucide-react";

const SortBy = ({ sortBy, children }: { sortBy: string, children?: React.ReactNode }) => {
    const [sortByState, setSortByState] = React.useState<string | undefined>(sortBy);
    const [ascState, setAscState] = React.useState<boolean>(true);
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();
    const params = React.useMemo(() => new URLSearchParams(searchParams), [searchParams]);
    const onSortBy = (By: string) => {
        params.set("sortBy", By)
        if (params.has("asc")) {
            params.set("asc", (!ascState).toString())
        } else {
            params.append("asc", (!ascState).toString())
        }
        replace(`${pathName}?${params.toString()}`)
    };

    React.useEffect(() => {
        if (params.has("sortBy") || (params.has("asc"))) {
            setSortByState(params.get("sortBy") as string)
            setAscState(params.get("asc") === 'true')
        } else {
            params.delete("sortBy");
            setSortByState(undefined)
            setAscState(false)
        }
    }, [params])
    return (
        <Button
            className='font-bold gap-1'
            onClick={() => onSortBy(sortBy)} variant={'ghost'}>{children}{sortByState == sortBy && (ascState == true ? <SortAsc /> : <SortDesc />) || ""}</Button>
    )
}

export default SortBy