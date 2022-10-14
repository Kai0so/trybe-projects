import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Products extends React.Component {
  addProductCart = () => {
    const { result } = this.props;
    const storageItems = JSON.parse(localStorage.getItem('Item'));
    if (storageItems === null) {
      const savedItems = [];
      savedItems.push(result);
      localStorage.setItem('Item', JSON.stringify([...savedItems]));
    } else {
      const savedItems = storageItems;
      savedItems.push(result);
      localStorage.setItem('Item', JSON.stringify([...savedItems]));
    }
  }

  render() {
    const { price, thumbnail, title, result } = this.props;
    return (
      <div data-testid="product">
        <Link
          data-testid="product-detail-link"
          to={ `/product/${result.id}` }
        >
          <h3>{ title }</h3>
        </Link>
        <span>{ price }</span>
        <img src={ thumbnail } alt={ title } />
        <button
          data-testid="product-add-to-cart"
          type="button"
          onClick={ this.addProductCart }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

Products.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  result: PropTypes.objectOf(PropTypes.any).isRequired,
};
