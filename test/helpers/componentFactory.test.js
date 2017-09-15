import React from 'react';
import { mount } from 'enzyme';

import componentFactory from '../../src/helpers/componentFactory';

describe('Component Factory', () => {
  it('should create a paragraph component', () => {
    const md = 'toto **lol**';

    const [componentFn] = componentFactory(md);
    const component = React.createElement(componentFn);
    const wrapper = mount(component);

    console.log(wrapper.debug());
    expect(wrapper.find('p')).toHaveLength(1);
    expect(wrapper.find('Paragraph')).toHaveLength(1);
  });
});
