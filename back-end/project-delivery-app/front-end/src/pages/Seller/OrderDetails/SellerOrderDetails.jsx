import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OrderDetailsTable from '../../../Components/OrderDetailsTable/OrderDetailsTable';
import UserNavbar from '../../../Components/UserNavbar/UsersNavbar';
import { fetchSaleById } from '../../../services/clientAPI';
import { fetchUserById } from '../../../services/userAPI';

function SellerOrderDetails() {
  const [order, setOrder] = useState({});
  const [prepareOrderBtn, setPrepareOrderBtn] = useState(true);
  const [deliverOrderBtn, setDeliverOrderBtn] = useState(true);

  const { id } = useParams();

  const getSaleData = async () => {
    const data = await fetchSaleById(id);
    const [newDate] = data.saleDate.split('T');
    const [year, month, day] = newDate.split('-');
    data.saleDate = `${day}/${month}/${year}`;
    const { name } = await fetchUserById(data.sellerId);
    data.seller = name;
    data.totalPrice = data.totalPrice.replace('.', ',');

    if (data.status === 'Pendente') {
      setPrepareOrderBtn(false);
      setDeliverOrderBtn(true);
    } else if (data.status === 'Preparando') {
      setPrepareOrderBtn(true);
      setDeliverOrderBtn(false);
    } else if (data.status === 'Em Trânsito' || data.status === 'Entregue'
    || data.status === 'Entregue') {
      setPrepareOrderBtn(true);
      setDeliverOrderBtn(true);
    }
    setOrder(data);
  };

  async function changeOrderStatus(newStatus) {
    await fetch('http://localhost:3001/sales', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: id,
        newStatus,
      }),
    });
    getSaleData();
  }

  useEffect(() => {
    getSaleData();
  }, []);

  return (
    <>
      <UserNavbar />
      <h1
        data-testid="seller_order_details__element-order-details-label-order-id"
      >
        Pedido
        {' '}
        {id}
        ;
      </h1>
      {order
      && (
        <>
          <span
            data-testid="seller_order_details__element-order-details-label-order-date"
          >
            {order.saleDate}
          </span>
          {' '}
          <span
            data-testid={ 'seller_order_details__element'
            + '-order-details-label-delivery-status' }
          >
            {order.status}
          </span>
          {' '}
        </>)}
      <button
        data-testid="seller_order_details__button-preparing-check"
        type="button"
        disabled={ prepareOrderBtn }
        onClick={ () => changeOrderStatus('Preparando') }
      >
        Preparar pedido
      </button>
      <button
        data-testid="seller_order_details__button-dispatch-check"
        type="button"
        disabled={ deliverOrderBtn }
        onClick={ () => changeOrderStatus('Em Trânsito') }
      >
        Saiu para entrega
      </button>
      <OrderDetailsTable orderId={ Number(id) } />
      <h1
        data-testid="seller_order_details__element-order-total-price"
      >
        {order.totalPrice}
      </h1>
    </>

  );
}

export default SellerOrderDetails;
