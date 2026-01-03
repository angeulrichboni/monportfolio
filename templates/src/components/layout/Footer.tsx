import React from 'react';
import { Terminal, Heart } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';

export const Footer: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 py-12 mt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-2 text-neutral-400">
            <Terminal className="h-5 w-5 text-primary-500" />
            <span className="font-mono text-sm">aaub.ai</span>
          </div>
          
          <p className="text-sm text-neutral-600 flex items-center gap-2">
            <Trans i18nKey="footer.rights" values={{ year: new Date().getFullYear() }}>
              © {{ year: new Date().getFullYear() }} Acobe Ange Ulrich BONI • Made with
            </Trans>
            <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" /> 
            {t('footer.using')}
          </p>
          
          <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {t('footer.status')}
          </div>
        </div>
      </div>
    </footer>
  );
};