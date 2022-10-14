import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OrderDetailsTable from '../../../Components/OrderDetailsTable/OrderDetailsTable';
import UserNavbar from '../../../Components/UserNavbar/UsersNavbar';
import { fetchSaleById } from '../../../services/clientAPI';
import { fetchUserById } from '../../../services/userAPI';

function OrderDetails() {
  const [order, setOrder] = useState({});
  const [btnDisabled, setBtnDisabled] = useState(true);

  const { id } = useParams();

  const getSaleData = async () => {
    const data = await fetchSaleById(id);
    const [newDate] = data.saleDate.split('T');
    const [year, month, day] = newDate.split('-');
    data.saleDate = `${day}/${month}/${year}`;
    const { name } = await fetchUserById(data.sellerId);
    data.seller = name;
    data.totalPrice = data.totalPrice.replace('.', ',');

    if (data.status === 'Em Trânsito') {
      setBtnDisabled(false);
    }

    setOrder(data);
  };

  async function changeOrderStatus() {
    await fetch('http://localhost:3001/sales', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: id,
        newStatus: 'Entregue',
      }),
    });
    setBtnDisabled(true);
    getSaleData();
  }

  useEffect(() => {
    getSaleData();
  }, []);

  return (
    <>
      <UserNavbar />
      <section className="flex flex-col items-center">
        <h1
          data-testid="customer_order_details__element-order-details-label-order-id"
          className="text-2xl my-3 font-bold"
        >
          Pedido
          {' '}
          {id}
          ;
        </h1>
        {order
      && (
        <section className="flex">
          <span
            data-testid="customer_order_details__element-order-details-label-seller-name"
            className="mx-3"
          >
            {`Vendedor: ${order.seller}`}
          </span>
          {' '}
          <span
            data-testid="customer_order_details__element-order-details-label-order-date"
            className="mx-3"
          >
            {order.saleDate}
          </span>
          {' '}
          <span
            data-testid={ 'customer_order_details__element'
            + '-order-details-label-delivery-status' }
            className="mx-3 font-bold"
          >
            {order.status}
          </span>
          {' '}
        </section>)}
        <OrderDetailsTable orderId={ Number(id) } />
        <h1
          data-testid="customer_order_details__element-order-total-price"
          className="font-bold text-3xl"
        >
          {`Total: R$${order.totalPrice}`}
        </h1>
        <button
          data-testid="customer_order_details__button-delivery-check"
          type="button"
          disabled={ btnDisabled }
          onClick={ changeOrderStatus }
          className="text-2xl bg-green-500 py-2 px-6
          rounded-full outline outline-green-300 text-white
          my-4"
        >
          Confirmar entrega
        </button>
      </section>
    </>
  );
}

export default OrderDetails;
