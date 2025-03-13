import styles from "../project-card/project-card.module.sass";
import { Link } from "react-router-dom";

export const ProjectCard = () => {
  const json = {
    isBusinessProject: true,
  };

  return (
    <Link to={"/"}>
      <div className={styles["project-card"]}>
        {/*TODO достать всё из бэка */}
        <div
          className={`${styles["project-card__header"]} ${styles["margin-sides"]}`}
        >
          <h6 className={styles["project-card__company-logo"]}>
            <picture>
              <img
                src="/img/medium-shot-woman-with-laptop.png"
                alt="company-logo"
                className={`${styles["project-card__company-logo-image"]}
                   ${json.isBusinessProject ? styles["project-card__company-logo-image--rounded"] : ""}`}
              />
            </picture>
            ОАО Татнефть
          </h6>

          <ul className={styles["project-card__tech-stack"]}>
            <li>Node.js</li>
            <li>React</li>
            <li>Redux</li>
          </ul>
        </div>
        <div
          className={`${styles["project-card__main-info"]} ${styles["margin-sides"]}`}
        >
          <h2>
            Составление документации для рабочей API, а также разработка сайта
            для блаблаблаблаблаблаблабалбалабла типа много текста проверим css{" "}
          </h2>
          <ul className={styles["project-card__main-info-list"]}>
            <li>
              {" "}
              Сроки работы:
              <span>20 минут</span>
            </li>
            <li>
              Бюджет:
              <span>1 337 000 р</span>
            </li>
            <li>
              {" "}
              Приём заявок:
              <span>1 неделя</span>
            </li>
          </ul>
        </div>
        <div
          className={`${styles["project-card--recruiting-stage-color"]} ${styles["project-card__footer"]}`}
        >
          <span>Идёт набор</span>
        </div>
      </div>
    </Link>
  );
};
