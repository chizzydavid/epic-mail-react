import React from 'react';
import { shallow } from 'enzyme';
import MessagesList from '../../components/MessagesList';

function shallowSetup() {
  const props = {
    isLoading: false,
    messages: [
      {
        created_at: "July 23rd 2019, 2:47:12 am",
        message: "hey man mhey man man",
        message_id: 3,
        parent_msg_id: "0",
        photo: "default-user.png",
        sender_id: 2,
        status: "sent",
        subject: "hey chizzzy"
      },
      {
        created_at: "July 23rd 2019, 2:47:12 am",
        message: "hey man mhey man man",
        message_id: 3,
        parent_msg_id: "0",
        photo: "default-user.png",
        sender_id: 2,
        status: "sent",
        subject: "hey chizzzy"
      }
    ],
    feedback: 'no received messages',
    errors: {error: 'message not found'},
  }
  const enzymeWrapper = shallow(<MessagesList {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('Shallow rendered Message List', () => {
  it('should render message list component', () => {
    const { enzymeWrapper } = shallowSetup();
    expect(enzymeWrapper).toMatchSnapshot();
  });
});

