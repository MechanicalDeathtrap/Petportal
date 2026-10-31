import i18n from "../i18n/index.ts";

/** Максимальный срок приёма заявок — два месяца с момента публикации объявления. */
export const MAX_APPLYING_PERIOD_MONTHS = 2;

/** Приводит дату к формату value для <input type="date"> (YYYY-MM-DD). */
export const toDateInputValue = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * Предельная дата приёма заявок.
 * Для нового проекта отсчёт идёт от сегодняшнего дня, для существующего — от даты публикации.
 */
export const getMaxApplyingDeadline = (publishedAt?: string | null): Date => {
  const parsed = publishedAt ? new Date(publishedAt) : null;
  const base = parsed && !Number.isNaN(parsed.getTime()) ? parsed : new Date();

  const limit = new Date(base);
  limit.setHours(23, 59, 59, 999);
  limit.setMonth(limit.getMonth() + MAX_APPLYING_PERIOD_MONTHS);

  return limit;
};

/** Функция, а не строка: yup вызывает её при валидации, поэтому текст берётся на текущем языке. */
export const getMaxApplyingDeadlineMessage = () =>
  i18n.t("projects.validation.applyingDeadlineMax", {
    months: MAX_APPLYING_PERIOD_MONTHS,
  });
