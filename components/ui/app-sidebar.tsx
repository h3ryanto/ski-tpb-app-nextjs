'use client'
import { BookTextIcon, ChartNoAxesCombinedIcon, Truck, User2 } from "lucide-react"

import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
} from "@/components/ui/sidebar"
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useSession } from 'next-auth/react';
import { NavUser } from "./nav-user"
import { CloseTrigger } from "./close-trigger-sidebar"

function classNames(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ');
}

export function AppSidebar() {
    const pathname = usePathname();
    const session = useSession();

    // Menu items.
    const items = [
        // { name: 'Home', href: '/', current: pathname === '/' ? true : false, icon: Home },
        { name: 'Dashboard', href: '/dashboard', current: pathname === '/dashboard' ? true : false, icon: ChartNoAxesCombinedIcon, isAdmin: false },
        { name: 'Dokumen', href: '/dokumen', current: pathname === '/dokumen' ? true : false, icon: BookTextIcon, isAdmin: false },
        { name: 'Supplier', href: '/supplier', current: pathname === '/supplier' ? true : false, icon: Truck, isAdmin: false },
        { name: 'User', href: '/user', current: pathname === '/user' ? true : false, icon: User2, isAdmin: true },
    ]

    const data = {
        user: {
            name: session.data?.user?.name || '',
            email: session.data?.user?.email || '',
            avatar: session.data?.user?.image || '',
        }
    }
    // console.log(session.data?.user?.image)
    if (session.data) {
        return (
            <Sidebar collapsible="icon">
                <SidebarHeader>

                    {/* <SidebarMenu><Inbox /></SidebarMenu> */}

                </SidebarHeader>
                <SidebarContent>
                    <div className="grid items-center justify-end px-4 md:hidden">
                        <CloseTrigger />
                    </div>
                    <SidebarGroup>
                        <SidebarGroupLabel>Application</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map((item) => (
                                    (item.isAdmin === false || item.isAdmin === session.data?.user?.isAdmin) && (
                                        <SidebarMenuItem key={item.name}>
                                            <SidebarMenuButton asChild>
                                                <Link
                                                    key={item.name}
                                                    href={item.href} replace
                                                    aria-current={item.current ? 'page' : undefined}
                                                    className={classNames(
                                                        item.current ? 'bg-gray-900 text-white' : '',
                                                        'rounded-md px-3 py-2 text-sm font-medium',
                                                    )}
                                                >
                                                    <item.icon />
                                                    <span>{item.name}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <NavUser user={data.user} />
                </SidebarFooter>
            </Sidebar>
        )
    }
}
