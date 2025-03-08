import styles from "./project-list.module.sass";
import { ProjectCard } from "../project-card/project-card.tsx";

export const ProjectList = () => {
  const projectNumber = 0;

  return (
    <div className={styles["project-list"]}>
      <h2>Проектов найдено: {`${projectNumber}`}</h2>
      <ul>
        {" "}
        {/*TODO map*/}
        <li className={styles["project-list__project"]}>
          <ProjectCard />
        </li>
        <li className={styles["project-list__project"]}>
          <ProjectCard />
        </li>
        <li className={styles["project-list__project"]}>
          <ProjectCard />
        </li>
        <li className={styles["project-list__project"]}>
          <ProjectCard />
        </li>
        <li className={styles["project-list__project"]}>
          <ProjectCard />
        </li>
        <li className={styles["project-list__project"]}>
          <ProjectCard />
        </li>
        <li className={styles["project-list__project"]}>
          <ProjectCard />
        </li>
        <li className={styles["project-list__project"]}>
          <ProjectCard />
        </li>
        <li className={styles["project-list__project"]}>
          <ProjectCard />
        </li>
      </ul>
    </div>
  );
};
