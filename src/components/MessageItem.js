import React from 'react'
import PropTypes from 'prop-types';

const MessageItem = (props) => {
  const imgUrl = `https://res.cloudinary.com/chizzydavid/image/upload/`;
  
  const {
    message_id, subject, status, email, sender_id, message, photo 
  } = props

	const id = Number(message_id);
  const msgBody = message.length >= 70 ? `${message.substr(0, 70)}...` : message;
  const type = Number(2) === sender_id ? 'sent' : 'received';
  const msgStatus = status.replace(status[0], status[0].toUpperCase());
  const userImg = `${imgUrl}${photo}`;
  return (
		<div className="message" data-message-id={id} data-message-type={type} data-message-status={status}>

			<div className="message-img">
				<img src={userImg} id="msg-sender-img"/>
			</div>

			<div className="message-text">
				<h4 className={status == 'unread' ? 'message-title unread' : 'message-title'}> {subject}	</h4>
	
				<div className="msg-body"> 
					<p className="msg-excerpt">{msgBody}</p>
					<div className="msg-details">
						<p>Status: <span className={'status-' + status + 'msg-status'}>{msgStatus} </span> </p>

						<div className="msg-buttons">
							{status === 'draft' ? (
								<React.Fragment>
									<i id={id} data-draft-receiver={email} className="edit-draft fa fa-edit"></i>
									<p className="hide">  {message}  </p>									
								</React.Fragment>
							) : '' }
							
							{type === 'sent' && status !== 'draft'
							? (<i id={id} className="retract-message fa fa-undo"></i>) : '' }
							<i id="${id}" data-message-type="${type}" className="delete-message fa fa-trash"></i>
						</div>            
					</div> 
				</div>    
			</div>
		</div>
  )
};

MessageItem.propTypes = {
  message_id: PropTypes.number.isRequired,
  subject: PropTypes.string.isRequired,
  email: PropTypes.string,
  sender_id: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  status: PropTypes.string,
  photo: PropTypes.string.isRequired
}

export default MessageItem
