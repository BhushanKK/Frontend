export type LanguageCode = "en" | "mr" | "hi";

export interface LanguageOption {
  code: LanguageCode;
  label: string;
}

export const languages: LanguageOption[] = [
  {
    code: "en",
    label: "English",
  },
  {
    code: "mr",
    label: "मराठी",
  },
  {
    code: "hi",
    label: "हिन्दी",
  },
];