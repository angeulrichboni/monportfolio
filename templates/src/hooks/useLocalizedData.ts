import { useTranslation } from 'react-i18next';
import type { LocalizedString } from '../types';

export const useLocalizedData = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language.split('-')[0] as 'fr' | 'en'; // 'fr-FR' -> 'fr'

  // Fonction helper pour extraire la bonne string
  const tData = (data: LocalizedString | string): string => {
    if (typeof data === 'string') return data; // Rétro-compatibilité
    return data[lang] || data['fr'] || ''; // Fallback sur FR
  };

  return { tData, lang };
};
