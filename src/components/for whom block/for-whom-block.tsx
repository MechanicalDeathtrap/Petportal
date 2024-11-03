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
          <Button text={"Создать проект"} style={"blue-button"} />
        </div>
        <div className={styles["for-whom__first-image"]}>
          <img
            src="/src/assets/img/man-with-headphones-city-working-laptop%201.png"
            alt="man-image"
          />
        </div>
      </div>
      <div className={styles["for-whom__second-block"]}>
        <div className={styles["for-whom__second-info"]}>
          <div>
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
          </div>
          <div>
            <h1>Для самых талантливых</h1>
            <p>
              Решайте актуальные для бизнеса задачи, проявите себя в реальной
              работе в бизнес-команде и открывайте для себя новые карьерные
              перспективы.
            </p>
          </div>
          <Button text={"Найти проект"} style={"white-button"} />
        </div>
      </div>
    </section>
  );
};
