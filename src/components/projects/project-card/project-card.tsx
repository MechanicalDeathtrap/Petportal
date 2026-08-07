import styles from "../project-card/project-card.module.sass";
import { Link } from "react-router-dom";
import { Project } from "../../../types/project-type.ts";
import { formatDate } from "../../../utils/format-date.ts";
import { getStateLabel, StateOfProject } from "../../../types/project-type.ts";

interface ProjectCardProps {
  project: Project; // Используем интерфейс Project
  /** Если передан — на карточке появляется кнопка «В архив» (только у владельца). */
  onArchive?: (projectId: string) => void;
  /** Блокирует кнопку на время запроса. */
  isArchiving?: boolean;
}

/** Иконка «в архив»: стрелка, уходящая в коробку. */
const ArchiveIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M8 1V8M8 8L5.5 5.5M8 8L10.5 5.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1.5 9.5H4.5L5.5 11.5H10.5L11.5 9.5H14.5V14C14.5 14.2761 14.2761 14.5 14 14.5H2C1.72386 14.5 1.5 14.2761 1.5 14V9.5Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>
);

export const ProjectCard = ({ project, onArchive, isArchiving }: ProjectCardProps) => {
  const avatarUrl = project.avatarImageBase64 || "/img/blank-avatar.png";

  const archived = project.stateOfProject === StateOfProject.Archived;

  // Состояний два: идёт набор и архив. Legacy-значения считаем набором.
  const footerConfig = archived
    ? {
        text: getStateLabel(project.stateOfProject),
        className: styles["project-card--closed-stage-color"],
        textColorClass: "#4E4E4E",
      }
    : {
        text: getStateLabel(project.stateOfProject),
        className: styles["project-card--recruiting-stage-color"],
        textColorClass: "white",
      };

  const handleArchiveClick = (event: React.MouseEvent) => {
    // карточка обёрнута в ссылку — не даём перейти на страницу проекта
    event.preventDefault();
    event.stopPropagation();
    onArchive?.(project.id);
  };


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
                src={avatarUrl}//
                className={`${styles["project-card__company-logo-image"]}
                   ${styles["project-card__company-logo-image--rounded"]}`}
                alt="company-logo"
                onError={(e) => {
                  e.currentTarget.src = "/img/blank-avatar.png";
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

          {onArchive && !archived && (
            <button
              type="button"
              className={styles["project-card__archive-button"]}
              onClick={handleArchiveClick}
              disabled={isArchiving}
              title="Перевести проект в архив"
            >
              <ArchiveIcon />
              {isArchiving ? "Переносим..." : "В архив"}
            </button>
          )}
        </div>{" "}
      </div>
    </Link>
  );
};
