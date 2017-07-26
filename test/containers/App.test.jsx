import React from 'react';
import App from './app';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <App></App>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
