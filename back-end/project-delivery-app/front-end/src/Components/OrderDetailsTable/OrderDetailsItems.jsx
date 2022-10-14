import React from 'react';
import PropTypes from 'prop-types';

function OrderDetailsItems({ userType, index, description, quantity, price }) {
  return (
    <tr className="text-center outline outline-1 outline-neutral-200">
      <td
        data-testid={ `${userType}_checkout__element-order-table-item-number-${index}` }
      >
        { index + 1 }
      </td>
      <td
        data-testid={ `${userType}_order_details__element-order-table-name-${index}` }
      >
        { description }
      </td>
      <td
        data-testid={ `${userType}_order_details__element-order-table-quantity-${index}` }
      >
        { quantity }
      </td>
      <td
        data-testid={ `${userType}_order_details`
        + `__element-order-table-unit-price-${index}` }
      >
        { `R$ ${price.toFixed(2)}` }
      </td>
      <td
        data-testid={ `${userType}_order_details`
        + `__element-order-table-sub-total-${index}` }
      >
        { `R$ ${(quantity * price).toFixed(2)}` }
      </td>
    </tr>
  );
}

OrderDetailsItems.propTypes = {
  index: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  userType: PropTypes.string.isRequired,
};

export default OrderDetailsItems;
