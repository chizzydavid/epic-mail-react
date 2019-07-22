import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Navbar from '../../components/shared/Navbar';

describe('component: Navbar', () => {
  beforeEach(() => {
    sinon.spy(Navbar.prototype, 'toggleOpen');
    sinon.spy(Navbar.prototype, 'setResponsiveMode');
  });
  afterEach(() => {
    Navbar.prototype.toggleOpen.restore();
    Navbar.prototype.setResponsiveMode.restore();
  });

  it('should render correctly', (done) => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper.find('#navigation').hasClass('navbar')).toBe(true);
    done();
  });

  it('should update the isOpen state property to true when navtoggler is clicked', (done) => {
    const wrapper = shallow(<Navbar />);
    const button = wrapper.find('#nav-icon');
    button.simulate('click');
    expect(Navbar.prototype.toggleOpen.calledOnce).toBe(true);
    expect(wrapper.state().isOpen).toBe(true);
    done();
  });
});
