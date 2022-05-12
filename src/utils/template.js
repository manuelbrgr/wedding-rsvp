export default function template(content, data) {
  return content.replace(/%(.+)%/g, (match, key) => {
    const value = data[key];
    if (typeof value !== "undefined") {
      return value;
    }
    return match;
  });
}
