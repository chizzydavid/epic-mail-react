import React, { Component } from 'react'
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import TextInput from '../components/shared/TextInput';
import Button from '../components/shared/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { signUpUser } from '../store/actions/authActions';

export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateFormInput = this.validateFormInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { errors } = this.state;

    this.setState({
      [e.target.name]: e.target.value,
      errors: {
        ...errors, 
        [e.target.name]: '',
      },
    })
  }

  validateFormInput() {
    let errors = {};
    const nameRegx = /^[a-zA-Z]{2,}$/;
    const emailRegx = /^\S+@\S+\.[\w]+$/;
    const passwordRegx = /^[\w]{6,20}$/;

    Object.entries(this.state).forEach(([property, value]) => {
      const input = typeof value === 'string' ? value.trim() : '';

      switch(property) {
        case 'firstName':
          if (input.length === 0) {
            errors[property] = 'First name is required'
          }
          else if(!nameRegx.test(input)) {
            errors[property] = 'First name must be at least 2 characters in length and contain only letters.'
          }
          break;
        case 'lastName':
          if (input.length === 0) {
            errors[property] = 'Last name is required.'
          }
          else if(!nameRegx.test(input)) {
            errors[property] = 'Last name must be at least 2 characters in length and contain only letters.'
          }          
          break;
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
        else if (!passwordRegx.test(input)) {
            errors[property] = 'Password must be at least 6 characters in length and contain only letters and numbers '
          }
          break;
        case 'confirmPassword':
          if (this.state.password !== input) {
            errors[property] = 'Your two passwords dont match.'
          }
          break;
        default:
          break;     
      }
    });

    if (Object.keys(errors).length !== 0) {
      this.setState({
        errors: {...errors}
      })
      return false;
    } else {
      this.setState({ errors: {} })
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

      this.props.signUpUser(newUser);
    }
  }

  render() {
    const { isLoading, isAuthenticated, errors } = this.props.auth;
    if (isAuthenticated) {
      return <Redirect to="/dashboard" />;
    }    
    const { 
      firstName, lastName, email, password, confirmPassword 
    } = this.state.errors;
    
    const authError = errors.error || '';

    return (
      <React.Fragment>
        <Navbar />
        <div className="container">    
          <form onSubmit={this.handleSubmit} id="form" encType="multipart/form-data">
            <div>
              <h3> Create Account</h3>
              <span className="error" id="form-feedback">{authError}</span>

              <TextInput 
                error={firstName ? firstName : ''} 
                handleChange={this.handleChange} 
                type="text" 
                name="firstName" 
                placeholder="First name" 
                label="First Name" 
              />

              <TextInput 
                error={lastName ? lastName : ''} 
                handleChange={this.handleChange} 
                type="text" 
                name="lastName" 
                placeholder="Last name" 
                label="Last Name" 
              />

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

              <TextInput 
                error={confirmPassword ? confirmPassword : ''} 
                handleChange={this.handleChange} 
                type="password" 
                name="confirmPassword" 
                placeholder="Confirm password" 
                label="Confirm Password" 
              />


              <p className="label">Upload Image</p>
              <img  width="150px" id="image-preview" />        
              <input id="image-upload" name="photo" type="file" accept="image/*" />

              <Button
                type="submit"
                classname="submit"
                text={isLoading ? 'Please wait..' : 'Submit'}
              />
              <p>Already have an account? <Link className="sign-link" to="/login">Log In</Link></p>
            </div>
          </form>
        </div>
        <Footer />
      </React.Fragment>
    )
  }
}

SignUp.propTypes = {
  signUpUser: PropTypes.func.isRequired,
  auth: PropTypes.object
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  signUpUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SignUp));
