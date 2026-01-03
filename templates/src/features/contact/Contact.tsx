import React, { useState } from 'react';
import { z } from 'zod';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const contactSchema = z.object({
  name: z.string().min(2, 'name'),
  email: z.string().email('email'),
  subject: z.string().min(5, 'subject'),
  message: z.string().min(20, 'message'),
});

type ContactForm = z.infer<typeof contactSchema>;

export const Contact: React.FC = () => {
  const { t } = useTranslation('contact');
  const [formData, setFormData] = useState<ContactForm>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setStatus('submitting');

    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: any = {};
      // Use result.error.issues instead of result.error.errors
      result.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0]] = t(`validation.${err.message}`);
      });
      setErrors(fieldErrors);
      setStatus('idle');
      return;
    }

    // Simulate API Call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <div>
            <h1 className="text-5xl font-bold text-neutral-900 mb-6">{t('title')}</h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              {t('subtitle')}
            </p>

            <div className="mt-12 space-y-6">
              <Card className="flex items-center space-x-4 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25">
                  <Mail className="h-7 w-7" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-900 text-lg">{t('info.email')}</p>
                  <a href="mailto:boniangeulrich@gmail.com" className="text-neutral-600 hover:text-primary-600 transition-colors font-medium">boniangeulrich@gmail.com</a>
                </div>
              </Card>
              
              <Card className="flex items-center space-x-4 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/25">
                  <MapPin className="h-7 w-7" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-900 text-lg">{t('info.location')}</p>
                  <p className="text-neutral-600 font-medium">{t('info.locationValue')}</p>
                </div>
              </Card>
            </div>
          </div>

          {/* Form */}
          <Card className="shadow-xl">
            {status === 'success' ? (
              <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-emerald-50 p-4 mb-6">
                  <CheckCircle className="h-16 w-16 text-emerald-500" />
                </div>
                <h3 className="text-3xl font-bold text-neutral-900 mb-3">{t('success.title')}</h3>
                <p className="text-lg text-neutral-600 mb-8">{t('success.message')}</p>
                <Button variant="outline" size="lg" onClick={() => setStatus('idle')}>
                  {t('success.button')}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">{t('form.name')}</label>
                  <input
                    type="text"
                    className={`w-full rounded-lg border bg-white px-4 py-3 text-neutral-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all ${errors.name ? 'border-red-500 ring-2 ring-red-500/20' : 'border-neutral-300'}`}
                    placeholder={t('form.placeholders.name')}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.name}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">{t('form.email')}</label>
                  <input
                    type="email"
                    className={`w-full rounded-lg border bg-white px-4 py-3 text-neutral-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all ${errors.email ? 'border-red-500 ring-2 ring-red-500/20' : 'border-neutral-300'}`}
                    placeholder={t('form.placeholders.email')}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.email}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">{t('form.subject')}</label>
                  <input
                    type="text"
                    className={`w-full rounded-lg border bg-white px-4 py-3 text-neutral-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all ${errors.subject ? 'border-red-500 ring-2 ring-red-500/20' : 'border-neutral-300'}`}
                    placeholder={t('form.placeholders.subject')}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                  {errors.subject && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.subject}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">{t('form.message')}</label>
                  <textarea
                    rows={4}
                    className={`w-full rounded-lg border bg-white px-4 py-3 text-neutral-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all ${errors.message ? 'border-red-500 ring-2 ring-red-500/20' : 'border-neutral-300'}`}
                    placeholder={t('form.placeholders.message')}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                  {errors.message && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.message}</p>}
                </div>

                <Button type="submit" size="lg" className="w-full shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30" disabled={status === 'submitting'}>
                  {status === 'submitting' ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                      {t('form.sending')}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {t('form.submit')} <Send className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};