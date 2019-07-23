import { 
    SET_ACTIVE_TAB,
    BEGIN_MSG_REQUEST,
    SET_RECEIVED_MESSAGES,
    SET_UNREAD_MESSAGES,
    SET_READ_MESSAGES,
    SET_SENT_MESSAGES,
    SET_DRAFTS,
    MSG_FEEDBACK,
    MSG_ERROR
  } from "../actions/types";

  const initialState = {
    isLoading: false,
    activeMsgTab: 'all',
    allReceived: [],
    unread: [],
    read: [],
    sent: [],
    drafts: [],
    feedback: '',
    errors: {}
  }

  export default (state = initialState, action) => {
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
      case SET_DRAFTS:
        return {
          ...state,
          isLoading: false,
          drafts: action.payload
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
      default:
        return state
    }
  };

