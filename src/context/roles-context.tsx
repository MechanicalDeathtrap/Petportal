// src/context/roles-context.tsx
import React, { createContext, useContext, useState, useEffect, useRef } from "react";

export interface Role {
  id: string;
  name: string;
}

interface RolesContextType {
  roles: Role[];
  loading: boolean;
  error: string | null;
}

const RolesContext = createContext<RolesContextType | undefined>(undefined);

// Глобальный флаг и контейнер для провайдера
let providerMounted = false;
let rolesCache: Role[] = [];
let loadingCache = false;
let errorCache: string | null = null;

// Храним резолверы для случаев, если кто-то ждёт загрузки
const pendingResolvers: ((roles: Role[]) => void)[] = [];

// Функция загрузки ролей (вызывается один раз)
const loadRoles = async () => {
  if (loadingCache || rolesCache.length > 0) return rolesCache;

  loadingCache = true;

  try {
    const response = await fetch("http://localhost:5140/api/Roles");
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    const data: Role[] = await response.json();
    rolesCache = data;
    // Уведомляем всех ожидающих
    pendingResolvers.forEach(resolve => resolve(data));
    pendingResolvers.length = 0; // очищаем
    return data;
  } catch (err: any) {
    errorCache = err.message;
    throw err;
  } finally {
    loadingCache = false;
  }
};

// Компонент-провайдер, который монтируется автоматически при первом вызове useRoles
const LazyRolesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<RolesContextType>({
    roles: rolesCache,
    loading: loadingCache,
    error: errorCache,
  });

  useEffect(() => {
    // Если роли ещё не загружены — загружаем
    if (!rolesCache.length && !loadingCache && !errorCache) {
      loadRoles()
        .then(roles => {
          setState({ roles, loading: false, error: null });
        })
        .catch(() => {
          setState({ roles: [], loading: false, error: errorCache });
        });
    }

    // Подписываемся на обновления из кэша
    const updateState = () => {
      setState({
        roles: rolesCache,
        loading: loadingCache,
        error: errorCache,
      });
    };

    // Если загрузка уже идёт или завершена — сразу обновляем
    updateState();

    // Эффект не требует cleanup, так как всё в глобальных переменных
  }, []);

  return (
    <RolesContext.Provider value={state}>
      {children}
    </RolesContext.Provider>
  );
};

// Хук, который автоматически оборачивает компонент в провайдер при первом вызове
export const useRoles = () => {
  const context = useContext(RolesContext);
  const hasProvider = context !== undefined;
  const ComponentToWrap = useRef<(() => React.ReactNode) | null>(null);

  if (!hasProvider) {
    // Если провайдер ещё не был смонтирован — монтируем его "лениво"
    if (!providerMounted) {
      providerMounted = true;

      // Переопределяем хук на лету — теперь он будет возвращать контекст
      const OriginalUseRoles = useRoles;
      (useRoles as any) = () => {
        const ctx = useContext(RolesContext);
        if (ctx === undefined) {
          throw new Error("useRoles must be used within LazyRolesProvider (should never happen)");
        }
        return ctx;
      };

      // Возвращаем компонент, обёрнутый в провайдер
      return {
        Provider: LazyRolesProvider,
        roles: rolesCache,
        loading: loadingCache,
        error: errorCache,
        isWrapped: false, // флаг, что нужно обернуть
      };
    } else {
      // Провайдер уже монтировался, но текущий компонент не внутри него — ошибка
      throw new Error(
        "useRoles called outside of LazyRolesProvider. This should not happen after first mount."
      );
    }
  }

  return context!;
};

// Утилита для сортировки ролей (вынесем сюда же)
export const sortRolesWithOtherLast = (roleNames: string[]): string[] => {
  const otherIndex = roleNames.indexOf("Другое");
  return otherIndex > -1
    ? [...roleNames.filter((n) => n !== "Другое"), "Другое"]
    : roleNames;
};