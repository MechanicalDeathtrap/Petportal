import styles from "../project-card/project-card.module.sass";
import { Link } from "react-router-dom";
import { Project } from "../../../types/project-type.ts";

interface ProjectCardProps {
  project: Project; // Используем интерфейс Project
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const base64Image = project.avatarImageBase64
    ? `data:image/jpeg;base64,${project.avatarImageBase64}`
    : "public/img/blank-avatar.png"; // Запасной вариант

  return (
    <Link to={`/projects/${project.id}`}>
      <div className={styles["project-card"]}>
        {/*TODO достать всё из бэка */}
        <div
          className={`${styles["project-card__header"]} ${styles["margin-sides"]}`}
        >
          <h6 className={styles["project-card__company-logo"]}>
            <picture className={styles["project-card__header"]}>
              <img
                src={base64Image}
                className={`${styles["project-card__company-logo-image"]}
                   ${project.isBusinessProject ? styles["project-card__company-logo-image--rounded"] : ""}`}
                alt="company-logo"
                onError={(e) => {
                  e.currentTarget.src = "public/img/blank-avatar.png";
                }}
              />
            </picture>
            {project.ownerName}
          </h6>

          <ul className={styles["project-card__tech-stack"]}>
            {project.tags?.slice(0, 3).map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
        </div>
        <div
          className={`${styles["project-card__main-info"]} ${styles["margin-sides"]}`}
        >
          <h2>{project.name}</h2>
          <ul className={styles["project-card__main-info-list"]}>
            <li>
              {" "}
              Сроки работы:
              <span>{project.deadline}</span>
            </li>
            <li>
              Бюджет:
              <span>{project.budget}</span> {/* {сделать форматирование} */}
            </li>
            <li>
              {" "}
              Приём заявок:
              <span>{project.applyingDeadline}</span>
            </li>
          </ul>
        </div>
        <div
          className={`${styles["project-card--recruiting-stage-color"]} ${styles["project-card__footer"]}`}
        >
          <span>Идёт набор</span>
        </div>{" "}
        {/* поменять в зависимости от state */}
      </div>
    </Link>
  );
};
