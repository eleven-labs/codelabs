/* eslint generator-star-spacing: off */
/* eslint no-restricted-syntax: off */
/* eslint no-use-before-define: off */
import React from 'react';
import { parse } from 'markdown-to-ast';

import { resolveLocalName } from '../../helpers/ast';
import buildProps from './buildProps';
import buildContent from './buildContent';
import { AST_NODES } from '../../constants';

/**
 * Root generator that walks through generated AST children
 * to convert them into react component.
 */
function *walk(ast) {
  if (ast.children) {
    for (const child of ast.children) {
      yield* ASTParser[child.type](child);
    }
  }
}

/**
 * Markdown Syntax Parser
 */
const ASTParser = {
  ...Object.keys(AST_NODES).reduce((acc, key) => ({
    ...acc,
    *[key](child) {
      yield createComponent(child);
    },
  }), {}),
  *Str(child) {
    yield child.raw;
  },
};

/**
 * Create the content factory by giving it the walker,
 * it will be used in the recursive process, to generate children.
 */
const contentFactory = buildContent(walk);

/**
 * Factory that creates a react component based on an AST Node
 */
const createComponent = ast => (
  React.createFactory(class extends React.Component {
    static displayName = ast.type;
    static defaultProps = {};

    shouldComponentUpdate() {
      return false;
    }

    render() {
      let content = contentFactory(ast);
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
 * Root generator consumer (converts markdown to components)
 */
export default md => [...walk(parse(md))];
