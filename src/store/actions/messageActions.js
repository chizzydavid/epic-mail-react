import {
  BEGIN_MSG_REQUEST,
  MSG_ERROR,
  MSG_FEEDBACK,
  SEND_MSG_FEEDBACK,
  SET_RECEIVED_MESSAGES,
  SET_UNREAD_MESSAGES,
  SET_READ_MESSAGES,
  SET_SENT_MESSAGES,
  SET_DRAFTS,
  SET_ACTIVE_TAB,
  REMOVE_MESSAGE_ALL
} from './types';
import { BASE_URL } from '../constants';
import axios from 'axios';

export const getMessages = (category) => dispatch => {
  dispatch({type: BEGIN_MSG_REQUEST}); 
  const msgCategory = category === 'all' ? '' : category;

  return axios.get(`${BASE_URL}messages/${msgCategory}`)
    .then(res => {
      dispatch(setActiveMsgTab(category));
      if (res.data.message) {
        dispatch(messageFeedback(res.data.message));
        return;
      }
      dispatch(setMessages(category, res.data.data));
    })
    .catch(err => {
      dispatch(messageError(err.response.data));
    });
}

export const sendMessage = (payload) => dispatch => {
  dispatch({type: BEGIN_MSG_REQUEST}); 

  axios.post(`${BASE_URL}messages/`, payload)
    .then((res) => {
      if (res.data.status === 201) {
        dispatch(sendMessageFeedback('Message sent successfully.'))
      }
      dispatch(setMessages('sent', res.data));
    })
    .catch(err => {
      dispatch(messageError(err.response.data))
    });
}

export const deleteMessage = (messageId) => dispatch => {
  dispatch({type: BEGIN_MSG_REQUEST}); 

  axios.delete(`${BASE_URL}messages/${messageId}`)
    .then((res) => {
      if (res.data.status === 200) {
        dispatch({
          type: REMOVE_MESSAGE_ALL,
          payload: messageId,
        });
      }
    })
    .catch(err => {
      dispatch(messageError(err.response.data))
    });
}

export const setActiveMsgTab = category  => {
  return {
    type: SET_ACTIVE_TAB,
    payload: category
  }
}

export const setMessages = (category, payload) => {
  let type = category === 'all' ? SET_RECEIVED_MESSAGES : 
    category === 'unread' ? SET_UNREAD_MESSAGES : 
    category === 'read' ? SET_READ_MESSAGES : 
    category === 'sent' ? SET_SENT_MESSAGES : 
    category === 'drafts' ? SET_DRAFTS : '';

  return {
    type: type,
    payload: payload
  }
}

export const messageError = payload => {
  return {
    type: MSG_ERROR,
    payload: payload
  }
}

export const messageFeedback = payload => {
  return {
    type: MSG_FEEDBACK,
    payload: payload
  }
}

export const sendMessageFeedback = payload => {
  return {
    type: SEND_MSG_FEEDBACK,
    payload: payload
  }
}
