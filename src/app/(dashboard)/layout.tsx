import { SidebarProvider } from "@/components/ui/sidebar";
import {DashboardSidebar} from "@/modules/dashboard/ui/components/dashboard-sidebar";
import { DashboardNavbar } from "@/modules/dashboard/ui/components/dashboard-navbar";

interface Props{
    children : React.ReactNode;
}
const Layout = ({children}: Props) => {
    return (
        <SidebarProvider>
            <DashboardSidebar/>
            <main className="flex flex-col h-screen w-full bg-[#06090e] selection:bg-[#10b981]/30 selection:text-white relative overflow-hidden">
                {/* Dashboard glow effects */}
                <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#10b981]/[0.03] rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-[#6366f1]/[0.03] rounded-full blur-[120px] pointer-events-none" />
                
                <div className="relative z-10 flex flex-col h-full w-full overflow-y-auto">
                   <DashboardNavbar />
                   {children} 
                </div>
            </main>
        </SidebarProvider>
    );
}
export default Layout;