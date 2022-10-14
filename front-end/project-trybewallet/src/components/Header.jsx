import propTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  updateTotalExpenses = () => {
    const { expenseValue } = this.props;
    let totalValue = 0;
    expenseValue.forEach((item) => {
      const expenseCurrency = item.currency;
      const valueToAdd = (item.value) * (item.exchangeRates[expenseCurrency].ask);
      totalValue += valueToAdd;
    });
    return totalValue.toFixed(2);
  }

  render() {
    const { userEmail } = this.props;

    return (
      <>
        <h3 data-testid="email-field">{ userEmail }</h3>
        <span
          data-testid="total-field"
        >
          { this.updateTotalExpenses() }
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </>
    );
  }
}

Header.propTypes = {
  userEmail: propTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenseValue: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
