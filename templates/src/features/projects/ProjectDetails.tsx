import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { ArrowLeft, Github, ExternalLink, Server, Users, Linkedin, Play, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PROJECTS } from '../../constants';
import { useLocalizedData } from '../../hooks/useLocalizedData';

export const ProjectDetails: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation('projects');
  const { tData } = useLocalizedData();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  const projects = PROJECTS;
  const project = projects.find(p => p.id === id);

  // Mock Gallery Data if missing (for testing purposes)
  const gallery = project?.gallery || [
    { id: 'v1', type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', caption: 'Project Demo' },
    { id: 'i1', type: 'image', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', caption: 'Dashboard Overview' },
    { id: 'i2', type: 'image', url: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=800&q=80', caption: 'Code Structure' },
    { id: 'i3', type: 'image', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80', caption: 'Analytics Panel' },
    { id: 'v2', type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', caption: 'Feature Walkthrough' },
  ];

  const featuredVideo = gallery.find((item: any) => item.type === 'video');
  const remainingMedia = gallery.filter((item: any) => item.id !== featuredVideo?.id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextLightbox = () => setLightboxIndex(prev => (prev !== null && prev < gallery.length - 1 ? prev + 1 : 0));
  const prevLightbox = () => setLightboxIndex(prev => (prev !== null && prev > 0 ? prev - 1 : gallery.length - 1));

  // Handle keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  if (!project) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-neutral-900">{t('public.details.notFound')}</h2>
        <Link to="/projects" className="mt-4 text-primary-600 hover:underline">{t('public.details.backToProjects')}</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative h-[40vh] w-full bg-neutral-900">
        <img 
          src={project.imageUrl} 
          alt={tData(project.title)} 
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-8">
          <div className="mx-auto max-w-7xl">
            <Link to="/projects" className="mb-4 inline-flex items-center text-white/80 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" /> {t('public.details.backToList')}
            </Link>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white md:text-5xl">{tData(project.title)}</h1>
                <div className="mt-4 flex flex-wrap gap-3">
                  <span className="rounded-full bg-primary-600 px-3 py-1 text-sm font-medium text-white">
                    {t(`public.filters.${project.category}`)}
                  </span>
                  <span className={`rounded-full px-3 py-1 text-sm font-medium ${project.status === 'completed' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                    {t(`public.status.${project.status}`)}
                  </span>
                  {project.is_team && (
                     <span className="rounded-full bg-purple-500/20 px-3 py-1 text-sm font-medium text-purple-300 flex items-center">
                       <Users className="w-3 h-3 mr-1" /> {t('public.details.teamProject')}
                     </span>
                  )}
                </div>
              </div>
              <div className="mt-6 flex gap-3 md:mt-0">
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
                      <Github className="mr-2 h-4 w-4" /> {t('public.details.repository')}
                    </Button>
                  </a>
                )}
                {project.demo_url && (
                  <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                    <Button variant="primary">
                      <ExternalLink className="mr-2 h-4 w-4" /> {t('public.details.liveDemo')}
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          
          {/* Left Column: Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            <section>
              <h2 className="mb-4 text-2xl font-bold text-neutral-900">Project Overview</h2>
              <p className="text-lg text-neutral-600 leading-relaxed">{tData(project.description)}</p>
            </section>

            {/* Featured Video Section */}
            {featuredVideo && (
              <section className="relative overflow-hidden rounded-xl bg-black shadow-2xl">
                <video 
                  src={featuredVideo.url}
                  className="w-full h-auto max-h-[500px] object-cover"
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  controls
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p className="text-white font-medium flex items-center">
                    <Play className="w-4 h-4 mr-2 fill-white" /> {featuredVideo.caption || 'Project Demo'}
                  </p>
                </div>
              </section>
            )}

            {project.problem_statement && (
              <section>
                <h2 className="mb-4 text-2xl font-bold text-neutral-900">Problem Statement</h2>
                <Card className="bg-amber-50 border-amber-100">
                  <p className="text-neutral-700">{tData(project.problem_statement)}</p>
                </Card>
              </section>
            )}

            {project.architecture && (
              <section>
                <h2 className="mb-4 text-2xl font-bold text-neutral-900">Solution Architecture</h2>
                <p className="text-neutral-600 mb-6">{tData(project.architecture)}</p>
                {/* Placeholder for diagram */}
                <div className="rounded-xl bg-neutral-100 border border-neutral-200 p-8 text-center text-neutral-400">
                  <Server className="mx-auto h-12 w-12 mb-2 opacity-50" />
                  <p className="text-sm">System Architecture Diagram</p>
                </div>
              </section>
            )}
            
            {project.members && project.members.length > 0 && (
              <section>
                <h2 className="mb-4 text-2xl font-bold text-neutral-900">Project Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.members.map((member: any) => (
                    <Card key={member.id} className="p-4 flex items-center justify-between">
                       <div className="flex items-center space-x-3">
                         <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                           {member.name.charAt(0)}
                         </div>
                         <div>
                           <p className="font-bold text-neutral-900">{member.name}</p>
                           <p className="text-sm text-neutral-500">{member.role}</p>
                         </div>
                       </div>
                       <div className="flex gap-2">
                         {member.linkedin_url && (
                           <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-[#0077b5]">
                             <Linkedin className="h-4 w-4" />
                           </a>
                         )}
                         {member.github_url && (
                           <a href={member.github_url} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-neutral-900">
                             <Github className="h-4 w-4" />
                           </a>
                         )}
                       </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Media Gallery Grid */}
            {remainingMedia.length > 0 && (
              <section>
                <h2 className="mb-4 text-2xl font-bold text-neutral-900">Gallery & Screenshots</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {remainingMedia.map((item: any, index: number) => {
                    const galleryIndex = gallery.findIndex((g: any) => g.id === item.id);
                    return (
                      <div 
                        key={item.id} 
                        onClick={() => openLightbox(galleryIndex)}
                        className={`group relative cursor-pointer overflow-hidden rounded-xl bg-neutral-100 border border-neutral-200 transition-all hover:shadow-lg ${index === 0 ? 'sm:col-span-2 sm:row-span-2' : ''}`}
                      >
                        {item.type === 'video' ? (
                          <div className="relative aspect-video w-full bg-neutral-900 flex items-center justify-center">
                            <video src={item.url} className="h-full w-full object-cover opacity-80" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm transition-transform group-hover:scale-110">
                                <Play className="h-8 w-8 fill-white text-white" />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="relative aspect-video w-full">
                            <img 
                              src={item.url} 
                              alt={item.caption} 
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                            />
                            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                            <div className="absolute bottom-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
                              <div className="rounded-full bg-black/50 p-2 text-white backdrop-blur-sm">
                                <Maximize2 className="h-4 w-4" />
                              </div>
                            </div>
                          </div>
                        )}
                        {item.caption && (
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                            <p className="text-sm font-medium text-white">{item.caption}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Metadata & Sidebar */}
          <div className="space-y-8">
            <Card>
              <h3 className="mb-4 text-lg font-bold text-neutral-900">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: any) => (
                  <span key={tech.id} className="rounded bg-neutral-100 px-3 py-1.5 text-sm text-neutral-700 border border-neutral-200">
                    {tech.name}
                  </span>
                ))}
              </div>
            </Card>
            
            <Card>
              <h3 className="mb-4 text-lg font-bold text-neutral-900">Project Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Type</span>
                  <span className="font-medium text-neutral-900 capitalize">{project.is_team ? 'Team' : 'Individual'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Status</span>
                  <span className="font-medium text-neutral-900 capitalize">{project.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Created At</span>
                  <span className="font-medium text-neutral-900">{project.created_at}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-200">
          <button 
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          <button 
            onClick={prevLightbox}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors hidden md:block"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <button 
            onClick={nextLightbox}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors hidden md:block"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          <div className="relative h-full w-full max-w-7xl p-4 flex items-center justify-center">
            {gallery[lightboxIndex].type === 'video' ? (
              <video 
                src={gallery[lightboxIndex].url} 
                controls 
                autoPlay 
                className="max-h-full max-w-full rounded-lg shadow-2xl"
              />
            ) : (
              <img 
                src={gallery[lightboxIndex].url} 
                alt={gallery[lightboxIndex].caption} 
                className="max-h-full max-w-full rounded-lg shadow-2xl object-contain"
              />
            )}
            
            {gallery[lightboxIndex].caption && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-6 py-2 text-white backdrop-blur-md">
                {gallery[lightboxIndex].caption}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};