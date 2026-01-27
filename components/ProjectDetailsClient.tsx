"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Linkedin, Play, Maximize2, X, ChevronLeft, ChevronRight, CheckCircle2, Clock, Server } from "lucide-react";
import { useI18n } from "./I18nProvider";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";

interface Project {
  id?: string;
  title: string | { fr: string; en: string };
  description: string | { fr: string; en: string };
  content?: string | { fr: string; en: string };
  category?: string;
  status?: 'completed' | 'in-progress' | 'planned';
  is_team?: boolean;
  cover_image_url?: string;
  github_url?: string;
  demo_url?: string;
  problem_statement?: string | { fr: string; en: string };
  architecture?: string | { fr: string; en: string };
  team?: { name: string; role?: string; linkedin_url?: string; portfolio_url?: string; github_url?: string }[];
  assets?: { type: 'image' | 'video'; url: string; caption?: string | { fr: string; en: string } }[];
  technologies?: string[];
  start_date?: string;
  end_date?: string;
  created_at?: string;
  stack: string[];
  results?: string | { fr: string; en: string };
}

function pick(value: unknown, lang: "fr" | "en"): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") {
    const v = value as Record<string, unknown>;
    return (v[lang] as string) || (v["fr"] as string) || "";
  }
  return "";
}

interface ProjectDetailsClientProps {
  project: Project;
}

export function ProjectDetailsClient({ project }: ProjectDetailsClientProps) {
  const { lang } = useI18n();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const gallery = project.assets || [];
  const featuredVideo = gallery.find((item) => item.type === 'video');
  const remainingMedia = gallery.filter((item) => item !== featuredVideo);

  const nextLightbox = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedImage) return;
    const assets = project.assets?.filter((a) => a.type === 'image') || [];
    const currentIndex = assets.findIndex((a) => a.url === selectedImage);
    const nextIndex = (currentIndex + 1) % assets.length;
    setSelectedImage(assets[nextIndex].url);
  }, [selectedImage, project.assets]);

  const prevLightbox = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedImage) return;
    const assets = project.assets?.filter((a) => a.type === 'image') || [];
    const currentIndex = assets.findIndex((a) => a.url === selectedImage);
    const prevIndex = (currentIndex - 1 + assets.length) % assets.length;
    setSelectedImage(assets[prevIndex].url);
  }, [selectedImage, project.assets]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === 'Escape') setSelectedImage(null);
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextLightbox, prevLightbox, selectedImage]);

  return (
    <div className="min-h-screen bg-neutral-50 pb-20 font-sans">
      <div className="relative h-[40vh] w-full bg-neutral-900 overflow-hidden">
        {project.cover_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.cover_image_url}
            alt={pick(project.title, lang)}
            className="h-full w-full object-cover opacity-40 blur-[2px]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-8 z-10">
          <div className="mx-auto max-w-7xl">
            <Link href="/projets" className="mb-4 inline-flex items-center text-white/80 hover:text-white transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {lang === 'fr' ? 'Retour aux projets' : 'Back to projects'}
            </Link>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-4xl font-extrabold text-white md:text-5xl tracking-tight">
                  {pick(project.title, lang)}
                </h1>
                <div className="mt-4 flex flex-wrap gap-3 items-center">
                  {project.category && (
                    <span className="rounded-full bg-blue-600 px-3 py-1 text-sm font-medium text-white shadow-sm">
                      {project.category}
                    </span>
                  )}

                  {project.status === 'completed' ? (
                    <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-medium text-emerald-300 flex items-center border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      {lang === 'fr' ? 'Terminé' : 'Completed'}
                    </span>
                  ) : (
                    <span className="rounded-full bg-amber-500/20 px-3 py-1 text-sm font-medium text-amber-300 flex items-center border border-amber-500/30">
                      <Clock className="w-3 h-3 mr-1" />
                      {lang === 'fr' ? 'En cours' : 'In Progress'}
                    </span>
                  )}

                  {project.is_team ? (
                    <span className="rounded-full bg-purple-500/20 px-3 py-1 text-sm font-medium text-purple-300 flex items-center border border-purple-500/30">
                      <Users className="w-3 h-3 mr-1" />
                      {lang === 'fr' ? 'Projet d\'équipe' : 'Team Project'}
                    </span>
                  ) : (
                    <span className="rounded-full bg-slate-500/20 px-3 py-1 text-sm font-medium text-slate-300 flex items-center border border-slate-500/30">
                      {lang === 'fr' ? 'Individuel' : 'Individual'}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-6 flex gap-3 md:mt-0">
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white hover:border-white/40">
                      <Github className="mr-2 h-4 w-4" /> Repository
                    </Button>
                  </a>
                )}
                {project.demo_url && (
                  <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                    <Button variant="primary">
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="mb-4 text-2xl font-bold text-neutral-900">
                {lang === 'fr' ? 'Vue d\'ensemble' : 'Project Overview'}
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                {pick(project.description, lang)}
              </p>
              {project.content && (
                <div className="mt-4 text-neutral-600 leading-relaxed whitespace-pre-line">
                  {pick(project.content, lang)}
                </div>
              )}
            </section>

            {featuredVideo && (
              <section className="relative overflow-hidden rounded-xl bg-black shadow-2xl ring-1 ring-gray-900/5">
                <video
                  src={featuredVideo.url}
                  className="w-full h-auto max-h-[500px] object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  preload="metadata"
                />
                {!featuredVideo.caption ? (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pointer-events-none">
                    <p className="text-white font-medium flex items-center">
                      <Play className="w-4 h-4 mr-2 fill-white" /> {lang === 'fr' ? 'Démo Vidéo' : 'Video Demo'}
                    </p>
                  </div>
                ) : null}
              </section>
            )}

            {project.problem_statement && (
              <section>
                <h2 className="mb-4 text-2xl font-bold text-neutral-900">
                  {lang === 'fr' ? 'Le Problème' : 'Problem Statement'}
                </h2>
                <Card className="bg-amber-50 border-amber-100 shadow-sm">
                  <p className="text-neutral-700 leading-relaxed font-medium">
                    {pick(project.problem_statement, lang)}
                  </p>
                </Card>
              </section>
            )}

            {project.architecture && (
              <section>
                <h2 className="mb-4 text-2xl font-bold text-neutral-900">
                  {lang === 'fr' ? 'Architecture & Solution' : 'Solution Architecture'}
                </h2>
                <p className="text-neutral-600 mb-6 leading-relaxed">
                  {pick(project.architecture, lang)}
                </p>
                <div className="rounded-xl bg-neutral-100 border border-neutral-200 p-8 text-center text-neutral-400 border-dashed border-2">
                  <Server className="mx-auto h-12 w-12 mb-2 opacity-50" />
                  <p className="text-sm font-medium">System Architecture Visualization</p>
                </div>
              </section>
            )}

            {project.team && project.team.length > 0 && (
              <section>
                <h2 className="mb-4 text-2xl font-bold text-neutral-900">
                  {lang === 'fr' ? 'L\'équipe' : 'Project Team'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.team.map((member, idx) => (
                    <Card key={idx} className="p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-neutral-900 text-sm">{member.name}</p>
                          <p className="text-xs text-neutral-500">Contributor</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {member.linkedin_url && (
                          <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-[#0077b5] transition-colors">
                            <Linkedin className="h-4 w-4" />
                          </a>
                        )}
                        {member.github_url && (
                          <a href={member.github_url} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-neutral-900 transition-colors">
                            <Github className="h-4 w-4" />
                          </a>
                        )}
                        {member.portfolio_url && (
                          <a href={member.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-blue-600 transition-colors">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {project.results && (
              <section>
                <h2 className="mb-4 text-2xl font-bold text-neutral-900">
                  {lang === 'fr' ? 'Résultats & Impact' : 'Results & Impact'}
                </h2>
                <Card variant="elevated" className="bg-gradient-to-br from-white to-blue-50/50">
                  <p className="text-neutral-700 leading-relaxed">
                    {pick(project.results, lang)}
                  </p>
                </Card>
              </section>
            )}

            {remainingMedia.length > 0 && (
              <section>
                <h2 className="mb-4 text-2xl font-bold text-neutral-900">
                  {lang === 'fr' ? 'Galerie' : 'Gallery & Screenshots'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {remainingMedia.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedImage(item.url)}
                      className={`group relative cursor-pointer overflow-hidden rounded-xl bg-neutral-100 border border-neutral-200 transition-all hover:shadow-lg ${index === 0 && remainingMedia.length % 2 !== 0 ? 'sm:col-span-2 sm:row-span-2' : ''}`}
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
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.url}
                            alt={pick(item.caption, lang) || 'Gallery image'}
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
                          <p className="text-sm font-medium text-white">{pick(item.caption, lang)}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="space-y-8">
            <Card>
              <h3 className="mb-4 text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-2">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.stack?.map((tech) => (
                  <span key={tech} className="rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 border border-slate-200">
                    {tech}
                  </span>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="mb-4 text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-2">
                {lang === 'fr' ? 'Infos Projet' : 'Project Info'}
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500 flex items-center gap-2">
                    <Users className="w-4 h-4" /> Type
                  </span>
                  <span className="font-medium text-neutral-900 capitalize bg-neutral-100 px-2 py-1 rounded">
                    {project.is_team ? (lang === 'fr' ? 'Équipe' : 'Team') : (lang === 'fr' ? 'Individuel' : 'Individual')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Status
                  </span>
                  <span className={`font-medium capitalize px-2 py-1 rounded ${project.status === 'completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                    {project.status || 'Completed'}
                  </span>
                </div>
                {project.created_at && (
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-500 flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Date
                    </span>
                    <span className="font-medium text-neutral-900">{project.created_at}</span>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-200">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-50 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={prevLightbox}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors hidden md:block hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <button
            onClick={nextLightbox}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors hidden md:block hover:scale-110 active:scale-95"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          <div className="relative h-full w-full max-w-7xl p-4 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImage}
              alt="Lightbox"
              className="max-h-full max-w-full rounded-lg shadow-2xl object-contain selection:bg-transparent"
            />
          </div>
        </div>
      )}
    </div>
  );
}