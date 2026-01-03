import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Card } from '../../components/ui/Card';
import { Award, Terminal, Cpu, Database, Cloud } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Skills: React.FC = () => {
  const { t } = useTranslation('skills');
  const skills = t('items', { returnObjects: true }) as any[];
  const certifications = t('certificationsList', { returnObjects: true }) as any[];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-16">
          <h1 className="text-5xl font-bold text-neutral-900 mb-4">{t('title')}</h1>
          <p className="max-w-2xl text-xl text-neutral-600">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Visualization */}
          <Card className="flex h-[500px] flex-col items-center justify-center bg-white border-neutral-200 shadow-lg">
            <h3 className="mb-6 text-2xl font-bold text-neutral-900">{t('radarTitle')}</h3>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skills}>
                <PolarGrid stroke="#e5e5e5" />
                <PolarAngleAxis dataKey="name" tick={{ fill: '#525252', fontSize: 12, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
                <Radar
                  name="Skill Level"
                  dataKey="level"
                  stroke="#0ea5e9"
                  strokeWidth={3}
                  fill="#0ea5e9"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </Card>

          {/* Detailed Categories */}
          <div className="space-y-6">
            <Card className="shadow-md">
              <div className="flex items-center gap-4 mb-5">
                <div className="rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-3 text-white shadow-lg shadow-blue-500/25">
                  <Cpu className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">{t('categories.ml.title')}</h3>
                  <p className="text-sm text-neutral-600 mt-1">{t('categories.ml.desc')}</p>
                </div>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-neutral-100">
                <div className="h-full w-[90%] rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-md"></div>
              </div>
              <p className="mt-2 text-right text-xs font-semibold text-blue-600">90% {t('proficiency')}</p>
            </Card>

            <Card className="shadow-md">
              <div className="flex items-center gap-4 mb-5">
                <div className="rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-3 text-white shadow-lg shadow-purple-500/25">
                  <Database className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">{t('categories.data.title')}</h3>
                  <p className="text-sm text-neutral-600 mt-1">{t('categories.data.desc')}</p>
                </div>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-neutral-100">
                <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-purple-500 to-purple-600 shadow-md"></div>
              </div>
              <p className="mt-2 text-right text-xs font-semibold text-purple-600">85% {t('proficiency')}</p>
            </Card>

            <Card className="shadow-md">
              <div className="flex items-center gap-4 mb-5">
                <div className="rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 p-3 text-white shadow-lg shadow-orange-500/25">
                  <Cloud className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">{t('categories.cloud.title')}</h3>
                  <p className="text-sm text-neutral-600 mt-1">{t('categories.cloud.desc')}</p>
                </div>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-neutral-100">
                <div className="h-full w-[75%] rounded-full bg-gradient-to-r from-orange-500 to-orange-600 shadow-md"></div>
              </div>
              <p className="mt-2 text-right text-xs font-semibold text-orange-600">75% {t('proficiency')}</p>
            </Card>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="flex items-center justify-between border-primary-200 bg-gradient-to-br from-primary-50 to-white shadow-md">
                <div className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-primary-600" />
                  <span className="font-semibold text-neutral-900">Python</span>
                </div>
                <span className="text-xs font-mono font-bold bg-primary-600 text-white px-2 py-1 rounded-md">{t('levels.expert')}</span>
              </Card>
              <Card className="flex items-center justify-between border-primary-200 bg-gradient-to-br from-primary-50 to-white shadow-md">
                <div className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-primary-600" />
                  <span className="font-semibold text-neutral-900">Scala</span>
                </div>
                <span className="text-xs font-mono font-bold bg-primary-500 text-white px-2 py-1 rounded-md">{t('levels.advanced')}</span>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Certifications */}
        <div className="mt-16">
          <h2 className="mb-8 text-3xl font-bold text-neutral-900">{t('certifications')}</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert: any) => (
              <Card key={cert.id} className="flex items-center gap-4 border-neutral-200 bg-white shadow-md hover:shadow-lg transition-shadow">
                <div className="rounded-full bg-yellow-50 p-3">
                  <Award className="h-8 w-8 text-yellow-600" />
                </div>
                <div>
                  <p className="font-bold text-neutral-900 text-sm">{cert.name}</p>
                  <p className="text-xs text-neutral-600 mt-1">{cert.organization} • {cert.year}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};