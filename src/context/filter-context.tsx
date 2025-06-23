// src/context/FilterContext.tsx
import React, { createContext, useState, useContext } from "react";
import { StateOfProject } from "../types/project-type";

type FilterState = {
  role: string;
  terms:  StateOfProject | null;
  isCommercial: string;
  tags: string[];
};

export type FilterContextType = {
  filters: FilterState;
  tempFilters: FilterState;
  setTempFilters: (filters: Partial<FilterState>) => void;
  // setFilters: FilterActions;
  applyFilters: () => void;
  resetFilters: () => void;
  triggerFetch: number;
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
  const [triggerFetch, setTriggerFetch] = useState(0);

  const initialFilterState = {
    role: "",
    terms: null,
    isCommercial: "",
    tags: []
  };  

  const resetFilters = () => {
    setTempFilters(initialFilterState);
    setFilters(initialFilterState);
    setTriggerFetch(prev => prev + 1);
  };

  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [tempFilters, setTempFilters] = useState<FilterState>(initialFilterState);

  const handleSetTempFilters = (newFilters: Partial<FilterState>) => {
    setTempFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleApplyFilters = () => {
    setFilters(tempFilters); // Сохраняем временные как основные
    setTriggerFetch(prev => prev + 1);
  };

  const value = {
    filters,
    tempFilters,
    setTempFilters: handleSetTempFilters,
    applyFilters: handleApplyFilters,
    resetFilters,
    triggerFetch
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};