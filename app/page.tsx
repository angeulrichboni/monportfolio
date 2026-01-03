"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useI18n } from '../components/I18nProvider';
import { Section } from "../components/Section";
import { About } from "../components/sections/About";
import { Skills } from "../components/sections/Skills";
import { Projects } from "../components/sections/Projects";
import { Experience } from "../components/sections/Experience";
import { Certifications } from "../components/sections/Certifications";
import { Contact } from "../components/sections/Contact";
import { Expertise } from "../components/sections/Expertise";
import { Reveal } from "../components/Reveal";

export default function Home() {
  const { t, lang } = useI18n();

  return (
    <main className="w-full bg-slate-50 overflow-hidden font-sans">

      {/* HERO SECTION - Expert Refinement */}
      <section id="accueil" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-20">

        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-bg.jfif"
            alt="Background"
            className="h-full w-full object-cover"
          />
          {/* Heavy white overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[0.5px]"></div>

          {/* Subtle decorative gradient on top for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 text-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center space-y-8"
          >
            {/* Status Pill - Refined for Dark BG */}
            <div className="flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-600/20 backdrop-blur-md px-5 py-2 text-sm font-semibold text-sky-200 shadow-lg transition-shadow cursor-default mb-4">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-400"></span>
              </span>
              {t('contact.openToWork')}
            </div>

            {/* Main Typography - Single Line Name */}
            <div className="space-y-6 max-w-5xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold tracking-tight text-white leading-tight drop-shadow-2xl px-4">
                {t('hero.title')}
              </h1>

              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-white/90 mt-6 leading-relaxed drop-shadow-lg px-4">
                {t('hero.subtitle')}{' '}
                <span className="font-bold text-sky-300">
                  {t('hero.subtitleHighlight')}
                </span>
              </h2>
            </div>

            {/* Description - Cleaner max-width */}
            <p
              className="max-w-2xl text-base sm:text-lg leading-relaxed text-white/80 font-medium drop-shadow-md px-4"
              dangerouslySetInnerHTML={{ __html: t('hero.description') }}
            />

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full justify-center">
              <Link href="/projets" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto px-8 h-12 text-base shadow-xl shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/30 bg-blue-600 hover:bg-blue-700 border-none">
                  {t('hero.ctaProjects')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 h-12 text-base border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900">
                  <Download className="mr-2 h-5 w-5" />
                  {t('cta.downloadCv')}
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* RESTORED SECTIONS (Original content) */}

      <Reveal>
        <Section id="a-propos" variant="white">
          <About />
        </Section>
      </Reveal>

      <Reveal>
        <Section id="competences" titleKey="section.skills.title" subtitleKey="section.skills.subtitle" variant="gray">
          <Skills />
        </Section>
      </Reveal>

      <Reveal>
        <Section id="projets" titleKey="section.projects.title" subtitleKey="section.projects.subtitle" variant="white">
          <Projects />
        </Section>
      </Reveal>

      <Reveal>
        <Section id="experiences" titleKey="section.experience.title" subtitleKey="section.experience.subtitle" variant="gray">
          <Experience />
        </Section>
      </Reveal>

      <Reveal>
        <Section id="certifications" titleKey="section.certifications.title" subtitleKey="section.certifications.subtitle" variant="white">
          <Certifications />
        </Section>
      </Reveal>

      <Reveal>
        <Expertise />
      </Reveal>

      <Reveal>
        <Section id="contact" titleKey="section.contact.title" subtitleKey="section.contact.subtitle" variant="gray" className="pb-32">
          <Contact />
        </Section>
      </Reveal>

    </main>
  );
}