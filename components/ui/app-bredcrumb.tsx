'use client'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { usePathname } from 'next/navigation'
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useSession } from 'next-auth/react';
import DarkModeToggle from "./darfkmode"
import { OpenTrigger } from "./open-trigger-sidebar"


const AppBreadCrumb = () => {
    const pathname = usePathname();
    // console.log(pathname.split('/').slice(1));
    const session = useSession();
    if (session.data && !pathname.startsWith('/pdf')) {
        return (
            <header className="flex h-12 sticky top-0  dark:bg-slate-800 shrink-0 items-center justify-between px-6 gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 md:bg-white bg-slate-50">
                <div className="flex items-center gap-2 md:px-2">
                    <SidebarTrigger className="hidden md:block" />
                    <OpenTrigger />
                    <Separator orientation="vertical" className="mr-2 h-4 hidden md:block" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="/">
                                    Home
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {pathname == '/' ? '' : <BreadcrumbSeparator className="hidden md:block" />}
                            <BreadcrumbItem className="flex justify-center w-[50vw] md:flex-none md:w-auto">
                                <BreadcrumbPage className="capitalize text-xl md:text-sm">{pathname.split('/').slice(1)}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <DarkModeToggle />
            </header >
        )
    }
}

export default AppBreadCrumb;
