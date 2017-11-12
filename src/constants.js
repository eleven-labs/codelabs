// TODO: think about dev environment
export const API_ROOT = 'https://storage.googleapis.com/tutos/codelabs/';
export const NOOP = () => {};

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
