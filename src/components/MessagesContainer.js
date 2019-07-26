import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Sidebar from './Sidebar';
import MessagesList from './MessagesList';
import { getMessages, deleteMessage } from '../store/actions/messageActions';

export class MessagesContainer extends Component {
  componentDidMount() {
    this.props.getMessages('all');
  }

  handleTabChange = (category) => {
    this.props.getMessages(category);
  }

  handleDelete = (id) => {
    this.props.deleteMessage(id);
  }

  render() {
    const { 
      isLoading, activeMsgTab, feedback, allReceived, unread, read, sent, errors 
    } = this.props.messages;
  
    const { isAuthenticated, open } = this.props;
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
      case 'unread':
        headerName = 'Unread Messages';
        sortedMessages = unread;
        break;      
      case 'read':
        headerName = 'Read Messages';
        sortedMessages = read;
        break;  
      case 'sent':
        headerName = 'Sent Messages';
        sortedMessages = sent;
        break;
      default:
        break;
    }

		return (
			<div id="messages-wrapper">
        <h2 className="msg-header">{headerName}</h2>

        <div className="main-container">
          <Sidebar
            open={open}
            handleClick={this.handleTabChange}
          />
          <MessagesList
            isLoading={isLoading}
            feedback={feedback}
            errors={errors}
            messages={sortedMessages}
            handleDelete={this.handleDelete}
            userId={this.props.userId}
          />
        </div>
			</div>
		)
	}
}

MessagesContainer.propTypes = {
  messages: PropTypes.object.isRequired,
  getMessages: PropTypes.func.isRequired,
  deleteMessage: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  userId: PropTypes.number.isRequired,
  open: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  messages: state.messages,
  isAuthenticated: state.auth.isAuthenticated,
  userId: state.auth.user.user_id
});

const mapDispatchToProps = {
  getMessages,
  deleteMessage
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesContainer);

