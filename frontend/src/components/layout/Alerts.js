import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Alerts extends Component {
    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired,
    }

    componentDidUpdate(prevProps){
        // this.props.alert.show('Ola mundo');
        const {error, alert, message} = this.props;
        if (error !== prevProps.error) {
            // if (error.msg.name) alert.error("Houve um erro com nome!");
            if (error.msg.name) alert.error(`Name: ${error.msg.name.join()}`);
            // if (error.msg.email) alert.error("Houve um erro com e-mail!");
            if (error.msg.email) alert.error(`E-mail: ${error.msg.email.join()}`);
            if (error.msg.message) alert.error(`Message: ${error.msg.message.join()}`);
            if (error.msg.non_field_errors) alert.error(`Message: ${error.msg.non_field_errors.join()}`);
            if (error.msg.username) alert.error(`Name: ${error.msg.username.join()}`);

        }
        if (message !== prevProps.message){
            if (message.deleteLead) alert.success(message.deleteLead);
            if (message.addLead) alert.success(message.addLead);
            if (message.passwordsNotMatch) alert.error(message.passwordsNotMatch);
        }
    }

    render(){
        return <Fragment />;
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages,
})

export default connect(mapStateToProps)(withAlert()(Alerts));

