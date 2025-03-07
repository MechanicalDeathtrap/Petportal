import styles from "./project-list.module.sass"
import { ProjectCard } from "../project-card/project-card.tsx";
import { Project } from "../project-type.ts";
import axios from "axios";
import { useEffect, useState } from "react";

export const ProjectList = () =>{

  const [projects, setProjects] = useState<Project[]>([]);
  const [projectNumber, setProjectNumber] = useState(0);

  const fetchProjects = async () => {
    try {
      const response = await axios.get<Project[]>("http://localhost:5140/api/Projects/10/1");
      setProjects(response.data);
      setProjectNumber(response.data.length);
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return(
    <div className={styles["project-list"]}>
      <h2>Проектов найдено: {`${projectNumber}`}</h2>
      <ul> {projects.map((project) => (
          <li key={project.id} className={styles["project-list__project"]}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  )
}