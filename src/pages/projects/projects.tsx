import { AsideFilters } from "../../components/filters/aside-filters.tsx";
import { Catalogue } from "../../components/catalogue/catalogue.tsx";

export const Projects = () => {
  return (
    <div style={{ display: "flex" }}>
      <AsideFilters />
      <Catalogue />
    </div>
  );
};
