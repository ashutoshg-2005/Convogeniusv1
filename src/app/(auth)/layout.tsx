interface Props{
    children: React.ReactNode;
}

const Layout = ({ children }: Props ) => {
    return (
        <div className="bg-[#06090e] relative selection:bg-[#10b981]/30 selection:text-white flex min-h-screen flex-col items-center justify-center p-6 md:p-10 overflow-hidden">
            {/* Background layers */}
            <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-[#10b981]/[0.035] rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#6366f1]/[0.035] rounded-full blur-[150px] pointer-events-none" />
            
            <div className="relative z-10 w-full max-w-sm md:max-w-4xl">
                {children}
            </div>
        </div>
    );
}

export default Layout;