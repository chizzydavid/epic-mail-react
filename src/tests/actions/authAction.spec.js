/* eslint-disable arrow-parens */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { signUpUser, loginUser } from '../../store/actions/authActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockUser = {
  firstName: 'Chizindu',
  lastName: 'David',
  userName: 'gr',
  email: 'chizzydavid@gmail.com',
  password: 'password',
  confirmPassword: 'password',
};

const userData = {
  email: 'chizzydavid@gmail.com',
  password: 'password',
};


describe('authAction', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });
  afterEach(() => {
    // clear all HTTP mocks after each test
    nock.cleanAll();
  });

  it('should decode user token when registerUser is successful', done => {
    nock('https://localhost:3000')
      .post('/api/users')
      .reply(201, {
        message: 'user registration was successful',
        user: {
          id: 24,
          firstName: 'chizzy',
          lastName: 'david',
          email: 'chizzydavid@gmail.com',
          userName: 'chizzy',
        },
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI0LCJlbWFpbCI6InByaW5jZXNzQGdtYWlsLmNvbSIsInVzZXJOYW1lIjoiZ3IiLCJpYXQiOjE1NjI1Mjg2NTcsImV4cCI6MTU2MzEzMzQ1N30.oWthtPvSh-zz4RwgHZsJtdxpjhHlUKix0oK1I9nqkOA',
      });
    return store.dispatch(signUpUser(mockUser)).then(() => {
      expect(store.getActions()).toMatchSnapshot();
      done();
    });
  });

  it('should handle errors returned from the request', done => {
    const errorMessage = 'This username is already in use';
    nock('https://localhost:3000')
      .post('/api/users')
      .reply(400, { error: errorMessage });

    return store.dispatch(signUpUser({})).then(() => {
      expect(store.getActions()).toMatchSnapshot();
      done();
    });
  });


  it('Logs in a user', () => {
    nock('https://localhost:3000')
      .post('/api/users', userData)
      .reply(200, {
        message: 'user registration was successful',
        user: {
          id: 24,
          firstName: 'chizzy',
          lastName: 'david',
          email: 'chizzydavid@gmail.com',
          userName: 'chizzy',
        },
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI0LCJlbWFpbCI6InByaW5jZXNzQGdtYWlsLmNvbSIsInVzZXJOYW1lIjoiZ3IiLCJpYXQiOjE1NjI1Mjg2NTcsImV4cCI6MTU2MzEzMzQ1N30.oWthtPvSh-zz4RwgHZsJtdxpjhHlUKix0oK1I9nqkOA',
      });

    return store.dispatch(loginUser(userData))
      .then(() => {
        const expectedActions = ['INIT_AUTH_REQUEST', 'SET_CURRENT_USER'];
        const dispatchedAction = store.getActions();
        const actionTypes = dispatchedAction.map(action => action.type);
        expect(actionTypes).toEqual(expectedActions);
        // expect(store.getActions()).toMatchSnapshot();

      });
  });

  it('Logs in a user', () => {
    nock('https://localhost:3000')
      .post('/api/users', {})
      .replyWithError();

    return store.dispatch(loginUser({}))
      .then(() => {
        const expectedActions = ['INIT_AUTH_REQUEST', 'AUTH_ERROR'];
        const dispatchedAction = store.getActions();

        const actionTypes = dispatchedAction.map(action => action.type);
        expect(actionTypes).toEqual(expectedActions);
        // expect(store.getActions()).toMatchSnapshot();
      });
  });
});
