/**
 * Deeply updates an object or an array
 * @param {Object} x
 * @param {string} path - A json path formated string
 * @param {Function} f
 */
export default (obj, path, f) => {
  const pathParts = path.split('.');

  return (function rec(x, part, ...parts) {
    const newObject = (typeof x !== 'object') ? { [part]: {} } : x;

    if (typeof newObject[part] === 'undefined') {
      newObject[part] = {};
    }

    if (!parts.length && newObject != null && typeof newObject === 'object') {
      return Object.assign(Array.isArray(newObject) ? [] : {}, newObject, {
        [part]: f(newObject[part]),
      });
    }

    if (newObject != null && typeof newObject === 'object') {
      return Object.assign({}, newObject, {
        [part]: rec(newObject[part], ...parts),
      });
    }

    return newObject;
  }(obj, ...pathParts));
};
