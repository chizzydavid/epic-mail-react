import React from 'react';
import { shallow } from 'enzyme';
import Landing from '../../components/Landing';

describe('Component: Landing', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Landing />);
    expect(wrapper).toMatchSnapshot();
  });
});
