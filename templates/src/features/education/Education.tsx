import React from 'react';
import { Card } from '../../components/ui/Card';
import { GraduationCap, Calendar, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { useTranslation } from 'react-i18next';
import { EDUCATION } from '../../constants';
import { useLocalizedData } from '../../hooks/useLocalizedData';

export const Education: React.FC = () => {
  const { t } = useTranslation('education');
  const { tData } = useLocalizedData();
  const educationItems = EDUCATION;

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

      <div className="relative border-l-2 border-primary-200 pl-8 ml-4 md:ml-8 space-y-12">
        <AnimatePresence mode='popLayout'>
          {educationItems.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative"
            >
              {/* Timeline Icon */}
              <div className="absolute -left-[45px] top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-primary-500 shadow-md md:-left-[61px] md:h-10 md:w-10">
                <GraduationCap className="h-4 w-4 text-white md:h-5 md:w-5" />
              </div>

              <Card className="hover:border-primary-200 hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">{tData(edu.institution)}</h3>
                    <div className="flex items-center gap-2 text-lg font-medium text-primary-600">
                      {tData(edu.degree)}
                    </div>
                  </div>
                  <div className="flex items-center rounded-md bg-neutral-50 px-3 py-1 text-sm font-medium text-neutral-600">
                    <Calendar className="mr-2 h-4 w-4 text-neutral-400" />
                    {edu.start_year} - {edu.end_year}
                  </div>
                </div>

                <p className="mt-4 text-neutral-600 leading-relaxed whitespace-pre-line">
                  {tData(edu.description)}
                </p>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};