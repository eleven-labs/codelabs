/* eslint no-use-before-define: off */
/* eslint generator-star-spacing: off */
/* eslint no-restricted-syntax: off */
/* eslint no-plusplus: off */
/* eslint arrow-parens: off */
/* eslint react/prefer-stateless-function: off */
import React from 'react';
import { parse } from 'markdown-to-ast';
import { Converter } from 'showdown';

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

const types = {
  Document: 'div',
  Paragraph: 'p',

  BlockQuote: 'blockquote',
  ListItem: 'li',
  // List: '--',
  // Header: '--',
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

const converter = new Converter({ noHeaderId: true });

const makeHtml = ast => (
  ast.type === 'Str' ? ast.raw : converter.makeHtml(ast.raw)
);

let index = 0;

const createComponent = ast => {
  const renderer = props => (
    React.createElement(
      // TODO: getNodeType(ordered ? ...)
      types[ast.type],
      { ...props, key: index++ },
      (function toto() {
        if (ast.children && ast.children.length) {
          return ast.children.map(childAst => {
            console.log('before walk children', childAst);
            if (!types[childAst.type]) {
              return childAst.raw;
            }

            return React.createElement(
              types[childAst.type],
              { key: index++ },
              (() => {
                if (childAst.children && childAst.children.length) {
                  return [...walk(childAst)];
                }

                return makeHtml(childAst);
              })(),
            );
          });
        }

        return makeHtml(ast.raw);
      }()),
    )
  );

  renderer.displayName = ast.type;

  return renderer;
};

/**
 * Markdown Syntax Parser
 */
const ASTParser = Object.keys(types).reduce((acc, key) => ({
  ...acc,
  *[key](child) {
    yield createComponent(child);
  },
  // TODO: List, ...
}), {
  *Str(child) {
    yield child.raw;
  },
});
