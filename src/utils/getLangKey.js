export function getLangKey(location) {
  return location?.pathname.slice(1, 3);
}

export function getPath(location) {
  return location?.pathname.slice(4);
}
