import { AST_NODES } from '../constants';

export const hasOnlyType = (ast, type) => (
  ast.children &&
  ast.children.length === 1 &&
  ast.children[0].type === type
);

export const resolveLocalName = ast => (
  typeof AST_NODES[ast.type] === 'function' ? AST_NODES[ast.type](ast) : AST_NODES[ast.type]
);
