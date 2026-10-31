import { useTranslation } from "react-i18next";
import styles from "./main-banner.module.sass";

export const MainBanner = () => {
  const { t } = useTranslation();
  return (
    <section className={styles["main-banner"]}>
      <div className={styles["main-banner__main-image-container_darkening"]}>
        <picture>
          <img
            className={styles["main-banner__main-image"]}
            src="/img/background.png"
            alt="banner-photo"
          />
        </picture>
      </div>
      <h1 className={styles["main-banner__main-heading"]}>
        <span className={styles["main-banner__main-heading_highlighted"]}>
          {t("home.banner.unite")}{" "}
        </span>
        {t("home.banner.talentedDevelopers")}
        <span className={styles["main-banner__main-heading_highlighted"]}>
          {" "}
          {t("home.banner.grow")}
        </span>{" "}
        {t("home.banner.and")}
        <span className={styles["main-banner__main-heading_highlighted"]}>
          {" "}
          {t("home.banner.create")}
        </span>
      </h1>
    </section>
  );
};
