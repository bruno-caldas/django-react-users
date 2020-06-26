import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';
import { createMessage } from '../../actions/messages';

export class Register extends Component {
    state = {
        username: '',
        email: '',
        password:'',
        password2:'',
	}

	static propTypes = {
		register: PropTypes.func.isRequired,
		isAuthenticated: PropTypes.bool,
	}

    onSubmit = e => {
		e.preventDefault();
		const { username, email, password, password2 } = this.state;
		if(password !== password2) {
			this.props.createMessage({ passwordsNotMatch: 'Password does not match' });
		} else {
			const newUser = {
				username,
				password,
				email,
			}
			this.props.register(newUser);
		}
    };
    
    onChange = e => this.setState({ [e.target.name]:e.target.value });

	render() {
		if(this.props.isAuthenticated){
			return <Redirect to="/" />;
		}
		const {username, email, password, password2} = this.state;
		return (
			<div className="container">
				<h2>Register</h2>
				<div className="registro">
					<form onSubmit={this.onSubmit}>
						<div className="form-group">
							<label htmlFor="InputNome">Nome de Usuário</label>
                            <input type="text" name="username" onChange={this.onChange}
                                className="form-control" value={username} id="InputNome" aria-describedby="Nome" placeholder="Insira nome de usuário" />
						</div>
                        <div className="form-group">
							<label htmlFor="InputNome">E-mail</label>
                            <input type="email" name="email" onChange={this.onChange}
                                className="form-control" value={email} id="InputEmail" aria-describedby="Email" placeholder="Insira seu e-mail" />
						</div>
                        <div className="form-group">
							<label htmlFor="InputNome">Senha</label>
                            <input type="password" name="password" onChange={this.onChange}
                                className="form-control" value={password} id="InputSenha" aria-describedby="Password" placeholder="Insira sua senha" />
						</div>
                        <div className="form-group">
							<label htmlFor="InputNome">Confirmação de senha</label>
                            <input type="password" name="password2" onChange={this.onChange}
                                className="form-control" value={password2} id="InputSenha2" aria-describedby="Password Confirmation" placeholder="Repita senha" />
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

export default connect(mapStateToProps, { register, createMessage })(Register);