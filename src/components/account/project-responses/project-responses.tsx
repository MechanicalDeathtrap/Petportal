import style from "./project-responses.module.sass"
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getRoleLabel } from "../../../data/role-categories.ts";
import { EmptyStateMessage } from "../empty-state-message/empty-state-message.tsx";
import axios from "axios";
import { respond } from "../../../types/respond-type.ts";
import { Project } from "../../../types/project-type.ts";
import { API_BASE_URL, API_BASE_PATH } from "../../../config/api";

interface ResponseWithProject extends respond {
  projectName: string;
}


export const ProjectResponses = () => {
  const { t } = useTranslation();
  const [responses, setResponses] = useState<ResponseWithProject[]>([]);
  const [loading, setLoading] = useState(true);
  // ошибка пока не выводится текстом, только как пустое состояние
  const [error, setError] = useState<
    | "account.responses.userLoadFailed"
    | "account.responses.authRequired"
    | "account.responses.userNotFound"
    | "account.responses.loadFailed"
    | null
  >(null);

  useEffect(() => {
    const fetchUserIdAndResponses = async () => {
      try {
        setLoading(true);
        setError(null);

        const userResponse = await axios.get(
          `${API_BASE_URL}${API_BASE_PATH}/Authorization/me`, 
          {
            withCredentials: true,
          }
        );
        const userId = userResponse.data.id;

        if (!userId) {
          setError("account.responses.userLoadFailed");
          setResponses([]);
          setLoading(false);
          return;
        }

        const projectsResponse = await axios.get<Project[]>(
          `${API_BASE_URL}${API_BASE_PATH}/Users/Projects/${userId}`
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
              `${API_BASE_URL}${API_BASE_PATH}/Responds/RespondsByProject/${project.id}`
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
          setError("account.responses.authRequired");
        } else if (err.response?.status === 404) {
          setError("account.responses.userNotFound");
        } else {
          console.error("Ошибка при загрузке данных:", err);
          setError("account.responses.loadFailed");
        }
        setResponses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserIdAndResponses();
  }, []);

  // статусы приходят с бэкенда на английском; неизвестные показываем как есть
  const statusLabel = (status: string) =>
    status === "Pending"
      ? t("account.responses.statusPending")
      : status === "Accepted"
        ? t("account.responses.statusAccepted")
        : status;

  if (error) {
    return (
      <section className={style["project-responses"]}>
        <EmptyStateMessage variant="error" />
      </section>
    );
  }

  if (loading) {
    return (
      <section className={style["project-responses"]}>
        <p>{t("account.responses.loading")}</p>
      </section>
    );
  }

  return (
    <section className={style["project-responses"]}>
      {responses.length === 0 ? (
        <EmptyStateMessage variant="responses" />
      ) : (
        <div className={style["project-responses__container"]}>
          <h2>{t("account.responses.count", { count: responses.length })}</h2>

          <ul className={style["project-responses__list"]}>
            {responses.map((response) => (
              <li key={response.id} className={style["project-responses__item"]}>
                <div className={style["project-responses__header"]}>
                  <strong>{response.projectName}</strong>
                  {response.role && (
                    <span>{t("account.responses.role", { role: getRoleLabel(response.role) })}</span>
                  )}
                  {response.status && (
                    <span>{t("account.responses.status", { status: statusLabel(response.status) })}</span>
                  )}
                </div>
                <div className={style["project-responses__comment"]}>
                  <p>{response.comment || t("account.responses.noComment")}</p>
                </div>
                <div className={style["project-responses__meta"]}>
                  <small>{t("account.responses.responseId", { id: response.id.substring(0, 8) })}</small>
                  {response.status !== "Accepted" && (
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await axios.post(
                            `${API_BASE_URL}${API_BASE_PATH}/Responds/Accept/${response.id}`,
                            null,
                            { withCredentials: true },
                          );
                          setResponses((prev) =>
                            prev.map((r) =>
                              r.id === response.id
                                ? { ...r, status: "Accepted" }
                                : r,
                            ),
                          );
                        } catch (err) {
                          console.error("Не удалось принять отклик", err);
                          alert(t("account.responses.acceptFailed"));
                        }
                      }}
                    >
                      {t("account.responses.accept")}
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}