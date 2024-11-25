import { Button } from "../button/button.tsx";
import styles from "./for-whom-block.module.sass";

export const ForWhomBlock = () => {
  return (
    <section className={styles["for-whom"]}>
      {/*<img src="/src/assets/img/блюрные-кружки.png" alt="" />*/}
      <div className={styles["for-whom__first-block"]}>
        <div className={styles["for-whom__first-info"]}>
          <div>
            <h1 className={styles["for-whom__first-info-heading"]}>
              Для больших и маленьких
            </h1>
            <p>
              Вы крупная компания, которой нужно быстро <br /> воплотить идею
              или скромный энтузиаст,
              <br /> который хочет осуществить свою мечту?
              <br /> Место найдется для каждого.
            </p>
          </div>
          {/*TODO линк к проектам*/}
          <Button link={"/"} text={"Создать проект"} style={"blue-button"} />
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
                Для самых талантливых
              </h1>
              <p>
                Решайте актуальные для бизнеса задачи, проявите себя в реальной
                работе в бизнес-команде и открывайте для себя новые карьерные
                перспективы.
              </p>
            </div>
            <div className={styles["for-whom__second-info-button"]}>
              <Button
                link={"/projects"}
                text={"Найти проект"}
                style={"white-button"}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
