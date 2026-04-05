"use client";
import { Separator } from "@/components/ui/separator";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { BotIcon, StarIcon, VideoIcon, LayoutDashboardIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardUserButton } from "./dashboard-user-button-client";
import { DashboardTrial } from "./dashboard-trial";

const firstSection = [
    {
        icon: LayoutDashboardIcon,
        label: "Dashboard",
        href: "/dashboard"
    },
    {
        icon: VideoIcon,
        label: "Meetings",
        href: "/meetings"
    },
    {
        icon: BotIcon,
        label: "Agents",
        href: "/agents"
    }
]
const secondSection = [
    {
        icon: StarIcon,
        label: "Upgrade",
        href: "/upgrade"
    }
]

export const DashboardSidebar = () => {
    const pathname = usePathname();

    return ( 
        <Sidebar className="border-r border-white/[0.05] bg-[#06090e] shadow-xl">
            <SidebarHeader className="text-white mt-2">
                <Link href="/dashboard" className="flex items-center gap-3 px-3 pt-2 group cursor-pointer">
                    <div className="relative overflow-hidden rounded-xl bg-white/[0.02] border border-white/10 p-1 group-hover:border-emerald-500/50 transition-colors">
                        <Image src="/logo.svg" height={32} width={32} alt="Meet AI" className="drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <p className="text-2xl font-bold tracking-tight text-white drop-shadow-sm pointer-events-none">ConvoGenius</p>
                </Link>
            </SidebarHeader>
            <div className="px-4 py-3">
                 <Separator className="bg-white/[0.05]" />
            </div>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="px-2 space-y-1">
                            {firstSection.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton asChild className={cn(
                                        "h-[42px] px-3 border transition-all duration-200 cursor-pointer rounded-lg",
                                        isActive 
                                            ? "bg-white/[0.08] border-white/10 text-emerald-400 font-semibold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] shadow-emerald-500/10" 
                                            : "border-transparent text-slate-400 hover:text-white hover:bg-white/[0.04] hover:shadow-sm"
                                    )}
                                    isActive={isActive}
                                    >
                                        <Link href={item.href} className="flex items-center gap-3">
                                            <item.icon className={cn("size-4.5", isActive ? "text-emerald-400 drop-shadow-[0_0_6px_rgba(16,185,129,0.4)]" : "")} />
                                            <span className="text-[14px] tracking-tight">
                                                {item.label}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )})}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <div className="px-4 py-3">
                 <Separator className="bg-white/[0.05]" />
                </div>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="px-2 space-y-1">
                            {secondSection.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton asChild className={cn(
                                         "h-[42px] px-3 border transition-all duration-200 cursor-pointer rounded-lg",
                                         isActive 
                                             ? "bg-white/[0.08] border-white/10 text-emerald-400 font-semibold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] shadow-emerald-500/10" 
                                             : "border-transparent text-slate-400 hover:text-white hover:bg-white/[0.04] hover:shadow-sm"
                                    )}
                                    isActive={isActive}
                                    >
                                        <Link href={item.href} className="flex items-center gap-3">
                                            <item.icon className={cn("size-4.5", isActive ? "text-emerald-400 drop-shadow-[0_0_6px_rgba(16,185,129,0.4)]" : "")} />
                                            <span className="text-[14px] tracking-tight">
                                                {item.label}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )})}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="text-slate-300">
                <DashboardTrial/>
                <DashboardUserButton/>            
            </SidebarFooter>
        </Sidebar>
     );
}
 
