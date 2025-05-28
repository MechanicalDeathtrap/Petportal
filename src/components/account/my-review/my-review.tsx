import { useEffect, useState } from "react";
import { EmptyStateMessage } from "../empty-state-message/empty-state-message.tsx";
import style from "./my-review.module.sass";

export const MyReview = () => {
  const [reviewCount, setReviewCount] = useState(0);
  const imageUrlFromBackend = false;

  const handleReviewCount = (count: number) => setReviewCount(count);

  // имитация сервера, заменить any
  const getReview = async (value: any) => {
    console.log(value);
    handleReviewCount(1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU");
  };

  useEffect(() => {
    // заменить на нормальный value
    getReview(true);
  }, []);

  return (
    <>
      {reviewCount === 0 && <EmptyStateMessage heading="Отзывы" />}
      {reviewCount > 0 && (
        <section className={style["my-review"]}>
          <h3>Отзывы</h3>
          <div className={style["my-review__filters"]}>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="10"
                viewBox="0 0 15 10"
                fill="currentColor"
              >
                <rect y="7.5" width="15" height="2.5" rx="1.25" fill="currentColor" />
                <rect
                  y="3.75"
                  width="11.5385"
                  height="2.5"
                  rx="1.25"
                  fill="currentColor"
                />
                <rect width="8.07692" height="2.5" rx="1.25" fill="currentColor" />
              </svg>
              По дате
            </span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="10"
                viewBox="0 0 15 10"
                fill="currentColor"
              >
                <rect
                  width="15"
                  height="2.5"
                  rx="1.25"
                  transform="matrix(1 0 0 -1 0 2.5)"
                  fill="currentColor"
                />
                <rect
                  width="11.5385"
                  height="2.5"
                  rx="1.25"
                  transform="matrix(1 0 0 -1 0 6.25)"
                  fill="currentColor"
                />
                <rect
                  width="8.07692"
                  height="2.5"
                  rx="1.25"
                  transform="matrix(1 0 0 -1 0 10)"
                  fill="currentColor"
                />
              </svg>
              По рейтингу
            </span>
          </div>
          <ul className={style["my-review__reviews-list"]}>
            <li className={style["my-review__review-container"]}>
              <div
                className={style["my-review__avatar"]}
                style={{
                  backgroundImage: `url(${imageUrlFromBackend || "/img/blank-avatar.png"})`,
                }}
              />
              <div className={style["my-review__review-info"]}>
                <h4>Name</h4>
                <div>
                  <ul>
                    <li>
                      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="currentColor">
                        <path
                          d="M7.54488 1.07953C7.83592 0.141166 9.16408 0.141165 9.45512 1.07953L10.6391 4.89704C10.7689 5.31555 11.1561 5.60081 11.5942 5.60081H15.5212C16.4786 5.60081 16.8887 6.81667 16.1268 7.39654L12.8711 9.87464C12.5368 10.1291 12.3971 10.5653 12.5216 10.9666L13.7461 14.9147C14.0344 15.8443 12.9598 16.5961 12.1853 16.0067L9.10566 13.6626C8.74782 13.3902 8.25218 13.3902 7.89434 13.6626L4.81466 16.0067C4.04023 16.5961 2.96558 15.8443 3.25389 14.9147L4.4784 10.9666C4.60285 10.5653 4.46324 10.1291 4.12894 9.87464L0.873163 7.39654C0.111315 6.81666 0.521398 5.60081 1.47882 5.60081H5.40576C5.84394 5.60081 6.23108 5.31555 6.36088 4.89704L7.54488 1.07953Z"
                          fill="#D9D9D9" />
                      </svg>
                    </li>
                  </ul>
                  <span>22.01.2024</span>
                </div>
                <p>Ахуенный челик круто выполняет обязанности пиздеть не мешки воротить как говориться рот я его того
                  суда сюда камыш норма права государство организация публичной пвласти демократия автократия
                  суверенитет образование детка ты выполнила 5 5 5 5 7 восемь</p>
              </div>
            </li>
          </ul>
        </section>
      )}
    </>
  );
};
