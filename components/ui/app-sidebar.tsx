'use client'
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

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
import UserProfil from "../elements/Navbar/UserProfil/page"
import { NavUser } from "./nav-user"

function classNames(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ');
}

export function AppSidebar() {
    const pathname = usePathname();

    // Menu items.
    const items = [
        { name: 'Home', href: '/', current: pathname === '/' ? true : false, icon: Home },
        { name: 'Dashboard', href: 'dashboard', current: pathname === '/dashboard' ? true : false, icon: Inbox },
        { name: 'Dokumen', href: '/dokumen', current: pathname === '/dokumen' ? true : false, icon: Calendar },
    ]

    const data = {
        user: {
            name: "shadcn",
            email: "m@example.com",
            avatar: "/avatars/shadcn.jpg",
        }
    }

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>PT</SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
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
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarFooter>
                    <NavUser user={data.user} />
                </SidebarFooter>
            </SidebarFooter>
        </Sidebar>
    )
}
