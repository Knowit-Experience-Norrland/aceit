export const displayMonthAndYear = (date: Date) => {
  const month = date.toLocaleString('sv', { month: 'short' }).replace(/^\w/, (c) => c.toUpperCase()).replace('.', '');
  return `${month} ${date.getFullYear()}`;
}

export const displayYearMonthAndDay = (date: Date | false, fallback?: string) => {
  if (!date) return fallback;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${day}`;
}

export const localDateStringWithoutTime = (date: Date) => {
  return date.toLocaleDateString('sv', { year: 'numeric', month: '2-digit', day: '2-digit' });
}
