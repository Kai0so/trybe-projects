import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { MD5 } from 'crypto-js';

class Header extends React.Component {
  render() {
    const { name, email, score } = this.props;
    return (
      <section className="header_game">
        <h2 data-testid="header-player-name">{ name }</h2>
        <img
          data-testid="header-profile-picture"
          alt="profile pic"
          src={ `https://www.gravatar.com/avatar/${MD5(email)}` }
        />
        <h2 data-testid="header-score">{ score }</h2>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Header);
