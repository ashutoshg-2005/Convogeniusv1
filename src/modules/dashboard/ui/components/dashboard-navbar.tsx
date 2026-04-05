"use client";

import { Button } from "@/components/ui/button";
import { PanelLeftCloseIcon, PanelLeftIcon } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export const DashboardNavbar = () => {
    const { state, toggleSidebar, isMobile } = useSidebar();  

    return (
        <nav className="flex px-6 gap-x-2 items-center py-4 border-b border-white/[0.05] bg-white/[0.01] backdrop-blur-xl sticky top-0 z-50">
            <Button className="size-9 border-white/10 bg-transparent text-slate-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer shadow-sm rounded-lg" variant="outline" onClick={toggleSidebar}>
                { (state === "collapsed" || isMobile) ? 
                <PanelLeftIcon className="size-4"/> : 
                <PanelLeftCloseIcon className="size-4"/> 
                }
            </Button>
        </nav> 
    );
};
