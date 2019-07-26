import React, { Component } from 'react'
import Navbar from '../components/shared/Navbar';
import Button from '../components/shared/Button';
import Footer from '../components/shared/Footer';
import TextInput from '../components/shared/TextInput';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendMessage } from '../store/actions/messageActions';

export class Compose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipient: '',
      subject: '',
      message: '',
      validationErrors: {},
    }
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
        case 'recipient':
          if (input.length === 0) {
            errors[property] = 'Message recipient is required'
          }
          else if(!emailRegx.test(input)) {
            errors[property] = 'Invalid email address for recipient'
          }
          break;
        case 'subject':
          if (input.length === 0) {
            errors[property] = 'Subject is required'
          }
          break;
        case 'message':
          if (input.length === 0) {
            errors[property] = 'Enter a message body'
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

      const newMessage = Object.entries(this.state).reduce(
        (user, [property, input]) => {
          if (typeof input === 'string') {
            user[property] = input.trim();
          }
          return user;
        }, {})

      this.props.sendMessage(newMessage);
    }
  }

  render() {
    const { recipient, subject, message } = this.state.validationErrors;
    const { isLoading, sendMsgFeedback, errors } = this.props.messages;
    const [formFeedback, feedbackClass] = sendMsgFeedback ? [sendMsgFeedback, 'success'] : 
      errors.error ? [errors.error, 'error'] : '';

    return (
      <React.Fragment>
        <Navbar />
        <div className="compose-container">
          <p className="close-icon"> 
            <i
              onClick={this.props.close} 
              className="fa fa-close"
            >
            </i>
          </p>
          <div className="c-container">
            <form onSubmit={this.handleSubmit} id="send-message-form">
              <h3 className="">Create New Message</h3>
              <div>
                <p className={feedbackClass} id="form-feedback">{formFeedback}</p>

                <TextInput 
                  error={recipient ? recipient : ''} 
                  handleChange={this.handleChange} 
                  type="text" 
                  name="recipient"
                  placeholder="Enter Recipient"
                  label="To" 
                />

                <TextInput 
                  error={subject ? subject : ''} 
                  handleChange={this.handleChange} 
                  type="text" 
                  name="subject" 
                  placeholder="Subject" 
                  label="Subject" 
                />

                <p className="label">Message <i className="fa fa-asterisk"></i></p>
                <textarea onChange={this.handleChange} name="message" placeholder="Message" rows="8" cols="30"></textarea>
                <span className="error">{message ? message : ''}</span>
                
                <div id="compose-btn-wrapper"> 
                  <Button
                    id="send-message"
                    type="submit"
                    classname="submit"
                    text={isLoading ? 'Please wait..' : 'Send Message'}
                  />
                </div>
              </div>
            </form>
          </div>
        
        </div>
        <Footer />
      </React.Fragment>
    )
  }
}

Compose.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  messages: PropTypes.object.isRequired,
  close: PropTypes.func
}

const mapStateToProps = (state) => ({
  messages: state.messages,
});

const mapDispatchToProps = {
  sendMessage
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Compose);
