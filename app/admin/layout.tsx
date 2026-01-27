import { Sidebar } from "./components/Sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50/50 relative overflow-x-hidden font-sans text-slate-800">
            {/* Background Atmosphere (Fixed blobs) */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/40 rounded-full blur-[120px] opacity-50"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/40 rounded-full blur-[120px] opacity-50"></div>
            </div>

            <Sidebar />
            
            <div className="pl-64 transition-all duration-300">
                <main className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700 slide-in-from-bottom-4">
                    {children}
                </main>
            </div>
        </div>
    );
}