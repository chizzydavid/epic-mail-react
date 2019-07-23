import {
  BEGIN_MSG_REQUEST,
  MSG_ERROR,
  MSG_FEEDBACK,
  SET_RECEIVED_MESSAGES,
  SET_UNREAD_MESSAGES,
  SET_READ_MESSAGES,
  SET_SENT_MESSAGES,
  SET_DRAFTS,
  SET_ACTIVE_TAB
} from './types';
import axios from 'axios';

const msgUrl = `https://chizzy-epicmail.herokuapp.com/api/v2/messages/`

export const getMessages = (category) => dispatch => {
  dispatch({type: BEGIN_MSG_REQUEST}); 

  const msgCategory = category === 'all' ? '' : category;

  return axios.get(`${msgUrl}${msgCategory}`)
    .then(res => {
      dispatch(setActiveMsgTab(category));
      if (res.data.message) {
        dispatch(messageFeedback(res.data.message));
        return;
      }
      console.log(res.data.data);
      dispatch(setMessages(category, res.data.data));
    })
    .catch(err => {
      dispatch(messageError(err.response.data));
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
