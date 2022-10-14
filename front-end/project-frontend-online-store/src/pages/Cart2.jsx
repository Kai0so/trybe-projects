import React from 'react';
import PropTypes from 'prop-types';

class Cart2 extends React.Component {
  constructor() {
    super();

    this.state = {
      quantity: 1,
    };

    this.handleIncrease = this.handleIncrease.bind(this);
    this.handleDecrease = this.handleDecrease.bind(this);
  }

  handleIncrease() {
    this.setState((prevState) => ({ quantity: prevState.quantity + 1 }));
  }

  handleDecrease() {
    const { quantity } = this.state;
    if (quantity > 0) {
      this.setState((prevState) => ({ quantity: prevState.quantity - 1 }));
    }
  }

  render() {
    const { quantity } = this.state;
    const { item } = this.props;
    return (
      <div>
        <h3 data-testid="shopping-cart-product-name">{item.title}</h3>
        <button
          type="button"
          onClick={ this.handleIncrease }
          data-testid="product-increase-quantity"
        >
          +
        </button>
        <p data-testid="shopping-cart-product-quantity">{quantity}</p>
        <button
          type="button"
          onClick={ this.handleDecrease }
          data-testid="product-decrease-quantity"
        >
          -
        </button>
        <p>{ item.price }</p>
      </div>
    );
  }
}

Cart2.propTypes = {
  item: PropTypes.objectOf(PropTypes.object),
}.isRequired;

export default Cart2;
