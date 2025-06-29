import styles from "../project-card/project-card.module.sass";
import { Link } from "react-router-dom";
import { Project } from "../../../types/project-type.ts";
import { formatDate } from "../../../utils/format-date.ts";
import { StateOfProject } from "../../../types/project-type.ts";

interface ProjectCardProps {
  project: Project; // Используем интерфейс Project
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const base64Image = project.avatarImageBase64
    ? `data:image/jpeg;base64,${project.avatarImageBase64}`
    : "public/img/blank-avatar.png"; // Запасной вариант


const getFooterConfig = () => {
  switch (project.stateOfProject) {
    case StateOfProject.Open:
      return {
        text: "Идёт набор",
        className: styles["project-card--recruiting-stage-color"],
        textColorClass: "white",
      };
    case StateOfProject.InProgress:
      return {
        text: "В процессе работы",
        className: styles["project-card--inprogress-stage-color"],
        textColorClass: "white",
      };  
    case StateOfProject.Closed:
      return {
        text: "Завершён",
        className: styles["project-card--closed-stage-color"],
        textColorClass: "#4E4E4E",  
      };
    default:
      return {
        text: "",
        className: "",
        textColorClass: "white",
      };
  }
};  

  const footerConfig = getFooterConfig();


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
            {project.tags?.slice(0, 3).map((tag) => <li key={tag.id}>{tag.name}</li>)}
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
              <span>{formatDate(project.deadline)}</span>
            </li>
            {project.isBusinessProject && (
              <li>
                Бюджет:
                <span>{project.budget}</span>
              </li>
            )}
            <li>  
              {" "}
              Приём заявок:
              <span>{formatDate(project.applyingDeadline)}</span>
            </li>
          </ul>
        </div>

        <div
          className={`${footerConfig.className} ${styles["project-card__footer"]}`}
        >
          <span style={{ color: footerConfig.textColorClass }}>
            {footerConfig.text}
          </span>
        </div>{" "}
      </div>
    </Link>
  );
};
