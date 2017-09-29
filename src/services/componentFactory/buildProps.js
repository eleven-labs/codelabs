import { AST_NODES } from '../../constants';

const typeProps = {
  ...Object.keys(AST_NODES).reduce((acc, key) => ({
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

export default ast => ({
  key: componentIndex++,
  ...typeProps[ast.type](ast),
});
