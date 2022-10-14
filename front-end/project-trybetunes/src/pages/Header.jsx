import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      registeredUser: '',
    };
  }

  componentDidMount() {
    this.getName();
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = () => {};
  }

  getName = () => {
    this.setState({ loading: true }, async () => {
      const userData = await getUser();
      const userName = userData.name;
      this.setState({ loading: false, registeredUser: userName });
    });
  }

  render() {
    const {
      loading,
      registeredUser,
    } = this.state;

    return (
      loading ? <Loading />
        : (
          <header data-testid="header-component">
            <Link to="/search" data-testid="link-to-search"> Search </Link>
            <Link to="/favorites" data-testid="link-to-favorites"> Favorites </Link>
            <Link to="/profile" data-testid="link-to-profile"> Profile </Link>
            <p data-testid="header-user-name">{registeredUser}</p>
          </header>)
    );
  }
}

export default Header;
