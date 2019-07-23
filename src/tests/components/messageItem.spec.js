import React from 'react';
import { shallow } from 'enzyme';
import MessageItem from '../../components/MessageItem';

function shallowSetup() {
  const props = {
    message_id: 1,
    subject: 'How to make test',
    sender_id: 2,
    status: 'sent',
    message: 'fastest way to make tests pass',
    photo: "https://www.photos.com/a_photo",
  }
  const enzymeWrapper = shallow(<MessageItem {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('Shallow rendered Message Item', () => {
  it('should render message item component', () => {
    const { enzymeWrapper } = shallowSetup();
    expect(enzymeWrapper).toMatchSnapshot();
  });
});

