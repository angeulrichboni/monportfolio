import React, { useState } from 'react';
import { PROJECTS } from '../../../constants';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/FormElements';
import { useToast } from '../../context/ToastContext';
import { Plus, Search, Edit2, Trash2, LayoutGrid, List as ListIcon, Github, ExternalLink } from 'lucide-react';
import { ProjectWizard } from './ProjectWizard';
import type { Project } from '../../../types';

export const ProjectList: React.FC = () => {
  const { addToast } = useToast();
  const [projects, setProjects] = useState(PROJECTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project> | null>(null);

  // Filter Logic
  const filteredProjects = projects.filter(p => 
    p.title.en.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.title.fr.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // CRUD Handlers
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      setProjects(prev => prev.filter(p => p.id !== id));
      addToast('success', 'Project deleted successfully');
    }
  };

  const handleEdit = (project: any) => {
    setCurrentProject(project);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setCurrentProject({});
    setIsModalOpen(true);
  };

  const handleSave = (projectToSave: Project) => {
    if (projects.find(p => p.id === projectToSave.id)) {
      setProjects(prev => prev.map(p => p.id === projectToSave.id ? projectToSave : p));
      addToast('success', 'Project updated successfully');
    } else {
      setProjects(prev => [projectToSave, ...prev]);
      addToast('success', 'Project created successfully');
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
          <p className="text-sm text-slate-500">Manage your portfolio showcase items.</p>
        </div>
        <div className="flex gap-2">
          <div className="flex rounded-lg border border-slate-200 bg-white p-1">
            <button 
              onClick={() => setViewMode('table')} 
              className={`rounded px-2 py-1 text-sm ${viewMode === 'table' ? 'bg-slate-100 text-slate-900 font-medium' : 'text-slate-400'}`}
            >
              <ListIcon className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setViewMode('grid')} 
              className={`rounded px-2 py-1 text-sm ${viewMode === 'grid' ? 'bg-slate-100 text-slate-900 font-medium' : 'text-slate-400'}`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" /> New Project
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <Card className="flex flex-col gap-4 border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between shadow-sm">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input 
            placeholder="Search projects..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 text-sm text-slate-500">
          <span>{filteredProjects.length} results</span>
        </div>
      </Card>

      {/* Content */}
      {viewMode === 'table' ? (
        <Card className="overflow-hidden border-slate-200 p-0 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Project</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Category</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100 border border-slate-200">
                           <img src={project.imageUrl} alt="" className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">{project.title.en}</div>
                          <div className="text-xs text-slate-500">{project.is_team ? 'Team Project' : 'Individual'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={project.status === 'completed' ? 'success' : 'warning'} dot>
                        {project.status === 'completed' ? 'Published' : 'Draft'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                        {project.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {project.created_at}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <button onClick={() => handleEdit(project)} className="rounded p-1.5 text-slate-400 hover:bg-white hover:text-blue-600 hover:shadow-sm border border-transparent hover:border-slate-200 transition-all">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(project.id)} className="rounded p-1.5 text-slate-400 hover:bg-white hover:text-red-600 hover:shadow-sm border border-transparent hover:border-slate-200 transition-all">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="group overflow-hidden border-slate-200 p-0 hover:border-primary-300 hover:shadow-md transition-all">
              <div className="relative h-40 bg-slate-100">
                <img src={project.imageUrl} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute right-2 top-2">
                   <Badge variant={project.status === 'completed' ? 'success' : 'warning'} className="bg-white/90 backdrop-blur">
                     {project.status === 'completed' ? 'Published' : 'Draft'}
                   </Badge>
                </div>
              </div>
              <div className="p-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase text-primary-600 tracking-wide">{project.category}</span>
                  <span className="text-xs text-slate-400">{project.created_at}</span>
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900 group-hover:text-primary-700 transition-colors">{project.title.en}</h3>
                <p className="mb-4 text-sm text-slate-500 line-clamp-2">{project.description.en}</p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="flex gap-2">
                     {project.github_url && <Github className="h-4 w-4 text-slate-400" />}
                     {project.demo_url && <ExternalLink className="h-4 w-4 text-slate-400" />}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(project)} className="h-8 px-2">Edit</Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(project.id)} className="h-8 px-2 text-red-600 hover:bg-red-50 hover:border-red-200">Delete</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Wizard Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={currentProject?.id ? `Edit Project` : 'Create New Project'}
        size="xl"
      >
        <ProjectWizard 
          initialData={currentProject || {}} 
          onSave={handleSave} 
          onCancel={() => setIsModalOpen(false)} 
        />
      </Modal>
    </div>
  );
};