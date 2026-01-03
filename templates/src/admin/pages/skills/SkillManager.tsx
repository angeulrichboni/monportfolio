import React, { useState } from 'react';
import { z } from 'zod';
import { SKILLS } from '../../../constants';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input, Select } from '../../components/ui/FormElements';
import { useToast } from '../../context/ToastContext';
import { useForm } from '../../hooks/useForm';
import { Layers, Plus, Edit2, Trash2 } from 'lucide-react';

const skillSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  category: z.enum(['Machine Learning', 'Big Data', 'DevOps', 'Languages', 'Tools']),
  level: z.number().min(1).max(5),
});

type SkillFormData = z.infer<typeof skillSchema>;

export const SkillManager: React.FC = () => {
  const { addToast } = useToast();
  const [skills, setSkills] = useState(SKILLS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { values, errors, handleChange, handleSubmit, reset, setValues } = useForm<SkillFormData>({
    initialValues: {
      name: '',
      category: 'Machine Learning',
      level: 3,
    },
    schema: skillSchema,
    onSubmit: (data) => {
      if (editingId) {
        setSkills(prev => prev.map(s => s.id === editingId ? { ...data, id: editingId } : s));
        addToast('success', 'Skill updated successfully');
      } else {
        const newSkill = {
          ...data,
          id: `s${Date.now()}`,
        };
        setSkills(prev => [...prev, newSkill]);
        addToast('success', 'New skill added');
      }
      setIsModalOpen(false);
    },
  });

  const handleDelete = (id: string) => {
    if (confirm('Delete this skill?')) {
      setSkills(prev => prev.filter(s => s.id !== id));
      addToast('success', 'Skill deleted');
    }
  };

  const handleEdit = (skill: any) => {
    setEditingId(skill.id);
    setValues(skill);
    setIsModalOpen(true);
  };

  const openNewModal = () => {
    setEditingId(null);
    reset();
    setIsModalOpen(true);
  };

  // Quick level update from the list view
  const handleLevelChange = (id: string, newLevel: number) => {
    setSkills(prev => prev.map(s => s.id === id ? { ...s, level: newLevel } : s));
    // Optional: Show a small toast or just let it be instant
  };

  const categories = Array.from(new Set(skills.map(s => s.category)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Skills Matrix</h1>
          <p className="text-sm text-slate-500">Adjust your competency levels for the radar chart.</p>
        </div>
        <Button onClick={openNewModal}>
           <Plus className="mr-2 h-4 w-4" /> Add Skill
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {categories.map(category => (
          <Card key={category} className="border-slate-200">
            <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Layers className="h-5 w-5 text-primary-500" />
              <h3 className="font-bold text-slate-900">{category}</h3>
            </div>
            
            <div className="space-y-5">
              {skills.filter(s => s.category === category).map(skill => (
                <div key={skill.id} className="group relative">
                  <div className="mb-1 flex justify-between text-sm items-center">
                    <span className="font-medium text-slate-700">{skill.name}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant={skill.level >= 4 ? 'success' : skill.level >= 3 ? 'info' : 'warning'}>
                        Lvl {skill.level}
                      </Badge>
                      <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEdit(skill)} className="p-1 text-slate-400 hover:text-blue-600">
                          <Edit2 className="h-3 w-3" />
                        </button>
                        <button onClick={() => handleDelete(skill.id)} className="p-1 text-slate-400 hover:text-red-600">
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="5" 
                    step="1"
                    value={skill.level}
                    onChange={(e) => handleLevelChange(skill.id, parseInt(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-primary-600"
                  />
                  <div className="mt-1 flex justify-between text-xs text-slate-400">
                    <span>Beginner</span>
                    <span>Expert</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingId ? "Edit Skill" : "Add New Skill"} 
        size="sm"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            label="Skill Name" 
            value={values.name} 
            onChange={e => handleChange('name', e.target.value)}
            placeholder="e.g. Kubernetes"
            error={errors.name}
          />
          <Select 
            label="Category"
            value={values.category}
            onChange={e => handleChange('category', e.target.value)}
            options={[
              { label: 'Machine Learning', value: 'Machine Learning' },
              { label: 'Big Data', value: 'Big Data' },
              { label: 'DevOps', value: 'DevOps' },
              { label: 'Languages', value: 'Languages' },
              { label: 'Tools', value: 'Tools' },
              { label: 'Web Development', value: 'Web Development' },
              { label: 'Cloud', value: 'Cloud' },
            ]}
            error={errors.category}
          />
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Proficiency Level ({values.level})
            </label>
            <input 
              type="range" 
              min="1" max="5" 
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
              value={values.level}
              onChange={e => handleChange('level', parseInt(e.target.value))}
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
          </div>
          
          <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 -mx-6 -mb-6 mt-6 flex justify-end gap-3 rounded-b-lg">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingId ? 'Update Skill' : 'Add Skill'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};