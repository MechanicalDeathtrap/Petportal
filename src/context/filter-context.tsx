// src/context/FilterContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { StateOfProject } from "../types/project-type";
import { Role } from "../types/role-type";


const API_BASE = "http://localhost:5140";

type FilterState = {
  roleId: string | null;
  terms:  StateOfProject | null;
  isCommercial: string;
  tags: string[];
  // roles: Role[]
};

const FILTER_STORAGE_KEY = "projectFilters";

export type FilterContextType = {
  filters: FilterState;
  tempFilters: FilterState;
  setTempFilters: (filters: Partial<FilterState>) => void;
  // setFilters: FilterActions;
  applyFilters: () => void;
  resetFilters: () => void;
  triggerFetch: number;
  roles: Role[]
};

const FilterContext = createContext<FilterContextType | null>(null);

const saveFiltersToStorage = (filters: FilterState) => {
  try {
    localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(filters));
  } catch (error) {
    console.error("Ошибка при сохранении фильтров:", error);
  }
};

const loadFiltersFromStorage = (): FilterState | null => {
  try {
    const saved = localStorage.getItem(FILTER_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error("Ошибка при загрузке фильтров:", error);
    return null;
  }
};



export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext должен использоваться внутри FilterProvider");
  }
  return context;
};

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [triggerFetch, setTriggerFetch] = useState(0);
  const [roles, setRoles] = useState<Role[]>([]);

  const initialFilterState = {
    roleId: "",
    terms: null,
    isCommercial: "",
    tags: []
  };  

  const [filters, setFilters] = useState<FilterState>(() => {
    const savedFilters = loadFiltersFromStorage();
    return savedFilters || initialFilterState;
  });

  const [tempFilters, setTempFilters] = useState<FilterState>(() => {
    const savedFilters = loadFiltersFromStorage();
    return savedFilters || initialFilterState;
  });

  useEffect(() => {
    saveFiltersToStorage(filters);
  }, [filters]);

  useEffect(() => {
    fetch(`${API_BASE}/api/Roles/AllRoles`)
      .then((res) => {
        if (!res.ok) throw new Error("Не удалось загрузить роли");
        return res.json();
      })
      .then((data: Role[]) => {
        setRoles(data);
      })
      .catch((err) => {
        console.error("Ошибка загрузки ролей:", err);
        // Можно добавить fallback или уведомление
      });
  }, []);

  const handleSetTempFilters = (newFilters: Partial<FilterState>) => {
    setTempFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleApplyFilters = () => {
    setFilters(tempFilters); // Сохраняем временные как основные
    setTriggerFetch(prev => prev + 1);
  };

  const resetFilters = () => {
    setTempFilters(initialFilterState);
    setFilters(initialFilterState);
    setTriggerFetch(prev => prev + 1);
    // Удаляем фильтры из localStorage при сбросе
    localStorage.removeItem(FILTER_STORAGE_KEY);
  };

  const value = {
    filters,
    tempFilters,
    setTempFilters: handleSetTempFilters,
    applyFilters: handleApplyFilters,
    resetFilters,
    triggerFetch,
    roles
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};