/* eslint-disable import/prefer-default-export */
export const INITIAL_STATE = {
  topics: [],
  courses: [],
};

export const API_ROOT = '/api/';
export const NOOP = () => {};

// const REGEX_TAG_OPENING = /<(\w+)\b[^<]*>/g;
// const REGEX_TAG_CLOSING = /<\/(\w+)\b[^<]*>/g;
// const REGEX_TAG_BOUNDARIES = /(<(\/)?(\w+)\b[^<]*>)/g;
// const REGEX_TAG = /<(\w+)\b[^<]*(?:(?!<\/(\1)>)<[^<]*)*<\/(\1)>/g;

export const VOID_ELEMENTS = ['Break', 'HorizontalRule', 'Image'];
export const VALUE_ELEMENTS = ['Code', 'Html'];

export const AST_NODES = {
  Document: 'div',
  Paragraph: 'p',
  BlockQuote: 'blockquote',
  ListItem: 'li',

  List: ast => (ast.ordered ? 'ol' : 'ul'),
  Header: ast => `h${ast.depth}`,

  CodeBlock: 'pre',
  // HtmlBlock: 'html',
  HorizontalRule: 'hr',
  Break: 'br',
  Emphasis: 'em',
  Strong: 'strong',
  Html: 'div',
  Link: 'a',
  Image: 'img',
  Code: 'code',
};
