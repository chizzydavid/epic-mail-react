import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setActiveMsgTab } from '../store/actions/messageActions';

export class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (e.target.tagName === 'I') {
      this.props.handleClick(e.target.parentElement.id);
      return;
    }
    this.props.handleClick(e.target.id);
  }

	render() {
    const { activeMsgTab } = this.props;

		return (
      <aside className="messages-nav">
        <Link to="/compose">
          <p id="compose-btn">Compose <i className="fa fa-plus"> </i></p>
        </Link>

        <div id="nav-wrapper">
          <div id="btn-wrapper"> <i id="inbox-nav-btn" className="fa fa-caret-down"> </i></div>
          <ul>
            <li onClick={this.handleClick} id="all" className={activeMsgTab === 'all' ? 'active' : ''}>
              <i className="fa fa-folder"> </i>All Received</li>

            <li onClick={this.handleClick} id="unread" className={activeMsgTab === 'unread' ? 'active' : ''}>
              <i className="fa fa-envelope"> </i>Unread</li>

            <li onClick={this.handleClick} id="read" className={activeMsgTab === 'read' ? 'active' : ''}>
              <i className="fa fa-envelope-open"> </i>Read</li>

            <li onClick={this.handleClick} id="sent" className={activeMsgTab === 'sent' ? 'active' : ''}>
              <i className="fa fa-send"> </i>Sent</li>

            <li onClick={this.handleClick} id="draft" className={activeMsgTab === 'draft' ? 'active' : ''}>
              <i className="fa fa-edit"> </i>Drafts</li>
          </ul>
        </div>
      </aside>
		)
	}
}

Sidebar.propTypes = {
  setActiveMsgTab: PropTypes.func.isRequired,
  activeMsgTab: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  activeMsgTab: state.messages.activeMsgTab,
});

const mapDispatchToProps = {
  setActiveMsgTab
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);

