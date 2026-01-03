import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { FolderKanban, GraduationCap, Eye, FileText, ArrowUp, ArrowRight, Activity, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Total Projects', value: '12', icon: FolderKanban, color: 'text-blue-600', bg: 'bg-blue-100', trend: '+2 this month' },
    { label: 'Education Entries', value: '3', icon: GraduationCap, color: 'text-emerald-600', bg: 'bg-emerald-100', trend: 'Up to date' },
    { label: 'Blog Posts', value: '8', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-100', trend: '+1 this week' },
    { label: 'Total Views', value: '1.2k', icon: Eye, color: 'text-orange-600', bg: 'bg-orange-100', trend: '+12% vs last month' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
           <p className="text-slate-500 text-sm mt-1">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" size="sm">Download Report</Button>
           <Button size="sm"><Plus className="mr-2 h-4 w-4"/> Quick Add</Button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-slate-200 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold text-slate-900 tracking-tight">{stat.value}</p>
              </div>
              <div className={`rounded-xl p-3 ${stat.bg} ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="flex items-center font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-xs border border-emerald-100">
                <ArrowUp className="mr-1 h-3 w-3" />
                {stat.trend}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Activity Feed */}
        <Card className="lg:col-span-2 border-slate-200 shadow-sm">
          <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
               <Activity className="h-5 w-5 text-primary-600" />
               <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>
            </div>
            <Link to="/admin/projects" className="text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline">View Log</Link>
          </div>
          <div className="space-y-6">
            {[
              { text: 'Updated project "Autonomous Drone Navigation"', time: '2 hours ago', type: 'edit' },
              { text: 'Published new blog post "Understanding LLMs"', time: '5 hours ago', type: 'publish' },
              { text: 'Added new certification "AWS Solutions Architect"', time: '1 day ago', type: 'add' }
            ].map((activity, i) => (
              <div key={i} className="flex items-start justify-between group">
                <div className="flex items-start">
                  <div className={`mt-1.5 mr-4 h-2.5 w-2.5 rounded-full ring-4 ring-opacity-20 ${activity.type === 'publish' ? 'bg-emerald-500 ring-emerald-100' : 'bg-blue-500 ring-blue-100'}`}></div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 group-hover:text-primary-600 transition-colors cursor-pointer">{activity.text}</p>
                    <p className="text-xs text-slate-500">{activity.time}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions Panel */}
        <Card className="border-slate-200 shadow-sm bg-slate-50/50">
          <div className="mb-6 border-b border-slate-200 pb-4">
             <h2 className="text-lg font-bold text-slate-900">Quick Actions</h2>
             <p className="text-xs text-slate-500">Common management tasks</p>
          </div>
          <div className="grid gap-3">
            <Link to="/admin/projects" className="flex items-center p-3 rounded-lg bg-white border border-slate-200 shadow-sm hover:border-primary-300 hover:shadow-md transition-all group">
               <div className="p-2 bg-blue-50 text-blue-600 rounded-lg mr-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <FolderKanban className="h-5 w-5" />
               </div>
               <span className="font-medium text-slate-700 group-hover:text-slate-900">Add Project</span>
            </Link>
            <Link to="/admin/education" className="flex items-center p-3 rounded-lg bg-white border border-slate-200 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all group">
               <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg mr-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <GraduationCap className="h-5 w-5" />
               </div>
               <span className="font-medium text-slate-700 group-hover:text-slate-900">Update Education</span>
            </Link>
            <Link to="/admin/blog" className="flex items-center p-3 rounded-lg bg-white border border-slate-200 shadow-sm hover:border-purple-300 hover:shadow-md transition-all group">
               <div className="p-2 bg-purple-50 text-purple-600 rounded-lg mr-3 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <FileText className="h-5 w-5" />
               </div>
               <span className="font-medium text-slate-700 group-hover:text-slate-900">Write Article</span>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};