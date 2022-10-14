import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemsOrdered from '../../../Components/ItemsOrdered/ItemsOrdered';
import UserNavbar from '../../../Components/UserNavbar/UsersNavbar';
import getSellers from '../../../services/userAPI';

function ClientOrders() {
  const navigate = useNavigate();
  const [sellers, setSellers] = useState([]);
  const [address, setAddress] = useState('');
  const [numberAddress, setNumberAddress] = useState('');
  const [seller, setSeller] = useState('Fulana Pereira');
  const SUCCESSFULLY_HTTP_STATUS = 201;

  const setSellersFromDB = async () => {
    const sellersFound = await getSellers();
    setSellers(sellersFound);
  };

  const getItemsFromLocalStorageToRequest = () => {
    const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));

    const soldItems = shoppingCart
      .filter(({ quantity }) => quantity > 0)
      .map(({ id, quantity }) => ({ productId: id, quantity }));

    return soldItems;
  };

  const getSellerAndUserIdFromLocalStorage = () => {
    let [sellerId] = sellers
      .filter(({ name }) => name === seller)
      .map(({ id }) => id);

    const { id: userId } = JSON.parse(localStorage.getItem('user'));

    if (!sellerId) {
      sellerId = 2;
    }
    return { sellerId, userId };
  };

  const getTokenFromLocalStorage = () => {
    const { token } = JSON.parse(localStorage.getItem('user'));

    return token;
  };

  const conclusionOfSale = async () => {
    const url = 'http://localhost:3001/sales';
    const sales = {
      ...getSellerAndUserIdFromLocalStorage(),
      totalPrice: localStorage.getItem('totalValue').replace(',', '.'),
      deliveryAddress: address,
      deliveryNumber: numberAddress,
      saleDate: new Date(),
      status: 'Pendente',
    };
    const saleProducts = getItemsFromLocalStorageToRequest();
    const sale = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getTokenFromLocalStorage(),
      },
      body: JSON.stringify({ sales, saleProducts }),
    });
    const data = await sale.json();

    if (sale.status === SUCCESSFULLY_HTTP_STATUS) {
      navigate(`/customer/orders/${data.id}`);
    } else {
      console.log(data);
    }
  };

  useEffect(() => {
    setSellersFromDB();
  }, []);

  return (
    <>
      <header>
        <UserNavbar />
      </header>
      <section className="flex flex-col">
        <div className="flex flex-col justify-center items-center space-y-4">
          <h2 className="text-4xl my-6">Pedido:</h2>
          <ItemsOrdered />
        </div>
        <div className="flex container space-x-5 justify-center items-center mx-auto">
          <label htmlFor="seller mx-2">
            Vendedor:
            <select
              id="seller"
              data-testid="customer_checkout__select-seller"
              value={ seller }
              className="mx-3 outline outline-1 outline-neutral-300 px-3 py-2"
              onChange={ ({ target: { value } }) => setSeller(value) }
            >
              {
                sellers.map(({ name }) => (
                  <option key={ name } value={ name }>{ name }</option>
                ))
              }
            </select>
          </label>

          <label htmlFor="addres">
            Endereço
            <input
              id="addres"
              data-testid="customer_checkout__input-address"
              type="text"
              value={ address }
              className="mx-3 outline outline-1 outline-neutral-300 px-3 py-2"
              onChange={ ({ target: { value } }) => setAddress(value) }
            />
          </label>

          <label htmlFor="number-addres">
            Número
            <input
              id="number-addres"
              data-testid="customer_checkout__input-address-number"
              type="number"
              className="mx-3 outline outline-1 outline-neutral-300 px-3 py-2"
              value={ numberAddress }
              onChange={ ({ target: { value } }) => setNumberAddress(value) }
            />
          </label>

          <div>
            <button
              type="button"
              data-testid="customer_checkout__button-submit-order"
              onClick={ conclusionOfSale }
              className="bg-yellow-300 text-2xl py-2 px-4 rounded-md"
            >
              Pedir
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default ClientOrders;
