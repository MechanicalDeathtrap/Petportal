import styles from "./project-list.module.sass";
import { ProjectCard } from "../project-card/project-card.tsx";
import { Project } from "../../../types/project-type.ts";
import { ProjectsDto } from "../../../types/projects-dto-type.ts";
import { ProjectFilters } from "../../catalogue/catalogue.tsx";
import axios from "axios";
import { useEffect, useState } from "react";
import qs from "qs";
import { useFilterContext } from "../../../context/filter-context.tsx";
import { IsCommercialProjectFilter } from "../../filters/aside-filters.tsx";

// import {tags} from "../../../data/tags.ts";


interface ProjectListProps {
  searchQuery: string;
  needToFetch: boolean;
  sort: string;
  setNeedToFetch: (arg0: boolean) => void;
}


export const ProjectList = ({
  searchQuery,
  needToFetch,
  sort,
  setNeedToFetch
}: ProjectListProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectCount, setProjectCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { filters, triggerFetch } = useFilterContext();

  const fetchProjects = async (nextPage: number) => {
    try {
      const response = await axios.get<ProjectsDto>(
        "http://localhost:5140/api/Projects/",
        {
          params: {
            SearchElement: searchQuery || undefined,
            Page: nextPage || undefined,
            SortItem: sort || undefined,
            SortOrtder: "asc",
            [`Filters.Role`]: filters.role || undefined,
            // [`Filters.Deadline`]: filters.terms || undefined,
            [`Filters.StateOfProject`]: filters.terms !== null && filters.terms !== undefined ? filters.terms : undefined,
            [`Filters.IsCommercial`]: filters.isCommercial  === IsCommercialProjectFilter.YES ? true : false || undefined,
            ['Filters.Tags']: filters.tags || undefined
          },
                paramsSerializer: {
        serialize: (params) =>
          qs.stringify(params, { arrayFormat: "repeat" })
      },
          withCredentials: true,
        },
      );  

      console.log(filters.role);
      if (!Array.isArray(response.data.projects)) {
        console.error("projects is not an array!", response.data.projects);
        return;
      }

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
    fetchProjects(0).then((response) => {
      if (response) {
        setProjects(response.data.projects);
        setProjectCount(response.data.projectsCount);
      }
    }); 
  }, [searchQuery, sort, triggerFetch]);

  // useEffect(() => {
  //   fetchProjects();
  // }, []);

  return (
    <div className={styles["project-list"]}>
      <h2>Проектов найдено: {`${projectCount}`}</h2>
      <ul>
        {Array.isArray(projects) &&
          projects.map((project) => (
            <li key={project.id} className={styles["project-list__project"]}>
              <ProjectCard project={project} />
            </li>
          ))}
      </ul>
    </div>
  );
};
