import styles from "./partners-news-list-item.module.sass";
import { Link } from "react-router-dom";

export const PartnersNewsListItem = () => {
  return (
    <div className={styles["partner-news-item"]}>
      <span className={styles["partner-news-item__date"]}>
        29 Ноября, 2024, Яндекс
      </span>
      <div>
        <div className={styles["partner-news-item__main-info"]}>
          <h6>Всё ещё не хватает специалистов?</h6>
          <p>
            Координатор абитуриентов КФУ поговорила о перспективах развития IT:
            Развитие неоднозначно, но...
          </p>
        </div>
        <button className={styles["partner-news-item__more-button"]}>
          {/*TODO линк к новости*/}
          <Link to="/">
            <span>Подробнее</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="5"
              viewBox="0 0 12 5"
              fill="none"
            >
              <path
                d="M12 2.5L8.25 0.334936V4.66506L12 2.5ZM0 2.875H8.625V2.125H0V2.875Z"
                fill="black"
              />
            </svg>
          </Link>
        </button>
      </div>
    </div>
  );
};
