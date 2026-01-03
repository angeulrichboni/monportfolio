import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Github, ExternalLink, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PROJECTS } from '../../constants';
import { useLocalizedData } from '../../hooks/useLocalizedData';

export const Projects: React.FC = () => {
  const { t } = useTranslation('projects');
  const { tData } = useLocalizedData();
  const [filter, setFilter] = useState<'all' | 'cv' | 'bigdata' | 'nlp'>('all');

  const projects = PROJECTS;

  const categoryMap: Record<string, string> = {
    'cv': 'Computer Vision',
    'bigdata': 'Big Data',
    'nlp': 'NLP'
  };

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === categoryMap[filter]);

  const categories = [
    { id: 'all', label: t('public.filters.all') },
    { id: 'cv', label: t('public.filters.cv') },
    { id: 'bigdata', label: t('public.filters.bigdata') },
    { id: 'nlp', label: t('public.filters.nlp') }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-16">
          <h1 className="text-5xl font-bold text-neutral-900 mb-4">{t('public.title')}</h1>
          <p className="max-w-2xl text-xl text-neutral-600">
            {t('public.subtitle')}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as any)}
              className={`rounded-lg px-6 py-2.5 text-sm font-semibold transition-all shadow-md ${
                filter === cat.id 
                  ? 'bg-primary-600 text-white shadow-primary-500/30 scale-105' 
                  : 'bg-white text-neutral-700 hover:bg-neutral-50 border border-neutral-200 hover:border-primary-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Link to={`/projects/${project.id}`} className="block h-full">
                  <Card className="group flex h-full flex-col overflow-hidden p-0 hover:border-primary-300 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10">
                    <div className="relative h-52 overflow-hidden bg-neutral-100">
                      <img 
                        src={project.imageUrl} 
                        alt={tData(project.title)} 
                        className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-neutral-900 shadow-xl">
                          {t('public.view_details')}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-grow flex-col p-6">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="rounded-lg bg-primary-50 px-3 py-1.5 text-xs font-bold text-primary-700 border border-primary-200">
                          {t(`public.filters.${project.category}`)}
                        </span>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                          project.status === 'completed' 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {t(`public.status.${project.status}`)}
                        </span>
                      </div>

                      <h3 className="mb-3 text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">{tData(project.title)}</h3>
                      <p className="mb-4 text-sm text-neutral-600 leading-relaxed line-clamp-3">{tData(project.description)}</p>

                      <div className="mt-auto pt-4 border-t border-neutral-100">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 3).map((tech: any) => (
                            <span key={tech.id} className="flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700">
                              <Code2 className="h-3 w-3" /> {tech.name}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex gap-2">
                          {project.github_url && (
                            <div className="text-neutral-400 hover:text-neutral-900 transition-colors">
                              <Github className="h-5 w-5" />
                            </div>
                          )}
                          {project.demo_url && (
                            <div className="text-neutral-400 hover:text-neutral-900 transition-colors">
                              <ExternalLink className="h-5 w-5" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};