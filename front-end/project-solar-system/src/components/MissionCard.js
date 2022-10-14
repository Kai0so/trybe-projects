import React from 'react';
import propTypes from 'prop-types';

class MissionCard extends React.Component {
  render() {
    const { name, year, country, destination } = this.props;
    return (
      <div data-testid="mission-card">
        <section data-testid="mission-name">
          {name}
        </section>
        <section data-testid="mission-year">
          {year}
        </section>
        <section data-testid="mission-country">
          {country}
        </section>
        <section data-testid="mission-destination">
          {destination}
        </section>
      </div>
    );
  }
}

MissionCard.propTypes = {
  name: propTypes.string.isRequired,
  year: propTypes.string.isRequired,
  country: propTypes.string.isRequired,
  destination: propTypes.string.isRequired,
};

export default MissionCard;
