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
 * builds the content of an AST node.
 */
export default walker => ast => {
  if (VOID_ELEMENTS.includes(ast.type)) {
    return null;
  }

  if (VALUE_ELEMENTS.includes(ast.type) || hasOnlyType(ast, 'Html')) {
    if (ast.type === 'Html') {
      if (ast.value.match(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/)) {
        return '';
      }

      return { __html: ast.value };
    }

    return ast.value;
  }

  // special markup for the CodeBlock element
  if (ast.type === 'CodeBlock') {
    return React.createFactory(Highlight)({
      language: ast.lang,
      children: ast.value,
    });
  }

  if (hasOnlyType(ast, 'Str')) {
    return ast.children[0].value;
  }

  let children;

  // bypass the lone Paragraph inside the li
  if (ast.type === 'ListItem' && ast.children && ast.children.length === 1) {
    children = [...walker(ast.children[0])];
  } else if (ast.type === 'ListItem' && ast.children && ast.children.length > 1) {
    const [firstAst, ...rest] = ast.children;
    children = [...walker(firstAst), ...walker({ ...ast, children: rest })];
  } else {
    children = [...walker(ast)];
  }

  return children.map(resolveRenderer);
};
