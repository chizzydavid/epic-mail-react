import messageReducer from '../../store/reducers/messageReducer';
import { setCurrentUser } from '../../store/actions/authActions';

const initialState = {
  isLoading: false,
  activeMsgTab: 'all',
  allReceived: [],
  unread: [],
  read: [],
  sent: [],
  feedback: '',
  sendMsgFeedback: '',
  errors: {}
};

const allMessages = [
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
];

describe('Message Reducers', () => {
  it('should return initial state', () => {
    const newState = messageReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it('should handle BEGIN_MSG_REQUEST', () => {
    const newState = messageReducer(initialState, {
      type: 'BEGIN_MSG_REQUEST',
    });

    expect(newState).toEqual({ 
      ...initialState,
      isLoading: true, 
      feedback: '', 
      errors: {} 
    });
  });

  it('should handle SET_ACTIVE_TAB', () => {
    const newState = messageReducer(initialState, {
      type: 'SET_ACTIVE_TAB',
      payload: 'sent'
    });

    expect(newState).toEqual({ ...initialState, activeMsgTab: 'sent' });
  });

  it('should handle SET_RECEIVED_MESSAGES', () => {
    const newState = messageReducer(initialState, {
      type: 'SET_RECEIVED_MESSAGES',
      payload: allMessages
    });

    expect(newState).toEqual({ 
      ...initialState,
      isLoading: false, 
      allReceived: allMessages, 
    });
  });

  it('should handle SET_UNREAD_MESSAGES', () => {
    const newState = messageReducer(initialState, {
      type: 'SET_UNREAD_MESSAGES',
      payload: allMessages
    });

    expect(newState).toEqual({ 
      ...initialState,
      isLoading: false, 
      unread: allMessages,
    });
  });
  
  it('should handle SET_READ_MESSAGES', () => {
    const newState = messageReducer(initialState, {
      type: 'SET_READ_MESSAGES',
      payload: allMessages
    });

    expect(newState).toEqual({ 
      ...initialState,
      isLoading: false, 
      read: allMessages, 
    });
  });

  it('should handle SET_SENT_MESSAGES', () => {
    const newState = messageReducer(initialState, {
      type: 'SET_SENT_MESSAGES',
      payload: allMessages
    });

    expect(newState).toEqual({ 
      ...initialState,
      isLoading: false, 
      sent: allMessages, 
    });
  });

  it('should handle MSG_ERROR', () => {
    const newState = messageReducer(initialState, {
      type: 'MSG_ERROR',
      payload: {status: 404, message: 'This message does not exist'}
    });

    expect(newState).toEqual({ 
      ...initialState,
      isLoading: false, 
      errors: {status: 404, message: 'This message does not exist'}, 
    });
  });

  it('should handle MSG_FEEDBACK', () => {
    const newState = messageReducer(initialState, {
      type: 'MSG_FEEDBACK',
      payload: 'You have no received messages'
    });

    expect(newState).toEqual({ 
      ...initialState,
      isLoading: false, 
      feedback: 'You have no received messages', 
    });
  });
  
});
