export function getLangKey() {
  return window.location.pathname.slice(1, 3);
}

export function getPathAfterLang() {
  return window.location.pathname.slice(4);
}
