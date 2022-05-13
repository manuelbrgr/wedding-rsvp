const i18n = require("i18next");
const { initReactI18next } = require("react-i18next");
const languages = require("./src/data/languages");
const { getLangKey } = require("./src/utils/getLangKey");

const userLang = navigator.language;
const locale = ~languages.langs.indexOf(userLang)
  ? userLang
  : languages.defaultLangKey;

const translationEN = require("./src/locales/en/translation.json");
const translationDE = require("./src/locales/de/translation.json");
const translationPL = require("./src/locales/pl/translation.json");

exports.onClientEntry = () => {
  if (window.location.pathname === "/") {
    window.location.pathname = `/${locale}`;
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
};
