/**
 * Will get nested attributes from an object or an array
 * If not found, it will return the last argument if provided
 *
 * @param {Object} x
 * @param {string} path - A json path formated string
 * @param {any} notFound
 * @return {any}
 */
export default (obj, path, notFound) => {
  const pathParts = path.split('.');

  return (function rec(x, part, ...parts) {
    if (part == null && !parts.length) {
      return x;
    }

    if (x != null && part in x) {
      return rec(x[part], ...parts);
    }

    return notFound;
  }(obj, ...pathParts));
};
