import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class ExpenseHeader extends React.Component {
  render() {
    const { expenses } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((item, i) => (
            <tr key={ i }>
              <td>{ item.description }</td>
              <td>{ item.tag }</td>
              <td>{ item.method }</td>
              <td>{ Number(item.value).toFixed(2) }</td>
              <td>{ item.exchangeRates[item.currency].name.split('/')[0]}</td>
              <td>{ Number(item.exchangeRates[item.currency].ask).toFixed(2) }</td>
              <td>
                { Number(item.exchangeRates[item.currency].ask * item.value).toFixed(2)}
              </td>
              <td>Real</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

ExpenseHeader.propTypes = {
  expenses: propTypes.obj,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(ExpenseHeader);
