import { PartnersNewsListItem } from "./partners-news-list-item.tsx";
import styles from "./partners-news-list.module.sass";
import { useTranslation } from "react-i18next";

export const PartnersNewsList = () => {
  const { t } = useTranslation();
  return (
    <div className={styles["partners-news"]}>
      <h1>{t("home.news.heading")}</h1>
      <div>
        <ul className={styles["partners-news__list"]}>
          <li>
            <PartnersNewsListItem />
          </li>
        </ul>
      </div>
    </div>
  );
};
