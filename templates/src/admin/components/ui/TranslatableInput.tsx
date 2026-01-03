import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input, Textarea } from './FormElements';
import { translateText } from '../../../services/groq';
import { Sparkles, Loader2, Languages } from 'lucide-react';

interface TranslatableInputProps {
  label: string;
  value: { fr: string; en: string };
  onChange: (val: { fr: string; en: string }) => void;
  type?: 'input' | 'textarea';
  placeholder?: string;
  error?: string;
}

export const TranslatableInput: React.FC<TranslatableInputProps> = ({
  label, value, onChange, type = 'input', placeholder, error
}) => {
  const [lang, setLang] = useState<'fr' | 'en'>('fr');
  const [loading, setLoading] = useState(false);

  const handleAutoTranslate = async () => {
    const source = lang;
    const target = lang === 'fr' ? 'en' : 'fr';
    
    if (!value[source]) return; // Rien à traduire

    setLoading(true);
    const translated = await translateText(value[source], target);
    onChange({ ...value, [target]: translated });
    setLoading(false);
    setLang(target); // Switch vers la langue traduite pour voir le résultat
  };

  const Component = type === 'textarea' ? Textarea : Input;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleAutoTranslate}
            disabled={loading || !value[lang]}
            className="h-6 px-2 text-xs text-purple-600 hover:bg-purple-50"
          >
            {loading ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <Sparkles className="w-3 h-3 mr-1" />}
            AI Translate
          </Button>
          <div className="flex bg-slate-100 rounded p-0.5">
            {(['fr', 'en'] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={`px-3 py-1 text-xs font-bold rounded transition-all ${
                  lang === l ? 'bg-white shadow text-primary-600' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="relative">
        <Component
          value={value[lang]}
          onChange={(e: any) => onChange({ ...value, [lang]: e.target.value })}
          placeholder={`${placeholder || ''} (${lang.toUpperCase()})`}
          rows={type === 'textarea' ? 4 : undefined}
          className={error ? 'border-red-500' : ''}
        />
        <div className="absolute right-2 top-2 pointer-events-none opacity-20">
           <Languages className="w-4 h-4" />
        </div>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};
