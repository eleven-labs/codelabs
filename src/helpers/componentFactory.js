/* eslint no-use-before-define: off */
/* eslint generator-star-spacing: off */
/* eslint no-restricted-syntax: off */
/* eslint no-plusplus: off */
/* eslint arrow-parens: off */
/* eslint react/prefer-stateless-function: off */
import React from 'react';
import { parse } from 'markdown-to-ast';

const types = {
  Document: 'div',
  Paragraph: 'p',

  BlockQuote: 'blockquote',
  ListItem: 'li',
  List(ast) {
    return ast.ordered ? 'ol' : 'ul';
  },
  Header(ast) {
    return `h${ast.depth}`;
  },
  CodeBlock: 'code',
  HtmlBlock: 'html',
  HorizontalRule: 'hr',
  Break: 'br',
  Emphasis: 'em',
  Strong: 'strong',
  Html: 'html',
  Link: 'a',
  Image: 'img',
  Code: 'code',
};

const voidElements = ['Break', 'HorizontalRule'];
const extraLevelElements = ['ListItem'];

const typeProps = {
  ...Object.keys(types).reduce((acc, key) => ({
    ...acc,
    [key]() {
      return {};
    },
  }), {}),
  Link(ast) {
    return {
      href: ast.url,
    };
  },
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
  if (ast.children) {
    for (const child of ast.children) {
      yield* ASTParser[child.type](child);
    }
  }
}

const hasOnlyStr = ast => (
  ast.children &&
  ast.children.length === 1 &&
  ast.children[0].type === 'Str'
);

const resolveLocalName = ast => (
  typeof types[ast.type] === 'function' ? types[ast.type](ast) : types[ast.type]
);

const buildContent = ast => {
  if (voidElements.includes(ast.type)) {
    return null;
  }

  if (hasOnlyStr(ast)) {
    return ast.children[0].raw;
  }

  let children = [...walk(ast)];

  // bypass the lone Paragraph inside the li
  if (extraLevelElements.includes(ast.type)) {
    children = [...walk(ast.children[0])];
  }

  return children.map((renderer, key) => (
    typeof renderer === 'function' ? renderer({ key }) : renderer
  ));
};

const buildProps = ast => ({
  key: componentIndex++,
  ...typeProps[ast.type](ast),
});

const createComponent = ast => (
  React.createFactory(class extends React.Component {
    static displayName = ast.type;
    static defaultProps = {};

    shouldComponentUpdate() {
      return false;
    }

    render() {
      return React.createElement(
        resolveLocalName(ast),
        buildProps(ast),
        buildContent(ast),
      );
    }
  })
);

/**
 * Markdown Syntax Parser
 */
const ASTParser = {
  ...Object.keys(types).reduce((acc, key) => ({
    ...acc,
    *[key](child) {
      yield createComponent(child);
    },
  }), {}),

  *Str(child) {
    yield child.raw;
  },
};
