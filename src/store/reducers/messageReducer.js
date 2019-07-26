import { 
  SET_ACTIVE_TAB,
  BEGIN_MSG_REQUEST,
  SET_RECEIVED_MESSAGES,
  SET_UNREAD_MESSAGES,
  SET_READ_MESSAGES,
  SET_SENT_MESSAGES,
  MSG_FEEDBACK,
  SEND_MSG_FEEDBACK,
  MSG_ERROR,
  REMOVE_MESSAGE_ALL,
  REMOVE_FEEDBACK
} from "../actions/types";

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
}

export default (state = initialState, action) => {
  const removeMsg = (id) => (state.allReceived.filter(message => message.message_id !== id));

  switch(action.type) {
    case SET_ACTIVE_TAB:
      return {
        ...state,
        activeMsgTab: action.payload,
      }
    case BEGIN_MSG_REQUEST:
      return {
        ...state,
        isLoading: true,
        feedback: '',
        errors: {}
      }
    case SET_RECEIVED_MESSAGES:
      return {
        ...state,
        isLoading: false,
        allReceived: action.payload
      }
    case SET_UNREAD_MESSAGES:
      return {
        ...state,
        isLoading: false,
        unread: action.payload
      }
    case SET_READ_MESSAGES:
      return {
        ...state,
        isLoading: false,
        read: action.payload
      }        
    case SET_SENT_MESSAGES:
      return {
        ...state,
        isLoading: false,
        sent: action.payload
      }
    case REMOVE_FEEDBACK:
      return {
        ...state,
        feedback: ''
      }
    case REMOVE_MESSAGE_ALL:
      return {
        ...state,
        isLoading: false,
        allReceived: removeMsg(action.payload)
      }   
    case MSG_ERROR:
      return {
        ...state,
        isLoading: false,
        errors: action.payload
      }
    case MSG_FEEDBACK:
      return {
        ...state,
        isLoading: false,
        feedback: action.payload
      }
    case SEND_MSG_FEEDBACK:
      return {
        ...state,
        isLoading: false,
        sendMsgFeedback: action.payload
      }
    default:
      return state
  }
};
