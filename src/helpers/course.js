const lowerCase = str => str.toLowerCase();

/**
 * Returns a list of author names
 * @param {Course} course
 */
export const getAuthorsNames = ({ authors = [] } = {}) => (
  authors.reduce((acc, { name }) => [...acc, name], [])
);

/**
 * Returns a list of keywords by merging categories and tags
 * and handling duplicate words
 * @param {Course} course
 */
export const getKeywords = ({ categories = [], tags = [] } = {}) => (
  [...new Set([...categories, ...tags].map(lowerCase)).values()]
);
