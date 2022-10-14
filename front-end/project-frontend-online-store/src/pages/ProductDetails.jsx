import React from 'react';
import PropTypes from 'prop-types';
import { getProductFromId } from '../services/api';

class ProductDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      product: [],
      img: '',
      price: 0,
      email: '',
      comment: '',
      rate: '',
      userRates: [],
    };
  }

  componentDidMount() {
    this.apiRequest();
    this.renderRate();
  }

  handleChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  }

  buttonClick = (event) => {
    event.preventDefault();

    const { match: { params: { id } } } = this.props;
    const { email, comment, rate } = this.state;
    const storageItems = JSON.parse(localStorage.getItem(`${id}-rate`));
    const userRateData = { email, comment, rate };

    if (storageItems === null) {
      const savedItems = [];
      savedItems.push(userRateData);
      localStorage.setItem(`${id}-rate`, JSON.stringify([...savedItems]));
    } else {
      const savedItems = storageItems;
      savedItems.push(userRateData);
      localStorage.setItem(`${id}-rate`, JSON.stringify([...savedItems]));
    }
  }

  async apiRequest() {
    const { match: { params: { id } } } = this.props;
    const product = await getProductFromId(id);
    this.setState({ product,
      img: product.pictures[0].url,
      price: product.price,
    });
  }

  renderRate = () => {
    const { match: { params: { id } } } = this.props;
    const storageItems = JSON.parse(localStorage.getItem(`${id}-rate`));
    this.setState({ userRates: storageItems });
  }

  render() {
    const { product: { title } } = this.state;
    const { img, price, userRates } = this.state;

    return (
      <div>
        <h1 data-testid="product-detail-name">{title}</h1>
        <img src={ img } alt={ title } />
        <p>{price}</p>
        <button type="button">Adicionar ao carrinho</button>
        <form action="">
          <label htmlFor="email">
            Email:
            <input
              type="text"
              data-testid="product-detail-email"
              onChange={ this.handleChange }
              id="email"
              name="email"
            />
          </label>
          <br />
          <label htmlFor="comment">
            Comentário:
            <textarea
              data-testid="product-detail-evaluation"
              id="comment"
              onChange={ this.handleChange }
              name="comment"
            />
          </label>
          <br />
          <label htmlFor="rate">
            Avaliação:
            <select
              onChange={ this.handleChange }
              name="rate"
              id="rate"
            >
              <option value="1" data-testid="1-rating">1</option>
              <option value="2" data-testid="2-rating">2</option>
              <option value="3" data-testid="3-rating">3</option>
              <option value="4" data-testid="4-rating">4</option>
              <option value="5" data-testid="5-rating">5</option>
            </select>
          </label>
          <br />
          <button
            type="submit"
            data-testid="submit-review-btn"
            onClick={ this.buttonClick }
          >
            Enviar
          </button>
        </form>
        {userRates !== null
        && userRates.map((item, index) => (
          <div key={ index }>
            <p>{ item.email }</p>
            <p>{ item.comment }</p>
            <p>{ item.rate }</p>
            <br />
          </div>
        ))}
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.object),
}.isRequired;

export default ProductDetails;
