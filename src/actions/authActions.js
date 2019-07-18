import { 
  SET_CURRENT_USER, 
  AUTH_ERROR, 
  INIT_AUTH_REQUEST 
} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

const authUrl = `https://chizzy-epicmail.herokuapp.com/api/v2/auth/`;

export const signUpUser = (payload) => dispatch => {
  dispatch({type: INIT_AUTH_REQUEST}); 

  axios.post(`${authUrl}signup`, payload)
    .then((res) => {
      const { token, user } = res.data.data;
      localStorage.setItem('token', token);

      setAuthToken(token);
      dispatch(setCurrentUser(user));
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data
      });
    });
}

export const setCurrentUser = payload => {
  return {
    type: SET_CURRENT_USER,
    payload: payload
  }
}
