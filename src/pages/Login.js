import React, { Component } from 'react'
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import TextInput from '../components/shared/TextInput';
import Button from '../components/shared/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { loginUser } from '../store/actions/authActions';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      validationErrors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateFormInput = this.validateFormInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { validationErrors } = this.state;
    this.setState({
      [e.target.name]: e.target.value,
      validationErrors: {
        ...validationErrors,
        [e.target.name]: '',
      },      
    })
  }

  validateFormInput() {
    let errors = {};
    const emailRegx = /^\S+@\S+\.[\w]+$/;

    Object.entries(this.state).forEach(([property, value]) => {
      const input = typeof value === 'string' ? value.trim() : '';

      switch(property) {
        case 'email':
          if (input.length === 0) {
            errors[property] = 'Email address is required'
          }
          else if (!emailRegx.test(input)) {
              errors[property] = 'Enter a valid email address'
          }
          break;          
        case 'password':
          if (input.length === 0) {
            errors[property] = 'Password is required'
          }
          break;
        default:
          break;     
      }
    });

    if (Object.keys(errors).length !== 0) {
      this.setState({
        validationErrors: {...errors}
      })
      return false;
    } else {
      this.setState({
        validationErrors: {}
      })
      return true;
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.validateFormInput()) {

      const newUser = Object.entries(this.state).reduce(
        (user, [property, input]) => {
          if (typeof input === 'string') {
            user[property] = input.trim();
          }
          return user;
        }, {})
      
      this.props.loginUser(newUser);
    }
  }

  render() {
    const { isLoading, isAuthenticated, errors } = this.props.auth;
    const { email, password } = this.state.validationErrors;

    if (isAuthenticated) {
      return <Redirect to="/dashboard" />;
    }        
    const authError = errors.error || '';

    return (
      <React.Fragment>
        <Navbar />
        <div className="container">    
          <form onSubmit={this.handleSubmit} id="form">
            <div>
              <h3> Login </h3>
              <span className="error" id="form-feedback">{authError}</span>

              <TextInput 
                error={email ? email : ''} 
                handleChange={this.handleChange} 
                type="text" 
                name="email" 
                placeholder="Enter email"
                label="Email" 
              />
              <TextInput 
                error={password ? password : ''} 
                handleChange={this.handleChange} 
                type="password" 
                name="password" 
                placeholder="Enter password"
                label="Password"
              />

              <Button
                type="submit"
                classname="submit"
                text={isLoading ? 'Please wait..' : 'Submit'}
              />              
              <p><Link className="sign-link forgot-password" to="/login">Forgot Password?</Link></p>  
              <p>Dont have an account yet? <Link className="sign-link" to="/sign-up">Sign Up</Link></p>
            </div>
          </form>
        </div>
        <Footer />
      </React.Fragment>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  loginUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
