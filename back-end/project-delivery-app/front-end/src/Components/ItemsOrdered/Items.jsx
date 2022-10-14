import React from 'react';
import PropTypes from 'prop-types';

function Items({ id, description, quantity, unitValue, itemNumber, removeCartItem }) {
  return (
    <tr className="text-center outline outline-1 outline-neutral-200">
      <td
        data-testid={ `customer_checkout__element-order-table-item-number-${itemNumber}` }
      >
        { itemNumber + 1 }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-name-${itemNumber}` }
      >
        { description }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-quantity-${itemNumber}` }
      >
        {quantity}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-unit-price-${itemNumber}` }
      >
        { `R$ ${unitValue.toFixed(2).replace('.', ',')}` }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-sub-total-${itemNumber}` }
      >
        { `R$ ${(quantity * unitValue).toFixed(2).replace('.', ',')}` }
      </td>
      <td>
        <button
          type="button"
          data-testid={ `customer_checkout__element-order-table-remove-${itemNumber}` }
          onClick={ removeCartItem }
          id={ id }
          className="text-white bg-red-600 p-2 rounded-md my-2 font-bold"
        >
          Remover Item
        </button>
      </td>
    </tr>
  );
}

Items.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  unitValue: PropTypes.number.isRequired,
  itemNumber: PropTypes.number.isRequired,
  removeCartItem: PropTypes.func.isRequired,
};

export default Items;
