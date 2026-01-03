import React, { useState } from 'react';
import { z } from 'zod';
// import { EXPERIENCES } from '../../../constants'; // On n'utilise plus les constantes statiques simples
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import { Input, Select } from '../../components/ui/FormElements';
import { TranslatableInput } from '../../components/ui/TranslatableInput'; // Import du nouveau composant
import { useToast } from '../../context/ToastContext';
import { useForm } from '../../hooks/useForm';
import { Plus, Calendar, Edit2, Trash2, GripVertical } from 'lucide-react';

// 1. Schema Zod mis à jour pour le multilingue
const experienceSchema = z.object({
  title: z.object({
    fr: z.string().min(1, 'FR Title required'),
    en: z.string().min(1, 'EN Title required'),
  }),
  company: z.string().min(1, 'Company required'),
  start_date: z.string().min(1, 'Start date required'),
  end_date: z.string().optional(),
  type: z.enum(['Internship', 'Full-time', 'Freelance', 'Part-time']),
  description: z.object({
    fr: z.string().min(10, 'FR Description too short'),
    en: z.string().min(10, 'EN Description too short'),
  }),
  technologies: z.array(z.string()).min(1, 'Add at least one tech'),
});

type ExperienceFormData = z.infer<typeof experienceSchema>;

// Mock data adapté au nouveau format (pour l'exemple initial)
const INITIAL_DATA: any[] = [
  {
    id: '1',
    title: { fr: 'Développeur Senior', en: 'Senior Developer' },
    company: 'Tech Corp',
    start_date: '2022',
    type: 'Full-time',
    description: { fr: 'Développement React...', en: 'React Development...' },
    technologies: ['React', 'Node']
  }
];

export const ExperienceList: React.FC = () => {
  const { addToast } = useToast();
  const [experiences, setExperiences] = useState<any[]>(INITIAL_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { values, errors, handleChange, handleSubmit, reset, setValues } = useForm<ExperienceFormData>({
    initialValues: {
      title: { fr: '', en: '' },
      company: '',
      start_date: '',
      end_date: '',
      type: 'Full-time',
      description: { fr: '', en: '' },
      technologies: [],
    },
    schema: experienceSchema,
    onSubmit: (data) => {
      if (editingId) {
        setExperiences(prev => prev.map(exp => 
          exp.id === editingId ? { ...data, id: editingId } : exp
        ));
        addToast('success', 'Experience updated');
      } else {
        const newExp = { ...data, id: Math.random().toString(36).substr(2, 9) };
        setExperiences(prev => [newExp, ...prev]);
        addToast('success', 'Experience added');
      }
      setIsModalOpen(false);
    },
  });

  const handleDelete = (id: string) => {
    if (confirm('Delete this experience?')) {
      setExperiences(prev => prev.filter(e => e.id !== id));
      addToast('success', 'Deleted');
    }
  };

  const handleEdit = (exp: any) => {
    setEditingId(exp.id);
    setValues(exp);
    setIsModalOpen(true);
  };

  const openNewModal = () => {
    setEditingId(null);
    reset();
    setIsModalOpen(true);
  };

  const handleTechChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const techs = val.split(',').map(t => t.trim()).filter(Boolean);
    handleChange('technologies', techs);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Experience</h1>
          <p className="text-sm text-slate-500">Manage your professional timeline (Multilingual).</p>
        </div>
        <Button onClick={openNewModal}>
          <Plus className="mr-2 h-4 w-4" /> Add Position
        </Button>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <Card key={exp.id} className="group relative border-slate-200 p-6 hover:border-primary-300 transition-all">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 cursor-grab text-slate-300 opacity-0 group-hover:opacity-100">
              <GripVertical className="h-5 w-5" />
            </div>
            
            <div className="pl-8 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 font-bold border border-primary-100">
                  {exp.company.charAt(0)}
                </div>
                <div>
                  {/* Affichage Admin : On montre le titre EN par défaut ou FR */}
                  <h3 className="text-lg font-bold text-slate-900">
                    {exp.title.en || exp.title.fr} 
                    <span className="ml-2 text-xs font-normal text-slate-400">(EN)</span>
                  </h3>
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="font-medium">{exp.company}</span>
                    <span>•</span>
                    <Badge variant="neutral" className="bg-slate-50">{exp.type}</Badge>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-slate-500">
                    <Calendar className="mr-1.5 h-4 w-4" />
                    {exp.start_date} — {exp.end_date || 'Present'}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 self-start">
                <Button variant="ghost" size="sm" onClick={() => handleEdit(exp)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(exp.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Edit Experience" : "Add Experience"}
        size="lg" // Plus large pour le confort
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Nouveau Champ Titre Multilingue */}
          <TranslatableInput
            label="Job Title"
            value={values.title}
            onChange={(val) => handleChange('title', val)}
            placeholder="e.g. Senior Developer"
            error={errors.title as string}
          />

          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
            <Input 
              label="Company"
              value={values.company}
              onChange={(e) => handleChange('company', e.target.value)}
              error={errors.company}
            />
            <Select 
              label="Employment Type"
              options={[
                { label: 'Full-time', value: 'Full-time' },
                { label: 'Internship', value: 'Internship' },
                { label: 'Part-time', value: 'Part-time' },
                { label: 'Freelance', value: 'Freelance' }
              ]}
              value={values.type}
              onChange={(e) => handleChange('type', e.target.value)}
              error={errors.type}
            />
            <Input 
              label="Start Date"
              value={values.start_date}
              onChange={(e) => handleChange('start_date', e.target.value)}
              error={errors.start_date}
            />
             <Input 
              label="End Date"
              placeholder="Present"
              value={values.end_date || ''}
              onChange={(e) => handleChange('end_date', e.target.value)}
              error={errors.end_date}
            />
          </div>

          {/* Nouveau Champ Description Multilingue */}
          <TranslatableInput
            label="Description / Achievements"
            type="textarea"
            value={values.description}
            onChange={(val) => handleChange('description', val)}
            placeholder="Describe your role..."
            error={errors.description as string}
          />

          <div>
            <Input 
              label="Tech Stack (Comma separated)"
              value={values.technologies.join(', ')}
              onChange={handleTechChange}
              placeholder="Python, SQL, AWS..."
              error={errors.technologies}
            />
          </div>
          
          <div className="border-t border-slate-100 pt-4 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingId ? 'Update Position' : 'Create Position'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
