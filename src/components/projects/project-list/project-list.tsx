import styles from "./project-list.module.sass";
import { ProjectCard } from "../project-card/project-card.tsx";
import { Project } from "../../../types/project-type.ts";
import { ProjectsDto } from "../../../types/projects-dto-type.ts";
import axios from "axios";
import { useEffect, useState } from "react";
import qs from "qs";
import { useFilterContext } from "../../../context/filter-context.tsx";
import { IsCommercialProjectFilter } from "../../filters/aside-filters.tsx";
import { SortDirection } from "../../filters/sort-dropdown.tsx";
import { API_BASE_URL, API_BASE_PATH } from "../../../config/api";


// import {tags} from "../../../data/tags.ts";


interface ProjectListProps {
  searchQuery: string;
  needToFetch: boolean;
  sort: string;
  sortDirection: SortDirection;
  setNeedToFetch: (arg0: boolean) => void;
}


export const ProjectList = ({
  searchQuery,
  needToFetch,
  sort,
  sortDirection,
  setNeedToFetch
}: ProjectListProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectCount, setProjectCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { filters, triggerFetch } = useFilterContext();
  const [isLoading, setIsLoading] = useState(false);

  const fetchProjects = async (nextPage: number) => {
    setIsLoading(true);
    try {
      const response = await axios.get<ProjectsDto>(
        `${API_BASE_URL}${API_BASE_PATH}/Projects/`,
        {
          params: {
            SearchElement: searchQuery || undefined,
            Page: nextPage || undefined,
            SortItem: sort || "date",
            // true = по возрастанию, false = по убыванию
            SortOrder: sortDirection === "asc",
            [`Filters.RoleId`]: filters.roleId || undefined,
            // [`Filters.Deadline`]: filters.terms || undefined,
            [`Filters.StateOfProject`]: filters.terms !== null && filters.terms !== undefined ? filters.terms : undefined,
            // "Не указано" (пустая строка) => фильтр не отправляем
            [`Filters.IsCommercial`]:
              filters.isCommercial === IsCommercialProjectFilter.YES
                ? true
                : filters.isCommercial === IsCommercialProjectFilter.NO
                  ? false
                  : undefined,
            ['Filters.Tags']: filters.tags || undefined
          },
                paramsSerializer: {
        serialize: (params) =>
          qs.stringify(params, { arrayFormat: "repeat" })
      },
          withCredentials: true,
        },
      );  

      if (!Array.isArray(response.data.projects)) {
        console.error("projects is not an array!", response.data.projects);
        return;
      }

      return response;
    } catch (error) {
      console.error("Ошибка при загрузке данных ПРОЕКТЫ:", error);
      return null;
    }  finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (needToFetch && !isLoading) {
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
    // при смене поиска/сортировки/фильтров список загружается заново с первой страницы
    setCurrentPage(1);
    fetchProjects(1).then((response) => {
      if (response) {
        setProjects(response.data.projects);
        setProjectCount(response.data.projectsCount);
      }
    });
  }, [searchQuery, sort, sortDirection, triggerFetch]);

  // useEffect(() => {  
  //   fetchProjects();
  // }, []);

  return (
    <div className={styles["project-list"]}>
      <h2>Проектов найдено: {`${projectCount}`}</h2>

      {isLoading && <div>Загрузка...</div>}

      {!isLoading && projects.length === 0 && (
        <div>По вашему запросу ничего не найдено</div>
      )}

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
