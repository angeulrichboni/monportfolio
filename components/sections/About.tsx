"use client";
import React from 'react';
import { useI18n } from "../I18nProvider";
import { GraduationCap, MapPin, Code2, Cpu, Globe, ArrowUpRight } from 'lucide-react';
import { Card } from "../ui/Card";

export function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="py-12">
      {/* Container - Maximize width usage/minimize side margins for "fuller" look */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-auto">

        {/* 1. Bio Card (Large & Wide) - Focus on Story */}
        <div className="md:col-span-8 flex flex-col justify-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 flex-shrink-0 rounded-lg bg-blue-600 flex items-center justify-center text-white text-lg">💡</span>
            <span className="break-words">{t("section.about.title")}</span>
          </h2>
          <div className="prose prose-lg text-slate-600 leading-relaxed text-pretty">
            <p className="mb-4">
              {t("about.intro1")}
            </p>
            <p className="font-medium text-slate-900 border-l-4 border-blue-500 pl-4 py-1 bg-blue-50/50 rounded-r-lg">
              {t("about.intro2")}
            </p>
          </div>

          {/* Quick Stats / Highlights Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            <HighlightPill icon={<Code2 size={18} />} label="Big Data" />
            <HighlightPill icon={<Cpu size={18} />} label="Data Eng" />
            <HighlightPill icon={<Globe size={18} />} label="DevOps" />
            <HighlightPill icon={<MapPin size={18} />} label="Tunisie" />
          </div>
        </div>

        {/* 2. Profile Photo Card (Tall) */}
        <div className="md:col-span-4 md:row-span-2 h-full min-h-[350px] md:min-h-[400px] relative overflow-hidden rounded-2xl border border-slate-200 shadow-sm group">
          {/* Background Image / Pattern */}
          <div className="absolute inset-0 bg-slate-100"></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://res.cloudinary.com/ddivqszbt/image/upload/v1746353953/Me_d48ibg.jpg"
            alt="Profile"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60"></div>

          <div className="absolute bottom-0 left-0 p-6 text-white z-10">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-1">Status</p>
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="font-semibold">{t("contact.openToWork") || "Open to Opportunities"}</span>
            </div>
          </div>
        </div>

        {/* 3. Education ("Academic Path") - Wide Bottom */}
        <div className="md:col-span-8">
          <Card className="h-full bg-slate-50/50 border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="text-blue-600" size={20} />
                {t("about.academic.title")}
              </h3>
            </div>

            <div className="space-y-0">
              <AcademicRow
                year="2023-2026"
                title={t("about.academic.item1.title")}
                school={t("about.academic.item1.school").split('—')[0]} // Extract School Name slightly cleaner
              />
              <div className="w-px h-4 bg-slate-200 ml-[88px] my-1"></div>
              <AcademicRow
                year="2019-2022"
                title={t("about.academic.item2.title")}
                school={t("about.academic.item2.school").split('—')[0]}
              />
              <div className="w-px h-4 bg-slate-200 ml-[88px] my-1"></div>
              <AcademicRow
                year="2018-2019"
                title={t("about.academic.item3.title")}
                school={t("about.academic.item3.school").split('—')[0]}
              />
            </div>
          </Card>
        </div>

      </div>
    </section>
  );
}

function HighlightPill({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg shadow-sm text-slate-700 text-sm font-semibold hover:border-blue-300 hover:text-blue-600 transition-colors cursor-default">
      {icon}
      <span>{label}</span>
    </div>
  )
}

function AcademicRow({ year, title, school }: { year: string, title: string, school: string }) {
  return (
    <div className="flex items-center group p-2 hover:bg-white rounded-lg transition-colors">
      <div className="w-24 flex-shrink-0 text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded text-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
        {year}
      </div>
      <div className="ml-6 flex flex-col sm:flex-row sm:items-center justify-between w-full">
        <h4 className="text-sm font-bold text-slate-900">{title}</h4>
        <div className="text-xs font-medium text-slate-500 sm:ml-4 flex items-center gap-1">
          {school}
        </div>
      </div>
    </div>
  )
}