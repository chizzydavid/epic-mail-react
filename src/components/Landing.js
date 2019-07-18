import React, { Component } from 'react'
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <React.Fragment>
      <div id="background" className="header-text">
        <p className="banner-header">Welcome to <strong>Epic Mail</strong></p>
        <p className="sub-text">An exceptional email delivery service</p>

        <div id="buttons">
          <Link className="start-btn" to="/sign-up">SIGN UP</Link>
          <a className="start-btn transparent" href="#about">LEARN MORE</a>        
          <p>Already have an account? <Link className="sign-link" to="/login">Log In</Link></p>  
        </div>
      </div>

      <section className="" id="about"> 
        <div className="about-text"> 
          <h2 className="subhead">Getting Started</h2>
            <p> Epic Mail is an excellent application designed to make sending and receiving email messages a lot easier and fun. Built using the latest web technologies and current best practices to optimize performance and ensure a great user experience.
          </p>
        </div>

        <div className=" about-row">
          <div className="about-item" >
            <div className=""><i className="fa fa-sign-in"></i></div>
            <div>
              <h3>Create Account</h3>
              <p>Click the sign up button above to create an account, fill the form with the required information, you could also choose to upload a picture of yourself or not. And then click submit. </p>
            </div> 
          </div>

          <div className="about-item" >
            <div className=""><i className="fa fa-user"></i></div>
            <div>
              <h3>Login</h3>
              <p>Login in with the email address and password used in creating your account. Then go on to enjoy all the incredible features of this application. </p>
            </div> 
          </div>

          <div className="about-item" >
            <div className=""><i className="fa fa-envelope"></i></div>
            <div>
              <h3>Send Messages</h3>
              <p>Create and send emails to either an individual or a select group of persons. If you wish you can save said message as a draft and come back later on to finish. </p>
            </div> 
          </div>


        </div>
      </section>
    </React.Fragment>
  )
}

export default Landing
