import React from 'react';
import { MemoryRouter } from 'react-router';
import renderer from 'react-test-renderer';

import { CodeLabApp } from '../../src/containers/App';

it('renders correctly', () => {
  const tree = renderer.create(
    <MemoryRouter>
      <CodeLabApp />
    </MemoryRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
