import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

export class Login extends Component {
    state = {
        username: '',
        password:'',
	}
	
	static propTypes = {
		login: PropTypes.func.isRequired,
		isAuthenticated: PropTypes.bool,
	}

    onSubmit = e => {
		e.preventDefault();
		this.props.login(this.state.username, this.state.password);
    };
    
    onChange = e => this.setState({ [e.target.name]:e.target.value });

	render() {
		if (this.props.isAuthenticated) {
			return <Redirect to="/" />;
		}
		const {username, password} = this.state;
		return (
			<div className="container">
				<h2>Login</h2>
				<div className="registro">
					<form onSubmit={this.onSubmit}>
                        <div className="form-group">
							<label htmlFor="InputNome">Nome de usuario</label>
                            <input type="name" name="username" onChange={this.onChange}
                                className="form-control" value={username} id="InputNome" aria-describedby="Nome" placeholder="Insira seu nome de usuário" />
						</div>
                        <div className="form-group">
							<label htmlFor="InputNome">Senha</label>
                            <input type="password" name="password" onChange={this.onChange}
                                className="form-control" value={password} id="InputSenha" aria-describedby="Password" placeholder="Insira sua senha" />
						</div>
						
						<button type="submit" id="submitButton" className="btn btn-primary">Enviar</button>
					</form>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login})(Login);
