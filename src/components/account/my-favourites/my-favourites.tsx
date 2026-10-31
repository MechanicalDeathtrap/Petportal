import { useEffect, useState } from "react";
import { EmptyStateMessage } from "../empty-state-message/empty-state-message.tsx";
import axios from "axios";
import { API_BASE_URL, API_BASE_PATH } from "../../../config/api";
import { Project } from "../../../types/project-type.ts";
import { ProjectCard } from "../../projects/project-card/project-card.tsx";
import style from "../my-projects/my-projects.module.sass";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const MyFavourites = () => {
  const { t } = useTranslation();
  const [favourites, setFavourites] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const response = await axios.get<Project[]>(
        `${API_BASE_URL}${API_BASE_PATH}/Favourites`,
        { withCredentials: true },
      );
      setFavourites(response.data ?? []);
    } catch (error) {
      console.error("Ошибка загрузки избранного:", error);
      setFavourites([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const removeFavourite = async (projectId: string) => {
    try {
      await axios.delete(
        `${API_BASE_URL}${API_BASE_PATH}/Favourites/${projectId}`,
        { withCredentials: true },
      );
      setFavourites((prev) => prev.filter((p) => p.id !== projectId));
    } catch (error) {
      console.error("Не удалось убрать из избранного:", error);
      alert(t("account.favourites.removeFailed"));
    }
  };

  if (loading) {
    return (
      <section>
        <p>{t("account.favourites.loading")}</p>
      </section>
    );
  }

  return (
    <section>
      {favourites.length === 0 && <EmptyStateMessage variant="favourites" />}
      {favourites.length > 0 && (
        <div className={style["my-project-list__container"]}>
          <h2>{t("account.favourites.count", { count: favourites.length })}</h2>
          <ul>
            {favourites.map((project) => (
              <li key={project.id}>
                <ProjectCard project={project} />
                <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                  <Link to={`/projects/${project.id}`}>{t("common.open")}</Link>
                  <button type="button" onClick={() => removeFavourite(project.id)}>
                    {t("account.favourites.remove")}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
