import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ToastProvider } from '../../context/ToastContext';
import { 
  LayoutDashboard, 
  FolderKanban, 
  GraduationCap, 
  Briefcase, 
  BrainCircuit, 
  FileText, 
  LogOut, 
  Menu, 
  X,
  Settings,
  Bell
} from 'lucide-react';
import { cn } from '../../../lib/utils';

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: FolderKanban, label: 'Projects', path: '/admin/projects' },
  { icon: GraduationCap, label: 'Education', path: '/admin/education' },
  { icon: Briefcase, label: 'Experiences', path: '/admin/experiences' },
  { icon: BrainCircuit, label: 'Skills', path: '/admin/skills' },
  { icon: FileText, label: 'Blog', path: '/admin/blog' },
];

const SidebarItem = ({ item, isCollapsed }: { item: any, isCollapsed?: boolean }) => (
  <NavLink
    to={item.path}
    end={item.path === '/admin'}
    className={({ isActive }) =>
      cn(
        "group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
        isActive 
          ? "bg-primary-600 text-white shadow-md shadow-primary-500/20" 
          : "text-slate-400 hover:bg-slate-800 hover:text-white"
      )
    }
  >
    <item.icon className={cn("h-5 w-5 flex-shrink-0 transition-colors", isCollapsed ? "mx-auto" : "mr-3")} />
    {!isCollapsed && <span>{item.label}</span>}
  </NavLink>
);

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/admin/login');
    }
  };

  return (
    <ToastProvider>
      <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside 
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-72 transform border-r border-slate-800 bg-slate-900 text-white transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex h-16 items-center justify-between px-6 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center font-bold text-white shadow-lg shadow-primary-500/30">
                A
              </div>
              <span className="text-lg font-bold tracking-tight text-white">Admin<span className="text-primary-400">Panel</span></span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex h-[calc(100vh-4rem)] flex-col justify-between py-6">
            <nav className="space-y-1.5 px-4">
              <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Main Menu</p>
              {SIDEBAR_ITEMS.map((item) => (
                <SidebarItem key={item.path} item={item} />
              ))}
            </nav>

            <div className="px-4">
              <div className="mb-4 rounded-xl bg-slate-800/50 p-4 border border-slate-700/50">
                <div className="flex items-center">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-primary-500 to-primary-400 flex items-center justify-center font-bold text-white shadow-inner">
                    {user?.email?.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-3 overflow-hidden">
                    <p className="truncate text-sm font-medium text-white">Administrator</p>
                    <p className="truncate text-xs text-slate-400">{user?.email}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-center rounded-lg border border-slate-700 bg-transparent px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 shadow-sm z-10">
            <div className="flex items-center">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="mr-4 lg:hidden text-slate-500 hover:text-slate-700"
              >
                <Menu className="h-6 w-6" />
              </button>

              <div className="flex items-center text-sm font-medium text-slate-500">
                 <span className="hidden sm:inline hover:text-primary-600 transition-colors cursor-pointer">Admin</span>
                 <span className="mx-2 text-slate-300">/</span>
                 <span className="capitalize text-slate-900 font-semibold">
                   {location.pathname.split('/').pop() || 'Dashboard'}
                 </span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
               <button className="relative p-2 text-slate-400 hover:text-primary-600 transition-colors rounded-full hover:bg-slate-50">
                 <Bell className="h-5 w-5" />
                 <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border border-white"></span>
               </button>
               <button className="p-2 text-slate-400 hover:text-slate-700 transition-colors rounded-full hover:bg-slate-50">
                 <Settings className="h-5 w-5" />
               </button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-8">
            <div className="mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </ToastProvider>
  );
};