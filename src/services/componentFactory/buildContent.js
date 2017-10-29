import React from 'react';

import Highlight from '../../components/Highlight';
import { hasOnlyType } from '../../helpers/ast';
import {
  VALUE_ELEMENTS,
  VOID_ELEMENTS,
} from '../../constants';

/**
 * Resolves a renderer based on its type
 */
const resolveRenderer = (renderer, key) => (
  typeof renderer === 'function' ? renderer({ key }) : renderer
);

/**
 * Takes an AST node and builds its children components.
 */
export default walker => ast => {
  // Elements like <br />, <hr /> and <img /> don't have children.
  if (VOID_ELEMENTS.includes(ast.type)) {
    return null;
  }

  // Element from which we want to extract the computed value instead of raw value.
  if (VALUE_ELEMENTS.includes(ast.type) || hasOnlyType(ast, 'Html')) {
    if (ast.type === 'Html') {
      if (ast.value.match(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/)) {
        return '';
      }

      // In Html block case, we return the html in the value
      // to be dangerously set inside the parent react component.
      return { __html: ast.value };
    }

    return ast.value;
  }

  // Special markup for the CodeBlock element,
  // we use the Highlight component to display it.
  if (ast.type === 'CodeBlock') {
    return React.createFactory(Highlight)({
      language: ast.lang,
      children: ast.value,
    });
  }

  // Here we don't have to create html markup to include Str values.
  // Str nodes are leafs in the ast tree, they are simple strings.
  if (hasOnlyType(ast, 'Str')) {
    return ast.children[0].value;
  }

  let children;

  if (ast.type === 'ListItem' && hasOnlyType(ast, 'Paragraph')) {
    // bypass the lone Paragraph inside the li
    children = [...walker(ast.children[0])];
  } else if (ast.type === 'ListItem' && ast.children && ast.children.length > 1) {
    // When a list item contains a list, the ast have 2 nodes
    // the first Paragraph, and the List. So we process them separately.
    const [firstAst, ...rest] = ast.children;
    children = [...walker(firstAst), ...walker({ ...ast, children: rest })];
  } else {
    // for the remaining AST node types that we didn't treat.
    children = [...walker(ast)];
  }

  return children.map(resolveRenderer);
};
