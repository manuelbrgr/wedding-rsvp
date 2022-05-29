const i18n = require("i18next");
const { initReactI18next } = require("react-i18next");
const languages = require("./src/data/languages");
const { getLangKey } = require("./src/utils/getLangKey");

const userLang = navigator.language;
let locale = ~languages.langs.indexOf(userLang)
  ? userLang
  : languages.defaultLangKey;

const translationEN = require("./src/locales/en/translation.json");
const translationDE = require("./src/locales/de/translation.json");
const translationPL = require("./src/locales/pl/translation.json");

const pathArray = window.location.pathname.split("/");
exports.onClientEntry = () => {
  if (window.location.pathname === "/") {
    window.location.pathname = `/${locale}`;
  } else if (pathArray.length > 1) {
    locale = window.location.pathname.split("/")[1];
  }

  i18n.use(initReactI18next).init({
    lng: getLangKey(),
    resources: {
      en: {
        translation: translationEN,
      },
      de: {
        translation: translationDE,
      },
      pl: {
        translation: translationPL,
      },
    },
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });

  console.log(locale);
  i18n.changeLanguage(locale);
};
