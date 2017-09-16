import { mount } from 'enzyme';

import componentFactory from '../../src/helpers/componentFactory';

describe('Component Factory', () => {
  it('should create a paragraph component', () => {
    const md = `toto **looooool** co*o*l jdjjdjdjdjdjdj
lol

*cool*`;

    const [component] = componentFactory(md);
    const wrapper = mount(component({ key: 9893 }));

    console.log(wrapper.debug());
    expect(wrapper.find('p')).toHaveLength(1);
    expect(wrapper.find('Paragraph')).toHaveLength(1);
    expect(wrapper.children()).toHaveLength(2);
  });
});
