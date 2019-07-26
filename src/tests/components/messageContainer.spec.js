import React from 'react';
import { shallow } from 'enzyme';
import { MessagesContainer } from '../../components/MessagesContainer';

let props = {
  isAuthenticated: true,
  messages: {
    isLoading: false,
    feedback: '',
    activeMsgTab: 'read',
    allReceived: [],
    unread: [],
    read: [],
    sent: [],
    errors: {}
  },
  getMessages: () => {}
}

describe('Shallow rendered Message Container', () => {
  it('should render component when read category is active', () => {
    const enzymeWrapper = shallow(<MessagesContainer {...props} />);
    expect(enzymeWrapper).toMatchSnapshot();
  });

  it('should render component when unread category is active', () => {
    props = {
      ...props,
      messages: {
        ...props.messages,
        activeMsgTab: 'unread'
      }
    }
    const enzymeWrapper = shallow(<MessagesContainer {...props} />);
    expect(enzymeWrapper).toMatchSnapshot();
  });
  it('should render component when unread category is active', () => {
    props = {
      ...props,
      messages: {
        ...props.messages,
        activeMsgTab: 'all'
      }
    }
    const enzymeWrapper = shallow(<MessagesContainer {...props} />);
    expect(enzymeWrapper).toMatchSnapshot();
  });

  it('should render component when unread category is active', () => {
    props = {
      ...props,
      messages: {
        ...props.messages,
        activeMsgTab: 'sent'
      }
    }
    const enzymeWrapper = shallow(<MessagesContainer {...props} />);
    expect(enzymeWrapper).toMatchSnapshot();
  });

  it('should render component when unread category is active', () => {
    props = {
      ...props,
      messages: {
        ...props.messages,
        activeMsgTab: 'draft'
      }
    }
    const enzymeWrapper = shallow(<MessagesContainer {...props} />);
    expect(enzymeWrapper).toMatchSnapshot();
  });

});
