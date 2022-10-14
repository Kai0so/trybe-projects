import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function OrderCardSeller({ id, status, saleDate, totalPrice, deliveryAddress,
  deliveryNumber }) {
  const [newDate] = saleDate.split('T');
  const newPrice = totalPrice.replace('.', ',');
  const [year, month, day] = newDate.split('-');
  return (
    <div>
      <Link to={ `/seller/orders/${id}` }>
        <div>
          <p data-testid={ `seller_orders__element-order-id-${id}` }>
            {`Pedido ${id}`}
          </p>
        </div>
        <div>
          <div>
            <p data-testid={ `seller_orders__element-delivery-status-${id}` }>
              { `${status}` }
            </p>
          </div>
          <div>
            <p data-testid={ `seller_orders__element-order-date-${id}` }>
              { `${day}/${month}/${year}` }
            </p>
            <p data-testid={ `seller_orders__element-card-price-${id}` }>
              { `${newPrice}` }
            </p>
          </div>
          <div>
            <p data-testid={ `seller_orders__element-card-address-${id}` }>
              { `${deliveryAddress}, ${deliveryNumber}` }
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

OrderCardSeller.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  saleDate: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  deliveryAddress: PropTypes.string.isRequired,
  deliveryNumber: PropTypes.string.isRequired,
};

export default OrderCardSeller;
