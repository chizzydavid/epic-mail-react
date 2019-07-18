import { 
    AUTH_ERROR,
    INIT_AUTH_REQUEST,
    SET_CURRENT_USER
  } from "../actions/types";
  import isEmpty from '../utils/isEmpty';
  
  const initialState = {
    isAuthenticated: false,
    isLoading: false,
    user: {},
    errors: {}
  }
  
  export default (state = initialState, action) => {
    switch(action.type) {
      case INIT_AUTH_REQUEST:
        return {
          ...state,
          isLoading: true,
          errors: {}
        }
      case SET_CURRENT_USER:
        return {
          ...state,
          isLoading: false,
          isAuthenticated: !isEmpty(action.payload),
          user: action.payload
        }
      case AUTH_ERROR:
        return {
          ...state,
          isLoading: false,
          errors: action.payload
        }
      default:
        return state
    }
  };