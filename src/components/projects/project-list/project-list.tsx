import styles from "./project-list.module.sass";
import { ProjectCard } from "../project-card/project-card.tsx";
import { Project } from "../../../types/project-type.ts";
import { ProjectsDto } from "../../../types/projects-dto-type.ts";
import axios from "axios";
import { useEffect, useState } from "react";

interface ProjectListProps {
  searchQuery: string;
  needToFetch: boolean;
  setNeedToFetch: (arg0: boolean) => void;
}

let offset = 10;

export const ProjectList = ({
  searchQuery,
  needToFetch,
  setNeedToFetch,
}: ProjectListProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectCount, setProjectCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProjects = async (nextPage: number) => {
    try {
      const response = await axios.get<ProjectsDto>(
        "http://localhost:5140/api/Projects/",
        {
          params: {
            SearchElement: searchQuery || undefined,
            Page: nextPage || undefined,
          },
        },
      );

      return response;
    } catch (error) {
      console.error("Ошибка при загрузке данных ПРОЕКТЫ:", error);
      return null;
    }
  };

  useEffect(() => {
    if (needToFetch) {
      const nextPage = currentPage + 1;
      fetchProjects(nextPage).then((response) => {
        if (response) {
          setProjects([...projects, ...response.data.projects]);
          setCurrentPage(nextPage);
        }
      });
    }
    setNeedToFetch(false);
  }, [needToFetch]);

  useEffect(() => {
    fetchProjects().then((response) => {
      if (response) {
        setProjects(response.data.projects);
        setProjectCount(response.data.projectsCount);
      }
    });
  }, [searchQuery]);

  // useEffect(() => {
  //   fetchProjects();
  // }, []);

  return (
    <div className={styles["project-list"]}>
      <h2>Проектов найдено: {`${projectCount}`}</h2>
      <ul>
        {" "}
        {projects.map((project) => (
          <li key={project.id} className={styles["project-list__project"]}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
};
