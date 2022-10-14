import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import OrderDetailsItems from './OrderDetailsItems';
import { fetchSalesProductsById, fetchProductById } from '../../services/clientAPI';

function OrderDetailsTable(props) {
  const [order, setOrder] = useState([]);
  const [userType, setUserType] = useState('');
  const { orderId } = props;
  const location = useLocation();

  const getUserType = async () => {
    if (location.pathname.includes('customer')) {
      setUserType('customer');
    } else if (location.pathname.includes('seller')) {
      setUserType('seller');
    }
  };

  const getSale = async () => {
    const getIds = await fetchSalesProductsById(orderId);
    await getIds.forEach(async (p) => {
      const product = await fetchProductById(p.productId);
      product.quantity = p.quantity;
      setOrder((prevState) => [...prevState, product]);
    });
  };

  useEffect(() => {
    getSale();
    getUserType();
  }, []);

  return (
    <div className="flex flex-col justify-center container w-2/3">
      {order
      && (
        <table className="table-auto my-12">
          <thead className="px-3 space-y-2">
            <tr className="text-center px-3 text-left">
              <th className="outline outline-1 outline-neutral-200">Item</th>
              <th className="outline outline-1 outline-neutral-200">Descrição</th>
              <th className="outline outline-1 outline-neutral-200">Quantidade</th>
              <th className="outline outline-1 outline-neutral-200">Valor Unitário</th>
              <th className="outline outline-1 outline-neutral-200">Sub-total</th>
            </tr>
          </thead>
          <tbody>
            {
              order.map((product, index) => (
                <OrderDetailsItems
                  userType={ userType }
                  index={ index }
                  description={ product.name }
                  quantity={ product.quantity }
                  price={ Number(product.price) }
                  key={ index }
                />
              ))
            }
          </tbody>
        </table>)}
    </div>
  );
}

OrderDetailsTable.propTypes = {
  orderId: PropTypes.number.isRequired,
};

export default OrderDetailsTable;
