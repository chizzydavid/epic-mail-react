import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import whiteLogo from '../../img/epic_logo_white.png';
import darkLogo from '../../img/epic_logo.png';

export class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			responsiveMode: false,
			isOpen: false,
		}
		this.setResponsiveMode = this.setResponsiveMode.bind(this);
		this.toggleOpen = this.toggleOpen.bind(this);
		this.logout = this.logout.bind(this);
	}

	componentDidMount() {
		this.setResponsiveMode();
		window.addEventListener('resize', this.setResponsiveMode);
	}

	setResponsiveMode() {
		if (window.innerWidth <= 760) {
			this.setState({
				responsiveMode: true
			})
		} else {
			this.setState({
				responsiveMode: false
			})
		}
	}

	toggleOpen() {
		const { isOpen } = this.state;
		this.setState({
			isOpen: !isOpen
		})
	}

	logout() {
		localStorage.removeItem('token');
		return <Redirect to="/login" />;
	}

	render() {
		const { responsiveMode, isOpen } = this.state;
		const { isAuthenticated } = this.props;
		const { home } = this.props;

		const logo = home ? darkLogo : whiteLogo;
		const navbarClassname = () => {
			let classname = 'navbar';
			classname = responsiveMode ? `responsive ${classname}` : classname;
			classname = isOpen ? `open ${classname}` : classname;
			return classname;
		}

    let NavbarLinks = isAuthenticated && !home ? 
    (
      <React.Fragment>
        <Link to="/dashboard">INBOX</Link>
        <Link onClick={this.props.open}>COMPOSE</Link>
        <Link onClick={this.logout}>LOGOUT</Link>         
      </React.Fragment>
    ) : (
        <React.Fragment>
          <Link to="/sign-up">SIGN UP</Link>
          <Link id={home ? "login-nav" : ''} to="/login">LOGIN</Link>            
        </React.Fragment>
    )

		return (
			<nav className="nav-container" id={home ? "home-nav" : "page-nav"}>
				<div className="brand-icon">
					<p className="logo"><img className="logo-img" src={logo}/></p>

					<i 
						id={home ? "nav-icon-home" : "nav-icon"} 
						className={isOpen ? 'fa fa-times': 'fa fa-bars'}
						onClick={this.toggleOpen}
					>
					</i>

				</div>

				<div 
					className={navbarClassname()}
					id="navigation" 
					data-view={home ? "home" : "page"}
				>
					{NavbarLinks}
				</div>
			</nav>
		)
	}
}

Navbar.propTypes = {
  home: PropTypes.bool,
	isAuthenticated: PropTypes.bool,
	open: PropTypes.func
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
  mapStateToProps,
  {}
)(Navbar);