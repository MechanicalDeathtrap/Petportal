import i18n, { type ParseKeys } from "i18next";
import { initReactI18next } from "react-i18next";
import { ru } from "./locales/ru.ts";
import { en } from "./locales/en.ts";

export const LANGUAGES = ["ru", "en"] as const;
export type Language = (typeof LANGUAGES)[number];

const STORAGE_KEY = "language";

const isLanguage = (value: unknown): value is Language =>
  LANGUAGES.includes(value as Language);

/**
 * Язык при первом заходе: сохранённый выбор пользователя,
 * иначе русский, если он есть среди языков браузера, иначе английский.
 */
const detectLanguage = (): Language => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLanguage(saved)) return saved;
  } catch {
    // localStorage может быть недоступен (приватный режим, запрет cookies)
  }

  const browserLanguages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];
  return browserLanguages.some((lang) => lang?.toLowerCase().startsWith("ru"))
    ? "ru"
    : "en";
};

i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: ru },
    en: { translation: en },
  },
  lng: detectLanguage(),
  fallbackLng: "ru",
  interpolation: { escapeValue: false },
});

document.documentElement.lang = i18n.language;
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
});

export const getLanguage = (): Language =>
  isLanguage(i18n.resolvedLanguage) ? i18n.resolvedLanguage : "ru";

/** Переключает язык и запоминает выбор пользователя. */
export const setLanguage = (lng: Language) => {
  try {
    localStorage.setItem(STORAGE_KEY, lng);
  } catch {
    // выбор просто не сохранится между визитами
  }
  void i18n.changeLanguage(lng);
};

/**
 * Сообщение для yup-схем, объявленных вне компонентов:
 * yup вызывает функцию при валидации, поэтому текст берётся на текущем языке.
 */
export const lazyT = (key: ParseKeys) => () => i18n.t(key);

/** Локаль для Intl/toLocaleString по текущему языку интерфейса. */
export const getDateLocale = (): string =>
  getLanguage() === "en" ? "en-GB" : "ru-RU";

export default i18n;
