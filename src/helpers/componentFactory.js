/* eslint no-use-before-define: off */
/* eslint generator-star-spacing: off */
/* eslint no-restricted-syntax: off */
/* eslint no-plusplus: off */
/* eslint arrow-parens: off */
import React from 'react';
import { parse } from 'markdown-to-ast';

const REGEX_TAG_OPENING = /<(\w+)\b[^<]*>/g;
const REGEX_TAG_CLOSING = /<\/(\w+)\b[^<]*>/g;
const REGEX_TAG_BOUNDARIES = /(<(\/)?(\w+)\b[^<]*>)/g;
const REGEX_TAG = /<(\w+)\b[^<]*(?:(?!<\/(\1)>)<[^<]*)*<\/(\1)>/g;

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
  CodeBlock: 'pre',
  HtmlBlock: 'html',
  HorizontalRule: 'hr',
  Break: 'br',
  Emphasis: 'em',
  Strong: 'strong',
  Html: 'div',
  Link: 'a',
  Image: 'img',
  Code: 'code',
};

const voidElements = ['Break', 'HorizontalRule', 'Image'];
const valueElements = ['Code', 'Html'];

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
  console.log(ast.children);

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

  if (valueElements.includes(ast.type)) {
    if (ast.type === 'Html') {
      if (ast.value.match(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/)) {
        return '';
      }

      return React.createElement('p', {
        dangerouslySetInnerHTML: { __html: ast.value },
      });
    }

    return ast.value;
  }

  // additional markup for the CodeBlock element
  if (ast.type === 'CodeBlock') {
    return React.createElement('code', {}, ast.value);
  }

  if (hasOnlyStr(ast)) {
    return ast.children[0].value;
  }

  let children;

  // bypass the lone Paragraph inside the li
  if (ast.type === 'ListItem' && ast.children && ast.children.length === 1) {
    children = [...walk(ast.children[0])];
  } else if (ast.type === 'ListItem' && ast.children && ast.children.length > 1) {
    const [firstAst, ...rest] = ast.children;
    children = [...walk(firstAst), ...walk({ ...ast, children: rest })];
  } else if (ast.type === 'Paragraph') {
    // console.log('ast', ast);
    // console.log('has tags', ast.raw.match(REGEX_TAG));

    // const htmlMatch = ast.raw.match(REGEX_TAG);
    // let newMD = ast.raw;

    // if (htmlMatch) {
    //   newMD = htmlMatch.reduce((acc, match) => {
    //     const parts = [
    //       '\n',
    //       match.match(REGEX_TAG_OPENING)[0],
    //       match.replace(REGEX_TAG_BOUNDARIES, ''),
    //       match.match(REGEX_TAG_CLOSING)[0],
    //     ];

    //     return acc.replace(match, parts.join('\n'));
    //   }, newMD);

    //   console.log(newMD);
    //   console.log(parse(newMD));
    // }

    children = [...walk(ast)];
  } else {
    children = [...walk(ast)];
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
