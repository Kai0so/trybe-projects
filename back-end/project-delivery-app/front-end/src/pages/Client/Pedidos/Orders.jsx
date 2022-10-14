import React, { useContext, useEffect } from 'react';
import OrderCardClient from '../../../Components/OrderCard/OrderCardClient';
import UserNavbar from '../../../Components/UserNavbar/UsersNavbar';
import ClientContext from '../../../Provider/ClientContext';

function Orders() {
  const { orders, fetchOrders } = useContext(ClientContext);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchOrders();
  }, []);

  const filterOrders = orders.filter((item) => item.userId === user.id);

  return (
    <div>
      <header>
        <UserNavbar />
      </header>
      <div className="flex flex-wrap mx-auto justify-center items-center">
        { filterOrders.length === 0 ? 'Você ainda não tem pedidos finalizados'
          : filterOrders.map((item) => (
            <OrderCardClient
              key={ item.id }
              id={ item.id }
              status={ item.status }
              saleDate={ item.saleDate }
              totalPrice={ item.totalPrice }
            />
          ))}
      </div>
    </div>
  );
}

export default Orders;
