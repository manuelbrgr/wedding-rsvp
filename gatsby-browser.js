const languages = require("./src/data/languages");

const userLang = navigator.language || navigator.userLanguage;
const locale = ~languages.langs.indexOf(userLang)
  ? userLang
  : languages.defaultLangKey;

exports.onClientEntry = () => {
  if (window.location.pathname === "/") {
    window.location.pathname = `/${locale}`;
  }
};
