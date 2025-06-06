// src/context/FilterContext.tsx
import React, { createContext, useState, useContext } from "react";

type FilterState = {
  role: string;
  terms: string;
  isCommercial: string;
  tags: string[];
};

export type FilterContextType = {
  filters: FilterState;
  tempFilters: FilterState;
  setTempFilters: (filters: Partial<FilterState>) => void;
  // setFilters: FilterActions;
  applyFilters: () => void;
};

const FilterContext = createContext<FilterContextType | null>(null);

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext должен использоваться внутри FilterProvider");
  }
  return context;
};

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialFilterState = {
    role: "",
    terms: "",
    isCommercial: "",
    tags: [],
  };  

  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [tempFilters, setTempFilters] = useState<FilterState>(initialFilterState);

  const handleSetTempFilters = (newFilters: Partial<FilterState>) => {
    setTempFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleApplyFilters = () => {
    setFilters(tempFilters); // Сохраняем временные как основные
  };

  // const [role, setRole] = useState<string>("");
  // const [terms, setTerms] = useState<string>("");
  // const [isCommercial, setIsCommercial] = useState<string>("");
  // const [tags, setTags] = useState<string[]>([]);

  // const filters = { role, terms, isCommercial, tags };
  // const setFilters = {
  //   setRole,
  //   setTerms,
  //   setIsCommercial,
  //   setTags,
  // };

  const value = {
    filters,
    tempFilters,
    setTempFilters: handleSetTempFilters,
    applyFilters: handleApplyFilters,
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};