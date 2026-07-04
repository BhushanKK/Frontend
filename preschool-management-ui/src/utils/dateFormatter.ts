export const formatDate = (date: string | null | undefined): string => {
  if (!date) return "";

  const value = new Date(date);

  return value.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};