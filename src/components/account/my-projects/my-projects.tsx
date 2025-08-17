import style from "./my-projects.module.sass";
import { useEffect, useState } from "react";
import { ProjectCard } from "../../projects/project-card/project-card.tsx";
import { EmptyStateMessage } from "../empty-state-message/empty-state-message.tsx";
import axios from "axios";
import { Project } from "../../../types/project-type.ts";

export const MyProjects = () => {
  const [myProjects, setMyProjects] = useState<Project[]>([]);
  const [myProjectCount, setMyProjectCount] = useState(0);

  const handleMyProjectCount = (count: number) => setMyProjectCount(count);
  const handleMyProjects = (projects: Project[]) => setMyProjects(projects);

  const getProjects = async () => {
    await axios
      .get<Project[]>("/api/Users/MyProjects/")
      .then((response) => {
        const projects = response.data;
        handleMyProjects(projects);
        handleMyProjectCount(projects.length);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке данных МОИ ПРОЕКТЫ:", error);
      });
  };

  // фильтрация по старости
  const filterOldProjects = () => {
    //TODO
  };

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
            onClick={filterOldProjects}
            className={style["my-project-list__filter-old"]}
          >
            Сначала старые
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
            {myProjects.map((project) => (
              <li key={project.id}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
