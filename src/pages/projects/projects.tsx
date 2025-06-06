import { AsideFilters } from "../../components/filters/aside-filters.tsx";
import { Catalogue } from "../../components/catalogue/catalogue.tsx";
import { useState } from "react";
import React from "react";
import { FilterProvider } from "../../context/filter-context.tsx";

export const Projects = () => {
  const [role, setRole] = useState<string>("");
  const [terms, setTerms] = useState<string>("");
  const [isCommercial, setIsCommercial] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const FilterContext = React.createContext(null);

  return (
     <FilterProvider>
      <div style={{ display: "flex" }}>
        <AsideFilters
        />
        <Catalogue        
        />
      </div>
    </FilterProvider>
  );
};
