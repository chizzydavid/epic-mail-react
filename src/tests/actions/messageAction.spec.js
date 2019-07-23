/* eslint-disable arrow-parens */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { 
  getMessages, 
  setActiveMsgTab, 
  setMessages, 
  messageError, 
  messageFeedback 
} from '../../store/actions/messageActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('authAction', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });
  afterEach(() => {
    nock.cleanAll();
  });

  it('should retrieve messages of different categories', done => {
    nock('https://localhost:3000')
      .get('/api/messgages')
      .reply(200, []);

    return store.dispatch(getMessages('all')).then(() => {
      expect(store.getActions()).toMatchSnapshot();
      done();
    });
  });

  it('should set active message tab', () => {
    store.dispatch(setActiveMsgTab('sent'));
    expect(store.getActions()).toMatchSnapshot();
  });

  it('should set messages', () => {
    store.dispatch(setMessages('drafts', []));
    expect(store.getActions()).toMatchSnapshot();
  });

  it('should set messages error', () => {
    store.dispatch(messageError({}));
    expect(store.getActions()).toMatchSnapshot();
  });

  it('should set messages feedback', () => {
    store.dispatch(messageFeedback({}));
    expect(store.getActions()).toMatchSnapshot();
  });  

});
