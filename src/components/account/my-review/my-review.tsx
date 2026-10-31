import { useState } from "react";
import { useTranslation } from "react-i18next";
import { EmptyStateMessage } from "../empty-state-message/empty-state-message.tsx";
import style from "./my-review.module.sass";

export const MyReview = () => {
  const { t } = useTranslation();
  // API отзывов пока нет, поэтому отзывов у пользователя всегда ноль
  const [reviewCount] = useState(0);

  return (
    <>
      {reviewCount === 0 && <EmptyStateMessage variant="reviews" />}
      {reviewCount > 0 && (
        <section className={style["my-review"]}>
          <h3>{t("account.reviews.heading")}</h3>
          <div className={style["my-review__filters"]}>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="10"
                viewBox="0 0 15 10"
                fill="currentColor"
              >
                <rect
                  y="7.5"
                  width="15"
                  height="2.5"
                  rx="1.25"
                  fill="currentColor"
                />
                <rect
                  y="3.75"
                  width="11.5385"
                  height="2.5"
                  rx="1.25"
                  fill="currentColor"
                />
                <rect
                  width="8.07692"
                  height="2.5"
                  rx="1.25"
                  fill="currentColor"
                />
              </svg>
              {t("account.reviews.byDate")}
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
              {t("account.reviews.byRating")}
            </span>
          </div>
          <ul className={style["my-review__reviews-list"]} />
        </section>
      )}
    </>
  );
};
