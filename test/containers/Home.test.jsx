import 'core-js';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { mount } from 'enzyme';

import { Home } from '../../src/containers/Home';

describe('<Home />', () => {
  it('should render correctly', () => {
    const spy = jest.fn();
    const wrapper = mount(<Home loadCourses={spy} />);

    expect(wrapper.find('Splash')).toHaveLength(1);
    expect(wrapper.find('CourseList')).toHaveLength(1);
    expect(spy).toBeCalled();
    expect(spy.mock.calls.length).toBe(1);
  });
});
