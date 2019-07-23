import React from 'react'
import PropTypes from 'prop-types';
import MessageItem from './MessageItem';

const MessageList = (props) => {
  const { 
    isLoading, messages, feedback, errors
  } = props;

  const formFeedback = feedback ? feedback : errors.error ? errors.error : '';


  const allMessages = messages.map(({message_id, subject, sender_id, message, photo, status}) => 
    <MessageItem 
      key={message_id}
      message_id={message_id}
      sender_id={sender_id}
      subject={subject}
      message={message}
      photo={photo}
      status={status}
    />
  )

  return (
    <main className="message-wrapper">
      <div className={isLoading ? '' : 'hide'} id="loader">
        <div className="sk-wave">
          <div className="sk-rect sk-rect1"></div>
          <div className="sk-rect sk-rect2"></div>
          <div className="sk-rect sk-rect3"></div>
          <div className="sk-rect sk-rect4"></div>
          <div className="sk-rect sk-rect5"></div>
        </div>
      </div>
      <div>
        <p className={formFeedback ? '' : isLoading ? 'hide' : ''} id="feedback">
          {formFeedback}
        </p>
      </div>

      <div className="message-container"> {allMessages} </div>
    </main>
  )
}

MessageList.propTypes = {
  messages: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  feedback: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
}

export default MessageList;
