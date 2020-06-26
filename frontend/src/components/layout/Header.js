import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

export class Header extends Component {
	static propTypes = {
		auth: PropTypes.object.isRequired,
		logout: PropTypes.func.isRequired,
	}

	render() {
		const { isAuthenticated, user } = this.props.auth;

		const authLinks = (
			<span className="nav-item">
				<button onClick={this.props.logout} className="nav-link btn btn-info">Logout</button>
			</span>
		);

		const guestLinks = (
			<Fragment>
				<span className="nav-item">
					<Link to="/register" className="nav-link">Register</Link>
				</span>
				<span className="nav-item">
					<Link to="/login" className="nav-link">Login</Link>
				</span>
			</Fragment>
		);

		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<a className="navbar-brand" href="#">BCData</a>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item active">
							<a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">Features</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">Pricing</a>
						</li>
					</ul>
				</div>
				<div id="leftMenu">
					<span className="navbar-text mr-3">{isAuthenticated ? 'Seja bem vindo, ' + user.username : null}</span>
					{isAuthenticated ? authLinks : guestLinks}
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
				</div>
			</nav>
		)
	}
}

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header);
