const i18n = require("i18next");
const { initReactI18next } = require("react-i18next");
const { renderToString } = require("react-dom/server");
const translationEN = require("./src/locales/en/translation.json");
const translationDE = require("./src/locales/de/translation.json");
const translationPL = require("./src/locales/pl/translation.json");

exports.replaceRenderer = ({
  bodyComponent,
  replaceBodyHTMLString,
  pathname,
}) => {
  const lang = pathname?.split("/")[1];
  i18n
    .use(initReactI18next)
    .init({
      lng: lang,
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
    })
    .then(() => {
      i18n.changeLanguage(lang);
      replaceBodyHTMLString(renderToString(bodyComponent));
    });
};
