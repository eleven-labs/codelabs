export const getPosts = () => {
  const context = require.context('../../../fixtures/_posts', false, /^\.\/.*\.md$/);
  return context.keys();
};

export const getPost = (path) => import(`../../../fixtures/_posts/${path}`);
