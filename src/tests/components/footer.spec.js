import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../components/shared/Footer';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper).toMatchSnapshot();
  });
});
