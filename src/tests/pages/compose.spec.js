import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { Compose } from '../../pages/Compose';
import { sendMessage } from '../../store/actions/messageActions';

function shallowSetup() {
  const props = {
    messages: {
      isLoading: false,
      activeMsgTab: 'all',
      allReceived: [],
      unread: [],
      read: [],
      sent: [],
      feedback: '',
      sendMsgFeedback: '',
      errors: {
        error: 'Message recipient does not exist',
      },
    },
    sendMessage,
    close: () => {}
  };
  const enzymeWrapper = shallow(<Compose {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('Compose component', () => {
  it('should render compose correctly', () => {
    const { enzymeWrapper, props: { messages: {errors: {error} } } } = shallowSetup();
    expect(enzymeWrapper).toMatchSnapshot();
    expect(enzymeWrapper.find('#form-feedback').text()).toBe(error);
  });
});

describe('Compose component methods', () => {
  beforeEach(() => {
    sinon.spy(Compose.prototype, 'handleChange');
    sinon.spy(Compose.prototype, 'handleSubmit');
  });

  afterEach(() => {
    Compose.prototype.handleChange.restore();
    Compose.prototype.handleSubmit.restore();
  });

  it('should call handlechange ', () => {
    const { enzymeWrapper } = shallowSetup();

    enzymeWrapper.find('TextInput').first().dive().find('input')
    .simulate('change', {
      target: {
        value: 'davidchizindu@gmail.com',
        name: 'recipient',
      },
    });
    expect(enzymeWrapper.state().recipient).toEqual('davidchizindu@gmail.com');
    expect(Compose.prototype.handleChange.calledOnce).toBe(true);
  });

  it('should call handlesubmit', () => {
    const { enzymeWrapper } = shallowSetup();
    enzymeWrapper.setState({
      recipient: 'davidchizindu@gmail.com',
      subject: 'How You Man',
      message: 'How is everything going',
    });

    const form = enzymeWrapper.find('#send-message-form');
    const mockedEvent = {
      target: {},
      preventDefault: () => ({}),
    };

    form.simulate('submit', mockedEvent);
    expect(Compose.prototype.handleSubmit.calledOnce).toBe(true);
  });

  it('should handle validation after form is submitted', () => {
    const { enzymeWrapper } = shallowSetup();
    enzymeWrapper.setState({
      recipient: '',
      subject: '',
      message: '',
    });

    const form = enzymeWrapper.find('#send-message-form');
    const mockedEvent = {
      target: {},
      preventDefault: () => ({}),
    };

    form.simulate('submit', mockedEvent);
    expect(Compose.prototype.handleSubmit.calledOnce).toBe(true);
  });
});
