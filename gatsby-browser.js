const i18n = require("i18next");
const { initReactI18next } = require("react-i18next");
const languages = require("./src/data/languages");
const { getLangKey } = require("./src/utils/getLangKey");

const userLang = navigator.language;
const locale = ~languages.langs.indexOf(userLang)
  ? userLang
  : languages.defaultLangKey;

exports.onClientEntry = () => {
  if (window.location.pathname === "/") {
    window.location.pathname = `/${locale}`;
  }

  i18n.use(initReactI18next).init({
    lng: getLangKey(),
    resources: {
      en: {
        translation: {
          location: "Location",
        },
      },
      de: {
        translation: {
          location: "Ort",
        },
      },
      pl: {
        translation: {
          location: "Miasto",
        },
      },
    },
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });
};
