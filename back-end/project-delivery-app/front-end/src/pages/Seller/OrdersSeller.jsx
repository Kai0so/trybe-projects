import React, { useContext, useEffect } from 'react';
import OrderCardSeller from '../../Components/OrderCard/OrderCardSeller';
import UserNavbar from '../../Components/UserNavbar/UsersNavbar';
import ClientContext from '../../Provider/ClientContext';

function OrdersSeller() {
  const { orders, fetchOrders } = useContext(ClientContext);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchOrders();
  }, []);

  const filterOrders = orders.filter((item) => item.sellerId === user.id);

  return (
    <div>
      <header>
        <UserNavbar />
      </header>
      <div>
        { filterOrders.length === 0 ? 'Você ainda não tem pedidos finalizados'
          : filterOrders.map((item) => (
            <OrderCardSeller
              key={ item.id }
              id={ item.id }
              status={ item.status }
              saleDate={ item.saleDate }
              totalPrice={ item.totalPrice }
              deliveryAddress={ item.deliveryAddress }
              deliveryNumber={ item.deliveryNumber }
            />
          ))}
      </div>
    </div>
  );
}

export default OrdersSeller;
