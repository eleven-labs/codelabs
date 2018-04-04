// TODO: think about dev environment
export const API_ROOT = process.env.NODE_ENV === 'production' ? 'https://storage.googleapis.com/tutos/codelabs/' : `http://${location.hostname}:9000/`;
export const NOOP = () => {};

export const ALGOLIA_APP_ID = '5IGTHBX5JS';
export const ALGOLIA_API_KEY = '7f7511d659569fcede7653d568b3206c';

// for InlineHtml block detection
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

  CodeBlock: 'div',
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
