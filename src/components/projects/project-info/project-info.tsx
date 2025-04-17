import style from "./project-info.module.sass";
import { Params, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Project } from "../../../types/project-type.ts";
import { useEffect, useState } from "react";

export const ProjectInfo = () => {
  const projectId: Readonly<Params<string>> = useParams();
  const [proj, setProj] = useState<Project | undefined>(undefined);
  const [error, setError] = useState<boolean>(false);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const navigate = useNavigate();
  const isAuthorized = false;

  const handleProject = (project: Project) => {
    setProj(project);
  };

  const handleError = () => {
    setError((prevState) => !prevState);
  };

  const handleFavourite = (isFav: boolean) => {
    setIsFavourite(isFav);
  };

  const handlePreviousPage = () => {
    navigate(-1);
  };

  const getProject = async () => {
    await axios
      .get<Project>(`http://localhost:5140/api/Projects/${projectId}`)
      .then((response) => {
        handleProject(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке данных проекта:", error);
        handleError();
      });
  };

  const getIsFavouriteProject = async () => {
    //TODO
    handleFavourite(false);
  };

  const postToFavourites = async () => {
    //todo
    handleFavourite(true);
  };

  useEffect(() => {
    getProject();
    getIsFavouriteProject();
  }, []);

  return (
    <section className={style["project-info"]}>
      <div>
        <div className={style["project-info__header"]}>
          <button onClick={() => handlePreviousPage()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="16"
              viewBox="0 0 20 16"
              fill="none"
            >
              <path
                d="M0.292893 7.29289C-0.0976311 7.68342 -0.0976311 8.31658 0.292893 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538407 7.04738 0.538407 6.65685 0.928931L0.292893 7.29289ZM20 7L1 7L1 9L20 9L20 7Z"
                fill="#8C8C8C"
              />
            </svg>
            <span>Назад</span>
          </button>
          <div>
            <p>
              Прием заявок до <span>02.04.2024</span>
            </p>
            <button onClick={postToFavourites}>
              <svg
                className={`${style["project-info__favourite-button-icon"]} ${isAuthorized && isFavourite ? style["project-info__favourite-button-icon--checked"] : ""} `}
                width="21"
                height="24"
                viewBox="0 0 21 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 1H4C2.89543 1 2 1.89543 2 3V20.9893C2 21.9131 2.97218 22.5139 3.79845 22.1008C3.93173 22.0341 4.05194 21.9441 4.15334 21.8349L9.08776 16.5209C9.85912 15.6902 11.166 15.666 11.9676 16.4676L17.4358 21.9358C17.4785 21.9785 17.5253 22.0169 17.5755 22.0503C18.1844 22.4563 19 22.0198 19 21.288V3C19 1.89543 18.1046 1 17 1Z"
                  stroke="currentColor"
                  stroke-width="1.8"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className={style["project-info__info"]}>
          <div className={style["project-info__logo-container"]}>
            <div
              className={style["project-info__logo"]}
              style={{ backgroundImage: `url(${proj?.avatarImageBase64})` }}
            />
            <span>company name</span>
          </div>

          <div>
            <h2>
              {" "}
              Разработка веб-приложения для мониторинга оборудования на
              нефтеперерабатывающем заводе
            </h2>
            <ul className={style["project-info__stack-list"]}>
              <li>Node.js</li>
              <li>React</li>
              <li>Redux</li>
            </ul>

            <div>
              <h3>Описание задания:</h3>
              <p>
                {" "}
                Наша компания, занимающаяся добычей и переработкой нефти, ищет
                разработчика (или команду), способного создать веб-приложение
                для внутреннего использования. Цель — обеспечить в реальном
                времени отображение состояния оборудования на заводе, включая
                показания с датчиков, предупреждения о неисправностях и плановые
                работы.
              </p>
            </div>

            <div>
              <ul>
                <li>
                  {" "}
                  Разработка веб-интерфейса (десктопная версия, адаптивность
                  приветствуется);
                </li>
                <li>
                  {" "}
                  Разработка веб-интерфейса (десктопная версия, адаптивность
                  приветствуется);
                </li>
                <li>
                  Разработка на стекe: предпочтительно Python (FastAPI), React
                  или Vue.js.
                </li>
              </ul>
            </div>
            <h3>Основные требования:</h3>

            <div>
              <h3>Состав исполнителей:</h3>
              <p>
                {" "}
                Для реализации проекта мы рассматриваем как отдельных
                специалистов, так и слаженные команды. Предпочтение отдается
                кандидатам с опытом в разработке промышленных или технически
                сложных систем. Ориентировочный состав исполнителей:
              </p>
              <ul>
                <li>Frontend-разработчик — SPA на React или Vue</li>
                <li>Frontend-разработчик — SPA на React или Vue</li>
                <li>Frontend-разработчик — SPA на React или Vue</li>
              </ul>
            </div>

            <div>
              <h3>Ожидания от команды исполнителей:</h3>
              <ul>
                <li>Опыт в разработке web-интерфейсов и интеграции с API;</li>
                <li>Опыт в разработке web-интерфейсов и интеграции с API;</li>
                <li>Опыт в разработке web-интерфейсов и интеграции с API;</li>
              </ul>
            </div>

            <div>
              <h3>Формат результата:</h3>
              <p>
                {" "}
                Ожидаем, что итоговая работа будет представлена в следующем
                виде:
              </p>
              <ul>
                <li>
                  Исходный код и инструкции по развертыванию — на GitHub или
                  другом репозитории с доступом для нашей команды
                </li>
                <li>
                  Исходный код и инструкции по развертыванию — на GitHub или
                  другом репозитории с доступом для нашей команды
                </li>
                <li>
                  Исходный код и инструкции по развертыванию — на GitHub или
                  другом репозитории с доступом для нашей команды
                </li>
              </ul>
            </div>
            <div>
              <h3>Сроки выполнения:</h3>
              <span>2 недели</span>
            </div>
            <div>
              <h3>Бюджет проекта:</h3>
              <span> По договоренности</span>
            </div>

            <button>Откликнуться</button>
          </div>
        </div>
      </div>
    </section>
  );
};
