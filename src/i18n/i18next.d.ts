import "i18next";
import type { ru } from "./locales/ru.ts";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: typeof ru;
    };
  }
}
