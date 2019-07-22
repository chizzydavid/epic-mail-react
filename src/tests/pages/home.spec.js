import React from 'react';
import { shallow } from 'enzyme';
import Home from '../../pages/Home';

describe('Component: Home', () => {
  it('should render correctly', () => {

    const wrapper = shallow(<Home />);
    expect(wrapper.find('Landing').length).toEqual(1);
    expect(wrapper.find('Footer').length).toEqual(1);
    expect(wrapper.find('Navbar').length).toEqual(1);
  });
});