import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from '../SearchBar/SearchBar';

function Header({ name, hasSearchIcon, hasProfileIcon }) {
  const [showBar, setShowBar] = useState(false);
  const history = useHistory();
  return (
    <>
      {hasProfileIcon ? (
        <button
          type="button"
          onClick={ () => history.push('/profile') }
          className="profile-button"
        >
          <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
        </button>) : null }
      <div>
        <h1 data-testid="page-title">{name}</h1>
      </div>
      { hasSearchIcon ? (
        <button
          type="button"
          onClick={ () => setShowBar(!showBar) }
          className="search-button"
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="explore"
          />
        </button>) : null}
      <span>
        { showBar === true ? <SearchBar name={ name } /> : null }
      </span>
    </>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  hasSearchIcon: PropTypes.bool.isRequired,
  hasProfileIcon: PropTypes.bool.isRequired,
};

export default Header;
