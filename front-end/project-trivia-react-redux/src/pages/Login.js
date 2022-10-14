import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchToken from '../services/tokenApi';
import { actionToken, actionData } from '../store/actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      emailInput: '',
      isDisabled: true,
      nameInput: '',
    };
  }

   handleOnClick = async () => {
     const { emailInput, nameInput } = this.state;
     const { history, addToken, addData } = this.props;
     const data = await fetchToken();
     const { token } = data;
     const payload = {
       email: emailInput,
       name: nameInput,
     };
     addToken(token);
     addData(payload);
     localStorage.setItem('token', token);
     history.push('/game');
   }

  handleInputChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value }, this.enableLoginButton);
  }

  enableLoginButton = () => {
    const { emailInput, nameInput } = this.state;

    if (emailInput && nameInput !== '') {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  render() {
    const { history } = this.props;
    const { emailInput, nameInput, isDisabled } = this.state;
    return (
      <div className="box_login">
        <form className="form_login">
          <h1 className=""> Login </h1>
          <label htmlFor="email" className="login_element">
            Email do gravatar:
            <input
              id="emailInput"
              type="email"
              data-testid="input-gravatar-email"
              name="email"
              value={ emailInput }
              onChange={ this.handleInputChange }
            />
          </label>
          <label htmlFor="name" className="login_element">
            Nome do jogador:
            <input
              type="text"
              id="nameInput"
              data-testid="input-player-name"
              name="name"
              value={ nameInput }
              onChange={ this.handleInputChange }
            />
          </label>
          <div className="login_buttons">
            <button
              type="button"
              data-testid="btn-play"
              disabled={ isDisabled }
              onClick={ this.handleOnClick }
            >
              Play!
            </button>
            <button
              type="button"
              data-testid="btn-settings"
              onClick={ () => history.push('/config') }
            >
              &#128736;
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.obj,
  addToken: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  addToken: (token) => dispatch(actionToken(token)),
  addData: (data) => dispatch(actionData(data)),
});

export default connect(null, mapDispatchToProps)(Login);
