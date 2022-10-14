import React from 'react';
import { Redirect } from 'react-router-dom';
import * as userRequests from '../services/userAPI';
import Loading from './Loading';

const MIN_INPUT_LENGTH = 3;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nameInput: '',
      loginButtonDisabled: true,
      loading: true,
      redirect: true,
    };
  }

  componentDidMount() {
    this.stopLoading();
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = () => {};
  }

  stopLoading = () => {
    this.setState({ loading: false, redirect: false });
  }

  handleInputChange = ({ target: { value } }) => {
    this.setState({ nameInput: value }, this.enableLoginButton);
  }

  enableLoginButton = () => {
    const {
      nameInput,
    } = this.state;

    if (nameInput.length < MIN_INPUT_LENGTH) {
      this.setState({ loginButtonDisabled: true });
    } else {
      this.setState({ loginButtonDisabled: false });
    }
  }

handleRegisterClick = () => {
  const {
    nameInput,
  } = this.state;

  this.setState({ loading: true }, async () => {
    await userRequests.createUser({ name: nameInput });
    this.setState({ loading: false, redirect: true });
  });
}

render() {
  const {
    nameInput,
    loginButtonDisabled,
    loading,
    redirect,
  } = this.state;

  if (loading) {
    return <Loading />;
  }

  if (redirect) {
    return <Redirect to="/search" />;
  }

  return (
    <div data-testid="page-login">
      <form>
        <input
          type="text"
          data-testid="login-name-input"
          value={ nameInput }
          onChange={ this.handleInputChange }
        />
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ loginButtonDisabled }
          onClick={ this.handleRegisterClick }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
}

export default Login;
