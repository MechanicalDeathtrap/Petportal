import styles from "./catalogue.module.sass";
import { SearchBar } from "../search bar/search-bar.tsx";
import { PopularityButtonSort } from "../filters/popularity-button-sort.tsx";
import { SortDropdown } from "../filters/sort-dropdown.tsx";

import { ProjectList } from "../projects/project-list/project-list.tsx";
import { Button } from "../button/button.tsx";
import { useState } from "react";

export const Catalogue = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState("date");
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
          sort={sort}
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
