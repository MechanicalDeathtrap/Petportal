import styles from "./catalogue.module.sass";
import { SearchBar } from "../search bar/search-bar.tsx";
import { DEFAULT_SORT, SortDropdown, SortState } from "../filters/sort-dropdown.tsx";

import { ProjectList } from "../projects/project-list/project-list.tsx";
import { Button } from "../button/button.tsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Catalogue = ( ) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState(() => {
  const saved = sessionStorage.getItem("projectSearchQuery");
  return saved || "";
});
  const [sort, setSort] = useState<SortState>(DEFAULT_SORT);
  const [needToFetch, setNeedToFetch] = useState(false);


  return (
    <section className={styles["catalogue"]}>
      <div className={styles["catalogue__searchbar-container"]}>
        <SearchBar onSearch={setSearchQuery} />
      </div>
      <div className={styles["catalogue__project-container"]}>
        {/* <PopularityButtonSort /> */}
        <SortDropdown onSortChange={setSort}/>
        <ProjectList
          searchQuery={searchQuery}
          sort={sort.value}
          sortDirection={sort.direction}
          needToFetch={needToFetch}
          setNeedToFetch={() => setNeedToFetch(false)}
        />
      </div>
      <Button
        type="button"
        style={"blue-button-projects"}
        text={t("catalogue.showMore")}
        onClick={() => setNeedToFetch(true)}
      />
    </section>
  );
};
