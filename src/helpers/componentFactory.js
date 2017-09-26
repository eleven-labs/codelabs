/* eslint no-use-before-define: off */
/* eslint generator-star-spacing: off */
/* eslint no-restricted-syntax: off */
/* eslint no-plusplus: off */
/* eslint arrow-parens: off */
import React from 'react';
import { parse } from 'markdown-to-ast';

// const REGEX_TAG_OPENING = /<(\w+)\b[^<]*>/g;
// const REGEX_TAG_CLOSING = /<\/(\w+)\b[^<]*>/g;
// const REGEX_TAG_BOUNDARIES = /(<(\/)?(\w+)\b[^<]*>)/g;
// const REGEX_TAG = /<(\w+)\b[^<]*(?:(?!<\/(\1)>)<[^<]*)*<\/(\1)>/g;

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
  Image(ast) {
    return {
      src: ast.url,
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

const hasOnlyType = (ast, type) => (
  ast.children &&
  ast.children.length === 1 &&
  ast.children[0].type === type
);

const resolveLocalName = ast => (
  typeof types[ast.type] === 'function' ? types[ast.type](ast) : types[ast.type]
);

const buildContent = ast => {
  if (voidElements.includes(ast.type)) {
    return null;
  }

  if (valueElements.includes(ast.type) || hasOnlyType(ast, 'Html')) {
    if (ast.type === 'Html') {
      if (ast.value.match(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/)) {
        return '';
      }

      return { __html: ast.value };
    }

    return ast.value;
  }

  // additional markup for the CodeBlock element
  if (ast.type === 'CodeBlock') {
    return React.createElement('code', {}, ast.value);
  }

  if (hasOnlyType(ast, 'Str')) {
    return ast.children[0].value;
  }

  let children;

  // bypass the lone Paragraph inside the li
  if (ast.type === 'ListItem' && ast.children && ast.children.length === 1) {
    children = [...walk(ast.children[0])];
  } else if (ast.type === 'ListItem' && ast.children && ast.children.length > 1) {
    const [firstAst, ...rest] = ast.children;
    children = [...walk(firstAst), ...walk({ ...ast, children: rest })];
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
      let content = buildContent(ast);
      const props = buildProps(ast);

      // eslint-disable-next-line no-underscore-dangle
      if (content && content.__html) {
        props.dangerouslySetInnerHTML = content;
        content = null;
      }

      return React.createElement(resolveLocalName(ast), props, content);
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
