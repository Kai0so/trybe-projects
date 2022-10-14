import propTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { loginAction } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      emailInput: '',
      passwordInput: '',
      disabled: true,
    };
  }

  handleInputChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value }, this.enableLoginButton);
  }

  handleClick = () => {
    const { emailInput } = this.state;
    const { submitUserInfo, history } = this.props;
    submitUserInfo(emailInput);
    history.push('/carteira');
  }

  enableLoginButton = () => {
    const { emailInput, passwordInput } = this.state;

    const MIN_PASSWORD_LENGTH = 6;
    const testEmail1 = emailInput.includes('@');
    const testEmail2 = emailInput.includes('.com');
    const testPassword = passwordInput.length >= MIN_PASSWORD_LENGTH;

    if (testEmail1 && testEmail2 && testPassword) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  render() {
    const { disabled } = this.state;

    return (
      <div>
        <div>Login</div>
        <input
          type="email"
          id="emailInput"
          data-testid="email-input"
          onChange={ this.handleInputChange }
        />
        <input
          type="password"
          id="passwordInput"
          data-testid="password-input"
          onChange={ this.handleInputChange }
        />
        <button
          type="button"
          disabled={ disabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  submitUserInfo: propTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  submitUserInfo: (email) => dispatch(loginAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
