import { hasOnlyType } from '../../helpers/ast';
import { AST_NODES } from '../../constants';

const typeProps = {
  ...Object.keys(AST_NODES).reduce((acc, key) => ({
    ...acc,
    [key]() {
      return {};
    },
  }), {}),
  Paragraph(ast) {
    return hasOnlyType(ast, 'Image') ? { className: 'has-image-only' } : {};
  },
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
