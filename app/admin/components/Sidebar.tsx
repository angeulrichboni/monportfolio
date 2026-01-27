"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FolderGit2, 
  Briefcase, 
  Cpu, 
  Settings, 
  LogOut,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: FolderGit2, label: "Projets", href: "/admin/projects" },
  { icon: Briefcase, label: "Expériences", href: "/admin/experiences" },
  { icon: Cpu, label: "Compétences", href: "/admin/skills" },
  { icon: Settings, label: "Paramètres", href: "/admin/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r border-white/40 bg-white/70 backdrop-blur-xl shadow-2xl shadow-slate-200/20 transition-all duration-300">
      <div className="flex h-full flex-col">
        
        {/* Header / Logo Area */}
        <div className="h-20 flex items-center px-6 border-b border-slate-100/50">
          <div className="flex items-center gap-3 font-bold text-xl text-slate-900 tracking-tight">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex flex-col leading-none">
                <span>Portfolio</span>
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-1">Admin V3</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-8 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-300 overflow-hidden",
                  isActive
                    ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm ring-1 ring-blue-100"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                {/* Active Indicator Line */}
                {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full"></div>}

                <div className="flex items-center gap-3 relative z-10">
                  <Icon className={cn("h-5 w-5 transition-colors duration-300", isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600")} />
                  {item.label}
                </div>
                
                {/* Hover Arrow */}
                <ChevronRight className={cn("h-4 w-4 transition-all duration-300", 
                    isActive ? "text-blue-500 opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0"
                )} />
              </Link>
            );
          })}
        </nav>

        {/* User / Logout */}
        <div className="p-4 border-t border-slate-100/50 bg-white/30">
          <button className="group flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-red-500 hover:text-red-600 hover:bg-red-50/80 border border-transparent hover:border-red-100 transition-all duration-300">
            <LogOut className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Déconnexion
          </button>
        </div>
      </div>
    </aside>
  );
}