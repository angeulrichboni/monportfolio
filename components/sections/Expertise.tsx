"use client";

import { Brain, Database, Cloud } from 'lucide-react';
import { useI18n } from '../I18nProvider';
import { Card } from '../ui/Card';

export function Expertise() {
    const { t } = useI18n();

    return (
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <div className="mb-12 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">{t('expertise.title')}</h2>
                <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto px-4">
                    {t('expertise.subtitle')}
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                <Card hoverEffect className="group border-t-4 border-t-blue-500">
                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-md">
                        <Brain className="h-7 w-7" />
                    </div>
                    <h3 className="mb-3 text-xl sm:text-2xl font-bold text-neutral-900">{t('expertise.ml.title')}</h3>
                    <p className="text-neutral-600 leading-relaxed">{t('expertise.ml.description')}</p>
                </Card>

                <Card hoverEffect className="group border-t-4 border-t-purple-500">
                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-md">
                        <Database className="h-7 w-7" />
                    </div>
                    <h3 className="mb-3 text-xl sm:text-2xl font-bold text-neutral-900">{t('expertise.bigdata.title')}</h3>
                    <p className="text-neutral-600 leading-relaxed">{t('expertise.bigdata.description')}</p>
                </Card>

                <Card hoverEffect className="group border-t-4 border-t-orange-500">
                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300 shadow-md">
                        <Cloud className="h-7 w-7" />
                    </div>
                    <h3 className="mb-3 text-xl sm:text-2xl font-bold text-neutral-900">{t('expertise.mlops.title')}</h3>
                    <p className="text-neutral-600 leading-relaxed">{t('expertise.mlops.description')}</p>
                </Card>
            </div>
        </section>
    );
}
