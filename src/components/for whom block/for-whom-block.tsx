import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { Button } from "../button/button.tsx";
import styles from "./for-whom-block.module.sass";

export const ForWhomBlock = () => {
  const { t } = useTranslation();
  return (
    <section className={styles["for-whom"]}>
      {/*<img src="/src/assets/img/блюрные-кружки.png" alt="" />*/}
      <div className={styles["for-whom__first-block"]}>
        <div className={styles["for-whom__first-info"]}>
          <div>
            <h1 className={styles["for-whom__first-info-heading"]}>
              {t("home.forWhom.bigAndSmallHeading")}
            </h1>
            <p>
              <Trans i18nKey="home.forWhom.bigAndSmallText" />
            </p>
          </div>
          {/*TODO линк к проектам*/}
          <Link to="/">
            <Button
              type="button"
              text={t("home.forWhom.createProject")}
              style={"blue-button"}
            />
          </Link>
        </div>
        <div className={styles["for-whom__first-image"]}>
          <img
            src="/img/man-with-headphones-city-working-laptop.png"
            alt="man-image"
          />
        </div>
      </div>
      <div className={styles["for-whom__second-block"]}>
        <div className={styles["for-whom__second-info"]}>
          <div className={styles["for-whom__second-info-images"]}>
            <img
              className={`${styles["for-whom__second-info-image"]} ${styles["first-image"]}`}
              src="/img/medium-shot-woman-with-laptop.png"
              alt="woman-with-phone"
            />
            <img
              className={`${styles["for-whom__second-info-image"]} ${styles["second-image"]}`}
              src="/img/medium-shot-man.png"
              alt="man-smiling"
            />
            <img
              className={`${styles["for-whom__second-info-image"]} ${styles["third-image"]}`}
              src="/img/medium-hot-woman-with-laptop.png"
              alt="woman-with-laptop"
            />
            <img
              className={`${styles["for-whom__second-info-image"]} ${styles["fourth-image"]}`}
              src="/img/young-woman-meditating-next-to-sea-while-wearing-headphones.png"
              alt="woman-meditating"
            />
          </div>
          <div>
            <div>
              <h1 className={styles["for-whom__second-info-heading"]}>
                {t("home.forWhom.talentedHeading")}
              </h1>
              <p>{t("home.forWhom.talentedText")}</p>
            </div>
            <div className={styles["for-whom__second-info-button"]}>
              <Link to="/projects">
                <Button
                  type="button"
                  text={t("home.forWhom.findProject")}
                  style={"white-button"}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
