import { AsideFilters } from "../../components/filters/aside-filters.tsx";
import { Catalogue } from "../../components/catalogue/catalogue.tsx";
import { FilterProvider } from "../../context/filter-context.tsx";

export const Projects = () => {
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
