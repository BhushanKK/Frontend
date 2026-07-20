import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import enCommon from "./locales/en/common.json";
import mrCommon from "./locales/mr/common.json";
import enMasters from "./locales/en/masters.json";
import mrMasters from "./locales/mr/masters.json";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                common: enCommon,
                masters:enMasters
            },
            mr: {
                common: mrCommon,
                masters:mrMasters
            }
        },

        lng: localStorage.getItem("language") || "en",
        fallbackLng: "en",
        supportedLngs: [
            "en",
            "mr",
            "hi",
        ],
        defaultNS: "common",
        ns: [
            "common",
            "masters"
        ],
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: [
                "localStorage",
                "navigator",
            ],
            caches: [
                "localStorage",
            ],
        },
        react: {
            useSuspense: false,
        },
    });

export default i18n;