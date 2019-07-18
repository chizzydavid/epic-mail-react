import React, { Component } from 'react'
import { Link } from 'react-router-dom';

// import { logoutUser } from '../../actions/authActions';

class Navbar extends Component {
	render() {
    const { home } = this.props;

    const logoUrl = `./src/img/epic_logo${home ? ".png" : "_white.png"}`;
    
    let NavbarLinks = (
        <React.Fragment>
          <Link to="/sign-up">SIGN UP</Link>
          <Link id="login-nav" to="/login">LOGIN</Link>            
        </React.Fragment>
    )

		return (
			<nav className="nav-container" id={home ? "home-nav" : "page-nav"}>
				<div className="brand-icon">
					<p className="logo"><img className="logo-img" src={logoUrl}/></p>
					<i id={home ? "nav-icon-home" : "nav-icon"} className="fa fa-bars"></i>
				</div>

				<div className="navbar" id="navigation" data-view={home ? "home" : "page"}>
					{NavbarLinks}
				</div>
			</nav>
		)
	}
}

export default Navbar;
