import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      userData: [],
    };
  }

  componentDidMount() {
    this.recoverUser();
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = () => {};
  }

  recoverUser = async () => {
    this.setState({ loading: true });
    const result = await getUser();
    this.setState({ loading: false, userData: result });
  }

  render() {
    const { loading, userData } = this.state;
    const { name, email, description, image } = userData;

    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <Loading /> : (
          <div>
            <p>{ name }</p>
            <p>{ email }</p>
            <p>{ description }</p>
            <img src={ image } alt={ name } data-testid="profile-image" />
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
