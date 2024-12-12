import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ShowPage() {
    const handleStringToInt = (value: string) => {
        console.log(value)
    }
    return (

        <Select onValueChange={handleStringToInt}>
            <SelectTrigger className="w-auto">
                <SelectValue placeholder="10/Page" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="10">10/Page</SelectItem>
                <SelectItem value="25">25/Page</SelectItem>
                <SelectItem value="50">50/Page</SelectItem>
                <SelectItem value="100">100/Page</SelectItem>
            </SelectContent>
        </Select>

    )
}
