export const formatDate = (
  date: string | null | undefined,
  language: string = "en"
): string => {
  if (!date) return "";

  const value = new Date(date);

  const localeMap: Record<string, string> = {
    en: "en-GB",
    mr: "mr-IN",
    hi: "hi-IN",
  };

  return value.toLocaleDateString(localeMap[language] ?? "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};