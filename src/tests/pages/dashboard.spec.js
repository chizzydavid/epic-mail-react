import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from '../../pages/Dashboard';

describe('Component: Dashboard', () => {
  it('should render correctly', () => {

    const wrapper = shallow(<Dashboard />);
    expect(wrapper).toMatchSnapshot();
  });
});