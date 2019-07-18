import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import jwtDecode from 'jwt-decode';
import { setCurrentUser } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token)
  const decoded = jwtDecode(localStorage.token);
  const { user, iat, exp } = decoded;
  store.dispatch(setCurrentUser({ ...user, iat, exp }));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/sign-up" component={SignUp} />
            <Route component={NotFound} />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App;

