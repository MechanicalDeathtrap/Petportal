import { PartnersNewsListItem } from "./partners-news-list-item.tsx";
import styles from "./partners-news-list.module.sass"


export const PartnersNewsList = () => {
  return(
    <div className={styles["partners-news"]}>
      <h1>Новости партнёров</h1>
      <div>
        <ul className={styles["partners-news__list"]}>
          <li>
            <PartnersNewsListItem/>
          </li>
        </ul>
      </div>
    </div>
  )
}