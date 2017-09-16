/* eslint no-use-before-define: off */
/* eslint generator-star-spacing: off */
/* eslint no-restricted-syntax: off */
/* eslint no-plusplus: off */
/* eslint arrow-parens: off */
/* eslint react/prefer-stateless-function: off */
import React from 'react';
import { parse } from 'markdown-to-ast';
// import { Converter } from 'showdown';

const types = {
  Document: 'div',
  Paragraph: 'p',

  BlockQuote: 'blockquote',
  ListItem: 'li',
  List: 'ul',
  // Header: 'h2',
  CodeBlock: 'code',
  HtmlBlock: 'html',
  // ReferenceDef: '--',
  HorizontalRule: 'hr',
  // Comment: '--',
  // Str: 'span',
  Break: 'br',
  Emphasis: 'em',
  Strong: 'strong',
  Html: 'html',
  Link: 'a',
  Image: 'img',
  Code: 'code',
};

let componentIndex = 0;

/**
 * Root generator consumer (converts markdown to components)
 */
export default md => [...traverse(md)];

/**
 * Root generator that walks through generated AST children
 * to convert them into react component.
 */
function *traverse(md) {
  const ast = parse(md);

  yield* walk(ast);
}

function *walk(ast) {
  for (const child of ast.children) {
    yield* ASTParser[child.type](child);
  }
}

const hasOnlyStr = ast => (
  ast.children &&
  ast.children.length === 1 &&
  ast.children[0].type === 'Str'
);

const createComponent = ast => (
  React.createFactory(class extends React.Component {
    static displayName = ast.type;
    static defaultProps = {};

    render() {
      let content;
      const children = [...walk(ast)];

      if (hasOnlyStr(ast)) {
        content = ast.children[0].raw;
      } else {
        content = children.map((renderer, key) => (
          typeof renderer === 'function' ? renderer({ key }) : renderer
        ));
      }

      return React.createElement(types[ast.type], { key: componentIndex++ }, content);
    }
  })
);

/**
 * Markdown Syntax Parser
 */
const ASTParser = Object.keys(types).reduce((acc, key) => ({
  ...acc,
  *[key](child) {
    yield createComponent(child);
  },
}), {
  *Str(child) {
    yield child.raw;
  },
  *Header(child) {
    yield React.createElement(`h${child.depth}`, {}, [...walk(child)]);
  },
});
