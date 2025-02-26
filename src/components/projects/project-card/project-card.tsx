import styles from "../project-card/project-card.module.sass";
import { Link } from "react-router-dom";
import { Project } from "../project";

interface ProjectCardProps {
  project: Project; // Используем интерфейс Project
} 

export const ProjectCard = ({ project }: ProjectCardProps) =>{
  return(
    <Link to={'/'} >
      <div className={styles["project-card"]}>{/*TODO достать всё из бэка */}
        <div className={`${styles["project-card__header"]} ${styles["margin-sides"]}`}>
          <h6 className={styles["project-card__company-logo"]}>
            <picture>
              <img src="/img/Tatneft_Logo.svg" alt="company-logo" />
            </picture>
            ОАО Татнефть
          </h6>

          <ul className={styles["project-card__tech-stack"]}>
            <li>Node.js</li>
            <li>React</li>
            <li>Redux</li>
          </ul>
        </div>
        <div className={`${styles["project-card__main-info"]} ${styles["margin-sides"]}`}>
          <h2>{project.name}</h2>
          <ul className={styles["project-card__main-info-list"]}>
            <li> Сроки работы:
              <span>{project.deadline}</span>
            </li>
            <li>Бюджет:
              <span>1 337 000 р</span>
            </li>
            <li> Приём заявок:
              <span>{project.applyingDeadline}</span>
            </li>
          </ul>
        </div>
        <div className={`${styles["project-card--recruiting-stage-color"]} ${styles["project-card__footer"]}`}><span>Идёт набор</span></div>
      </div>
    </Link>
  )
}