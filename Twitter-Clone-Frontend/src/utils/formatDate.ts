import { formatDistance } from 'date-fns';
import enLang from 'date-fns/locale/en-GB';

export const formatDate = (date: Date): string => formatDistance(
  date,
  new Date(),
  { locale: enLang },
);
