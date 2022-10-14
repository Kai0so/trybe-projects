import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  getProductsFromCategoryAndQuery,
  getProductsFromCategory,
  getCategories } from '../services/api';
import Products from './Products';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      input: '',
      results: [],
      categories: [],
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.fetchCategories();
  }

  handleInput({ target: { value } }) {
    this.setState({ input: value });
  }

  async handleClick() {
    const { input } = this.state;
    const apiRequest = await getProductsFromCategoryAndQuery(input);
    this.setState({ results: apiRequest.results });
  }

  fetchCategories = async () => {
    const categoriesList = await getCategories();
    this.setState({ categories: categoriesList });
  }

  selectCategories = async ({ target }) => {
    const apiRequest = await getProductsFromCategory(target.id);
    this.setState({ results: apiRequest.results });
  }

  render() {
    const { results, categories } = this.state;

    return (
      <main>
        <Link to="/Cart" data-testid="shopping-cart-button"> Carrinho </Link>
        <form>
          { categories.map((elem) => (
            <div key={ elem.id }>
              <input
                type="radio"
                id={ elem.id }
                name="category-select"
                data-testid="category"
                onClick={ this.selectCategories }
              />
              <label htmlFor={ elem.id }>{ elem.name }</label>
            </div>
          ))}
        </form>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <form>
          <input
            data-testid="query-input"
            type="text"
            onChange={ this.handleInput }
          />
          <button data-testid="query-button" type="button" onClick={ this.handleClick }>
            Pesquisar
          </button>
        </form>
        <div>
          {results.map((res) => (
            <div key={ res.id }>
              <Products
                result={ res }
                price={ res.price }
                thumbnail={ res.thumbnail }
                title={ res.title }
              />
            </div>
          ))}
        </div>

      </main>
    );
  }
}

export default Search;
