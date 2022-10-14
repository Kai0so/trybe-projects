import React from 'react';
import propTypes from 'prop-types';
import Header from './Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      name: '',
      description: '',
      email: '',
      image: '',
      disabled: true,
    };
  }

  componentDidMount() {
    this.recoverUser();
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = () => {};
  }

  enableSaveButton = () => {
    const { name, description, email, image } = this.state;
    if (name && description && email && image !== '') {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  recoverUser = async () => {
    this.setState({ loading: true });
    const result = await getUser();
    const { name, email, description, image } = result;
    this.setState({
      loading: false,
      name,
      email,
      description,
      image,
    });
  }

  handleInputChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value }, this.enableSaveButton);
  }

  handleClick = async () => {
    const {
      name,
      email,
      description,
      image,
    } = this.state;

    const { history } = this.props;

    const user = {
      name,
      email,
      description,
      image,
    };

    this.setState({ loading: true });
    await updateUser(user);
    this.setState({ loading: false });
    history.push('/profile');
  }

  render() {
    const { loading, name, email, description, image, disabled } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <Loading />
          : (
            <form>
              <h3>Editar perfil</h3>
              <input
                type="text"
                value={ name }
                id="name"
                onChange={ this.handleInputChange }
                data-testid="edit-input-name"
                required
              />
              <input
                type="email"
                value={ email }
                id="email"
                onChange={ this.handleInputChange }
                data-testid="edit-input-email"
                required
              />
              <textarea
                value={ description }
                id="description"
                onChange={ this.handleInputChange }
                data-testid="edit-input-description"
                required
              />
              <input
                type="text"
                value={ image }
                id="image"
                onChange={ this.handleInputChange }
                data-testid="edit-input-image"
                required
              />
              <button
                type="button"
                data-testid="edit-button-save"
                disabled={ disabled }
                onClick={ this.handleClick }
              >
                Salvar
              </button>
            </form>
          )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  song: propTypes.object,
}.isRequired;

export default ProfileEdit;
