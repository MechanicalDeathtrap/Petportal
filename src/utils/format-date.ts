 
import { getDateLocale } from "../i18n/index.ts";

export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(getDateLocale());
  };