import React from 'react';
import propTypes from 'prop-types';

class Card extends React.Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.props;

    return (
      <div>
        <span data-testid="name-card">{ cardName }</span>
        <br />
        <img src={ cardImage } alt={ cardName } data-testid="image-card" />
        <br />
        <span data-testid="description-card">{ cardDescription }</span>
        <br />
        <span data-testid="attr1-card">{ cardAttr1 }</span>
        <br />
        <span data-testid="attr2-card">{ cardAttr2 }</span>
        <br />
        <span data-testid="attr3-card">{ cardAttr3 }</span>
        <br />
        <span data-testid="rare-card">{ cardRare }</span>
        <br />
        { cardTrunfo ? <p data-testid="trunfo-card">Super Trunfo</p> : '' }
      </div>
    );
  }
}

Card.propTypes = {
  cardName: propTypes.string.isRequired,
  cardDescription: propTypes.string.isRequired,
  cardAttr1: propTypes.string.isRequired,
  cardAttr2: propTypes.string.isRequired,
  cardAttr3: propTypes.string.isRequired,
  cardImage: propTypes.string.isRequired,
  cardRare: propTypes.string.isRequired,
  cardTrunfo: propTypes.bool.isRequired,
};

export default Card;
