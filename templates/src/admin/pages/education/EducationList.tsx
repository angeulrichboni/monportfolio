import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/FormElements';
import { TranslatableInput } from '../../components/ui/TranslatableInput';
import { EDUCATION } from '../../../constants';
import { Plus, Edit2, Trash2, GraduationCap, Calendar } from 'lucide-react';
import { z } from 'zod';
import { useForm } from '../../hooks/useForm';
import { useToast } from '../../context/ToastContext';

// Schema for Education
const localizedStringSchema = z.object({
  fr: z.string().min(1, "French translation required"),
  en: z.string().min(1, "English translation required")
});

const educationSchema = z.object({
  id: z.string().optional(),
  institution: localizedStringSchema,
  degree: localizedStringSchema,
  start_year: z.coerce.number().min(1900).max(new Date().getFullYear()),
  end_year: z.coerce.number().min(1900).max(new Date().getFullYear() + 5),
  description: localizedStringSchema,
}).refine(data => data.end_year >= data.start_year, {
  message: "End year must be after start year",
  path: ["end_year"],
});

type EducationForm = z.infer<typeof educationSchema>;

export const EducationList: React.FC = () => {
  const { addToast } = useToast();
  const [educationList, setEducationList] = useState(EDUCATION);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const { values, errors, handleChange, handleSubmit, reset, setValues } = useForm<EducationForm>({
    schema: educationSchema,
    initialValues: {
      institution: { fr: '', en: '' },
      degree: { fr: '', en: '' },
      start_year: new Date().getFullYear(),
      end_year: new Date().getFullYear(),
      description: { fr: '', en: '' }
    },
    onSubmit: async (data) => {
      if (editingId) {
        setEducationList(prev => prev.map(item => item.id === editingId ? { ...data, id: editingId } : item));
        addToast('success', 'Education updated successfully');
      } else {
        const newEdu = { ...data, id: Math.random().toString(36).substr(2, 9) };
        setEducationList(prev => [newEdu, ...prev]);
        addToast('success', 'Education added successfully');
      }
      setIsModalOpen(false);
      reset();
      setEditingId(null);
    }
  });

  const handleEdit = (edu: any) => {
    setEditingId(edu.id);
    setValues(edu);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this education entry?')) {
      setEducationList(prev => prev.filter(item => item.id !== id));
      addToast('success', 'Education deleted successfully');
    }
  };

  const openNewModal = () => {
    setEditingId(null);
    reset();
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Education & Formation</h1>
          <p className="text-sm text-slate-500">Manage your academic background.</p>
        </div>
        <Button onClick={openNewModal}>
          <Plus className="mr-2 h-4 w-4" /> Add Education
        </Button>
      </div>

      <div className="grid gap-4">
        {educationList.map((edu) => (
          <Card key={edu.id} className="flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center hover:border-primary-300 transition-colors group">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-primary-50 p-3 text-primary-600">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{edu.institution.en}</h3>
                <p className="font-medium text-primary-600">{edu.degree.en}</p>
                <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{edu.start_year} - {edu.end_year}</span>
                </div>
                {edu.description && (
                  <p className="mt-2 text-sm text-slate-600 max-w-2xl">{edu.description.en}</p>
                )}
              </div>
            </div>
            <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
              <Button variant="ghost" size="sm" onClick={() => handleEdit(edu)}>
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(edu.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Edit Education" : "Add Education"}
      >
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <TranslatableInput
                label="Institution"
                placeholder="University Name"
                value={values.institution}
                onChange={val => handleChange('institution', val)}
                error={errors.institution as string}
              />
              <TranslatableInput
                label="Degree"
                placeholder="MSc Data Science"
                value={values.degree}
                onChange={val => handleChange('degree', val)}
                error={errors.degree as string}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                label="Start Year"
                value={values.start_year}
                onChange={e => handleChange('start_year', parseInt(e.target.value))}
                error={errors.start_year}
              />
              <Input
                type="number"
                label="End Year"
                value={values.end_year}
                onChange={e => handleChange('end_year', parseInt(e.target.value))}
                error={errors.end_year}
              />
            </div>

            <TranslatableInput
              label="Description"
              type="textarea"
              placeholder="Key courses, achievements, etc."
              value={values.description}
              onChange={val => handleChange('description', val)}
              error={errors.description as string}
            />
          </div>
          
          <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingId ? 'Update Education' : 'Create Education'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};