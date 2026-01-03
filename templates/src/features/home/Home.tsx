import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Brain, Database, Cloud, ChevronRight, GraduationCap, Briefcase } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Link } from 'react-router-dom';
import { formatDate } from '../../lib/utils';
import { useTranslation, Trans } from 'react-i18next';
import { PROJECTS, EXPERIENCES, EDUCATION } from '../../constants';
import { useLocalizedData } from '../../hooks/useLocalizedData';

export const Home: React.FC = () => {
  const { t } = useTranslation(['home', 'common', 'projects', 'education', 'experience']);
  const { tData } = useLocalizedData();
  const projects = PROJECTS;
  const education = EDUCATION;
  const experiences = EXPERIENCES;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-gradient-to-br from-white via-primary-50/30 to-purple-50/20">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary-200/40 to-purple-200/40 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-blue-200/30 to-primary-200/30 blur-3xl" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 text-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="mx-auto flex w-max items-center gap-2 rounded-full border border-primary-300 bg-primary-50/80 backdrop-blur-sm px-4 py-2.5 text-sm font-medium text-primary-700 shadow-lg shadow-primary-500/10">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-primary-500"></span>
              {t('hero.status')}
            </div>
            
            <div className="space-y-4">
              <h1 className="text-6xl font-extrabold tracking-tight text-neutral-900 sm:text-7xl lg:text-8xl">
                {t('hero.title')}
              </h1>
              <h2 className="mx-auto max-w-3xl text-2xl font-semibold text-neutral-600 sm:text-3xl lg:text-4xl">
                {t('hero.subtitle_prefix')}{' '}
                <span className="bg-gradient-to-r from-primary-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {t('hero.subtitle_highlight')}
                </span>
              </h2>
            </div>
            
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-neutral-600 sm:text-xl">
              <Trans i18nKey="hero.description" ns="home">
                Engineering Student specializing in <span className="font-semibold text-neutral-900">Deep Learning</span> and <span className="font-semibold text-neutral-900">Big Data</span>. Building scalable AI solutions to solve complex real-world problems.
              </Trans>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Link to="/projects">
                <Button size="lg" className="group shadow-xl shadow-primary-500/25 hover:shadow-2xl hover:shadow-primary-500/30">
                  {t('hero.cta_projects')}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="shadow-md hover:shadow-lg">
                <Download className="mr-2 h-5 w-5" />
                {t('hero.cta_cv')}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Expertise Grid */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">{t('expertise.title')}</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {t('expertise.subtitle')}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card hoverEffect className="group border-t-4 border-t-blue-500">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-md">
              <Brain className="h-7 w-7" />
            </div>
            <h3 className="mb-3 text-2xl font-bold text-neutral-900">{t('expertise.ml.title')}</h3>
            <p className="text-neutral-600 leading-relaxed">{t('expertise.ml.description')}</p>
          </Card>
          
          <Card hoverEffect className="group border-t-4 border-t-purple-500">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-md">
              <Database className="h-7 w-7" />
            </div>
            <h3 className="mb-3 text-2xl font-bold text-neutral-900">{t('expertise.bigdata.title')}</h3>
            <p className="text-neutral-600 leading-relaxed">{t('expertise.bigdata.description')}</p>
          </Card>
          
          <Card hoverEffect className="group border-t-4 border-t-orange-500">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300 shadow-md">
              <Cloud className="h-7 w-7" />
            </div>
            <h3 className="mb-3 text-2xl font-bold text-neutral-900">{t('expertise.mlops.title')}</h3>
            <p className="text-neutral-600 leading-relaxed">{t('expertise.mlops.description')}</p>
          </Card>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="bg-neutral-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl font-bold text-neutral-900 mb-2">{t('featured_projects.title')}</h2>
              <p className="text-lg text-neutral-600">{t('featured_projects.subtitle')}</p>
            </div>
            <Link to="/projects" className="hidden sm:flex items-center gap-1 text-primary-600 hover:text-primary-700 font-semibold group">
              {t('featured_projects.view_all')}
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hoverEffect className="flex flex-col p-0 border-neutral-200 overflow-hidden h-full">
                  <div className="relative h-52 w-full overflow-hidden">
                    <img src={project.imageUrl} alt={tData(project.title)} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-neutral-900 backdrop-blur-sm shadow-lg">
                      {t(`projects:public.filters.${project.category}`)}
                    </div>
                  </div>
                  <div className="flex flex-grow flex-col p-6">
                    <h3 className="mb-3 text-xl font-bold text-neutral-900 line-clamp-1">{tData(project.title)}</h3>
                    <p className="mb-4 flex-grow text-sm text-neutral-600 leading-relaxed line-clamp-3">{tData(project.description)}</p>
                    
                    <div className="mb-5 flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech: any) => (
                        <span key={tech.id} className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 border border-primary-100">
                          {tech.name}
                        </span>
                      ))}
                    </div>

                    <Link to={`/projects/${project.id}`}>
                      <Button variant="outline" size="sm" className="w-full group">
                        {t('featured_projects.view_details')}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-10 flex justify-center sm:hidden">
            <Link to="/projects">
              <Button variant="ghost">{t('featured_projects.view_all')}</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Education Section - Cards */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 p-3 text-white shadow-lg shadow-primary-500/25">
                <GraduationCap className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-neutral-900">{t('education.title')}</h2>
                <p className="mt-1 text-lg text-neutral-600">{t('education.subtitle')}</p>
              </div>
            </div>
            <Link to="/education" className="hidden sm:flex items-center gap-1 text-primary-600 hover:text-primary-700 font-semibold group">
              {t('education.view_timeline')}
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {education.slice(0, 3).map((edu) => (
              <Card key={edu.id} hoverEffect className="flex flex-col border-primary-100">
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-lg bg-primary-50 px-3 py-1.5 text-sm font-semibold text-primary-700 border border-primary-200">
                    {edu.start_year} - {edu.end_year}
                  </span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-neutral-900 line-clamp-1" title={tData(edu.institution)}>{tData(edu.institution)}</h3>
                <p className="mb-4 text-sm font-semibold text-primary-600 line-clamp-2" title={tData(edu.degree)}>{tData(edu.degree)}</p>
                <p className="mb-4 flex-grow text-sm text-neutral-600 leading-relaxed line-clamp-3">{tData(edu.description)}</p>
                
                <Link to="/education" className="mt-auto">
                  <Button variant="ghost" size="sm" className="w-full justify-start pl-0 hover:bg-transparent hover:text-primary-600 group">
                    {t('education.read_more')} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
          
          <div className="mt-10 flex justify-center sm:hidden">
            <Link to="/education">
              <Button variant="ghost">{t('education.view_timeline')}</Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Experience Section - Cards */}
      <section className="bg-neutral-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-3 text-white shadow-lg shadow-blue-500/25">
                <Briefcase className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-neutral-900">{t('experience.title')}</h2>
                <p className="mt-1 text-lg text-neutral-600">{t('experience.subtitle')}</p>
              </div>
            </div>
            <Link to="/experience" className="hidden sm:flex items-center gap-1 text-primary-600 hover:text-primary-700 font-semibold group">
              {t('experience.view_all')}
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {experiences.slice(0, 3).map((exp) => (
              <Card key={exp.id} hoverEffect className="flex flex-col">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white font-bold text-sm shadow-md">
                    {exp.company.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="rounded-lg bg-neutral-100 px-3 py-1.5 text-sm font-medium text-neutral-700 border border-neutral-200">
                    {formatDate(exp.start_date)}
                  </span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-neutral-900 line-clamp-1">{tData(exp.title)}</h3>
                <p className="mb-4 text-sm font-semibold text-primary-600">{exp.company}</p>
                
                <div className="mb-4 flex-grow">
                  <p className="text-sm text-neutral-600 leading-relaxed line-clamp-3">
                      {tData(exp.description)}
                  </p>
                </div>
                
                <Link to="/experience" className="mt-auto">
                  <Button variant="ghost" size="sm" className="w-full justify-start pl-0 hover:bg-transparent hover:text-primary-600 group">
                    {t('experience.view_details')} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
          
          <div className="mt-10 flex justify-center sm:hidden">
             <Link to="/experience">
              <Button variant="ghost">{t('experience.view_all')}</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};