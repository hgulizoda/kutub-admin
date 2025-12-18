import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enlang from "./locales/eng.json";
import uzlang from "./locales/uz.json";
const resources = {
  en: {
    translation: enlang,
  },
  uz: {
    translation: uzlang,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "uz",
});

export default i18n;
