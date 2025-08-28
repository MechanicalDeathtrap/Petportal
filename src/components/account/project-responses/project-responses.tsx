import style from "./project-responses.module.sass"
import { useEffect, useState } from "react";
import { EmptyStateMessage } from "../empty-state-message/empty-state-message.tsx";
import axios from "axios";
import { respond } from "../../../types/respond-type.ts";
import { Project } from "../../../types/project-type.ts";

interface ResponseWithProject extends respond {
  projectName: string;
}


export const ProjectResponses = () => {
  const [responses, setResponses] = useState<ResponseWithProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserIdAndResponses = async () => {
      try {
        setLoading(true);
        setError(null);

        const userResponse = await axios.get(
          "http://localhost:5140/api/Authorization/me", 
          {
            withCredentials: true,
          }
        );
        const userId = userResponse.data.id;

        if (!userId) {
          setError("Не удалось получить данные пользователя");
          setResponses([]);
          setLoading(false);
          return;
        }

        const projectsResponse = await axios.get<Project[]>(
          `http://localhost:5140/api/Users/Projects/${userId}`
        );
        const myProjects = projectsResponse.data;

        if (myProjects.length === 0) {
          setResponses([]);
          setLoading(false);
          return;
        }

        const responsesPromises = myProjects.map((project) =>
          axios
            .get<respond[]>(
              `http://localhost:5140/api/Responds/RespondsByProject/${project.id}`
            )
            .then((res) => {
              return res.data.map((response) => ({
                ...response,
                projectName: project.name,
              }));
            })
            .catch((err) => {
              console.warn(`Нет откликов для проекта ${project.id}`, err);
              return [];
            })
        );

        const responsesArrays = await Promise.all(responsesPromises);
        const allResponses = responsesArrays.flat();

        setResponses(allResponses);
      } catch (err: any) {
        if (err.response?.status === 401) {
          setError("Требуется авторизация");
        } else if (err.response?.status === 404) {
          setError("Пользователь не найден");
        } else {
          console.error("Ошибка при загрузке данных:", err);
          setError("Не удалось загрузить отклики");
        }
        setResponses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserIdAndResponses();
  }, []);

  if (error) {
    return (
      <section className={style["project-responses"]}>
        <EmptyStateMessage heading="Ошибка" />
      </section>
    );
  }

  if (loading) {
    return (
      <section className={style["project-responses"]}>
        <p>Загрузка откликов...</p>
      </section>
    );
  }

  return (
    <section className={style["project-responses"]}>
      {responses.length === 0 ? (
        <EmptyStateMessage heading="Отклики на проекты" />
      ) : (
        <div className={style["project-responses__container"]}>
          <h2>Отклики на ваши проекты: {responses.length}</h2>

          <ul className={style["project-responses__list"]}>
            {responses.map((response) => (
              <li key={response.id} className={style["project-responses__item"]}>
                <div className={style["project-responses__header"]}>
                  <strong>{response.projectName}</strong>
                  {response.role && <span>Роль: {response.role}</span>}
                </div>
                <div className={style["project-responses__comment"]}>
                  <p>{response.comment || "Без комментария"}</p>
                </div>
                <div className={style["project-responses__meta"]}>
                  <small>Отклик ID: {response.id.substring(0, 8)}...</small>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}