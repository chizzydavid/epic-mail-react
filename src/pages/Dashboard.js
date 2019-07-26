import React, { Component } from 'react'
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import MessagesContainer from '../components/MessagesContainer';
import Compose from './Compose';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowing: false
    }

    this.openMsgCompose = this.openMsgCompose.bind(this);
    this.closeMsgCompose = this.closeMsgCompose.bind(this);
  }

  openMsgCompose() {
    this.setState({
      isShowing: true,
    })
  }

  closeMsgCompose() {
    this.setState({
      isShowing: false,
    })
  }

  render() {
    return (
      <React.Fragment>
        <Navbar
          open={this.openMsgCompose}
        />
        {this.state.isShowing && 
          <Compose
            close={this.closeMsgCompose}
          />
        }
        <MessagesContainer 
          open={this.openMsgCompose}        
        />
        <Footer />
      </React.Fragment>
    )
  }
}

export default Dashboard;
