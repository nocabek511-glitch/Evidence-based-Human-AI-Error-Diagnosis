import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  languageStorageKey,
  translations,
  type Language,
  type TranslationTree,
} from './translations';

type LanguageContextValue = {
  language: Language;
  isEnglish: boolean;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
  tr: <T = unknown>(key: string) => T;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'zh';
  const stored = window.localStorage.getItem(languageStorageKey);
  return stored === 'en' || stored === 'zh' ? stored : 'zh';
};

const readPath = (source: unknown, key: string): unknown =>
  key.split('.').reduce<unknown>((current, part) => {
    if (current && typeof current === 'object' && part in current) {
      return (current as Record<string, unknown>)[part];
    }
    return undefined;
  }, source);

const format = (
  value: string,
  replacements?: Record<string, string | number>,
) => {
  if (!replacements) return value;
  return Object.entries(replacements).reduce(
    (text, [name, replacement]) =>
      text.replaceAll(`{${name}}`, String(replacement)),
    value,
  );
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(languageStorageKey, nextLanguage);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((current) => {
      const next = current === 'zh' ? 'en' : 'zh';
      window.localStorage.setItem(languageStorageKey, next);
      return next;
    });
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.documentElement.classList.toggle('lang-zh', language === 'zh');
    document.documentElement.classList.toggle('lang-en', language === 'en');
  }, [language]);

  const dictionary = translations[language] as TranslationTree;
  const fallback = translations.zh as TranslationTree;

  const tr = useCallback(
    <T = unknown,>(key: string): T => {
      const value = readPath(dictionary, key) ?? readPath(fallback, key);
      return value as T;
    },
    [dictionary, fallback],
  );

  const t = useCallback(
    (key: string, replacements?: Record<string, string | number>) => {
      const value = tr<string>(key);
      return typeof value === 'string' ? format(value, replacements) : key;
    },
    [tr],
  );

  const value = useMemo(
    () => ({
      language,
      isEnglish: language === 'en',
      setLanguage,
      toggleLanguage,
      t,
      tr,
    }),
    [language, setLanguage, t, toggleLanguage, tr],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) {
    throw new Error('useLanguage must be used inside LanguageProvider.');
  }
  return value;
}
