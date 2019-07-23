import React, { Component } from 'react'
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import MessagesContainer from '../components/MessagesContainer';

class Dashboard extends Component {

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <MessagesContainer />
        <Footer />
      </React.Fragment>
    )
  }
}

export default Dashboard;
