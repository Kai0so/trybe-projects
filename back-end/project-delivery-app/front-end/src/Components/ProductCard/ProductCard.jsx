import PropTypes from 'prop-types';
import { useState, useContext, useEffect } from 'react';
import ClientContext from '../../Provider/ClientContext';
import MyContext from '../../Provider/MyContext';

function ProductCard({
  cardImg,
  cardName,
  cardPrice,
  cardId,
  calculateTotalValue,
}) {
  const { products } = useContext(MyContext);
  const { setItemQuantity, shoppingCart, setShoppingCart } = useContext(ClientContext);
  const [quantity, setQuantity] = useState(0);

  const getQuantityItem = () => {
    const storedShoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
    if (!storedShoppingCart) {
      if (shoppingCart.length === 0) {
        setShoppingCart(products);
      } else if (!Object.keys(shoppingCart[0]).includes('quantity')) {
        setShoppingCart(products.map((product) => ({ ...product, quantity: 0 })));
      }
    } else {
      setShoppingCart(storedShoppingCart);
    }
  };

  const setInputQuantity = (target) => {
    if (target.value >= 0) {
      setQuantity(Number(target.value));
      setItemQuantity(cardId, target);
    } else {
      setQuantity(0);
      setItemQuantity(cardId, target);
    }
    calculateTotalValue();
  };

  const changeInputValue = ({ target }) => {
    const operation = target.innerHTML;
    let n = Number(quantity);
    setItemQuantity(cardId, target);
    calculateTotalValue();
    if (operation === '+') {
      setQuantity(n += 1);
    } else if (operation === '-') {
      if (n <= 0) {
        setQuantity(0);
      } else {
        setQuantity(n -= 1);
      }
    }
  };

  useEffect(() => {
    calculateTotalValue();
    getQuantityItem();
    setQuantity(shoppingCart[Number(cardId) - 1].quantity || 0);
  }, []);

  return (
    <div
      className="card_body w-fit min-w-fit mx-auto bg-neutral-100 flex
    flex-col items-center justify-center relative my-3 rounded-lg py-4"
    >
      <div
        className="upper_card_body"
      >
        <p
          className="card_price absolute font-bold text-2xl"
          data-testid={ `customer_products__element-card-price-${cardId}` }
        >
          { `R$ ${cardPrice.replace('.', ',')}`}
        </p>
        <img
          src={ cardImg }
          alt={ cardName }
          className="max-h-max h-64"
          width={ 250 }
          data-testid={ `customer_products__img-card-bg-image-${cardId}` }
        />
      </div>
      <p data-testid={ `customer_products__element-card-title-${cardId}` }>
        { cardName }
      </p>
      <div
        className="justify-center items-center text-center flex flex-row"
      >
        <button
          type="button"
          data-testid={ `customer_products__button-card-rm-item-${cardId}` }
          onClick={ changeInputValue }
          className="bg-yellow-300 mx-2 w-8 rounded-md font-bold p-1"
        >
          -
        </button>
        <input
          data-testid={ `customer_products__input-card-quantity-${cardId}` }
          value={ quantity }
          type="number"
          min={ 0 }
          className="outline outline-1 w-1/6 p-1 text-right"
          onChange={ ({ target }) => {
            setInputQuantity(target);
            setQuantity(target.value);
          } }
        />
        <button
          type="button"
          data-testid={ `customer_products__button-card-add-item-${cardId}` }
          onClick={ changeInputValue }
          className="bg-yellow-300 mx-2 w-8 rounded-md font-bold p-1"
        >
          +
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardId: PropTypes.number.isRequired,
  cardPrice: PropTypes.string.isRequired,
  cardImg: PropTypes.string.isRequired,
  calculateTotalValue: PropTypes.func.isRequired,
};

export default ProductCard;
