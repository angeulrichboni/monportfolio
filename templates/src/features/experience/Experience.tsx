import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Briefcase, Calendar, Filter, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useTranslation } from 'react-i18next';
import { EXPERIENCES } from '../../constants';
import { useLocalizedData } from '../../hooks/useLocalizedData';

export const Experience: React.FC = () => {
  const { t } = useTranslation('experience');
  const { tData } = useLocalizedData();
  const [activeFilter, setActiveFilter] = useState<'all' | 'internship' | 'partTime'>('all');
  
  // Use the constant data instead of translation file for items
  const experiences = EXPERIENCES;

  const filteredExperiences = experiences.filter(exp => {
    if (activeFilter === 'all') return true;
    // Map filter keys to Experience types
    const typeMap: Record<string, string> = {
      'internship': 'Internship',
      'partTime': 'Part-time'
    };
    return exp.type === typeMap[activeFilter];
  });

  const filterKeys = ['all', 'internship', 'partTime'] as const;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-neutral-900">{t('title')}</h1>
          <p className="mt-4 text-lg text-neutral-500">
            {t('subtitle')}
          </p>
        </div>
        <Button variant="outline" className="mt-4 md:mt-0">
          <Download className="mr-2 h-4 w-4" /> {t('export')}
        </Button>
      </div>

      <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2">
        <Filter className="h-4 w-4 text-neutral-400 mr-2" />
        {filterKeys.map((key) => (
          <button
            key={key}
            onClick={() => setActiveFilter(key)}
            className={cn(
              "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeFilter === key 
                ? "bg-primary-600 text-white shadow-md" 
                : "bg-white text-neutral-600 hover:bg-neutral-50 border border-neutral-200"
            )}
          >
            {t(`filters.${key}`)}
          </button>
        ))}
      </div>

      <div className="relative border-l-2 border-neutral-200 pl-8 ml-4 md:ml-8 space-y-12">
        <AnimatePresence mode='popLayout'>
          {filteredExperiences.map((exp) => (
            <motion.div
              key={exp.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {/* Timeline Icon */}
              <div className="absolute -left-[45px] top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-primary-100 shadow-sm md:-left-[61px] md:h-10 md:w-10">
                <Briefcase className="h-4 w-4 text-primary-600 md:h-5 md:w-5" />
              </div>

              <Card className="hover:border-primary-200 hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">{tData(exp.title)}</h3>
                    <div className="flex items-center gap-2 text-lg font-medium text-primary-700">
                      {exp.company}
                      {exp.type && (
                         <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-normal text-neutral-600 border border-neutral-200">
                          {exp.type}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center rounded-md bg-neutral-50 px-3 py-1 text-sm font-medium text-neutral-600">
                    <Calendar className="mr-2 h-4 w-4 text-neutral-400" />
                    {exp.start_date} — {exp.end_date || 'Present'}
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-neutral-600 whitespace-pre-line">
                      {tData(exp.description)}
                  </p>
                </div>

                <div className="mt-6 border-t border-neutral-100 pt-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">{t('techStack')}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies && exp.technologies.map((tech: string) => (
                      <span key={tech} className="rounded-md bg-white border border-neutral-200 px-2.5 py-1 text-xs font-medium text-neutral-700 shadow-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {filteredExperiences.length === 0 && (
        <div className="py-20 text-center text-neutral-500">
          No experiences found for this filter.
        </div>
      )}
    </div>
  );
};