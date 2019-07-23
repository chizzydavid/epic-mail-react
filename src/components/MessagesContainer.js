import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Sidebar from './Sidebar';
import MessagesList from './MessagesList';
import { getMessages } from '../store/actions/messageActions';

export class MessagesContainer extends Component {
  componentDidMount() {
    this.props.getMessages('all');
  }

  handleTabChange = (category) => {
    this.props.getMessages(category);
  }

  render() {
    const { 
      isLoading, activeMsgTab, feedback, allReceived, unread, read, sent, drafts, errors 
    } = this.props.messages;
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }  
    let headerName;
    let sortedMessages;

    switch (activeMsgTab) {
      case 'all':
        headerName = 'All Received Messages';
        sortedMessages = allReceived;
        break;
      case 'read':
        headerName = 'Unread Messages';
        sortedMessages = unread;
        break;      
      case 'unread':
        headerName = 'Read Messages';
        sortedMessages = read;
        break;  
      case 'sent':
        headerName = 'Sent Messages';
        sortedMessages = sent;
        break;  
      case 'draft':
        headerName = 'Drafts';
        sortedMessages = drafts;
        break;
      default:
        break;
    }

		return (
			<div id="messages-wrapper">
        <h2 className="msg-header">{headerName}</h2>

        <div className="main-container">
          <Sidebar 
            handleClick={this.handleTabChange}
          />
          <MessagesList
            isLoading={isLoading}
            feedback={feedback}
            errors={errors}
            messages={sortedMessages}
          />
        </div>
			</div>
		)
	}
}

MessagesContainer.propTypes = {
  messages: PropTypes.object.isRequired,
  getMessages: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  messages: state.messages,
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {
  getMessages
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesContainer);

