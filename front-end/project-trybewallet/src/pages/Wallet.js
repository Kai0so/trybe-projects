import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchCurrency, addExpenses } from '../actions';
import ExpenseHeader from '../components/ExpenseIdHeader';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      valueInput: 0,
      descriptionInput: '',
      currencyInput: 'USD',
      methodInput: 'Dinheiro',
      tagInput: 'Alimentação',
    };
  }

  componentDidMount() {
    this.fetchApi();
  }

  fetchApi = async () => {
    const { fetchCurrencyApi } = this.props;
    await fetchCurrencyApi();
  }

  handleInputChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  }

  handleClick = async () => {
    const { expensesRegister, fetchCurrencyApi } = this.props;
    const {
      valueInput,
      descriptionInput,
      currencyInput,
      methodInput,
      tagInput,
      id,
    } = this.state;

    const apiResult = await fetchCurrencyApi();
    delete apiResult.currency.USDT;

    const expenses = {
      id,
      value: valueInput,
      description: descriptionInput,
      currency: currencyInput,
      method: methodInput,
      tag: tagInput,
      exchangeRates: apiResult.currency,
    };
    expensesRegister(expenses);
    this.setState({ id: id + 1, valueInput: 0 });
  }

  render() {
    const { valueInput } = this.state;
    const { currencies } = this.props;

    return (
      <>
        <h1>TrybeWallet</h1>
        <Header />
        <form>
          <input
            value={ valueInput }
            type="number"
            id="valueInput"
            onChange={ this.handleInputChange }
            data-testid="value-input"
          />
          <input
            type="text"
            id="descriptionInput"
            onChange={ this.handleInputChange }
            data-testid="description-input"
          />
          <label htmlFor="currencyInput">
            moeda
            <select
              id="currencyInput"
              onChange={ this.handleInputChange }
              data-testid="currency-input"
            >
              {currencies.filter(
                (item) => (item.value !== 'USDT'),
              ).map(
                (curr, i) => <option key={ i } data-testid={ curr }>{ curr }</option>,
              )}
            </select>
          </label>
          <select
            id="methodInput"
            onChange={ this.handleInputChange }
            data-testid="method-input"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select
            id="tagInput"
            onChange={ this.handleInputChange }
            data-testid="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
        </form>
        <ExpenseHeader />
      </>
    );
  }
}

Wallet.propTypes = {
  fetchCurrencyApi: propTypes.func,
  expensesRegister: propTypes.func,
  currencies: propTypes.obj,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  expensesRegister: (expense) => dispatch(addExpenses(expense)),
  fetchCurrencyApi: () => dispatch(fetchCurrency()),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
