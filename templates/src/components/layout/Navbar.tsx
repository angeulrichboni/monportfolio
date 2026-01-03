import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Terminal, Github, Linkedin, Globe } from 'lucide-react';
import { NAV_ITEMS } from '../../constants';
import { cn } from '../../lib/utils';
import { useTranslation } from 'react-i18next';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation('navigation');

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  const getLabel = (label: string) => {
    switch (label) {
      case 'Home': return t('items.home');
      case 'Projects': return t('items.projects');
      case 'Experience': return t('items.experiences');
      case 'Education': return t('items.education');
      case 'Skills': return t('items.skills');
      case 'Contact': return t('items.contact');
      case 'Admin': return t('admin');
      default: return label;
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-neutral-200/60 bg-white/95 backdrop-blur-lg shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <NavLink to="/" className="flex items-center space-x-3 group">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-md group-hover:shadow-lg transition-shadow">
            <Terminal className="h-5 w-5" />
          </div>
          <span className="font-mono text-xl font-bold tracking-tight text-neutral-900 group-hover:text-primary-600 transition-colors">aaub.ai</span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive 
                    ? 'text-primary-600 bg-primary-50 font-semibold' 
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                )
              }
            >
              {getLabel(item.label)}
            </NavLink>
          ))}
          
          <div className="flex items-center space-x-2 ml-6 pl-6 border-l border-neutral-200">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg text-neutral-500 hover:text-primary-600 hover:bg-primary-50 transition-all flex items-center gap-1 font-medium text-sm"
              aria-label="Switch Language"
            >
              <Globe className="h-5 w-5" />
              <span>{i18n.language === 'fr' ? 'EN' : 'FR'}</span>
            </button>

            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-all"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleLanguage}
            className="p-2 rounded-lg text-neutral-500 hover:text-primary-600 hover:bg-primary-50 transition-all flex items-center gap-1 font-medium text-sm"
          >
            <Globe className="h-5 w-5" />
            <span>{i18n.language === 'fr' ? 'EN' : 'FR'}</span>
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white shadow-xl">
          <div className="space-y-1 px-4 py-4">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'block rounded-lg px-4 py-3 text-base font-medium transition-all',
                    isActive 
                      ? 'bg-primary-50 text-primary-600 font-semibold' 
                      : 'text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900'
                  )
                }
              >
                {getLabel(item.label)}
              </NavLink>
            ))}
            <div className="flex items-center justify-center gap-4 pt-4 mt-4 border-t border-neutral-200">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
              >
                <Github className="h-6 w-6" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};