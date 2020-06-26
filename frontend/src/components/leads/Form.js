import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLead } from '../../actions/leads';

export class Form extends Component {
	state = {
		name: '',
		email: '',
		message: '',
	};

	static propTypes = {
		addLead: PropTypes.func.isRequired,
	}

	onChange = e => this.setState({ [e.target.name]:e.target.value });

	onSubmit = e => {
		e.preventDefault();
		const {name, email, message} = this.state;
		const lead = {name, email, message};
		this.props.addLead(lead);
		this.setState({
			name: '',
			email: '',
			message: '',
		})
	};

	render() {
		const {name, email, message} = this.state;
		return (
			<div>
				<h1>Add Form</h1>
				<div className="formulario">
					<form onSubmit={this.onSubmit}>
						<div className="form-group">
							<label htmlFor="InputNome">Nome</label>
							<input type="text" name="name" onChange={this.onChange} className="form-control" value={name} id="InputNome" aria-describedby="Nome" placeholder="Insira nome" />
							<small id="nameHelp" className="form-text text-muted">Use nome completo.</small>
						</div>
						<div className="form-group">
							<label htmlFor="InputEmail">Email address</label>
							<input type="email" name="email" onChange={this.onChange} className="form-control" value={email} id="InputEmail" aria-describedby="emailHelp" placeholder="Insira e-mail" />
							<small id="emailHelp" className="form-text text-muted">E-mail deve ser válido</small>
						</div>
						<div className="form-group">
							<label htmlFor="InputMensagem">Mensagem</label>
							<input type="text" name="message" onChange={this.onChange} className="form-control" value={message} id="InputMensagem" aria-describedby="Mensagem" placeholder="Insira mensagem" />
							<small id="messageHelp" className="form-text text-muted">Mensagem é opcional.</small>
						</div>
						<button type="submit" id="submitButton" className="btn btn-primary">Enviar</button>
					</form>
				</div>
			</div>
		)
	}
}

export default connect(null, { addLead })(Form);
