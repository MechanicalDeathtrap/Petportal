import styles from "./main-banner.module.sass";

export const MainBanner = () => {
  return (
    <section className={styles["main-banner"]}>
      <div className={styles["main-banner__main-image-container_darkening"]}>
        <picture>
          <img
            className={styles["main-banner__main-image"]}
            src="../../../public/img/background.png"
            alt="banner-photo"
          />
        </picture>
      </div>
      <h1 className={styles["main-banner__main-heading"]}>
        <span className={styles["main-banner__main-heading_highlighted"]}>
          объединяем{" "}
        </span>
        талантливых разработчиков, помогаем им
        <span className={styles["main-banner__main-heading_highlighted"]}>
          {" "}
          развиваться
        </span>{" "}
        и
        <span className={styles["main-banner__main-heading_highlighted"]}>
          {" "}
          творить
        </span>
      </h1>
    </section>
  );
};
