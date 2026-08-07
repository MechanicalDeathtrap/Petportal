import style from "./my-projects.module.sass";
import { useEffect, useMemo, useState } from "react";
import { ProjectCard } from "../../projects/project-card/project-card.tsx";
import { EmptyStateMessage } from "../empty-state-message/empty-state-message.tsx";
import axios from "axios";
import { Project, StateOfProject } from "../../../types/project-type.ts";
import { API_BASE_URL, API_BASE_PATH } from "../../../config/api";

export const MyProjects = () => {
  const [myProjects, setMyProjects] = useState<Project[]>([]);
  const [myProjectCount, setMyProjectCount] = useState(0);
  const [archivingId, setArchivingId] = useState<string | null>(null);
  // по умолчанию сначала новые
  const [oldestFirst, setOldestFirst] = useState(false);

  const handleMyProjectCount = (count: number) => setMyProjectCount(count);
  const handleMyProjects = (projects: Project[]) => setMyProjects(projects);

  const archiveProject = async (projectId: string) => {
    if (!window.confirm("Перевести проект в архив? Вернуть его обратно нельзя.")) {
      return;
    }

    setArchivingId(projectId);
    try {
      await axios.post(
        `${API_BASE_URL}${API_BASE_PATH}/Projects/${projectId}/archive`,
        null,
        { withCredentials: true },
      );
      setMyProjects((prev) =>
        prev.map((project) =>
          project.id === projectId
            ? { ...project, stateOfProject: StateOfProject.Archived }
            : project,
        ),
      );
    } catch (error) {
      console.error("Ошибка при переводе проекта в архив:", error);
      alert("Не удалось перевести проект в архив. Попробуйте ещё раз.");
    } finally {
      setArchivingId(null);
    }
  };

  const getProjects = async () => {
    try {
      const userResponse = await axios.get(
        `${API_BASE_URL}${API_BASE_PATH}/Authorization/me`,
        { withCredentials: true },
      );
      const userId = userResponse.data.id;
      if (!userId) {
        console.error("Не удалось получить id пользователя");
        return;
      }

      const response = await axios.get<Project[]>(
        `${API_BASE_URL}${API_BASE_PATH}/Users/Projects/${userId}`,
        { withCredentials: true },
      );
      const projects = response.data;
      handleMyProjects(projects);
      handleMyProjectCount(projects.length);
    } catch (error) {
      console.error("Ошибка при загрузке данных МОИ ПРОЕКТЫ:", error);
    }
  };

  const sortedProjects = useMemo(() => {
    const timestamp = (project: Project): number | null => {
      if (!project.createdDate) return null;
      const parsed = new Date(project.createdDate).getTime();
      return Number.isNaN(parsed) ? null : parsed;
    };

    return [...myProjects].sort((a, b) => {
      const aTime = timestamp(a);
      const bTime = timestamp(b);

      // проекты без даты публикации всегда в конце списка.
      // Сравнивать их через ±Infinity нельзя: Infinity - Infinity === NaN,
      // а компаратор, возвращающий NaN, оставляет массив неотсортированным
      if (aTime === null && bTime === null) return 0;
      if (aTime === null) return 1;
      if (bTime === null) return -1;

      return oldestFirst ? aTime - bTime : bTime - aTime;
    });
  }, [myProjects, oldestFirst]);

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <section>
      {myProjectCount === 0 && <EmptyStateMessage heading="Проекты" />}
      {myProjectCount > 0 && (
        <div className={style["my-project-list__container"]}>
          <h2>Мои проекты: {myProjectCount}</h2>
          <button
            type="button"
            onClick={() => setOldestFirst((prev) => !prev)}
            className={`${style["my-project-list__filter-old"]} ${oldestFirst ? style["my-project-list__filter-old--reversed"] : ""}`}
            title="Переключить порядок сортировки"
          >
            {oldestFirst ? "Сначала старые" : "Сначала новые"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="7"
              height="10"
              viewBox="0 0 7 10"
              fill="none"
            >
              <path
                d="M0.15537 6.16511C-0.05179 6.38257 -0.05179 6.73517 0.15537 6.95262L2.75047 9.67418C3.16487 10.1087 3.83632 10.1086 4.2505 9.67384L6.8446 6.95061C7.0518 6.73316 7.0518 6.38056 6.8446 6.1631C6.63746 5.94563 6.30157 5.94563 6.09443 6.1631L3.87414 8.49387C3.667 8.71138 3.33111 8.71132 3.12397 8.49387L0.905549 6.16511C0.698395 5.94764 0.362524 5.94764 0.15537 6.16511Z"
                fill="#0F0F0F"
              />
              <path
                d="M0.15537 3.83489C-0.05179 3.61743 -0.05179 3.26483 0.15537 3.04738L2.75047 0.325821C3.16487 -0.108746 3.83632 -0.108579 4.2505 0.326156L6.8446 3.04939C7.0518 3.26684 7.0518 3.61944 6.8446 3.8369C6.63746 4.05437 6.30157 4.05437 6.09443 3.8369L3.87414 1.50613C3.667 1.28862 3.33111 1.28868 3.12397 1.50613L0.905549 3.83489C0.698395 4.05236 0.362524 4.05236 0.15537 3.83489Z"
                fill="#0F0F0F"
              />
            </svg>
          </button>
          <ul>
            {" "}
            {sortedProjects.map((project) => (
              <li key={project.id}>
                <ProjectCard
                  project={project}
                  onArchive={archiveProject}
                  isArchiving={archivingId === project.id}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
