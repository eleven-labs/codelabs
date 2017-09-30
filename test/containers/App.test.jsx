import 'babel-polyfill';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { mount } from 'enzyme';

import App from '../../src/containers/App';

describe('<App />', () => {
  it('should render correctly', () => {
    const loc = { pathname: '/', query: { a: 'b' } }

    const wrapper = mount(
      <MemoryRouter initialEntries={[loc]} initialIndex={0}>
        <App />
      </MemoryRouter>
    );

    expect(wrapper.find('Header')).toHaveLength(1);
    expect(wrapper.find('Search')).toHaveLength(1);
  });
});
