import React, { useState, useRef } from 'react';
import type { Project, Technology, ProjectMember } from '../../../types';
import { Button } from '../../../components/ui/Button';
import { Input, Select } from '../../components/ui/FormElements';
import { TranslatableInput } from '../../components/ui/TranslatableInput';
import { Badge } from '../../components/ui/Badge';
import { fileToBase64 } from '../../../lib/utils';
import { 
  ChevronRight, 
  ChevronLeft, 
  Upload, 
  Image as ImageIcon, 
  Video, 
  X, 
  Plus, 
  Save, 
  Github, 
  ExternalLink,
  CheckCircle,
  Trash2
} from 'lucide-react';

interface ProjectWizardProps {
  initialData?: Partial<Project>;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

const STEPS = [
  { id: 1, title: 'Essentials', description: 'Basic project information' },
  { id: 2, title: 'Details & Tech', description: 'Deep dive into the project' },
  { id: 3, title: 'Media', description: 'Visuals and gallery' },
  { id: 4, title: 'Review', description: 'Final check before saving' },
];

export const ProjectWizard: React.FC<ProjectWizardProps> = ({ initialData, onSave, onCancel }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Project>>({
    id: Math.random().toString(36).substr(2, 9),
    title: { fr: '', en: '' },
    category: 'Computer Vision',
    status: 'ongoing',
    created_at: new Date().toISOString().split('T')[0],
    is_team: false,
    description: { fr: '', en: '' },
    problem_statement: { fr: '', en: '' },
    architecture: { fr: '', en: '' },
    imageUrl: '',
    github_url: '',
    demo_url: '',
    technologies: [],
    gallery: [],
    members: [],
    ...initialData,
  });

  // Tech Stack State
  const [techInput, setTechInput] = useState('');

  // Media State
  const [coverImageMode, setCoverImageMode] = useState<'url' | 'upload'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Gallery State
  const [galleryItem, setGalleryItem] = useState<{ type: 'image' | 'video', url: string, caption: string, mode: 'url' | 'upload' }>({
    type: 'image',
    url: '',
    caption: '',
    mode: 'upload'
  });
  const galleryFileRef = useRef<HTMLInputElement>(null);

  const updateField = (field: keyof Project, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  // Tech Stack Handlers
  const addTech = () => {
    if (!techInput.trim()) return;
    const newTech: Technology = {
      id: `t-${Date.now()}`,
      name: techInput.trim()
    };
    setFormData(prev => ({
      ...prev,
      technologies: [...(prev.technologies || []), newTech]
    }));
    setTechInput('');
  };

  const removeTech = (id: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies?.filter(t => t.id !== id) || []
    }));
  };

  // File Upload Handlers
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        updateField('imageUrl', base64);
      } catch (err) {
        console.error("Error converting file", err);
      }
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        setGalleryItem(prev => ({ ...prev, url: base64 }));
      } catch (err) {
        console.error("Error converting file", err);
      }
    }
  };

  const addGalleryItem = () => {
    if (!galleryItem.url) return;
    const newItem = {
      id: `g-${Date.now()}`,
      type: galleryItem.type,
      url: galleryItem.url,
      caption: galleryItem.caption
    };
    setFormData(prev => ({
      ...prev,
      gallery: [...(prev.gallery || []), newItem]
    }));
    setGalleryItem({ type: 'image', url: '', caption: '', mode: 'upload' });
  };

  const removeGalleryItem = (id: string) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery?.filter(g => g.id !== id) || []
    }));
  };

  // Team Members Handlers
  const addMember = () => {
    const newMember: ProjectMember = {
      id: `m-${Date.now()}`,
      project_id: formData.id || '',
      name: '',
      role: '',
      linkedin_url: '',
      github_url: ''
    };
    setFormData(prev => ({
      ...prev,
      members: [...(prev.members || []), newMember]
    }));
  };

  const removeMember = (id: string) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members?.filter(m => m.id !== id) || []
    }));
  };

  const updateMember = (id: string, field: keyof ProjectMember, value: string) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members?.map(m => m.id === id ? { ...m, [field]: value } : m) || []
    }));
  };

  // Render Steps
  const renderStep1 = () => (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="grid grid-cols-2 gap-4">
        <TranslatableInput 
          label="Project Title" 
          value={formData.title || { fr: '', en: '' }} 
          onChange={val => updateField('title', val)}
          placeholder="e.g. AI Traffic Analysis"
        />
        <Select 
          label="Category"
          value={formData.category}
          onChange={e => updateField('category', e.target.value)}
          options={[
            { label: 'Computer Vision', value: 'Computer Vision' },
            { label: 'NLP', value: 'NLP' },
            { label: 'Big Data', value: 'Big Data' },
            { label: 'Predictive Analytics', value: 'Predictive Analytics' },
          ]}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Select 
          label="Status"
          value={formData.status}
          onChange={e => updateField('status', e.target.value)}
          options={[
            { label: 'Ongoing', value: 'ongoing' },
            { label: 'Completed', value: 'completed' },
          ]}
        />
        <Input 
          type="date"
          label="Date" 
          value={formData.created_at} 
          onChange={e => updateField('created_at', e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input 
          label="GitHub URL" 
          value={formData.github_url || ''} 
          onChange={e => updateField('github_url', e.target.value)}
          placeholder="https://github.com/..."
        />
        <Input 
          label="Demo URL" 
          value={formData.demo_url || ''} 
          onChange={e => updateField('demo_url', e.target.value)}
          placeholder="https://..."
        />
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            id="is_team"
            checked={formData.is_team}
            onChange={e => updateField('is_team', e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
          />
          <label htmlFor="is_team" className="text-sm font-medium text-slate-700">This was a team project</label>
        </div>

        {formData.is_team && (
          <div className="pl-6 border-l-2 border-slate-200 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-semibold text-slate-700">Team Members</h4>
              <Button type="button" variant="outline" size="sm" onClick={addMember}>
                <Plus className="w-4 h-4 mr-1" /> Add Member
              </Button>
            </div>
            
            {formData.members?.map((member) => (
              <div key={member.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 relative group">
                <button 
                  type="button"
                  onClick={() => removeMember(member.id)}
                  className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Input 
                    label="Name" 
                    value={member.name} 
                    onChange={e => updateMember(member.id, 'name', e.target.value)}
                    placeholder="Colleague Name"
                  />
                  <Input 
                    label="Role" 
                    value={member.role} 
                    onChange={e => updateMember(member.id, 'role', e.target.value)}
                    placeholder="e.g. Frontend Dev"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input 
                    label="LinkedIn" 
                    value={member.linkedin_url || ''} 
                    onChange={e => updateMember(member.id, 'linkedin_url', e.target.value)}
                    placeholder="LinkedIn URL"
                  />
                  <Input 
                    label="GitHub" 
                    value={member.github_url || ''} 
                    onChange={e => updateMember(member.id, 'github_url', e.target.value)}
                    placeholder="GitHub URL"
                  />
                </div>
              </div>
            ))}
            
            {(!formData.members || formData.members.length === 0) && (
              <p className="text-sm text-slate-500 italic">No members added yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <TranslatableInput 
        label="Short Description" 
        type="textarea"
        value={formData.description || { fr: '', en: '' }} 
        onChange={val => updateField('description', val)}
        placeholder="Brief overview of the project..."
      />
      <TranslatableInput 
        label="Problem Statement" 
        type="textarea"
        value={formData.problem_statement || { fr: '', en: '' }} 
        onChange={val => updateField('problem_statement', val)}
        placeholder="What problem does this solve?"
      />
      <TranslatableInput 
        label="Architecture / Solution" 
        type="textarea"
        value={formData.architecture || { fr: '', en: '' }} 
        onChange={val => updateField('architecture', val)}
        placeholder="Technical approach..."
      />
      
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Technologies</label>
        <div className="flex gap-2 mb-2">
          <Input 
            value={techInput}
            onChange={e => setTechInput(e.target.value)}
            placeholder="Add tech (e.g. PyTorch)"
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTech())}
            className="flex-1"
          />
          <Button type="button" onClick={addTech} variant="outline" size="sm">Add</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.technologies?.map(tech => (
            <Badge key={tech.id} variant="neutral" className="flex items-center gap-1 pr-1">
              {tech.name}
              <button onClick={() => removeTech(tech.id)} className="rounded-full p-0.5 hover:bg-slate-200">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Cover Image Section */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-700">Cover Image</label>
        <div className="flex gap-4 mb-2">
          <button 
            type="button"
            onClick={() => setCoverImageMode('upload')}
            className={`text-sm font-medium pb-1 border-b-2 ${coverImageMode === 'upload' ? 'border-primary-500 text-primary-600' : 'border-transparent text-slate-500'}`}
          >
            Upload File
          </button>
          <button 
            type="button"
            onClick={() => setCoverImageMode('url')}
            className={`text-sm font-medium pb-1 border-b-2 ${coverImageMode === 'url' ? 'border-primary-500 text-primary-600' : 'border-transparent text-slate-500'}`}
          >
            Image URL
          </button>
        </div>
        
        <div className="flex gap-4 items-start">
          <div className="flex-1">
            {coverImageMode === 'upload' ? (
              <div 
                className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 cursor-pointer transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleCoverUpload}
                />
                <Upload className="h-8 w-8 mx-auto text-slate-400 mb-2" />
                <p className="text-sm text-slate-500">Click to upload cover image</p>
              </div>
            ) : (
              <Input 
                placeholder="https://..." 
                value={formData.imageUrl} 
                onChange={e => updateField('imageUrl', e.target.value)}
              />
            )}
          </div>
          {formData.imageUrl && (
            <div className="w-32 h-24 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 flex-shrink-0">
              <img src={formData.imageUrl} alt="Cover" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-slate-200 my-4"></div>

      {/* Gallery Section */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-700">Project Gallery</label>
        
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
          <div className="flex gap-4">
            <div className="w-1/4">
              <Select 
                value={galleryItem.type}
                onChange={e => setGalleryItem(prev => ({ ...prev, type: e.target.value as 'image' | 'video' }))}
                options={[
                  { label: 'Image', value: 'image' },
                  { label: 'Video', value: 'video' },
                ]}
              />
            </div>
            <div className="flex-1">
               <div className="flex gap-2 mb-2">
                <button 
                  type="button"
                  onClick={() => setGalleryItem(prev => ({ ...prev, mode: 'upload' }))}
                  className={`text-xs font-medium ${galleryItem.mode === 'upload' ? 'text-primary-600' : 'text-slate-500'}`}
                >
                  Upload
                </button>
                <span className="text-slate-300">|</span>
                <button 
                  type="button"
                  onClick={() => setGalleryItem(prev => ({ ...prev, mode: 'url' }))}
                  className={`text-xs font-medium ${galleryItem.mode === 'url' ? 'text-primary-600' : 'text-slate-500'}`}
                >
                  URL
                </button>
              </div>
              
              {galleryItem.mode === 'upload' ? (
                 <div className="flex gap-2">
                   <input 
                    type="file" 
                    ref={galleryFileRef}
                    className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                    accept={galleryItem.type === 'image' ? "image/*" : "video/*"}
                    onChange={handleGalleryUpload}
                  />
                 </div>
              ) : (
                <Input 
                  placeholder={galleryItem.type === 'image' ? "Image URL" : "Video URL (YouTube/MP4)"}
                  value={galleryItem.url}
                  onChange={e => setGalleryItem(prev => ({ ...prev, url: e.target.value }))}
                />
              )}
            </div>
          </div>
          <Input 
            placeholder="Caption (optional)"
            value={galleryItem.caption}
            onChange={e => setGalleryItem(prev => ({ ...prev, caption: e.target.value }))}
          />
          <div className="flex justify-end">
            <Button type="button" size="sm" onClick={addGalleryItem} disabled={!galleryItem.url}>
              <Plus className="h-4 w-4 mr-1" /> Add to Gallery
            </Button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          {formData.gallery?.map((item) => (
            <div key={item.id} className="group relative aspect-video bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
              {item.type === 'image' ? (
                <img src={item.url} alt={item.caption} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-900 text-white">
                  <Video className="h-8 w-8" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  onClick={() => removeGalleryItem(item.id)}
                  className="p-2 bg-white rounded-full text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              {item.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 truncate">
                  {item.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
        <div className="flex gap-6">
          <div className="w-1/3">
            <div className="aspect-video rounded-lg overflow-hidden bg-slate-200">
              {formData.imageUrl ? (
                <img src={formData.imageUrl} alt="Cover" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <ImageIcon className="h-12 w-12" />
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-bold text-slate-900">{(formData.title as any)?.en || 'Untitled Project'}</h2>
              <Badge variant={formData.status === 'completed' ? 'success' : 'warning'}>
                {formData.status}
              </Badge>
            </div>
            <p className="text-sm text-primary-600 font-medium">{formData.category}</p>
            <p className="text-sm text-slate-600 line-clamp-3">{(formData.description as any)?.en || 'No description provided.'}</p>
            
            <div className="flex gap-2 pt-2">
              {formData.github_url && (
                <a href="#" className="text-xs flex items-center text-slate-500">
                  <Github className="h-3 w-3 mr-1" /> Repo
                </a>
              )}
              {formData.demo_url && (
                <a href="#" className="text-xs flex items-center text-slate-500">
                  <ExternalLink className="h-3 w-3 mr-1" /> Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-2">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {formData.technologies?.length ? (
              formData.technologies.map(t => (
                <Badge key={t.id} variant="neutral">{t.name}</Badge>
              ))
            ) : (
              <span className="text-sm text-slate-400 italic">No technologies added</span>
            )}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-2">Gallery</h3>
          <p className="text-sm text-slate-600">
            {formData.gallery?.length || 0} items ready to be saved.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 p-4 bg-green-50 text-green-700 rounded-lg border border-green-100">
        <CheckCircle className="h-5 w-5" />
        <span className="text-sm font-medium">Ready to publish! Review the details above and click Save.</span>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full max-h-[80vh]">
      {/* Stepper Header */}
      <div className="flex justify-between items-center mb-8 px-1">
        {STEPS.map((s, idx) => (
          <div key={s.id} className="flex items-center">
            <div className={`flex flex-col items-center relative z-10`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                step >= s.id ? 'bg-primary-600 text-white' : 'bg-slate-200 text-slate-500'
              }`}>
                {s.id}
              </div>
              <span className={`text-xs mt-1 font-medium ${step >= s.id ? 'text-primary-700' : 'text-slate-400'}`}>
                {s.title}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div className={`w-16 h-0.5 mx-2 -mt-4 transition-colors ${
                step > s.id ? 'bg-primary-600' : 'bg-slate-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-1 pb-4">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </div>

      {/* Footer Actions */}
      <div className="border-t border-slate-100 pt-4 mt-4 flex justify-between">
        <Button variant="outline" onClick={step === 1 ? onCancel : handleBack}>
          {step === 1 ? 'Cancel' : <><ChevronLeft className="mr-2 h-4 w-4" /> Back</>}
        </Button>
        
        {step < 4 ? (
          <Button onClick={handleNext}>
            Next Step <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={() => onSave(formData as Project)}>
            <Save className="ml-2 h-4 w-4" /> Save Project
          </Button>
        )}
      </div>
    </div>
  );
};
