import styles from "./catalogue.module.sass";
import { SearchBar } from "../search bar/search-bar.tsx";
import { PopularityButtonFilter } from "../filters/popularity-button-filter.tsx";
import { ProjectList } from "../projects/project-list/project-list.tsx";
import { Button } from "../button/button.tsx";
import { useState } from "react";

export const Catalogue = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [needToFetch, setNeedToFetch] = useState(false);

  return (
    <section className={styles["catalogue"]}>
      <div className={styles["catalogue__searchbar-container"]}>
        <SearchBar onSearch={setSearchQuery} />
      </div>
      <div className={styles["catalogue__project-container"]}>
        <PopularityButtonFilter />
        <ProjectList
          searchQuery={searchQuery}
          needToFetch={needToFetch}
          setNeedToFetch={() => setNeedToFetch(false)}
        />
      </div>
      <Button
        type="button"
        style={"blue-button-projects"}
        text={"Показать ещё"}
        onClick={() => setNeedToFetch(true)}
      />
    </section>
  );
};
