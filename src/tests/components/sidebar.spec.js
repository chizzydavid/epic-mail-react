import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { Sidebar } from '../../components/Sidebar';

function shallowSetup() {
  const props = {
    activeMsgTab: 'read',
    setActiveMsgTab: () => {},
    handleClick: () => {},
  }
  const enzymeWrapper = shallow(<Sidebar {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('Sidebar component', () => {
  beforeEach(() => {
    sinon.spy(Sidebar.prototype, 'handleClick');
  });

  afterEach(() => {
    Sidebar.prototype.handleClick.restore();
  });

  it('should render sidebar component', () => {
    const { enzymeWrapper } = shallowSetup();
    expect(enzymeWrapper).toMatchSnapshot();
  });

  it('should call handleclick ', () => {
    const { enzymeWrapper } = shallowSetup();

    enzymeWrapper.find('li').first().simulate('click', {
      target: {
        id: 'read',
      },
    });
    expect(Sidebar.prototype.handleClick.calledOnce).toBe(true);
  });

  it('should call handleclick ', () => {
    const { enzymeWrapper } = shallowSetup();

    enzymeWrapper.find('li').first().simulate('click', {
      target: {
        tagName: 'I',
        parentElement: { id: 'read' }

      },
    });
    expect(Sidebar.prototype.handleClick.calledOnce).toBe(true);
  });

});

