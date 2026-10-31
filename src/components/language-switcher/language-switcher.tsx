import { useTranslation } from "react-i18next";
import { LANGUAGES, getLanguage, setLanguage } from "../../i18n/index.ts";
import styles from "./language-switcher.module.sass";

export const LanguageSwitcher = () => {
  // useTranslation подписывает компонент на смену языка
  const { t } = useTranslation();
  const current = getLanguage();

  return (
    <div
      className={styles["language-switcher"]}
      role="group"
      aria-label={t("language.switcherLabel")}
    >
      {LANGUAGES.map((lng) => (
        <button
          key={lng}
          type="button"
          lang={lng}
          title={t(`language.${lng}`)}
          aria-pressed={lng === current}
          className={`${styles["language-switcher__option"]} ${
            lng === current ? styles["language-switcher__option--active"] : ""
          }`}
          onClick={() => setLanguage(lng)}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  );
};
