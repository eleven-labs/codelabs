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
  List: 'ul',
  Header: 'h2',
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

// const converter = new Converter({ noHeaderId: true });

let index = 0;

// const createComponent = ast => (
//   React.createFactory(class extends React.Component {
//     static displayName = ast.type;
//     render() {
//       return React.createElement(
//         types[ast.type],
//         {
//           key: index++,
//           dangerouslySetInnerHTML: {
//             __html: makeHtml(ast),
//           },
//         },
//       );
//     }
//   })
// );

const createComponent = ast => {
  const renderer = props => (
    React.createElement(types[ast.type], { ...props, key: index++ },
      (function toto() {
        if (ast.children && ast.children.length) {
          if (ast.children.length === 1 && ast.children[0].type === 'Str') {
            return ast.children[0].raw;
          }

          return ast.children.map(childAst => {
            console.log('before walk children', childAst);
            if (!types[childAst.type] || childAst.type === 'Str') {
              return childAst.raw;
            }

            return React.createElement(
              types[childAst.type],
              { key: index++ },
              (() => {
                if (childAst.children && childAst.children.length) {
                  return [...walk(childAst)];
                }

                return childAst.raw;
              })(),
            );
          });
        }

        return ast.raw;
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
}), {
  *Str(child) {
    console.log('yiels Str');
    yield child.raw;
  },
});
