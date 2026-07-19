import { create } from "zustand";
import i18n from "../i18n";

interface LanguageState {
    language: string;
    setLanguage: (language: string) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
    language: localStorage.getItem("language") || "en",

    setLanguage: (language: string) => {
        localStorage.setItem("language", language);
        i18n.changeLanguage(language);

        set({
            language,
        });
    },
}));